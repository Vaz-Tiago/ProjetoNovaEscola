import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateClientService from '@modules/clients/services/CreateClientService';
import convertToDate from '@shared/utils/DateConversion';
import DeleteClientService from '@modules/clients/services/DeleteClientService';
import ShowClientService from '@modules/clients/services/ShowClientService';
import UpdateClientService from '@modules/clients/services/UpdateClientService';
import ListClientsService from '@modules/clients/services/ListClientsService';

class ClientsController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { nome: name, email } = req.body;
    const birthDate = convertToDate(req.body.dataDeNascimento);

    const createClient = container.resolve(CreateClientService);

    const client = await createClient.execute({ name, email, birthDate });

    return res.status(201).json(client);
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const id = +req.params.id;
    const name = req.body.nome ? req.body.nome : undefined;
    const email = req.body.email ? req.body.email : undefined;
    const birthDate = req.body.dataDeNascimento
      ? convertToDate(req.body.dataDeNascimento)
      : undefined;

    const updateClient = container.resolve(UpdateClientService);

    const client = await updateClient.execute(id, { name, email, birthDate });

    return res.status(200).json(client);
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const id = +req.params.id;
    const deleteClient = container.resolve(DeleteClientService);
    await deleteClient.execute(id);

    return res.status(200).send();
  }

  public async show(req: Request, res: Response): Promise<Response> {
    const id = +req.params.id;
    const showRepository = container.resolve(ShowClientService);
    const client = await showRepository.execute(id);
    return res.status(200).json(client);
  }

  public async index(req: Request, res: Response): Promise<Response> {
    const limit = req.query.limite ? +req.query.limite : undefined;
    const page = req.query.pagina ? +req.query.pagina : undefined;

    const listClients = container.resolve(ListClientsService);
    const clients = await listClients.execute(limit, page);
    return res.status(200).json(clients);
  }
}

export default ClientsController;
