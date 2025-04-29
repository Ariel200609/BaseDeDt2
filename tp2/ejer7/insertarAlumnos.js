const { MongoClient, ObjectId } = require('mongodb');

async function main() {
    const uri = 'mongodb://localhost:27017';
    const client = new MongoClient(uri);

    try {
        await client.connect();
        const db = client.db('escuela');
        const alumnos = db.collection('alumnos');

        await alumnos.insertMany([
            {
                nombre: 'Sofía López',
                edad: 20,
                id_cursos: [
                    new ObjectId("681123c9148748185ca68c63"),//MATEMATICAS
                    new ObjectId("681123c9148748185ca68c65")// PROGRAMACION
                ]
            },
            {
                nombre: 'Juan Martín',
                edad: 22,
                id_cursos: [
                    new ObjectId("681123c9148748185ca68c64")// HISTORIA
                ]
            }
        ]);

        console.log("Alumnos insertados con referencias a cursos.");
    } catch (err) {
        console.error("Error:", err);
    } finally {
        await client.close();
    }
}

main();
