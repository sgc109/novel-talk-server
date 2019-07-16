const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.json({result: 'hello world!'});
});

app.listen(port, () => {
  console.log(`Express is running on port ${port}`);
});