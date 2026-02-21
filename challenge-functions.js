"use strict";

/*
Research: Regular Function vs Arrow Function
- this:
  Regular function crea su propio "this" segun como se invoque.
  Arrow function NO crea "this" propio; hereda el this del contexto externo (lexical this).

- arguments:
  Regular function tiene el objeto "arguments".
  Arrow function no tiene "arguments"; normalmente se usa rest (...args).

- hoisting:
  Function declaration regular (function nombre(){}) se puede invocar antes de declararla.
  Arrow function guardada en const/let no se puede usar antes de su declaracion.

- uso con new:
  Regular function puede usarse como constructor con "new" (si esta disenada para eso).
  Arrow function no puede usarse con "new".
*/

function esParOImparRegular(n) {
  if (typeof n !== "number" || Number.isNaN(n)) {
    console.log(`Regular -> Error: "${n}" no es un numero valido`);
    return;
  }
  if (!Number.isInteger(n)) {
    console.log(`Regular -> Error: "${n}" debe ser un numero entero`);
    return;
  }

  const resultado = n % 2 === 0 ? "PAR" : "IMPAR";
  console.log(`Regular -> ${n} es ${resultado}`);
}

const esParOImparArrow = (n) => {
  if (typeof n !== "number" || Number.isNaN(n)) {
    console.log(`Arrow -> Error: "${n}" no es un numero valido`);
    return;
  }
  if (!Number.isInteger(n)) {
    console.log(`Arrow -> Error: "${n}" debe ser un numero entero`);
    return;
  }

  const resultado = n % 2 === 0 ? "PAR" : "IMPAR";
  console.log(`Arrow -> ${n} es ${resultado}`);
};

// Casos de prueba: par, impar e invalidos.
const tests = [8, 5, 0, -3, 2.5, "10", NaN, undefined, null];

console.log("=== Challenge Functions: pruebas ===");
for (const value of tests) {
  esParOImparRegular(value);
  esParOImparArrow(value);
  console.log("---");
}
