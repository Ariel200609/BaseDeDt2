# ejercicio 7

1. Creamos el script `insertarCursos.js`, el cual genera una nueva base llamada `Escuela`, y le crea una coleccion de cursos, y devuelve por consola los `ids` de los cursos generados.

    ```bash
        [Running] node "c:\Users\Mariano\Documents\tecnicatura\1Q25\BD2\practicos\tp2\ejer7\insertarCursos.js"
            Cursos insertados:
            {
            '0': new ObjectId('681123c9148748185ca68c63'),
            '1': new ObjectId('681123c9148748185ca68c64'),
            '2': new ObjectId('681123c9148748185ca68c65')
            }

            [Done] exited with code=0 in 0.369 seconds
    ```

    y la coleccion quedo de la siguiente manera:

    ```bash
        test> use escuela
        switched to db escuela
        escuela> db.cursos.find().pretty()
            [
                {
                    _id: ObjectId('681123c9148748185ca68c63'),
                    nombre: 'Matemática',
                    duracion: '3 meses'
                },
                {
                    _id: ObjectId('681123c9148748185ca68c64'),
                    nombre: 'Historia',
                    duracion: '2 meses'
                },
                {
                    _id: ObjectId('681123c9148748185ca68c65'),
                    nombre: 'Programación',
                    duracion: '4 meses'
                }
            ]
        escuela>
    ```

2. Creamos el script `insertarAlumnos`que crea una coleccion de alumnos, con refgerencias a la coleccion de `cursos`:

    ```bash
        escuela> db.alumnos.find().pretty()
            [
                {
                    _id: ObjectId('681124d54d4e611dc7e95ba0'),
                    nombre: 'Sofía López',
                    edad: 20,
                    id_cursos: [
                    ObjectId('681123c9148748185ca68c63'),
                    ObjectId('681123c9148748185ca68c65')
                    ]
                },
                {
                    _id: ObjectId('681124d54d4e611dc7e95ba1'),
                    nombre: 'Juan Martín',
                    edad: 22,
                    id_cursos: [ ObjectId('681123c9148748185ca68c64') ]
                }
            ]
    ```
