import { Router } from 'express';

import clientsRouter from '@modules/clients/infra/http/routes/clients.routes';

const routes = Router();

routes.use('/clientes', clientsRouter);

export default routes;
