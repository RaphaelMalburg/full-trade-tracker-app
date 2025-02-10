import { securityMonitor } from "./security-monitor";

interface RateLimitRule {
  windowMs: number; // Time window in milliseconds
  maxRequests: number; // Max requests allowed in the window
}

interface RateLimitEntry {
  timestamps: number[];
}

class MemoryRateLimit {
  private store: Map<string, RateLimitEntry>;
  private rule: RateLimitRule;
  private cleanupInterval: NodeJS.Timeout;
  private type: "auth" | "contact" | "trade";

  constructor(rule: RateLimitRule, type: "auth" | "contact" | "trade") {
    this.store = new Map();
    this.rule = rule;
    this.type = type;

    // Cleanup old entries every minute
    this.cleanupInterval = setInterval(() => this.cleanup(), 60000);
  }

  async limit(identifier: string): Promise<{
    success: boolean;
    limit: number;
    remaining: number;
    reset: number;
  }> {
    const now = Date.now();
    const windowStart = now - this.rule.windowMs;

    // Get or create entry
    let entry = this.store.get(identifier);
    if (!entry) {
      entry = { timestamps: [] };
      this.store.set(identifier, entry);
    }

    // Remove timestamps outside the current window
    entry.timestamps = entry.timestamps.filter(
      (timestamp: number) => timestamp > windowStart,
    );

    // Check if limit is exceeded
    if (entry.timestamps.length >= this.rule.maxRequests) {
      const oldestTimestamp = entry.timestamps[0];
      const resetTime = oldestTimestamp + this.rule.windowMs;

      // Track blocked request
      securityMonitor.trackRateLimit(this.type, identifier, true);

      return {
        success: false,
        limit: this.rule.maxRequests,
        remaining: 0,
        reset: resetTime,
      };
    }

    // Add new timestamp
    entry.timestamps.push(now);

    // Track successful request
    securityMonitor.trackRateLimit(this.type, identifier, false);

    return {
      success: true,
      limit: this.rule.maxRequests,
      remaining: this.rule.maxRequests - entry.timestamps.length,
      reset: now + this.rule.windowMs,
    };
  }

  private cleanup() {
    const now = Date.now();
    const windowStart = now - this.rule.windowMs;

    // Convert iterator to array for compatibility
    Array.from(this.store.entries()).forEach(([identifier, entry]) => {
      // Remove old timestamps
      entry.timestamps = entry.timestamps.filter(
        (timestamp: number) => timestamp > windowStart,
      );

      // Remove entry if no timestamps remain
      if (entry.timestamps.length === 0) {
        this.store.delete(identifier);
      }
    });
  }

  destroy() {
    clearInterval(this.cleanupInterval);
  }

  getCurrentStoreSize(): number {
    return this.store.size;
  }
}

// Create rate limiters
export const authLimiter = new MemoryRateLimit(
  {
    windowMs: 5 * 60 * 1000, // 5 minutes
    maxRequests: 5, // 5 attempts
  },
  "auth",
);

export const contactFormLimiter = new MemoryRateLimit(
  {
    windowMs: 10 * 60 * 1000, // 10 minutes
    maxRequests: 3, // 3 attempts
  },
  "contact",
);

export const tradeLimiter = new MemoryRateLimit(
  {
    windowMs: 60 * 1000, // 1 minute
    maxRequests: 30, // 30 trades
  },
  "trade",
);

export async function checkRateLimit(
  limiter: MemoryRateLimit,
  identifier: string,
): Promise<{
  success: boolean;
  limit: number;
  remaining: number;
  reset: number;
}> {
  try {
    return await limiter.limit(identifier);
  } catch (error) {
    console.error("Rate limit check failed:", error);
    // Default to allowing the request if rate limiting fails
    return {
      success: true,
      limit: 0,
      remaining: 0,
      reset: 0,
    };
  }
}
