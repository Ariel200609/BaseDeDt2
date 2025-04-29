const { MongoClient } = require('mongodb');

async function main() {
  const uri = 'mongodb://localhost:27017';
  const client = new MongoClient(uri);

  try {
    await client.connect();
    const db = client.db('empresa');
    const ventas = db.collection('ventas');

    await ventas.insertMany([
      { producto: 'Laptop', cantidad: 2, precio_unitario: 1000 },
      { producto: 'Laptop', cantidad: 1, precio_unitario: 1000 },
      { producto: 'Mouse', cantidad: 5, precio_unitario: 40 },
      { producto: 'Mouse', cantidad: 3, precio_unitario: 40 },
      { producto: 'Disco', cantidad: 4, precio_unitario: 450 },
      { producto: 'Teclado', cantidad: 4, precio_unitario: 45 }
    ]);

    console.log("Ventas insertadas correctamente.");
  } catch (err) {
    console.error("Error:", err);
  } finally {
    await client.close();
  }
}

main();
