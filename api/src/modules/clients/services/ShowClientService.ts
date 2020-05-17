import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import { format } from 'date-fns';
import IClientsRepository from '../repositories/IClientsRepository';
import IClientResponseDTO from '../dtos/IClientResponseDTO';

@injectable()
class ShowClientService {
  constructor(
    @inject('ClientsRepository')
    private clientsRepository: IClientsRepository,
  ) {}

  public async execute(id: number): Promise<IClientResponseDTO> {
    const findClient = await this.clientsRepository.findById(id);

    if (!findClient) {
      throw new AppError('Client not found');
    }

    const client: IClientResponseDTO = {
      id: findClient.id,
      nome: findClient.name,
      email: findClient.email,
      dataDeNascimento: format(
        findClient.birthDate,
        "dd'/'LL'/'yyyy",
      ).toString(),
    };

    return client;
  }
}
export default ShowClientService;
