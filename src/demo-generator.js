function* simpleGenerator() {
  const value1 = yield 1;
  value1 && console.log(value1);
  const value2 = yield 2;
  value2 && console.log(value2);
  const value3 = yield 3;
  value3 && console.log(value3);
}
const iterator = simpleGenerator();

console.log(iterator.next('aa'));
console.log(iterator.next('bb'));
console.log(iterator.next('cc'));
console.log(iterator.next('dd'));