import express from 'express';
import swaggerUi from 'swagger-ui-express';
import mongoose from 'mongoose';
import router from './src/app/router';
import swaggerDocument from './swagger.json';
import Console from './src/console';

const app = express();
const port = 3000;

app.use(express.urlencoded());
app.use(express.json());
router(app);

mongoose.set('useCreateIndex', true);
mongoose.connect('mongodb://localhost/test', { useNewUrlParser: true });
const db = mongoose.connection;
// db.on('error', Console.error);
db.once('open', () => {
  Console.log('connected to mongodb server');
});

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(port, () => {
  Console.log(`Express is running on port ${port}`);
});
