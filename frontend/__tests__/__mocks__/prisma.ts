import { PrismaClient } from "@prisma/client";
import { beforeEach } from "@jest/globals";
import { mockDeep, mockReset, DeepMockProxy } from "jest-mock-extended";

jest.mock("../../lib/prisma", () => ({
  __esModule: true,
  default: mockDeep<PrismaClient>(),
}));

beforeEach(() => {
  mockReset(prismaMock);
});

export const prismaMock =
  mockDeep<PrismaClient>() as unknown as DeepMockProxy<PrismaClient>;
