import AppError from '@shared/errors/AppError';
import FakeClientsRepository from '../repositories/fakes/FakeClientsRepository';
import ShowClientService from './ShowClientService';
import CreateClientService from './CreateClientService';

let fakeUserRepository: FakeClientsRepository;
let createClientService: CreateClientService;
let showClientService: ShowClientService;

describe('ShowClientService', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeClientsRepository();
    createClientService = new CreateClientService(fakeUserRepository);
    showClientService = new ShowClientService(fakeUserRepository);
  });

  it('should be able to show a client', async () => {
    const newClient = await createClientService.execute({
      name: 'Fulano',
      email: 'fulano@exemplo.com',
      birthDate: new Date(1986, 4, 11),
    });

    const findClient = await showClientService.execute(newClient.id);

    expect(findClient.nome).toBe('Fulano');
    expect(findClient.dataDeNascimento).toBe('11/05/1986');
  });

  it('should not be able to show a client with wrong id', async () => {
    await expect(showClientService.execute(1564868)).rejects.toBeInstanceOf(
      AppError,
    );
  });
});
