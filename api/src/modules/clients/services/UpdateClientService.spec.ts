import AppError from '@shared/errors/AppError';
import FakeClientsRepository from '../repositories/fakes/FakeClientsRepository';
import CreateClientService from './CreateClientService';
import UpdateClientService from './UpdateClientService';

let fakeUserRepository: FakeClientsRepository;
let createClient: CreateClientService;
let updateClient: UpdateClientService;

describe('UpdateClientService', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeClientsRepository();
    createClient = new CreateClientService(fakeUserRepository);
    updateClient = new UpdateClientService(fakeUserRepository);
  });

  it('should be able to update a client', async () => {
    const newClient = await createClient.execute({
      name: 'Fulano',
      email: 'fulano@email.com',
      birthDate: new Date(1986, 4, 11),
    });

    const client = await updateClient.execute(newClient.id, {
      name: 'Fulaninho',
      email: 'fulaninho@email.com',
      birthDate: new Date(2000, 4, 11),
    });

    expect(client.nome).toBe('Fulaninho');
    expect(client.email).toBe('fulaninho@email.com');
    expect(client.dataDeNascimento).toBe('11/05/2000');
  });

  it('should be able to update a client without some information', async () => {
    const newClient = await createClient.execute({
      name: 'Fulano',
      email: 'fulano@email.com',
      birthDate: new Date(1986, 4, 11),
    });

    const client = await updateClient.execute(newClient.id, {
      name: 'Fulaninho',
    });

    expect(client.nome).toBe('Fulaninho');
  });

  it('should not be able to update a client if id provided is wrong', async () => {
    await expect(
      updateClient.execute(15468, {
        name: 'fulaninho',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update a client if email provided is already exists', async () => {
    const newClient = await createClient.execute({
      name: 'Fulano',
      email: 'fulano@email.com',
      birthDate: new Date(1986, 4, 11),
    });

    await createClient.execute({
      name: 'Ciclano',
      email: 'ciclano@email.com',
      birthDate: new Date(2000, 8, 20),
    });

    await expect(
      updateClient.execute(newClient.id, {
        email: 'ciclano@email.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update a client with a invalid date', async () => {
    const newClient = await createClient.execute({
      name: 'Fulano',
      email: 'fulano@email.com',
      birthDate: new Date(1986, 4, 11),
    });

    await expect(
      updateClient.execute(newClient.id, {
        birthDate: new Date(2021, 4, 11),
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
