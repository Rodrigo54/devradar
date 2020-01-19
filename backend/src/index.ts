import * as express from 'express';
import { connect } from 'mongoose';
import routes from './routes';
import * as cors from 'cors';
import { Server } from 'http';
import { setupWebsocket } from './websocket';

connect('mongodb://localhost:27017/week10', {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

const app = express();
const server = new Server(app);

setupWebsocket(server);

app.use(cors())
app.use(express.json());
app.use(routes);

server.listen(3333);
