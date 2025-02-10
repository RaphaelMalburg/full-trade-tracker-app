export const mockSupabaseClient = {
  auth: {
    signOut: jest.fn().mockResolvedValue({ error: null }),
    signInWithPassword: jest.fn().mockResolvedValue({ data: {}, error: null }),
    getSession: jest.fn().mockResolvedValue({ data: {}, error: null }),
  },
};

export const createClient = jest.fn(() => mockSupabaseClient);

// Mock the default export
const mock = { createClient };
export default mock;
