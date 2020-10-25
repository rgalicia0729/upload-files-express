# Upload Files Express

Subir archivos al servidor utilizando express fileupload

Para subir archivos al servidor instalamos la siguiente dependencia.

``` npm install --save express-fileupload ```

Agregamos el siguiente middleware

```javascript
app.use( fileUpload({ useTempFiles: true }));
```

Endpoint para subir archivos al servidor.

```javascript

// Endpoint para subir una imagen al servidor
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

    // Extensiones validas para subir archivos
    const extensionesValidas = ['png', 'jpg', 'gif', 'jpeg'];
    const nombreSeparado = archivo.name.split('.');
    const extension = nombreSeparado[nombreSeparado.length -1];

    if (extensionesValidas.indexOf(extension) < 0) {
      return res.status(400).json({
        ok: false,
        err: {
          message: 'No se pudo subir el archivo las extensiones permitidas son: ' + extensionesValidas.join(', ')
        }
      })
    }

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

```

Endpoint para borrar un archivo del servidor.

```javascript

// Endpoint para eliminar una imagen del servidor
app.delete('/api/delete-file/:fileName', async  (req, res) => {
  try {
    const { fileName } = req.params;
    const pathImage = `${PATH_FILE}/${fileName}`;

    console.log(pathImage);
    
    if (!fs.existsSync(pathImage)) {
      return res.status(400).json({
        ok: false,
        err: {
          message: 'No se encontro la imagen que se desea eliminar'
        }
      });
    }

    fs.unlinkSync(pathImage);

    res.status(200).json({
      ok: true,
      message: 'La imagen fue eliminada exitosamente'
    });

  } catch (err) {
    res.status(500).json({
      ok: false,
      err
    });
  }
});

```

Endpoint para mostrar un archivo que se encuentre en el servidor

```javascript

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

```