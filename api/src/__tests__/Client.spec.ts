import request from 'supertest';
import { Connection, getConnection } from 'typeorm';

import createConnection from '@shared/infra/typeorm';
import app from '@shared/infra/http/app';

let connection: Connection;

describe('ClientsCrudFullCicle', () => {
  beforeAll(async () => {
    connection = await createConnection('novaescola_testes');
    await connection.runMigrations();
  });

  beforeEach(async () => {
    await connection.query('DELETE FROM clients');
  });

  afterAll(async () => {
    const mainConnection = getConnection();
    await connection.close();
    await mainConnection.close();
  });

  it('should be able to create a new client', async () => {
    const response = await request(app)
      .post('/clientes')
      .send({
        nome: 'Fulano',
        email: 'fulano@email.com',
        dataDeNascimento: '11/05/1986',
      })
      .type('form')
      .expect(201);

    expect(response.body).toMatchObject(
      expect.objectContaining({
        id: expect.any(Number),
      }),
    );
  });

  it('should be able to update a client', async () => {
    const createReponse = await request(app)
      .post('/clientes')
      .send({
        nome: 'Fulano',
        email: 'fulano@email.com',
        dataDeNascimento: '11/05/1986',
      })
      .type('form');

    await request(app)
      .put(`/clientes/${createReponse.body.id}`)
      .send({
        nome: 'Fulaninho',
        email: 'fulaninho@email.com',
        dataDeNascimento: '23/08/2000',
      })
      .type('form')
      .expect(200)
      .expect({
        id: createReponse.body.id,
        nome: 'Fulaninho',
        email: 'fulaninho@email.com',
        dataDeNascimento: '23/08/2000',
      });
  });

  it('should be able to show a client', async () => {
    const createResponse = await request(app)
      .post('/clientes')
      .send({
        nome: 'Fulano',
        email: 'fulano@exemple.com',
        dataDeNascimento: '11/05/1986',
      })
      .type('form');

    const showResponse = await request(app)
      .get(`/clientes/${createResponse.body.id}`)
      .expect(200);

    expect(showResponse.body).toMatchObject(
      expect.objectContaining({
        id: expect.any(Number),
        nome: expect.stringContaining('Fulano'),
        email: expect.stringContaining('fulano@exemple.com'),
        dataDeNascimento: expect.stringContaining('11/05/1986'),
      }),
    );
  });

  it('should be able to delete a client', async () => {
    const response = await request(app)
      .post('/clientes')
      .send({
        nome: 'Fulano',
        email: 'fulano@exemple.com',
        dataDeNascimento: '11/05/1986',
      })
      .type('form');

    await request(app).delete(`/clientes/${response.body.id}`).expect(200);
  });

  it('should be able to list the clients', async () => {
    await request(app)
      .post('/clientes')
      .send({
        nome: 'Fulano',
        email: 'fulano01@email.com',
        dataDeNascimento: '11/05/1986',
      })
      .type('form');

    await request(app)
      .post('/clientes')
      .send({
        nome: 'Fulano',
        email: 'fulano02@email.com',
        dataDeNascimento: '11/05/1986',
      })
      .type('form');

    await request(app)
      .post('/clientes')
      .send({
        nome: 'Fulano',
        email: 'fulano03@email.com',
        dataDeNascimento: '11/05/1986',
      })
      .type('form');

    await request(app)
      .post('/clientes')
      .send({
        nome: 'Fulano',
        email: 'fulano04@email.com',
        dataDeNascimento: '11/05/1986',
      })
      .type('form');

    await request(app)
      .post('/clientes')
      .send({
        nome: 'Fulano',
        email: 'fulano05@email.com',
        dataDeNascimento: '11/05/1986',
      })
      .type('form');

    const response = await request(app)
      .get('/clientes?limite=2&pagina=2')
      .expect(200);

    expect(response.body.total).toBe(5);
    expect(response.body.lista.length).toEqual(2);
  });
});
