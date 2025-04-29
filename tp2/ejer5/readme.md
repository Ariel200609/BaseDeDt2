# Ejercicio 5

1. Creamos el script `insertarVentas.js` que crea la colección ventas y el siguiente contenido:

    `````bash
        empresa> db.ventas.find().pretty()
        [
        {
            _id: ObjectId('68111e9b2528382cf362c2f0'),
            producto: 'Laptop',
            cantidad: 2,
            precio_unitario: 1000
        },
        {
            _id: ObjectId('68111e9b2528382cf362c2f1'),
            producto: 'Laptop',
            cantidad: 1,
            precio_unitario: 1000
        },
        {
            _id: ObjectId('68111e9b2528382cf362c2f2'),
            producto: 'Mouse',
            cantidad: 5,
            precio_unitario: 40
        },
        {
            _id: ObjectId('68111e9b2528382cf362c2f3'),
            producto: 'Mouse',
            cantidad: 3,
            precio_unitario: 40
        },
        {
            _id: ObjectId('68111e9b2528382cf362c2f4'),
            producto: 'Disco',
            cantidad: 4,
            precio_unitario: 450
        },
        {
            _id: ObjectId('68111e9b2528382cf362c2f5'),
            producto: 'Teclado',
            cantidad: 4,
            precio_unitario: 45
        }
        ]
        empresa>
    ```

2. Creamos el script `totalPorProducto.js`, el cual calcula el total de ventas por producto, mostrando el siguiente resultado:

    ```bash
        [Running] node "c:\Users\Mariano\Documents\tecnicatura\1Q25\BD2\practicos\tp2\ejer5\totalPorProducto.js"

            Total de ventas por producto:
            Producto: Laptop, Total vendido: $3000
            Producto: Mouse, Total vendido: $320
            Producto: Teclado, Total vendido: $180
            Producto: Disco, Total vendido: $1800
    ```
