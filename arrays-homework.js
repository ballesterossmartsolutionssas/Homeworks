"use strict";

// Helper to separate each topic in the console output.
const section = (title) => {
  console.log("\n" + "=".repeat(20) + ` ${title} ` + "=".repeat(20));
};

section("A) Crear / copiar");
const base = [1, 2, 3, 4];
console.log("Array.isArray(base):", Array.isArray(base));
console.log("Array.from('IMDERE'):", Array.from("IMDERE"));
console.log("Array.of(10, 20, 30):", Array.of(10, 20, 30));

// Copy with spread and with slice().
const copyWithSpread = [...base];
const copyWithSlice = base.slice();
console.log("Original:", base);
console.log("Copia spread:", copyWithSpread);
console.log("Copia slice:", copyWithSlice);

section("B) Agregar / quitar");
const addRemove = ["a", "b", "c"];
console.log("Antes push:", addRemove);
addRemove.push("d");
console.log("Despues push:", addRemove);

console.log("Antes pop:", addRemove);
addRemove.pop();
console.log("Despues pop:", addRemove);

console.log("Antes unshift:", addRemove);
addRemove.unshift("z");
console.log("Despues unshift:", addRemove);

console.log("Antes shift:", addRemove);
addRemove.shift();
console.log("Despues shift:", addRemove);

section("C) Cortar / pegar / unir");
const part1 = [1, 2];
const part2 = [3, 4];
console.log("concat:", part1.concat(part2));
console.log("slice(1, 3) sobre base:", base.slice(1, 3));

const spliceExample = [10, 20, 30, 40];
console.log("Antes splice:", spliceExample);
const removed = spliceExample.splice(1, 2, 200, 300);
console.log("Eliminados por splice:", removed);
console.log("Despues splice:", spliceExample);

section("D) Busqueda y verificacion");
const search = [5, 7, 9, 7, 11];
console.log("includes(9):", search.includes(9));
console.log("indexOf(7):", search.indexOf(7));
console.log("lastIndexOf(7):", search.lastIndexOf(7));
console.log("find(n > 8):", search.find((n) => n > 8));
console.log("findIndex(n > 8):", search.findIndex((n) => n > 8));

if (typeof search.findLast === "function") {
  console.log("findLast(n % 2 !== 0):", search.findLast((n) => n % 2 !== 0));
} else {
  console.log("findLast no esta disponible en esta version de Node.");
}

if (typeof search.findLastIndex === "function") {
  console.log("findLastIndex(n === 7):", search.findLastIndex((n) => n === 7));
} else {
  console.log("findLastIndex no esta disponible en esta version de Node.");
}

section("E) Iteracion y transformacion");
const iteration = [1, 2, 3];
console.log("forEach:");
iteration.forEach((value, index) => {
  console.log(`  indice=${index}, valor=${value}`);
});
console.log("map(x2):", iteration.map((n) => n * 2));
console.log("filter(pares):", iteration.filter((n) => n % 2 === 0));

section("F) Logica");
const logic = [2, 4, 6, 7];
console.log("some(impar):", logic.some((n) => n % 2 !== 0));
console.log("every(par):", logic.every((n) => n % 2 === 0));

section("G) Reduccion");
const values = [1, 2, 3, 4];
console.log("reduce(suma):", values.reduce((acc, n) => acc + n, 0));
console.log(
  "reduceRight(concat):",
  ["A", "B", "C"].reduceRight((acc, letter) => acc + letter, "")
);

section("H) Orden");
const toOrder = [30, 2, 100, 5, 12];
console.log("Antes sort numerico:", toOrder);
toOrder.sort((a, b) => a - b);
console.log("Despues sort numerico:", toOrder);

console.log("Antes reverse:", toOrder);
toOrder.reverse();
console.log("Despues reverse:", toOrder);

section("I) Conversion");
const words = ["hola", "mundo", "js"];
console.log("join(' - '):", words.join(" - "));

section("J) Aplanado");
const nested = [1, [2, 3], [4, [5]]];
if (typeof nested.flat === "function") {
  console.log("flat(1):", nested.flat(1));
  console.log("flat(2):", nested.flat(2));
} else {
  console.log("flat no esta disponible en esta version de Node.");
}

if (typeof nested.flatMap === "function") {
  console.log("flatMap(n => [n, n*10]) con [1,2,3]:", [1, 2, 3].flatMap((n) => [n, n * 10]));
} else {
  console.log("flatMap no esta disponible en esta version de Node.");
}

section("K) Mutadores adicionales");
const fillExample = [0, 0, 0, 0, 0];
console.log("Antes fill:", fillExample);
fillExample.fill(9, 1, 4);
console.log("Despues fill:", fillExample);

const copyWithinExample = [1, 2, 3, 4, 5];
console.log("Antes copyWithin:", copyWithinExample);
copyWithinExample.copyWithin(0, 3);
console.log("Despues copyWithin:", copyWithinExample);

section("L) Iteradores");
const iterators = ["x", "y", "z"];
console.log("entries ->", [...iterators.entries()]);
console.log("keys ->", [...iterators.keys()]);
console.log("values ->", [...iterators.values()]);

section("M) Shallow copy (importante)");
const people = [
  { name: "Ana", score: 10 },
  { name: "Luis", score: 8 },
];

// Spread copies the array container, but nested objects keep same references.
const peopleCopy = [...people];
console.log("Antes de modificar copia:");
console.log("Original:", people);
console.log("Copia:", peopleCopy);

peopleCopy[0].score = 99;
console.log("Despues de modificar peopleCopy[0].score = 99:");
console.log("Original:", people);
console.log("Copia:", peopleCopy);
console.log("Explicacion: spread hizo copia superficial; los objetos internos son compartidos.");

console.log("\nHomework de arrays ejecutado correctamente.");
