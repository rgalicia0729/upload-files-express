const express = require('express');
const crypto = require('crypto');
const fileUpload = require('express-fileupload');
const { PATH_FILE } = require('../../config/env');

const app = express();

// Default options
app.use( fileUpload({ useTempFiles: true }));

app.put('/api/upload', async (req, res) => {
  try {
    // Verifica que exista el archivo en el request
    if (!req.files) {
      return res.status(400).json({
        ok: false,
        err: {
          message: 'No se encontro ningun archivo para subir'
        }
      });
    }

    const { archivo } = req.files;

    // Generar un nombre unico para cada archivo
    const fileName = `${
      crypto.createHmac('sha256', archivo.name)
      .update(new Date().toString())
      .digest('hex')}${archivo.name}`;

    // Mover el archivo obtenido al directorio de archivos dentro del servidor
    archivo.mv(`${PATH_FILE}/${fileName}`, (err) => {
      if (err) {
        return res.status(500).json({
          ok: false,
          err
        });
      }

      res.status(200).json({
        ok: true,
        fileName
      });
    });
  } catch (err) {
    res.status(500).json({
      ok: false,
      err
    });
  }
});

module.exports = app;