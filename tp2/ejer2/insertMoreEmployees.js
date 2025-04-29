const { MongoClient } = require('mongodb');

async function main() {
  const uri = 'mongodb://localhost:27017';
  const client = new MongoClient(uri);

  try {
    await client.connect();
    const db = client.db('empresa');
    const empleados = db.collection('empleados');

    // Agregar más empleados
    await empleados.insertMany([
      { nombre: 'Laura Martínez', edad: 28, puesto: 'analista' },
      { nombre: 'Carlos Ruiz', edad: 35, puesto: 'gerente' },
      { nombre: 'Ana Torres', edad: 42, puesto: 'contadora' },
      { nombre: 'Diego Fernández', edad: 24, puesto: 'soporte' },
      { nombre: 'Lucía Salas', edad: 38, puesto: 'recursos humanos' }
    ]);
    console.log("Nuevos empleados insertados.");
  } catch (err) {
    console.error('Error:', err);
  } finally {
    await client.close();
  }
}

main();
