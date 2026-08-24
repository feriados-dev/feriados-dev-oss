import request from 'supertest';
import { createApp } from '../../src/app';
import { Application } from 'express';

describe('Health Endpoints', () => {
  let app: Application;

  beforeAll(() => {
    app = createApp();
  });

  describe('GET /health', () => {
    it('should return health status', async () => {
      const response = await request(app)
        .get('/health')
        .expect('Content-Type', /json/);

      expect(response.body).toHaveProperty('status');
      expect(response.body).toHaveProperty('timestamp');
      expect(response.body).toHaveProperty('uptime');
      expect(response.body).toHaveProperty('services');
    });
  });

  describe('GET /health/liveness', () => {
    it('should return alive status', async () => {
      const response = await request(app)
        .get('/health/liveness')
        .expect(200)
        .expect('Content-Type', /json/);

      expect(response.body).toHaveProperty('alive', true);
      expect(response.body).toHaveProperty('timestamp');
    });
  });

  describe('GET /health/readiness', () => {
    it('should return readiness status', async () => {
      const response = await request(app)
        .get('/health/readiness')
        .expect('Content-Type', /json/);

      expect(response.body).toHaveProperty('ready');
      expect(response.body).toHaveProperty('services');
    });
  });
});
