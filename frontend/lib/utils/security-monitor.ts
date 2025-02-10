import * as Sentry from "@sentry/nextjs";

interface SecurityEvent {
  type: string;
  details: Record<string, any>;
  ip?: string;
  userId?: string;
  path?: string;
}

class SecurityMonitor {
  private static instance: SecurityMonitor;

  private constructor() {}

  public static getInstance(): SecurityMonitor {
    if (!SecurityMonitor.instance) {
      SecurityMonitor.instance = new SecurityMonitor();
    }
    return SecurityMonitor.instance;
  }

  // Track CSRF violations
  trackCsrfViolation(ip: string, path: string) {
    Sentry.captureEvent({
      message: "CSRF Violation Attempt",
      level: "warning",
      tags: {
        type: "security_violation",
        violation_type: "csrf",
      },
      extra: {
        ip,
        path,
      },
    });
  }

  // Track rate limit hits
  trackRateLimit(
    type: "auth" | "contact" | "trade",
    ip: string,
    blocked: boolean,
  ) {
    if (blocked) {
      Sentry.captureEvent({
        message: "Rate Limit Exceeded",
        level: "warning",
        tags: {
          type: "rate_limit",
          limit_type: type,
        },
        extra: {
          ip,
          blocked,
        },
      });
    }
  }

  // Track validation failures
  trackValidationFailure(
    type: string,
    errors: Record<string, any>,
    ip?: string,
  ) {
    Sentry.captureEvent({
      message: "Validation Failure",
      level: "warning",
      tags: {
        type: "validation_failure",
        form_type: type,
      },
      extra: {
        errors,
        ip,
      },
    });
  }

  // Track suspicious input attempts (XSS, SQL Injection)
  trackSuspiciousInput(
    type: "XSS" | "SQL_INJECTION",
    input: string,
    ip?: string,
  ) {
    Sentry.captureEvent({
      message: `${type} Attempt Detected`,
      level: "warning",
      tags: {
        type: "security_violation",
        violation_type: type.toLowerCase(),
      },
      extra: {
        sanitized_input: input.substring(0, 100), // Only log first 100 chars
        ip,
      },
    });
  }

  // Track file upload attempts
  trackFileUpload(
    success: boolean,
    fileType: string,
    fileSize: number,
    ip?: string,
  ) {
    if (!success) {
      Sentry.captureEvent({
        message: "Invalid File Upload Attempt",
        level: "warning",
        tags: {
          type: "file_upload",
          status: "failed",
        },
        extra: {
          fileType,
          fileSize,
          ip,
        },
      });
    }
  }

  // Track authentication failures
  trackAuthFailure(reason: string, ip?: string) {
    Sentry.captureEvent({
      message: "Authentication Failure",
      level: "warning",
      tags: {
        type: "auth_failure",
      },
      extra: {
        reason,
        ip,
      },
    });
  }
}

export const securityMonitor = SecurityMonitor.getInstance();
