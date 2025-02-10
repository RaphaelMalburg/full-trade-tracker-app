# AI Credits System

The AI Credits system is a core feature that manages access to AI-powered features in the application. This document explains how the system works and how to implement it in your components.

## Credit Costs

Each AI feature requires a specific number of credits:

- Chart Analysis: 5 credits
- Pattern Recognition: 3 credits
- Trading Insights: 2 credits
- Risk Analysis: 4 credits

## Monthly Credits by Tier

Users receive monthly credits based on their subscription tier:

- Free Tier: 0 credits
- Pro Tier: 25 credits/month
- Enterprise Tier: 200 credits/month

## Credit Packages

Users can purchase additional credits:

- Small Pack: 100 credits for $8
- Medium Pack: 500 credits for $35
- Large Pack: 1000 credits for $60

## Implementation Guide

### 1. Protecting AI Features

Use the `withCreditCheck` HOC to protect AI features:

```typescript
import { withCreditCheck } from "@/components/features/credits/with-credit-check";
import { AIFeature } from "@prisma/client";

function MyAIComponent({ userId }: { userId: string }) {
  // Component implementation
}

export default withCreditCheck(MyAIComponent, AIFeature.CHART_ANALYSIS);
```

### 2. Using Credits in API Routes

Use the credit middleware for API routes:

```typescript
import { creditCheckMiddleware } from "@/middleware/credit-check";

export async function POST(request: Request) {
  const result = await creditCheckMiddleware(request);
  if (result.status !== 200) return result;

  // Your API logic here
}
```

### 3. Manual Credit Management

```typescript
import { useCredits } from '@/lib/hooks/use-credits'

export function MyComponent({ userId }: { userId: string }) {
  const { credits, canUseFeature } = useCredits(userId)

  // Check if feature can be used
  if (!canUseFeature(AIFeature.CHART_ANALYSIS)) {
    return <p>Insufficient credits</p>
  }
}
```

### 4. Credit Transaction Types

- `PURCHASE`: Credits bought by user
- `USAGE`: Credits spent on features
- `REFUND`: Refunded credits
- `MONTHLY_GRANT`: Monthly tier credits
- `BONUS`: Bonus credits (promotions, etc.)

## Best Practices

1. Always use the `withCreditCheck` HOC for AI features
2. Implement proper error handling for insufficient credits
3. Use transactions when updating credit balances
4. Show clear feedback when credits are low
5. Provide easy access to credit purchase options

## Error Handling

The system includes built-in error handling:

- `InsufficientCreditsError`: Thrown when trying to use features without enough credits
- HTTP 402: Returned by API when credits are insufficient
- Low credit warnings: Shown when balance is below threshold

## Monitoring

The system tracks:

- Credit balance changes
- Feature usage
- Purchase history
- Monthly credit grants

## Database Schema

The system uses two main tables:

1. `CreditTransaction`: Records all credit changes
2. `CreditPurchase`: Tracks credit package purchases

See `prisma/schema.prisma` for detailed schema information.
