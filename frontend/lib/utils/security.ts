import DOMPurify from "isomorphic-dompurify";
import { hash, compare } from "bcryptjs";
import { securityMonitor } from "./security-monitor";

// Sanitize HTML content
export function sanitizeHtml(dirty: string, ip?: string): string {
  const clean = DOMPurify.sanitize(dirty, {
    ALLOWED_TAGS: ["b", "i", "em", "strong", "a"],
    ALLOWED_ATTR: ["href"],
  });

  if (clean !== dirty) {
    securityMonitor.trackSuspiciousInput("XSS", dirty, ip);
  }

  return clean;
}

// Sanitize plain text (remove all HTML)
export function sanitizeText(dirty: string, ip?: string): string {
  const clean = DOMPurify.sanitize(dirty, {
    ALLOWED_TAGS: [],
    ALLOWED_ATTR: [],
  });

  if (clean !== dirty) {
    securityMonitor.trackSuspiciousInput("XSS", dirty, ip);
  }

  return clean;
}

// Hash sensitive data
export async function hashData(data: string): Promise<string> {
  return hash(data, 12);
}

// Compare hashed data
export async function compareHash(
  data: string,
  hashedData: string,
): Promise<boolean> {
  return compare(data, hashedData);
}

// Validate file type
export function isAllowedFileType(
  file: File,
  allowedTypes: string[],
  ip?: string,
): boolean {
  const isAllowed = allowedTypes.includes(file.type);

  if (!isAllowed) {
    securityMonitor.trackFileUpload(false, file.type, file.size, ip);
  }

  return isAllowed;
}

// Validate file size (in bytes)
export function isAllowedFileSize(
  file: File,
  maxSize: number,
  ip?: string,
): boolean {
  const isAllowed = file.size <= maxSize;

  if (!isAllowed) {
    securityMonitor.trackFileUpload(false, file.type, file.size, ip);
  }

  return isAllowed;
}

// Escape SQL injection attempts
export function escapeSql(str: string, ip?: string): string {
  if (typeof str !== "string") return str;

  const suspicious = /[\0\x08\x09\x1a\n\r"'\\\%]/g.test(str);
  if (suspicious) {
    securityMonitor.trackSuspiciousInput("SQL_INJECTION", str, ip);
  }

  return str.replace(/[\0\x08\x09\x1a\n\r"'\\\%]/g, function (char) {
    switch (char) {
      case "\0":
        return "\\0";
      case "\x08":
        return "\\b";
      case "\x09":
        return "\\t";
      case "\x1a":
        return "\\z";
      case "\n":
        return "\\n";
      case "\r":
        return "\\r";
      case '"':
      case "'":
      case "\\":
      case "%":
        return "\\" + char; // prepends a backslash to backslash, percent, and double/single quotes
    }
    return char;
  });
}

// Encode data for XSS prevention
export function encodeXSS(str: string, ip?: string): string {
  const encoded = str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;")
    .replace(/\//g, "&#x2F;");

  if (encoded !== str) {
    securityMonitor.trackSuspiciousInput("XSS", str, ip);
  }

  return encoded;
}
