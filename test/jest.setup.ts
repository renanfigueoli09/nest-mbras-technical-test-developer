jest.setTimeout(30000);

jest.mock('logify-ts', () => {
  return {
    default: jest.fn().mockImplementation(() => ({
      debug: jest.fn(),
      info: jest.fn(),
      warn: jest.fn(),
      error: jest.fn(),
      fatal: jest.fn(),
    })),
  };
});
