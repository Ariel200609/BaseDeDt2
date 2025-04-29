# Ejercicio nro2

1. Creamos el script `insertMoreEmployees.js` para cargar mas empleados a la db `empresa`. Como resultado en la base quedaron cargados los siguientes empleados:

    ```bash
        test> use empresa
        switched to db empresa
        empresa> db.empleados.find().pretty()
        [
        {
            _id: ObjectId('68110845dee908002ddb76e1'),
            nombre: 'Juan Pérez',
            edad: 31,
            puesto: 'desarrollador'
        },
        {
            _id: ObjectId('68110845dee908002ddb76e2'),
            nombre: 'María López',
            edad: 25,
            puesto: 'diseñadora'
        },
        {
            _id: ObjectId('68110d4a37de16abaf40148b'),
            nombre: 'Laura Martínez',
            edad: 28,
            puesto: 'analista'
        },
        {
            _id: ObjectId('68110d4a37de16abaf40148c'),
            nombre: 'Carlos Ruiz',
            edad: 35,
            puesto: 'gerente'
        },
        {
            _id: ObjectId('68110d4a37de16abaf40148d'),
            nombre: 'Ana Torres',
            edad: 42,
            puesto: 'contadora'
        },
        {
            _id: ObjectId('68110d4a37de16abaf40148e'),
            nombre: 'Diego Fernández',
            edad: 24,
            puesto: 'soporte'
        },
        {
            _id: ObjectId('68110d4a37de16abaf40148f'),
            nombre: 'Lucía Salas',
            edad: 38,
            puesto: 'recursos humanos'
        }
        ]
        empresa>
    ```

2. Creamos el script `ageQuery.js` con el que realizamos la busqueda de empleados con una edad entre 25 y 40 años, el cual al ejecutarlo nos devuelve:

    ```bash
        PS C:\Users\Mariano\Documents\tecnicatura\1Q25\BD2\practicos\tp2\ejer2> node ageQuery.js
        Empleados entre 25 y 40 años:
        {
        _id: new ObjectId('68110845dee908002ddb76e1'),
        nombre: 'Juan Pérez',
        edad: 31,
        puesto: 'desarrollador'
        }
        {
        _id: new ObjectId('68110845dee908002ddb76e2'),
        nombre: 'María López',
        edad: 25,
        puesto: 'diseñadora'
        }
        {
        _id: new ObjectId('68110d4a37de16abaf40148b'),
        nombre: 'Laura Martínez',
        edad: 28,
        puesto: 'analista'
        }
        {
        _id: new ObjectId('68110d4a37de16abaf40148c'),
        nombre: 'Carlos Ruiz',
        edad: 35,
        puesto: 'gerente'
        }
        {
        _id: new ObjectId('68110d4a37de16abaf40148f'),
        nombre: 'Lucía Salas',
        edad: 38,
        puesto: 'recursos humanos'
        }
    ```
