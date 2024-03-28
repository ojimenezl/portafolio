const express = require('express');
const path = require('path');
const { MongoClient } = require('mongodb');
const bodyParser = require('body-parser');
//const config = require('./config');

const app = express();
const PORT = process.env.PORT || 3000;

// Rutas estáticas para los archivos HTML, CSS, JS e imágenes
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
// URL de conexión proporcionada por MongoDB Atlas
const uri = process.env.MONGODB_URI
const dbName = 'data'; // Reemplaza con el nombre de tu base de datos

// Crear un cliente de MongoDB
const client = new MongoClient(uri);

// Conectar a la base de datos
async function connectToDB() {
  try {
    await client.connect();
    console.log('Conexión a MongoDB Atlas establecida');

    // Seleccionar la base de datos
    const db = client.db(dbName);

    // Realizar operaciones en la base de datos aquí si es necesario

  } catch (err) {
    console.error('Error al conectar a MongoDB Atlas:', err);
    // Si no se puede conectar, es posible que quieras detener tu aplicación o tomar otras medidas apropiadas
    process.exit(1); // Salir de la aplicación con un código de error
  }
}

// Manejar el evento SIGINT para cerrar la conexión cuando se detenga el servidor
process.on('SIGINT', async () => {
  try {
    console.log('Desconectando de MongoDB Atlas');
    await client.close();
    console.log('Conexión cerrada');
    process.exit(0); // Salir de la aplicación
  } catch (err) {
    console.error('Error al cerrar la conexión:', err);
    process.exit(1); // Salir de la aplicación con un código de error
  }
});

// Llamar a la función para conectar a la base de datos
connectToDB();



app.post('/actualizar-contador', (req, res) => {

  const nuevoContador = req.body.numClic; // Obtener el nuevo valor del contador del cuerpo de la solicitud
  const contadorCollection = client.db(dbName).collection('contadores');
  console.log("servidor ",nuevoContador);
  contadorCollection.updateOne(
    { _id: 'contador' }, // Documento a actualizar (puedes usar cualquier identificador único)
    { $set: { numClic: nuevoContador } }, // Actualizar el valor del contador
    { upsert: true } // Crear el documento si no existe
  ).then(() => {
    console.log('Contador actualizado en la base de datos');
    res.status(200).send('Contador actualizado correctamente');
  }).catch((err) => {
    console.error('Error al actualizar el contador en la base de datos:', err);
    res.status(500).send('Error al actualizar el contador en la base de datos');
  });
});

// Ruta para la página principal
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'indexHorizontal.html'));
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor en ejecución en http://localhost:${PORT}`);
});
