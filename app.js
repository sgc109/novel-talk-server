import express from 'express';
import swaggerUi from 'swagger-ui-express';
import mongoose from 'mongoose';
import MongoError from 'mongodb';
import 'express-async-errors';
import YAML from 'yamljs';
import router from './src/app/router';
import Console from './src/console';
// import requiresAuth from './src/oauth/google';
import { mongoHost, mongoPort, mongoDBName } from './src/config/db';

const swaggerDocument = YAML.load('./swagger.yml');

const app = express();
const port = 3000;

app.use(express.urlencoded());
app.use(express.json());
// app.use(requiresAuth);

router(app);

Console.log(process.env.MY_VAR);

mongoose.set('useCreateIndex', true);
mongoose.connect(`mongodb://${mongoHost}:${mongoPort}/${mongoDBName}`, { useNewUrlParser: true });
const db = mongoose.connection;
// db.on('error', Console.error);
db.once('open', () => {
  Console.log('connected to mongodb server');
});

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// eslint-disable-next-line no-unused-vars
app.use((error, req, res, next) => {
  if (error instanceof MongoError) {
    return res.status(503).json({
      type: 'MongoError',
      message: error.message,
    });
  }
  return res.status(500).send(error);
});

app.listen(port, () => {
  Console.log(`Express is running on port ${port}`);
});
