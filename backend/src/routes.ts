import { Router } from 'express';
import * as DevController from './controllers/DevController';
import * as SearchController from './controllers/SearchController';

const routes = Router();

routes.post('/devs', DevController.store);
routes.get('/devs', DevController.index);

routes.get('/search', SearchController.index);

export default routes;