const { MongoClient } = require('mongodb');

async function main() {
  const uri = 'mongodb://localhost:27017';
  const client = new MongoClient(uri);

  try {
    await client.connect();
    const db = client.db('escuela');
    const cursos = db.collection('cursos');

    const resultado = await cursos.insertMany([
      { nombre: 'Matemática', duracion: '3 meses' },
      { nombre: 'Historia', duracion: '2 meses' },
      { nombre: 'Programación', duracion: '4 meses' }
    ]);

    console.log("Cursos insertados:");
    console.log(resultado.insertedIds);
  } catch (err) {
    console.error("Error:", err);
  } finally {
    await client.close();
  }
}

main();
