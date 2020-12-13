/**
 * Composes single-argument functions from right to left. The rightmost
 * function can take multiple arguments as it provides the signature for
 * the resulting composite function.
 *
 * @param {...Function} funcs The functions to compose.
 * @returns {Function} A function obtained by composing the argument functions
 * from right to left. For example, compose(f, g, h) is identical to doing
 * (...args) => f(g(h(...args))).
 */
//在这里其实已经可以看到 compose(f, g, h)  执行结果就是  (...args) => f(g(h(...args)))
function compose() {
  for (var _len = arguments.length, funcs = Array(_len), _key = 0; _key < _len; _key++) {
    funcs[_key] = arguments[_key];
  }

  if (funcs.length === 0) {
    return function (arg) {
      return arg;
    };
  }

  if (funcs.length === 1) {
    return funcs[0];
  }

  return funcs.reduce(function (a, b) {
    console.log('a:', a, 'b:', b);
    return function () {
      return a(b.apply(undefined, arguments));
    };
  });
}

// add1(add2(add4))

// function res() {
//   // 返回add1的返回值
//   return (action) => {
//     // 返回add2的返回值
//     let res = (action + 4 + 2) + 1;
//     return res;
//   }
// }

const add1 = (next) => {
  return action => {
    let result = next(action) + 1
    return result
  }
}

// add2接受add4并返回一个 add4执行完再+2的函数
// add1接受add2并返回

const add2 = (next) => {
  return action => {
    let result = next(action) + 2
    return result
  }
}
// const add3 = (next) => {
//   return action => {
//     let result = next(action)
//     return result
//   }
// }
const add4 = (a) => {
  return a + 4;
}
const res = compose(add1, add2)(add4);
console.log(res(1));


