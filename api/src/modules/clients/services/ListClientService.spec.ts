import AppError from '@shared/errors/AppError';
import FakeClientsRepository from '../repositories/fakes/FakeClientsRepository';
import ListClientsService from './ListClientsService';

let fakeUserRepository: FakeClientsRepository;
let listClientsService: ListClientsService;

describe('ListClientsService', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeClientsRepository();
    listClientsService = new ListClientsService(fakeUserRepository);
  });

  it('should be able to list the clients', async () => {
    const quantity = 30;
    for (let index = 0; index < quantity; index += 1) {
      fakeUserRepository.create({
        name: 'Fulano',
        email: 'fulano@exemplo.com',
        birthDate: new Date(1986, 4, 11),
      });
    }

    const listClients = await listClientsService.execute(3, 1);

    expect(listClients.total).toBe(30);
    expect(listClients.lista.length).toEqual(3);
  });

  it('should no be able to list the clients with invalid number of limit/page', async () => {
    await expect(listClientsService.execute(0, -1)).rejects.toBeInstanceOf(
      AppError,
    );
  });

  it('should be able to list the clients without set the params', async () => {
    const quantity = 30;
    for (let index = 0; index < quantity; index += 1) {
      fakeUserRepository.create({
        name: 'Fulano',
        email: 'fulano@exemplo.com',
        birthDate: new Date(1986, 4, 11),
      });
    }

    const listClients = await listClientsService.execute();

    expect(listClients.total).toBe(30);
    expect(listClients.lista.length).toEqual(10);
  });
});
