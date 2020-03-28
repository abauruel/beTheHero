const request = require('supertest');
const app = require('../../src/app');
const connection = require('../../src/database/connection');

describe('Ong', () => {
  beforeEach(async () => {
    await connection.migrate.rollback();
    await connection.migrate.latest();
  });

  afterAll(async () => {
    await connection.destroy();
  });
  it('should be able to create new ong', async () => {
    const response = await request(app)
      .post('/ongs')
      .send({
        name: 'teste',
        email: 'teste@weekomnistack11.com',
        whatsapp: '123456789',
        city: 'teste',
        uf: 'RJ',
      });
    expect(response.body).toHaveProperty('id');
    expect(response.body.id).toHaveLength(8);
  });

  it('should be able list all ongs', async () => {
    const response = await request(app).get('/ongs');
    expect(response.status).toBe(200);
  });
});
