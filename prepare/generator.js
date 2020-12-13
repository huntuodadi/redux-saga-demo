// function* helloGenerator(initialValue) {
//   console.log('initialValue:', initialValue);
//   const value1 = yield 1;
//   console.log('value1:', value1);
//   const value2 = yield 2;
//   console.log('value2:', value2);
//   const value3 = yield 3;
//   console.log('value3:', value3);
// }



// function generatorWrapper(generatorFun) {
//   return function(...args) {
//     let generatorObj = generatorFun(...args);
//     generatorObj.next();
//     return generatorObj;
//   }
// }

// const wrapped = generatorWrapper(helloGenerator);

// const iterator = wrapped(4);
// console.log(iterator.next('a'));
// console.log(iterator.next('b'));
// console.log(iterator.next());
// console.log(iterator.next());


var g = function* () {
  try {
    yield;
  } catch (e) {
    console.log('内部捕获', e);
  }
};

var i = g();
// i.next();

try {
  i.throw('a');
  i.throw('b');
} catch (e) {
  console.log('外部捕获', e);
}