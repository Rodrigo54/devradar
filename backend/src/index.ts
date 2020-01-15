import * as express from 'express';
import { connect } from 'mongoose';
import routes from './routes';

connect('mongodb://localhost:27017/week10', {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

const app = express();

app.use(express.json());
app.use(routes);

app.listen(3333);
