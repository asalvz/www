const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const path = require('path');

const app = express();
const secretKey = '12345678'; // Cambia esto por una clave secreta segura en producción

// Configuración del middleware para parsear el cuerpo de las peticiones
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Ruta para la autenticación
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Validación del usuario y contraseña
  if (username === 'usuario' && password === 'contraseña') {
    const token = jwt.sign({ hiddenText: 'Welcome' }, secretKey);
    res.json({ success: true, jwt: token });
  } else {
    res.json({ success: false });
  }
});

// Ruta para mostrar la página de inicio en el endpoint raíz
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});
// Sirve archivos estáticos desde la carpeta "public"
app.use(express.static('public', { extensions: ['html', 'css', 'js'] }));


app.listen(3000, () => {
  console.log('Servidor escuchando en el puerto 3000');
});
