import { getRepository, Repository } from 'typeorm';
import IClientsRepository from '@modules/clients/repositories/IClientsRepository';
import ICreateClientDTO from '@modules/clients/dtos/ICreateClientDTO';
import Client from '../entities/Client';

class ClientsRepository implements IClientsRepository {
  private ormRepository: Repository<Client>;

  constructor() {
    this.ormRepository = getRepository(Client);
  }

  public async listClients(limit = 10, page = 1): Promise<Client[]> {
    const offset = (page - 1) * limit;
    const clients = await this.ormRepository
      .createQueryBuilder('clients')
      .select()
      .offset(offset)
      .limit(limit)
      .getMany();
    return clients;
  }

  public async getTotalRecords(): Promise<number> {
    const total = await this.ormRepository.count();
    return total;
  }

  public async findById(clientId: number): Promise<Client | undefined> {
    const client = await this.ormRepository.findOne({ where: { clientId } });
    return client;
  }

  public async findByEmail(email: string): Promise<Client | undefined> {
    const client = await this.ormRepository.findOne({ where: { email } });
    return client;
  }

  public async save(client: Client): Promise<Client> {
    return this.ormRepository.save(client);
  }

  public async create({
    name,
    email,
    birthDate,
  }: ICreateClientDTO): Promise<Client> {
    const newClient = this.ormRepository.create({
      name,
      email,
      birthDate,
    });
    const client = await this.save(newClient);
    return client;
  }

  public async delete(client: Client): Promise<void> {
    this.ormRepository.delete(client);
  }
}
export default ClientsRepository;
