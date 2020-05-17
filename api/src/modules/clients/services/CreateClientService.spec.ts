import AppError from '@shared/errors/AppError';
import FakeClientsRepository from '../repositories/fakes/FakeClientsRepository';
import CreateClientService from './CreateClientService';

let fakeUserRepository: FakeClientsRepository;
let createClient: CreateClientService;

describe('CreateClientService', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeClientsRepository();
    createClient = new CreateClientService(fakeUserRepository);
  });

  it('should be able to create a new client', async () => {
    const client = await createClient.execute({
      name: 'Fulano',
      email: 'fulano@email.com',
      birthDate: new Date(1986, 4, 11),
    });

    expect(client).toHaveProperty('id');
  });

  it('should not be able to create a new client with an existent email', async () => {
    await createClient.execute({
      name: 'Fulano',
      email: 'fulano@email.com',
      birthDate: new Date(1986, 4, 11),
    });

    await expect(
      createClient.execute({
        name: 'Fulano',
        email: 'fulano@email.com',
        birthDate: new Date(1986, 4, 11),
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a new client with a future date', async () => {
    await expect(
      createClient.execute({
        name: 'Fulano',
        email: 'fulano@email.com',
        birthDate: new Date(2021, 4, 11),
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
