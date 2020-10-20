const express = require('express');
const { PATH_FILE } = require('../../config/env');
const fs = require('fs');

const app = express();

// Endpoint para mostrar las imagenes
app.get('/api/file/:fileName', async (req, res) => {
  try {
    const { fileName } = req.params;
    const path = `${PATH_FILE}/${fileName}`;

    if (!fs.existsSync(path)) {
      const pathNoImage = `${PATH_FILE}/no-image.png`;
      return res.sendFile(pathNoImage);
    }

    res.sendFile(path);
  } catch (err) {
    res.status(500).json({
      ok: false,
      err
    });
  }
});


module.exports = app;