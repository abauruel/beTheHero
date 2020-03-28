/* eslint-disable no-undef */
const request = require('supertest');
const connection = require('../../src/database/connection');
const app = require('../../src/app');

describe('Incident', () => {
  beforeAll(async () => {
    await connection.migrate.rollback();
    await connection.migrate.latest();
  });

  afterAll(async () => {
    await connection.destroy();
  });

  it('should be able to create new incident', async () => {
    const ong = await request(app)
      .post('/ongs')
      .send({
        name: 'teste',
        email: 'teste@weekomnistack11.com',
        whatsapp: '123456789',
        city: 'teste',
        uf: 'RJ',
      });
    const response = await request(app)
      .post('/incident')
      .set({
        authorization: ong.body.id,
      })
      .send({
        title: 'Caso 1',
        description: 'description1',
        value: 1,
      });
    // eslint-disable-next-line no-undef
    expect(response.body).toHaveProperty('id');
  });

  it('should be able to return all incidents', async () => {
    const response = await request(app)
      .get('/incident')
      .send();
    expect(response.status).toBe(200);
  });

  it('should be able to delete incident', async () => {
    const incident = await request(app)
      .get('/incident')
      .send();
    console.log(incident.body[0].id);
    const response = await request(app)
      .delete(`/incident/${incident.body[0].id}`)
      .set({
        authorization: incident.body[0].ong_id,
      });
    expect(response.status).toBe(204);
  });
});
