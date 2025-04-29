const { MongoClient } = require('mongodb');

async function main() {
    const uri = 'mongodb://localhost:27017';
    const client = new MongoClient(uri);

    try {
        await client.connect();
        const db = client.db('empresa');
        const empleados = db.collection('empleados');

        // Proyección: mostrar solo nombre y puesto, ocultar _id
        const result = await empleados.find(
            {},
            {
                projection: {
                    _id: 0,
                    nombre: 1,
                    puesto: 1
                }
            }
        ).toArray();

        console.log("Nombre y puestos de todos los empleados: ");
        result.forEach(emp => console.log(emp));
    } catch (err) {
        console.error(err);
    } finally {
        await client.close();
    }
}

main();