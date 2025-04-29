# Ejercicio 10

## Crear un usuario con permisos de lectura y escritura

1. Entrar a la shell de *MongoDB* con el comando `mongosh`.

2. Conectarse a la base de datos donde se quiere crear el usuario con permisos usando el comando `use nombre_db`.

3. Ejecutar el siguiente comando para crear el usuario:
   
   ```bash
       db.createUser({
           user: "usuario_rw",
           pwd: "contrasena123",
           roles: [
               { role: "readWrite", db: "nombre_db" }
           ]
       })
   ```

Este nuevo usuario podrá *leer* y *escribir* en la base de datos seleccionada, pero no podra administrar ni acceder a otras bases.

## Hacer un backupde la base de datos

Para esto se debe usar el comando `mongodump` de la siguiente manera:

```bash
    mongodump --db nombre_db --out ./backup_nombre_db
```

> Este comando debe ejecutarse fuera de la shell de Mongo.

Que generara una carpeta `backup_nombre_db` con una copia de la base de datos `nombre_db`.

## Restaurar una base de datos desde un backup

Para esto se debe usar el comando `mongorestore` de la siguiente manera:

```bash
    mongorestore --db nombre_db ./backup_nombre_db/nombre_db
```

> Este comando debe ejecutarse fuera de la shell de Mongo.

Lo que restaura todos los datos desde el backp a la base elegida.
