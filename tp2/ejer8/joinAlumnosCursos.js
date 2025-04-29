const { MongoClient } = require('mongodb');

async function main() {
    const uri = 'mongodb://localhost:27017';
    const client = new MongoClient(uri);

    try {
        await client.connect();
        const db = client.db('escuela');
        const alumnos = db.collection('alumnos');

        const resultado = await alumnos.aggregate([
            {
                $lookup: {
                    from: 'cursos',          // Colección con la que se hace join
                    localField: 'id_cursos', // Campo en alumnos que contiene los ObjectId de cursos
                    foreignField: '_id',     // Campo en cursos que se corresponde
                    as: 'cursos_inscriptos'  // Nombre del nuevo campo con los cursos embebidos
                }
            }
        ]).toArray();

        console.log("Alumnos con cursos:");
        resultado.forEach(alumno => {
            console.log(`\n ${alumno.nombre} (${alumno.edad} años)`);
            console.log("   Cursos:");
            alumno.cursos_inscriptos.forEach(curso => {
                console.log(`   - ${curso.nombre} (${curso.duracion})`);
            });
        });
    } catch (err) {
        console.error("Error:", err);
    } finally {
        await client.close();
    }
}

main();
