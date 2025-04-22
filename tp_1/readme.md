#  Fundamentos, Integridad y Concurrencia

1. En un modelo de base de datos para una universidad, es común tener tablas relacionadas como `Estudiantes`, `Cursos` y `Matriculas`. Podemos suponer que la tabla `Matriculas` tiene claves foráneas que referencian a las tablas `Estudiantes` y `Cursos`.

    Una **violación de integridad referencial** ocurre cuando se elimina un estudiante que tiene registros en la tabla `Matriculas`, ya que quedaría información que hace referencia a un estudiante que ya no existe. Esto generaría **inconsistencias** en el modelo de datos y podría causar errores en consultas o procesos posteriores.

    Para evitar este tipo de violaciones, se pueden aplicar diferentes mecanismos al definir la clave foránea:

    - `ON DELETE RESTRICT` o `NO ACTION`: impide eliminar al estudiante si tiene inscripciones activas. Es la opción más segura para proteger la integridad de los datos.

    - `ON DELETE SET NULL`: al eliminar un estudiante, el campo `estudiante_id` en `Matriculas` se establece como `NULL`, si la columna lo permite.

    - `ON DELETE CASCADE`: al eliminar un estudiante, se eliminan automáticamente todas sus inscripciones en la tabla `Matriculas`.
        > En el contexto universitario, lo más adecuado sería utilizar `ON DELETE RESTRICT`, para evitar la pérdida de datos importantes, obligando a eliminar primero las inscripciones antes de eliminar al estudiante.

2. Creamos la tabla `Estudiantes`, una tabla `Cursos`, y una tabla `Matriculas`. Esta ultima posee claves foráneas que garantizan la integridad referencial con las tablas `Estudiantes` y `Cursos`.

- Creacion de tablas `Estudiantes` y `Cursos`:

    ```sql
        CREATE TABLE Estudiantes (
            id INT PRIMARY KEY,
            nombre VARCHAR(100)
        );

        CREATE TABLE Cursos (
            id INT PRIMARY KEY,
            nombre VARCHAR(100)
        );
    ```

    > Donde cada una tiene un campo id como clave primaria. Estos id serán referenciados desde la tabla Matriculas.

- Creación de tabla `Matriculas` con claves foráneas:

    ```sql
        CREATE TABLE Matriculas (
            id INT PRIMARY KEY,
            estudiante_id INT,
            curso_id INT,
            FOREIGN KEY (estudiante_id) REFERENCES Estudiantes(id),
            FOREIGN KEY (curso_id) REFERENCES Cursos(id)
        );

    ```

    La tabla Matriculas guarda las inscripciones. Tanto estudiante_id como curso_id son claves foráneas:

  - `estudiante_id` debe coincidir con un id existente en `Estudiantes`.
  - `curso_id` debe coincidir con un id existente en `Cursos`.

   Estas restricciones aseguran que no se puedan registrar inscripciones de estudiantes o cursos que no existan.

- Intentar insertar un registro inválido:

    ```sql
        INSERT INTO Matriculas (id, estudiante_id, curso_id)
        VALUES (1, 999, 888);
    ```

    Este INSERT intenta registrar una matrícula con estudiante_id = 999 y curso_id = 888, pero esos IDs no existen en las tablas Estudiantes ni Cursos.
    Por lo tanto, se violan las restricciones de clave foránea y el motor de base de datos lanzará el siguiente error:

    ```SQL
        Execution finished with errors.
        Result: FOREIGN KEY constraint failed
        At line 1:
        INSERT INTO Matriculas (id, estudiante_id, curso_id)
        VALUES (1, 999, 888);
    ```

3. Al simular las situaciones de `READ COMMITTED` y `SERIALIZABLE`, creamos una tabla `CUENTAS` y trabajamos con dos transacciones en paralelo.

    Primero probamos con el nivel de aislamiento `READ COMMITTED`, donde ambos usuarios pueden leer el mismo valor inicial antes de actualizar. Esto puede generar inconsistencias, como una pérdida de actualizaciones si no se controla correctamente.

    ```SQL
        -- Creación de la tabla
        CREATE TABLE Cuentas (
            id INT PRIMARY KEY,
            titular VARCHAR(100),
            saldo DECIMAL(10,2)
        );

         -- Registro inicial
        INSERT INTO Cuentas VALUES (1, 'Juan Pérez', 1000.00);

        -- Transacción 1 (usuario A)
        START TRANSACTION;
        SET TRANSACTION ISOLATION LEVEL READ COMMITTED;
        SELECT saldo FROM Cuentas WHERE id = 1;
        UPDATE Cuentas SET saldo = saldo - 100 WHERE id = 1;
        -- COMMIT pendiente

        -- Transacción 2 (usuario B, ejecutada antes de que A haga COMMIT)
        START TRANSACTION;
        SET TRANSACTION ISOLATION LEVEL READ COMMITTED;
        SELECT saldo FROM Cuentas WHERE id = 1;
        UPDATE Cuentas SET saldo = saldo - 200 WHERE id = 1;
        COMMIT;
        
        -- Luego COMMIT de A
        COMMIT;
    ```

    En este caso, ambas transacciones operan sobre el mismo saldo inicial (1000), y el saldo final termina siendo incorrecto (700), lo que evidencia una condición de carrera.

    Luego probamos con el nivel `SERIALIZABLE`, donde una transacción debe esperar a que la otra finalice para poder acceder a los datos. Esto garantiza la integridad del saldo, evitando conflictos entre usuarios concurrentes.

    ```sql
        -- Transacción 1 (usuario A)
        START TRANSACTION;
        SET TRANSACTION ISOLATION LEVEL SERIALIZABLE;
        SELECT saldo FROM Cuentas WHERE id = 1;
        UPDATE Cuentas SET saldo = saldo - 100 WHERE id = 1;
        -- COMMIT pendiente

        -- Transacción 2 (usuario B)
        START TRANSACTION;
        SET TRANSACTION ISOLATION LEVEL SERIALIZABLE;
        SELECT saldo FROM Cuentas WHERE id = 1;

        -- Esta operación se bloquea hasta que la transacción A haga COMMIT
        UPDATE Cuentas SET saldo = saldo - 200 WHERE id = 1;
        COMMIT;

        -- Luego COMMIT de A
        COMMIT;
    ```

    Gracias al aislamiento `SERIALIZABLE`, se evita que ambas transacciones accedan al mismo tiempo al dato, manteniendo así la integridad de la cuenta.

    En conclusión, `READ COMMITTED` permite mayor concurrencia pero con más riesgo de errores, mientras que `SERIALIZABLE` ofrece mayor seguridad a costa de rendimiento.

4. Para analizar el impacto del uso de índices sobre el rendimiento de una consulta, realizamos primero una búsqueda por el campo marca sin ningún índice. Luego, creamos un índice sobre dicho campo y repetimos la consulta. En ambos casos, usamos EXPLAIN para observar el plan de ejecución.

    ```sql
        -- Consulta sin índice
        EXPLAIN SELECT * FROM productos WHERE marca = 'Soylent';

        -- Crear un índice sobre el campo 'marca'
        CREATE INDEX idx_marca ON productos(marca);

        -- Consulta con índice
        EXPLAIN SELECT * FROM productos WHERE marca = 'Soylent';
    ```

    Como resultado, observamos lo siguiente:

    - **Sin indice**:  MySQL realiza un `table scan`, corriendo todos los registros de la tabla para encontrar coincidencias. Esto implica mayor tiempo de respuesta, especialmente en tablas grandes.
    - **Con índice**: MySQL utiliza el índice `idx_marca`, accediendo directamente a los registros relevantes. Esto reduce drásticamente el tiempo de búsqueda y el uso de recursos.

    En conclusión, el uso de índices mejora considerablemente la eficiencia de las consultas en tablas grandes. Son esenciales para optimizar el rendimiento en sistemas con altos volúmenes de datos.

5. Diseñamos una consulta que filtre por múltiples campos, en este caso categoria y marca. Luego, creamos distintos índices (individuales y compuestos) para comparar el rendimiento mediante EXPLAIN.

    ```sql
        -- Consulta base
        EXPLAIN SELECT * FROM productos WHERE categoria = 'Electrónica' AND marca = 'Oscorp';

        -- Crear índice sobre 'categoria'
        CREATE INDEX idx_categoria ON productos(categoria);

        -- Crear índice sobre 'marca'
        CREATE INDEX idx_marca ON productos(marca);

        -- Crear índice compuesto
        CREATE INDEX idx_categoria_marca ON productos(categoria, marca);

        -- Repetir consulta para comparar plan de ejecución
        EXPLAIN SELECT * FROM productos WHERE categoria = 'Electrónica' AND marca = 'Oscorp';

    ```

    **Resultados observados:**

    - **Con índices individuales** (`idx_categoria` y `idx_marca`): MySQL puede usar uno solo de los índices, pero no ambos al mismo tiempo. Esto mejora un poco el rendimiento, pero sigue siendo menos eficiente que el índice compuesto.
    - **Con índice compuesto** (`idx_categoria_marca`): MySQL puede utilizar el índice directamente para filtrar por ambos campos, lo que reduce mucho más el tiempo de búsqueda.

    En conclusión, el uso de índices compuestos es más eficiente cuando las consultas filtran por múltiples columnas de forma combinada. Permitiendo un acceso más directoa los registros relevantes y mejoran notablemente el rendimiento frente a índices indibiduales.

6. Creamos una vista que resume las ventas mensuales por producto a partir de una tabla ventas, que debe contener al menos: `producto_id`, `cantidad`, y `fecha_venta`. Luego, usamos esa vista para consultar los 5 productos más vendidos en el mes.

    ```sql
        -- Creamos la tabla Ventas:
        CREATE TABLE ventas (
            id INT PRIMARY KEY,
            producto_id INT,
            cantidad INT,
            fecha_venta DATE
        );

        -- Y le insertamos algunos registro para realizar la prueba
        INSERT INTO ventas (id, producto_id, cantidad, fecha_venta) VALUES
        (1, 1, 10, '2024-08-01'),
        (2, 2, 15, '2024-08-02'),
        (3, 3, 5, '2024-08-03'),
        (4, 1, 7, '2024-08-10'),
        (5, 2, 12, '2024-08-12'),
        (6, 4, 20, '2024-08-15'),
        (7, 1, 8, '2024-08-18'),
        (8, 3, 3, '2024-08-21'),
        (9, 4, 10, '2024-08-25'),
        (10, 1, 13, '2024-08-30'),
        (11, 2, 17, '2024-08-31');
        
        -- Creamos la vista que resume ventas mensuales por producto
        CREATE VIEW resumen_ventas_mensuales AS
        SELECT
            producto_id,
            MONTH(fecha_venta) AS mes,
            YEAR(fecha_venta) AS anio,
            SUM(cantidad) AS total_vendido
        FROM ventas
        GROUP BY producto_id, YEAR(fecha_venta), MONTH(fecha_venta);

        -- Usamoos la vista para obtener los 5 productos más vendidos del último mes (por ejemplo, agosto 2024)
        SELECT
            p.nombre,
            r.total_vendido
        FROM resumen_ventas_mensuales r
        JOIN productos p ON p.id = r.producto_id
        WHERE r.mes = 8 AND r.anio = 2024
        ORDER BY r.total_vendido DESC
        LIMIT 5;

    ```

    Vemos el siguiente resultado:  

    | nombre     | total_vendido |
    |------------|---------------|
    | Thought XL | 44            |
    | These Mini | 38            |
    | Lot Plus   | 30            |
    | Than XL    | 8             |

    En conclusión, las vistas permiten encapsular consultas complejas y reutilizarlas de forma más clara y eficiente. En este caso, se facilitó el análisis de ventas mensuales y se simplificó el acceso a los productos más vendidos en un período determinado.

7. Creamos un usuario analista con permisos solo de lectura (SELECT) sobre las tablas productos y ventas, luego intentamos hacer un INSERT para verificar que no tiene permisos de escritura.

    ```SQL
            -- 1. Crear el usuario 'analista'
        CREATE USER 'analista'@'localhost' IDENTIFIED BY '123456';

        -- 2. Otorgar solo permiso SELECT sobre las tablas
        GRANT SELECT
            ON `prueba`.`productos` TO 'analista'@'localhost';

        GRANT SELECT
            ON `prueba`.`ventas` TO 'analista'@'localhost';

        FLUSH PRIVILEGES;
    ```

    Luego, nos conectamos como `analista` y probamos un `INSERT`:

    ```SQL
        -- mysql -u analista -p
        USE tu_base;

        -- Intento de inserción (debe fallar)
        INSERT INTO productos (id, nombre, precio, stock, categoria, marca, fecha_creacion) 
            VALUES (999999, 'Prueba', 0.00, 0, 'Test', 'Test', '2025-01-01');

    ```

    y MySQL nos devulve el siguiente error: 

    ```SQL
        ERROR 1142 (42000): INSERT command denied to user 'analista'@'localhost' for table 'productos'
    ```

8. Para simular una auditoría simple, creamos una tabla clientes y otra llamada clientes_auditoria, que almacenará cada modificación realizada (inserciones, actualizaciones y eliminaciones) mediante triggers.

    Para ello creamos las siguientes tablas: 

    ```sql
        -- Tabla principal
        CREATE TABLE clientes (
            id INT PRIMARY KEY,
            nombre VARCHAR(100),
            correo VARCHAR(100)
        );

        -- Tabla de auditoría
        CREATE TABLE clientes_auditoria (
            id INT AUTO_INCREMENT PRIMARY KEY,
            cliente_id INT,
            accion VARCHAR(10),
            nombre_anterior VARCHAR(100),
            correo_anterior VARCHAR(100),
            nombre_nuevo VARCHAR(100),
            correo_nuevo VARCHAR(100),
            fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );

    ```

    Luego, creamos los `triggers`:

    ```sql
            -- Trigger para INSERT
        DELIMITER //
        CREATE TRIGGER auditar_insert
        AFTER INSERT ON clientes
        FOR EACH ROW
        BEGIN
        INSERT INTO clientes_auditoria (cliente_id, accion, nombre_nuevo, correo_nuevo)
        VALUES (NEW.id, 'INSERT', NEW.nombre, NEW.correo);
        END;
        //
        DELIMITER ;

        -- Trigger para UPDATE
        DELIMITER //
        CREATE TRIGGER auditar_update
        AFTER UPDATE ON clientes
        FOR EACH ROW
        BEGIN
        INSERT INTO clientes_auditoria (
            cliente_id, accion,
            nombre_anterior, correo_anterior,
            nombre_nuevo, correo_nuevo
        )
        VALUES (
            OLD.id, 'UPDATE',
            OLD.nombre, OLD.correo,
            NEW.nombre, NEW.correo
        );
        END;
        //
        DELIMITER ;

        -- Trigger para DELETE
        DELIMITER //
        CREATE TRIGGER auditar_delete
        AFTER DELETE ON clientes
        FOR EACH ROW
        BEGIN
        INSERT INTO clientes_auditoria (
            cliente_id, accion,
            nombre_anterior, correo_anterior
        )
        VALUES (
            OLD.id, 'DELETE',
            OLD.nombre, OLD.correo
        );
        END;
        //
        DELIMITER ;
    ```

    y luego realizamos la siguiente prueba de auditoría:

    ```sql
            -- Insertar cliente
        INSERT INTO clientes (id, nombre, correo)
        VALUES (1, 'Juan Perez', 'juan@example.com');

        -- Actualizar cliente
        UPDATE clientes
        SET nombre = 'Juan P. Perez'
        WHERE id = 1;

        -- Eliminar cliente
        DELETE FROM clientes
        WHERE id = 1;

        -- Consultar la auditoría
        SELECT * FROM clientes_auditoria;
    ```
    
    La cual nos da como resultado lo siguiente:

    | id | cliente_id | accion | nombre_anterior | correo_anterior   | nombre_nuevo  | correo_nuevo     | fecha               |
    |----|------------|--------|-----------------|-------------------|---------------|------------------|---------------------|
    | 1  | 1          | INSERT | NULL            | NULL              | Juan Perez    | juan@example.com | 2025-04-21 23:45:10 |
    | 2  | 1          | UPDATE | Juan Perez      | juan@example.com  | Juan P. Perez | juan@example.com | 2025-04-21 23:45:10 |
    | 3  | 1          | DELETE | Juan P. Perez   | juan@example.com  | NULL          | NULL             | 2025-04-21 23:45:10 |


9. Para este ejercicio dejamos contancia del paso a paso que realizamos para probar cada uno de los pasos del proceso de respaldo y recuperacion de una base de datos, simulando un aperdida de datos: 

    1. Creamos una base de datos `tienda`, que tendra una tabla `productos`:

    ```sql
        CREATE DATABASE tienda;
        USE tienda;

        CREATE TABLE productos (
            id INT PRIMARY KEY,
            nombre VARCHAR(100),
            precio DECIMAL(10,2)
        );

        INSERT INTO productos VALUES
        (1, 'Notebook', 1500.00),
        (2, 'Mouse', 25.00),
        (3, 'Teclado', 45.00);
    ```

    2. Realizamos un Backup de la base:

    ```sql
        mysqldump -u root -p tienda > backup_tienda.sql
    ```

    > Esto genera un archivo backup_tienda.sql con toda la estructura y datos de la base tienda.

    3. Simulamos la perdida de datos: 

    ```sql
        DROP DATABASE tienda;
    ```

    4. Verificamos que efectivamente la base datos fue eliminada utilizando el comando `USE DATABASE tienda`, lo cual nos devuelve el siguiente mensaje de error: `ERROR 1049 (42000): Unknown database 'DATABASE'`. 

    5. Restauramos el backup:

    ```sql
        mysql -u root -p < backup_tienda.sql
    ```

    6. Verificamos la recuperación: 

    ```sql
        USE tienda;
        SELECT * FROM productos;
    ```

    Este último paso, nos devuelve lo siguiente:

    | id | nombre   | precio  |
    |----|----------|---------|
    |  1 | Notebook | 1500.00 |
    |  2 | Mouse    |   25.00 |
    |  3 | Teclado  |   45.00 |
