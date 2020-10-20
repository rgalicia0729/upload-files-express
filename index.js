const express = require('express');
const { NODE_PORT } = require('./config/env');

const app = express();

// Agregando la ruta para subir los archivos
app.use(require('./src/routes/upload-routes'));
app.use(require('./src/routes/file-routes'));

app.listen(NODE_PORT, (err) => {
  if (err) {
    throw err;
  }

  console.log(`Server runing in port: ${NODE_PORT}`);
});
