/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Test } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('Analyze API (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }),
    );
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('returns 200 with correct sentiment and normalized score', async () => {
    const res = await request(app.getHttpServer())
      .post('/analyze')
      .send({
        text: 'Super adorei!',
        userId: 'user_mbras_123',
      })
      .expect(201);

    expect(res.body.rawScore).toBe(3);
    expect(res.body.normalizedScore).toBe(1.5);
    expect(res.body.label).toBe('positive');
    expect(typeof res.body.followers).toBe('number');
  });

  it('returns 422 when no valid tokens exist', async () => {
    await request(app.getHttpServer())
      .post('/analyze')
      .send({
        text: '!!! ###',
        userId: 'abc',
      })
      .expect(422);
  });

  it('returns 400 when payload is invalid', async () => {
    await request(app.getHttpServer()).post('/analyze').send({}).expect(400);
  });

  it('is deterministic for the same userId', async () => {
    const r1 = await request(app.getHttpServer())
      .post('/analyze')
      .send({ text: 'Super adorei!', userId: 'user_mbras_123' });

    const r2 = await request(app.getHttpServer())
      .post('/analyze')
      .send({ text: 'Super adorei!', userId: 'user_mbras_123' });

    expect(r1.body.followers).toBe(r2.body.followers);
  });
});
