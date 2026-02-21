const title = (name) => console.log(`\n=== ${name} ===`);

const base = [1, 2, 3, 4, 5];

title("Array.isArray / Array.of / Array.from");
console.log(Array.isArray(base));
console.log(Array.of(10, 20, 30));
console.log(Array.from("IMDERE"));

const mutable = [1, 2, 3];

title("push / pop / unshift / shift");
mutable.push(4);
console.log(mutable);
mutable.pop();
console.log(mutable);
mutable.unshift(0);
console.log(mutable);
mutable.shift();
console.log(mutable);

title("concat / slice / splice");
console.log(base.concat([6, 7]));
console.log(base.slice(1, 4));
const sp = [...base];
sp.splice(2, 1, 99);
console.log(sp);

title("at / indexOf / lastIndexOf / includes");
console.log(base.at(-1));
console.log([1, 2, 3, 2].indexOf(2));
console.log([1, 2, 3, 2].lastIndexOf(2));
console.log(base.includes(4));

title("join / toString / toLocaleString");
console.log(base.join("-"));
console.log(base.toString());
console.log(base.toLocaleString("en-US"));

title("reverse / toReversed");
const rev = [...base];
rev.reverse();
console.log(rev);
console.log(base.toReversed());

title("sort / toSorted");
const nums = [10, 3, 25, 1];
console.log([...nums].sort((a, b) => a - b));
console.log(nums.toSorted((a, b) => b - a));

title("fill / copyWithin / with");
console.log([...base].fill(0, 1, 3));
console.log([1, 2, 3, 4, 5].copyWithin(0, 3));
console.log(base.with(2, 999));

title("map / flatMap / filter");
console.log(base.map((n) => n * 2));
console.log([1, 2, 3].flatMap((n) => [n, n * 10]));
console.log(base.filter((n) => n % 2 === 0));

title("reduce / reduceRight");
console.log(base.reduce((acc, n) => acc + n, 0));
console.log(["a", "b", "c"].reduceRight((acc, c) => acc + c, ""));

title("every / some");
console.log(base.every((n) => n > 0));
console.log(base.some((n) => n > 4));

title("find / findIndex / findLast / findLastIndex");
console.log(base.find((n) => n > 3));
console.log(base.findIndex((n) => n > 3));
console.log([1, 2, 3, 2, 1].findLast((n) => n % 2 === 0));
console.log([1, 2, 3, 2, 1].findLastIndex((n) => n % 2 === 0));

title("forEach");
base.forEach((n, i) => console.log(`i=${i}, n=${n}`));

title("entries / keys / values");
console.log(Array.from(base.entries()));
console.log(Array.from(base.keys()));
console.log(Array.from(base.values()));

title("flat");
console.log([1, [2, [3, [4]]]].flat(2));

console.log("\nHomework Arrays completado.");
