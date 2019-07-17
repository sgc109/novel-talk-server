const swaggerUi = require('swagger-ui-express');
const express = require('express');
const swaggerDocument = require('./swagger.json');
const Console = require('./console.js');

const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.json({ result: 'hello world!' });
});

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
// app.use('/api/v1', router);

app.listen(port, () => {
  Console.log(`Express is running on port ${port}`);
});
