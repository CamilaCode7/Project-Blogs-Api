const express = require('express');
require('dotenv').config();

const app = express();

app.use(express.json());
app.get('/', (request, response) => {
  response.send();
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`ouvindo porta ${PORT}!`));
