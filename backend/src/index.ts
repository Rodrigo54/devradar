import * as express from 'express';
import { connect } from 'mongoose';
import routes from './routes';
import * as cors from 'cors';

connect('mongodb://localhost:27017/week10', {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

const app = express();

app.use(cors())
app.use(express.json());
app.use(routes);

app.listen(3333);
