const { MongoClient } = require('mongodb');

async function main() {
    const uri = 'mongodb://localhost:27017';
    const client = new MongoClient(uri);

    try {
        await client.connect();
        const db = client.db('empresa');
        const clientes = db.collection('clientes');

        await clientes.insertMany([
            { nombre: 'Ana', apellido: 'Gómez' },
            { nombre: 'Luis', apellido: 'Pérez' },
            { nombre: 'Carlos', apellido: 'Gómez' },
            { nombre: 'Laura', apellido: 'Martínez' },
            { nombre: 'Pedro', apellido: 'Pérez' }
        ]);

        console.log("Clientes insertados correctamente.");
    } catch (err) {
        console.error("Error:", err);
    } finally {
        await client.close();
    }
}

main();
