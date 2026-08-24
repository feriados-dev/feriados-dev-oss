// Test setup file
// Runs before all tests

// Set test environment variables
process.env.NODE_ENV = 'test';
process.env.PORT = '3001';
process.env.DB_HOST = 'localhost';
process.env.DB_NAME = 'feriados_test';
process.env.LOG_LEVEL = 'error';
process.env.SWAGGER_ENABLED = 'false';

// Increase timeout for integration tests
jest.setTimeout(30000);
