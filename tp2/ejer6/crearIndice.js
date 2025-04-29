const { MongoClient } = require('mongodb');

async function main() {
  const uri = 'mongodb://localhost:27017';
  const client = new MongoClient(uri);

  try {
    await client.connect();
    const db = client.db('empresa');
    const clientes = db.collection('clientes');

    const resultado = await clientes.createIndex(
      { apellido: 1, nombre: 1 } // Índice compuesto ascendente
    );

    console.log("Índice creado:", resultado);
  } catch (err) {
    console.error("Error al crear el índice:", err);
  } finally {
    await client.close();
  }
}

main();
