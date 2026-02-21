# Homeworks

Rama de entrega: `01-Arrays`

## Estructura

- `arrays-homework.js`
- `challenge-functions.js`

## Como ejecutar

```bash
node arrays-homework.js
node challenge-functions.js
```

## Homework (Arrays)

En `arrays-homework.js` se demuestra el uso de muchos metodos de `Array` y `Array.prototype`, incluyendo:

- Crear/copiar: `Array.isArray`, `Array.from`, `Array.of`, spread (`...`), `slice`
- Agregar/quitar: `push`, `pop`, `shift`, `unshift`
- Cortar/pegar/unir: `concat`, `slice`, `splice`
- Busqueda/verificacion: `includes`, `indexOf`, `lastIndexOf`, `find`, `findIndex`, `findLast*` (con validacion)
- Iteracion/transformacion: `forEach`, `map`, `filter`
- Logica: `some`, `every`
- Reduccion: `reduce`, `reduceRight`
- Orden: `sort` (numerico), `reverse`
- Conversion: `join`
- Aplanado: `flat`, `flatMap` (con validacion)
- Mutadores extra: `fill`, `copyWithin`
- Iteradores: `entries`, `keys`, `values`
- Shallow copy con objetos (importante)

## Challenge (Functions)

En `challenge-functions.js` se incluye:

- Research en comentarios: diferencias entre Regular Function y Arrow Function
- Funcion regular: `esParOImparRegular(n)`
- Funcion arrow: `esParOImparArrow(n)`
- Validacion de entrada para valores no numericos o `NaN`
- Casos de prueba con valores pares, impares e invalidos

## Resumen: Arrow vs Regular

- `this`: regular tiene `this` dinamico; arrow hereda `this` del contexto.
- `arguments`: regular si tiene; arrow no.
- Hoisting: la declaracion regular se eleva; arrow en `const`/`let` no.
- `new`: regular puede ser constructor; arrow no puede.

## Git (referencia)

```bash
git init
git checkout -b 01-Arrays
git add .
git commit -m "Clase 01: Arrays y Functions challenge"
git remote add origin <URL_DEL_REPO>
git push -u origin 01-Arrays
```
