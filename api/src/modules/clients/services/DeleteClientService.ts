import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IClientsRepository from '../repositories/IClientsRepository';

@injectable()
class DeleteClientService {
  constructor(
    @inject('ClientsRepository')
    private clientsRepository: IClientsRepository,
  ) {}

  public async execute(id: number): Promise<void> {
    const delClient = await this.clientsRepository.findById(id);
    if (!delClient) {
      throw new AppError('Client not found');
    }

    await this.clientsRepository.delete(delClient);
  }
}
export default DeleteClientService;
