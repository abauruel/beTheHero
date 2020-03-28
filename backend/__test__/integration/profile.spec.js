const request = require('supertest');
const connection = require('../../src/database/connection');

const app = require('../../src/app');

describe('Profile', () => {
  beforeAll(async () => {
    await connection.migrate.rollback();
    await connection.migrate.latest();
  });

  afterAll(async () => {
    await connection.destroy();
  });

  it('should be able to return all incidents from ONG', async () => {
    const ong = await request(app)
      .post('/ongs')
      .send({
        name: 'teste',
        email: 'teste@weekomnistack11.com',
        whatsapp: '123456789',
        city: 'teste',
        uf: 'RJ',
      });

    const incidents = await request(app)
      .post('/incidents')
      .set({
        authorization: ong.body.id,
      })
      .send({
        name: 'teste',
        email: 'teste@weekomnistack11.com',
        whatsapp: '123456789',
        city: 'teste',
        uf: 'RJ',
      });

    const response = await request(app)
      .get('/profile')
      .set({
        authorization: ong.body.id,
      })
      .send();

    expect(response.body.id).toBe(incidents.body.id);
  });
});
