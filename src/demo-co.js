// const co = require('co');
function isPromise(obj) {
  return obj instanceof Promise
}
function co(gen) {
  var ctx = this;
  return new Promise(function(resolve, reject) {
    if (typeof gen === 'function') gen = gen.call(ctx);
    if (!gen || typeof gen.next !== 'function') return resolve(gen);

    onFulfilled();
    function next(ret) {
      if (ret.done) return resolve(ret.value);
      const { value } = ret;
      if (value && isPromise(value)) return value.then(onFulfilled);
    }
    function onFulfilled(res) {
      var ret;
      try {
        ret = gen.next(res);
      } catch (e) {
        return reject(e);
      }
      next(ret);
    }
  });
}

co(function* () {
  const res1 = yield Promise.resolve('1');
  const res2 = yield Promise.resolve('2');
  const res3 = yield Promise.resolve('3');
  console.log(res1, res2, res3);
});