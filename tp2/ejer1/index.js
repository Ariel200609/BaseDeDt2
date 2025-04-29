const { MongoClient } = require('mongodb');

async function main() {
  const uri = 'mongodb://localhost:27017';
  const client = new MongoClient(uri);

  try {
    await client.connect();

    const db = client.db('empresa');
    const empleados = db.collection('empleados');

    // 1. Insertar 3 empleados
    await empleados.insertMany([
      { nombre: 'Juan Pérez', edad: 30, puesto: 'desarrollador' },
      { nombre: 'María López', edad: 25, puesto: 'diseñadora' },
      { nombre: 'Pedro Gómez', edad: 22, puesto: 'pasante' }
    ]);
    console.log("Empleados insertados.");

    // 2. Actualizar edad de uno de los empleados
    await empleados.updateOne(
      { nombre: 'Juan Pérez' },
      { $set: { edad: 31 } }
    );
    console.log("Edad actualizada para Juan Pérez.");

    // 3. Eliminar empleado con puesto 'pasante'
    await empleados.deleteOne({ puesto: 'pasante' });
    console.log("Pasante eliminado.");

  } catch (err) {
    console.error('❌ Error:', err);
  } finally {
    await client.close();
  }
}

main();
