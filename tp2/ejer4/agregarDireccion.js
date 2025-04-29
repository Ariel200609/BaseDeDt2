const { MongoClient } = require('mongodb');

async function main() {
  const uri = 'mongodb://localhost:27017';
  const client = new MongoClient(uri);

  try {
    await client.connect();
    const db = client.db('empresa');
    const empleados = db.collection('empleados');

    // Obtener todos los empleados
    const todos = await empleados.find({}).toArray();

    for (const emp of todos) {
      await empleados.updateOne(
        { _id: emp._id },
        {
          $set: {
            direccion: {
              calle: 'Calle Y',
              ciudad: 'Ciudad X',
              codigo_postal: '6430'
            }
          }
        }
      );
    }

    console.log("Campo 'direccion' agregado a todos los empleados.");
  } catch (err) {
    console.error('Error:', err);
  } finally {
    await client.close();
  }
}

main();
