import { inject, injectable } from 'tsyringe';
import { isBefore, format } from 'date-fns';

import AppError from '@shared/errors/AppError';
import IClientsRepository from '../repositories/IClientsRepository';
import IClientResponseDTO from '../dtos/IClientResponseDTO';
import IUpdateClientDTO from '../dtos/IUpdateClientDTO';

@injectable()
class UpdateClientService {
  constructor(
    @inject('ClientsRepository')
    private clientsRepository: IClientsRepository,
  ) {}

  public async execute(
    id: number,
    { name, email, birthDate }: IUpdateClientDTO,
  ): Promise<IClientResponseDTO> {
    const client = await this.clientsRepository.findById(id);
    if (!client) {
      throw new AppError('Client not found');
    }

    if (name) {
      client.name = name;
    }

    if (email && email !== client.email) {
      const checkEmail = await this.clientsRepository.findByEmail(email);
      if (checkEmail) {
        throw new AppError('Email is already in use');
      } else {
        client.email = email;
      }
    }

    if (birthDate) {
      if (!isBefore(birthDate, new Date())) {
        throw new AppError('Date cannot be in the future');
      }
      client.birthDate = birthDate;
    }

    await this.clientsRepository.save(client);

    const updatedClient: IClientResponseDTO = {
      id: client.id,
      nome: client.name,
      email: client.email,
      dataDeNascimento: format(client.birthDate, "dd'/'LL'/'yyyy").toString(),
    };

    return updatedClient;
  }
}
export default UpdateClientService;
