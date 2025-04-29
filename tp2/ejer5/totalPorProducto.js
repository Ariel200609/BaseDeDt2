const { MongoClient } = require('mongodb');

async function main() {
    const uri = 'mongodb://localhost:27017';
    const client = new MongoClient(uri);

    try {
        await client.connect();
        const db = client.db('empresa');
        const ventas = db.collection('ventas');

        const resultado = await ventas.aggregate([
            {
                $group: {
                    _id: '$producto',
                    total_vendido: {
                        $sum: { $multiply: ['$cantidad', '$precio_unitario'] }
                    }
                }
            }
        ]).toArray();

        console.log("Total de ventas por producto:");
        resultado.forEach(r => {
            console.log(`Producto: ${r._id}, Total vendido: $${r.total_vendido}`);
        });
    } catch (err) {
        console.error("Error:", err);
    } finally {
        await client.close();
    }
}

main();
