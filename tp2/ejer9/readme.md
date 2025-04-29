# Ejecicio 9

## Replica Set

`Replica Set` es básicamente tener varias copias de la base de datos en distintos servidores. La ventaja principal es que si el servidor principal se cae, otro toma el control automáticamente, así que el sistema sigue funcionando sin problemas. Además, se pueden hacer lecturas desde los secundarios, lo que mejora el rendimiento general. También ayuda a evitar la pérdida de datos porque siempre hay una copia actualizada en otro lado. Y como bonus, podés hacer backups desde un nodo secundario sin frenar todo.

## Sharding

El `sharding` sirve para dividir una base de datos muy grande en partes más chicas que se reparten en distintos servidores. Esto es clave cuando hay muchísimo volumen de datos o tráfico. Así se pueden hacer consultas más rápido, se distribuye mejor la carga y podés escalar agregando más servidores en vez de depender solo de uno. Ideal para proyectos grandes que no entran cómodamente en una sola máquina.
