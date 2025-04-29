const { MongoClient } = require('mongodb');

async function main() {
  const uri = 'mongodb://localhost:27017';
  const client = new MongoClient(uri);

  try {
    await client.connect();
    const db = client.db('empresa');
    const empleados = db.collection('empleados');

    await empleados.insertMany([
      {
        nombre: 'Mariano Eleno',
        edad: 26,
        puesto: 'Dev',
        direccion: {
          calle: 'Calfucura 220',
          ciudad: 'Carhue',
          codigo_postal: '6430'
        }
      },
      {
        nombre: 'Valentina Ríos',
        edad: 33,
        puesto: 'Team Leader',
        direccion: {
          calle: 'San Martín 789',
          ciudad: 'Córdoba',
          codigo_postal: '3388'
        }
      }
    ]);

    console.log("Nuevos empleados con dirección embebida agregados.");
  } catch (err) {
    console.error('Error:', err);
  } finally {
    await client.close();
  }
}

main();
