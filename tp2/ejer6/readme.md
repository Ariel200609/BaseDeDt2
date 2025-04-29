# Ejercicio 6

1. Creamos el script `insertarClientes.js`, con el cual generamos una coleccion de clientes con los cuales poder operar. Luego de su ejecucion la coleccion clientes quedo de la siguiente manera:

    ```bash
        empresa> db.clientes.find().pretty()
        [
        {
            _id: ObjectId('681120c41c829dd8d4047bab'),
            nombre: 'Ana',
            apellido: 'Gómez'
        },
        {
            _id: ObjectId('681120c41c829dd8d4047bac'),
            nombre: 'Luis',
            apellido: 'Pérez'
        },
        {
            _id: ObjectId('681120c41c829dd8d4047bad'),
            nombre: 'Carlos',
            apellido: 'Gómez'
        },
        {
            _id: ObjectId('681120c41c829dd8d4047bae'),
            nombre: 'Laura',
            apellido: 'Martínez'
        },
        {
            _id: ObjectId('681120c41c829dd8d4047baf'),
            nombre: 'Pedro',
            apellido: 'Pérez'
        }
        ]
        empresa>

    ```

2. Creamos el script `crearIndice.js`, el cual crea un indice compuesto sobre `apelldio` y `nombre`. Luego de su ejeción se puede ver el siguiente inidice:

    ```bash
        empresa> db.clientes.getIndexes()
                [
                    { v: 2, key: { _id: 1 }, name: '_id_' },
                    {
                        v: 2,
                        key: { apellido: 1, nombre: 1 },
                        name: 'apellido_1_nombre_1'
                    }
                ]
        empresa>
    ```
