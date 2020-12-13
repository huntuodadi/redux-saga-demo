
// 支持单参数
var currying = function(fn) {
  // args 获取第一个方法内的全部参数
  var args = Array.prototype.slice.call(arguments, 1)
  return function() {
      // 将后面方法里的全部参数和args进行合并
      var newArgs = args.concat(Array.prototype.slice.call(arguments))
      // 把合并后的参数通过apply作为fn的参数并执行
      return fn.apply(this, newArgs)
  }
}

function addAll() {
  const args = Array.prototype.slice.call(arguments);
  return args.reduce((current, next) => {
    return current + next;
  })
}

function addSome(a,b,c) {
  return a + b +c;
}

function multiCurrying(fn, args) {
  let _args = args || [];
  const _length = fn.length;
  const _self = this;
  return function() {
    const newArgs = _args.concat(Array.prototype.slice.call(arguments));
    if(newArgs.length < _length) {
      return multiCurrying.call(_self, fn, newArgs);
    }
    return fn.apply(_self, newArgs);
  }
}

const newAdd = currying(addAll, 1, 2);
const newAddSome = multiCurrying(addSome);
console.log(newAddSome(2, 3, 4, 5, 6));

return;

// 实现一个add方法，使计算结果能够满足如下预期：

function add() {
  const args = Array.prototype.slice.call(arguments);
  function __add() {
    console.log('push:', arguments);
    args.push(...arguments);
    return __add;
  }
  __add.toString = () => {
    console.log('args:', args);
    return args.reduce((a, b) => {
      return a+ b;
    });
  }
  return __add;
}

console.log(add(1,2,3)(4)(5).toString());
