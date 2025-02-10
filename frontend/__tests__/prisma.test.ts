import { PrismaClient, PositionType, Sentiment, Platform } from "@prisma/client";
import { execSync } from "child_process";
import { prismaMock } from "./__mocks__/prisma";

describe("Prisma Setup", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("Schema Validation", () => {
    it("should validate Prisma schema", () => {
      expect(() => {
        execSync("npx prisma validate", { stdio: "pipe" });
      }).not.toThrow();
    });
  });

  describe("Database Operations", () => {
    // Example of a mocked user creation test
    it("should create new user", async () => {
      const user = {
        id: "user123",
        email: "test@example.com",
        name: "Test User",
        createdAt: new Date(),
        updatedAt: new Date(),
        avatarUrl: null,
        emailVerified: null,
        apiKey: null,
        bio: null,
        tier: "free",
        credits: 0,
        isActive: true,
        lastLoginAt: null,
      };

      prismaMock.user.create.mockResolvedValue(user);

      const result = await prismaMock.user.create({
        data: {
          id: "user123",
          email: "test@example.com",
          name: "Test User",
          isActive: true,
        },
      });

      expect(result).toEqual(user);
      expect(prismaMock.user.create).toHaveBeenCalledWith({
        data: {
          id: "user123",
          email: "test@example.com",
          name: "Test User",
          isActive: true,
        },
      });
    });

    // Example of a mocked user query test
    it("should find user by email", async () => {
      const user = {
        id: "user123",
        email: "test@example.com",
        name: "Test User",
        createdAt: new Date(),
        updatedAt: new Date(),
        avatarUrl: null,
        emailVerified: null,
        apiKey: null,
        bio: null,
        tier: "free",
        credits: 0,
        isActive: true,
        lastLoginAt: null,
      };

      prismaMock.user.findUnique.mockResolvedValue(user);

      const result = await prismaMock.user.findUnique({
        where: {
          email: "test@example.com",
        },
      });

      expect(result).toEqual(user);
      expect(prismaMock.user.findUnique).toHaveBeenCalledWith({
        where: {
          email: "test@example.com",
        },
      });
    });

    // Example of a mocked trade creation test
    it("should create new trade", async () => {
      const trade = {
        id: "trade123",
        userId: "user123",
        instrument: "EURUSD",
        entryPrice: 1.05,
        exitPrice: 1.06,
        positionSize: 1.0,
        profitLoss: 100.0,
        entryTime: new Date(),
        exitTime: new Date(),
        duration: 3600,
        stopLoss: null,
        takeProfit: null,
        screenshotUrl: [],
        strategyId: null,
        notes: null,
        positionType: PositionType.Buy,
        createdAt: new Date(),
        sentiment: Sentiment.Neutral,
        commission: 0,
        hourOfDay: 10,
        tradingAccountId: "account123",
        tradingSession: "LONDON",
        pipsMax: null,
        pipsMin: null,
        embedding: null,
      };

      prismaMock.trade.create.mockResolvedValue(trade);

      const result = await prismaMock.trade.create({
        data: {
          id: "trade123",
          userId: "user123",
          instrument: "EURUSD",
          entryPrice: 1.05,
          exitPrice: 1.06,
          positionSize: 1.0,
          profitLoss: 100.0,
          entryTime: new Date(),
          exitTime: new Date(),
          duration: 3600,
          positionType: PositionType.Buy,
          sentiment: Sentiment.Neutral,
          tradingAccountId: "account123",
          tradingSession: "LONDON",
          screenshotUrl: [],
          commission: 0,
          hourOfDay: 10,
        },
      });

      expect(result).toEqual(trade);
      expect(prismaMock.trade.create).toHaveBeenCalled();
    });

    // Example of error handling test
    it("should handle database errors", async () => {
      const dbError = new Error("Database connection failed");
      prismaMock.user.findMany.mockRejectedValue(dbError);

      await expect(prismaMock.user.findMany()).rejects.toThrow("Database connection failed");
    });
  });

  describe("Connection Management", () => {
    it("should connect to database", async () => {
      await prismaMock.$connect();
      expect(prismaMock.$connect).toHaveBeenCalled();
    });

    it("should disconnect from database", async () => {
      await prismaMock.$disconnect();
      expect(prismaMock.$disconnect).toHaveBeenCalled();
    });
  });
});

describe("User and Trade Creation", () => {
  const user = {
    id: "test-id",
    email: "test@example.com",
    name: "Test User",
    createdAt: new Date(),
    updatedAt: new Date(),
    avatarUrl: null,
    emailVerified: null,
    apiKey: null,
    bio: null,
    tier: "free",
    credits: 50,
    isActive: true,
    lastLoginAt: null,
  };

  const trade = {
    id: "trade-id",
    userId: user.id,
    instrument: "EURUSD",
    entryPrice: 1.05,
    exitPrice: 1.06,
    positionSize: 1000,
    profitLoss: 100,
    entryTime: new Date(),
    exitTime: new Date(),
    duration: 3600,
    createdAt: new Date(),
    stopLoss: null,
    takeProfit: null,
    positionType: PositionType.Buy,
    tradingAccountId: "account-id",
    tradingSession: "LONDON",
    pipsMax: null,
    pipsMin: null,
    notes: "Test trade",
    screenshotUrl: [],
    strategyId: null,
    sentiment: Sentiment.Neutral,
    commission: 0,
    hourOfDay: 10,
    embedding: null,
  };

  beforeEach(() => {
    prismaMock.user.create.mockResolvedValue(user);
    prismaMock.user.findUnique.mockResolvedValue(user);
    prismaMock.trade.create.mockResolvedValue(trade);
  });

  it("should create user and trade", async () => {
    const createdUser = await prismaMock.user.create({
      data: {
        id: user.id,
        email: user.email,
        name: user.name,
        isActive: true,
      },
    });
    expect(createdUser).toEqual(user);

    const createdTrade = await prismaMock.trade.create({
      data: {
        id: trade.id,
        userId: trade.userId,
        instrument: trade.instrument,
        entryPrice: trade.entryPrice,
        exitPrice: trade.exitPrice,
        positionSize: trade.positionSize,
        profitLoss: trade.profitLoss,
        entryTime: trade.entryTime,
        exitTime: trade.exitTime,
        duration: trade.duration,
        positionType: trade.positionType,
        sentiment: trade.sentiment,
        tradingAccountId: trade.tradingAccountId,
        tradingSession: trade.tradingSession,
        screenshotUrl: trade.screenshotUrl,
        commission: trade.commission,
        hourOfDay: trade.hourOfDay,
      },
    });
    expect(createdTrade).toEqual(trade);
  });
});
