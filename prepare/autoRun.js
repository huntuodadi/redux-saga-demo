function step(value) {
  console.log('process:', value);
  return value + 1;
}

function* longRunningTask(value1) {
  try {
    var value2 = yield step(value1);
    var value3 = yield step(value2);
    var value4 = yield step(value3);
    var value5 = yield step(value4);
    // Do something with value4
  } catch (e) {
    // Handle any error from step1 through step4
  }
}

scheduler(longRunningTask(1));

function scheduler(task, cache) {
  var taskObj = task.next(cache);
  // 如果Generator函数未结束，就继续调用
  if (!taskObj.done) {
    cache = taskObj.value
    scheduler(task, cache);
  }
}