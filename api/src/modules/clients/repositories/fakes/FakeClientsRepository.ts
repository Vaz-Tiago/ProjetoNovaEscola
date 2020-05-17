import Client from '@modules/clients/infra/typeorm/entities/Client';
import ICreateClientDTO from '@modules/clients/dtos/ICreateClientDTO';
import IClientsRepository from '../IClientsRepository';

class FakeClientsRepository implements IClientsRepository {
  private clients: Client[] = [];

  public async findById(id: number): Promise<Client | undefined> {
    const findClient = this.clients.find((client) => client.id === id);
    return findClient;
  }

  public async findByEmail(email: string): Promise<Client | undefined> {
    const findClient = this.clients.find((client) => client.email === email);
    return findClient;
  }

  public async listClients(limit = 10, page = 1): Promise<Client[]> {
    const begin = (page - 1) * limit;
    const end = begin + limit;

    const findClient = this.clients.slice(begin, end);
    return findClient;
  }

  public async getTotalRecords(): Promise<number> {
    return this.clients.length;
  }

  public async save(client: Client): Promise<Client> {
    this.clients.push(client);
    return client;
  }

  public async create(data: ICreateClientDTO): Promise<Client> {
    const client = new Client();
    Object.assign(client, { id: Math.floor(Math.random() * 100 + 1) }, data);
    this.clients.push(client);
    return client;
  }

  public async delete(client: Client): Promise<void> {
    const clientIndex = this.clients.findIndex((item) => item.id === client.id);
    this.clients.splice(clientIndex, 1);
  }
}
export default FakeClientsRepository;
