# Ejecicio 4

Creamos el script `agregarDireccion.js` que actualiza todos los empleados con una dirección generica, luego de su ejecución los empleados quedaron de la siguiente forma:

    ```bash
        test> use empresa
        switched to db empresa
        empresa> db.empleados.find().pretty()
        [
            {
                _id: ObjectId('68110845dee908002ddb76e1'),
                nombre: 'Juan Pérez',
                edad: 31,
                puesto: 'desarrollador',
                direccion: { calle: 'Calle Y', ciudad: 'Ciudad X', codigo_postal: '6430' }
            },
            {
                _id: ObjectId('68110845dee908002ddb76e2'),
                nombre: 'María López',
                edad: 25,
                puesto: 'diseñadora',
                direccion: { calle: 'Calle Y', ciudad: 'Ciudad X', codigo_postal: '6430' }
            },
            {
                _id: ObjectId('68110d4a37de16abaf40148b'),
                nombre: 'Laura Martínez',
                edad: 28,
                puesto: 'analista',
                direccion: { calle: 'Calle Y', ciudad: 'Ciudad X', codigo_postal: '6430' }
            },
            {
                _id: ObjectId('68110d4a37de16abaf40148c'),
                nombre: 'Carlos Ruiz',
                edad: 35,
                puesto: 'gerente',
                direccion: { calle: 'Calle Y', ciudad: 'Ciudad X', codigo_postal: '6430' }
            },
            {
                _id: ObjectId('68110d4a37de16abaf40148d'),
                nombre: 'Ana Torres',
                edad: 42,
                puesto: 'contadora',
                direccion: { calle: 'Calle Y', ciudad: 'Ciudad X', codigo_postal: '6430' }
            },
            {
                _id: ObjectId('68110d4a37de16abaf40148e'),
                nombre: 'Diego Fernández',
                edad: 24,
                puesto: 'soporte',
                direccion: { calle: 'Calle Y', ciudad: 'Ciudad X', codigo_postal: '6430' }
            },
            {
                _id: ObjectId('68110d4a37de16abaf40148f'),
                nombre: 'Lucía Salas',
                edad: 38,
                puesto: 'recursos humanos',
                direccion: { calle: 'Calle Y', ciudad: 'Ciudad X', codigo_postal: '6430' }
            }
        ]
        empresa>
    ```

Por otro lado, creamos el script `agregarNuevosEmpleados.js`, que añade nuevos empleados con el campo `direccion`. Luego de su ejecucion se los empleados quedaron de la siguiente manera:

    ```bash
        empresa> db.empleados.find().pretty()
        [
            {
                _id: ObjectId('68110845dee908002ddb76e1'),
                nombre: 'Juan Pérez',
                edad: 31,
                puesto: 'desarrollador',
                direccion: { calle: 'Calle Y', ciudad: 'Ciudad X', codigo_postal: '6430' }
            },
            {
                _id: ObjectId('68110845dee908002ddb76e2'),
                nombre: 'María López',
                edad: 25,
                puesto: 'diseñadora',
                direccion: { calle: 'Calle Y', ciudad: 'Ciudad X', codigo_postal: '6430' }
            },
            {
                _id: ObjectId('68110d4a37de16abaf40148b'),
                nombre: 'Laura Martínez',
                edad: 28,
                puesto: 'analista',
                direccion: { calle: 'Calle Y', ciudad: 'Ciudad X', codigo_postal: '6430' }
            },
            {
                _id: ObjectId('68110d4a37de16abaf40148c'),
                nombre: 'Carlos Ruiz',
                edad: 35,
                puesto: 'gerente',
                direccion: { calle: 'Calle Y', ciudad: 'Ciudad X', codigo_postal: '6430' }
            },
            {
                _id: ObjectId('68110d4a37de16abaf40148d'),
                nombre: 'Ana Torres',
                edad: 42,
                puesto: 'contadora',
                direccion: { calle: 'Calle Y', ciudad: 'Ciudad X', codigo_postal: '6430' }
            },
            {
                _id: ObjectId('68110d4a37de16abaf40148e'),
                nombre: 'Diego Fernández',
                edad: 24,
                puesto: 'soporte',
                direccion: { calle: 'Calle Y', ciudad: 'Ciudad X', codigo_postal: '6430' }
            },
            {
                _id: ObjectId('68110d4a37de16abaf40148f'),
                nombre: 'Lucía Salas',
                edad: 38,
                puesto: 'recursos humanos',
                direccion: { calle: 'Calle Y', ciudad: 'Ciudad X', codigo_postal: '6430' }
            },
            {
                _id: ObjectId('68111d183b86ffb452ecd46e'),
                nombre: 'Mariano Eleno',
                edad: 26,
                puesto: 'Dev',
                direccion: { calle: 'Calfucura 220', ciudad: 'Carhue', codigo_postal: '6430' }
            },
            {
                _id: ObjectId('68111d183b86ffb452ecd46f'),
                nombre: 'Valentina Ríos',
                edad: 33,
                puesto: 'Team Leader',
                direccion: {
                calle: 'San Martín 789',
                ciudad: 'Córdoba',
                codigo_postal: '3388'
                }
            }
        ]
    ```
