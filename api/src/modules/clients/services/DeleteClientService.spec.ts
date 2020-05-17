import AppError from '@shared/errors/AppError';
import FakeClientsRepository from '../repositories/fakes/FakeClientsRepository';
import CreateClientService from './CreateClientService';
import DeleteClientService from './DeleteClientService';

let fakeUserRepository: FakeClientsRepository;
let createClientService: CreateClientService;
let deleteClientService: DeleteClientService;

describe('DeleteClientService', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeClientsRepository();
    createClientService = new CreateClientService(fakeUserRepository);
    deleteClientService = new DeleteClientService(fakeUserRepository);
  });

  it('should be able to delete a client', async () => {
    const delClient = jest.spyOn(fakeUserRepository, 'delete');

    const client = await createClientService.execute({
      name: 'Fulano',
      email: 'fulano@email.com',
      birthDate: new Date(1986, 4, 11),
    });

    await deleteClientService.execute(client.id);

    expect(delClient).toHaveBeenCalled();
  });

  it('should not be able to delete a client with a wrong id', async () => {
    const wrongId = 879481535789;

    await expect(deleteClientService.execute(wrongId)).rejects.toBeInstanceOf(
      AppError,
    );
  });
});
