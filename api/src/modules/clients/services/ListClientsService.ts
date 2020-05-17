import { inject, injectable } from 'tsyringe';
import { format } from 'date-fns';

import AppError from '@shared/errors/AppError';
import IClientsRepository from '../repositories/IClientsRepository';
import IClientResponseDTO from '../dtos/IClientResponseDTO';
import IClientListResponseDTO from '../dtos/IListResponseDTO';

@injectable()
class ListClientsService {
  constructor(
    @inject('ClientsRepository')
    private clientsRepository: IClientsRepository,
  ) {}

  public async execute(
    limit?: number,
    page?: number,
  ): Promise<IClientListResponseDTO> {
    const defineLimit = limit === undefined ? 10 : limit;
    const definePage = page === undefined ? 1 : page;

    if (defineLimit < 1 || definePage < 1) {
      throw new AppError('Set a valid limit/page');
    }
    const total = await this.clientsRepository.getTotalRecords();

    const listClients = await this.clientsRepository.listClients(
      defineLimit,
      definePage,
    );

    const clients: IClientResponseDTO[] = listClients.map((item) => ({
      id: item.id,
      nome: item.name,
      email: item.email,
      dataDeNascimento: format(item.birthDate, "dd'/'LL'/'yyyy").toString(),
    }));

    const listAll: IClientListResponseDTO = {
      total,
      lista: clients,
    };

    return listAll;
  }
}
export default ListClientsService;
