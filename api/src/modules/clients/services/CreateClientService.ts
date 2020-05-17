import { inject, injectable } from 'tsyringe';
import { isBefore, format } from 'date-fns';

import AppError from '@shared/errors/AppError';
import IClientsRepository from '../repositories/IClientsRepository';

import ICreateClientDTO from '../dtos/ICreateClientDTO';

import IClientResponseDTO from '../dtos/IClientResponseDTO';

@injectable()
class CreateClientService {
  constructor(
    @inject('ClientsRepository')
    private clientsRepository: IClientsRepository,
  ) {}

  public async execute({
    name,
    email,
    birthDate,
  }: ICreateClientDTO): Promise<IClientResponseDTO> {
    const checkEmail = await this.clientsRepository.findByEmail(email);
    if (checkEmail) {
      throw new AppError('Email is already in use');
    }

    if (!isBefore(birthDate, new Date())) {
      throw new AppError('Date cannot be in the future');
    }
    const client = await this.clientsRepository.create({
      name,
      email,
      birthDate,
    });

    const newClient: IClientResponseDTO = {
      id: client.id,
      nome: client.name,
      email: client.email,
      dataDeNascimento: format(client.birthDate, "dd'/'LL'/'yyyy").toString(),
    };

    return newClient;
  }
}
export default CreateClientService;
