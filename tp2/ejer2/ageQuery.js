const { MongoClient } = require('mongodb');

async function main() {
    const uri = 'mongodb://localhost:27017';
    const client = new MongoClient(uri);

    try {
        await client.connect();
        const db = client.db('empresa');
        const empleados = db.collection('empleados');

        // Buscar empleados con edad entre 25 y 40
        const resultado = await empleados.find({
            $and: [
                { edad: { $gte: 25 } },
                { edad: { $lte: 40 } }
            ]
        }).toArray();

        console.log("Empleados entre 25 y 40 años:");
        resultado.forEach(emp => console.log(emp));
    } catch (err) {
        console.error('Error:', err);
    } finally {
        await client.close();
    }
}

main();
