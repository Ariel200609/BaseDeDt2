# Ejercicio nro 1

Resultado de ejecutar el script index.js para realizar las operaciones CRUD sobre una nueva base de datos "Empresa"

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
  }
```