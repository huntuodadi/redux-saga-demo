
### Buffer

Channel用到了ringBuffer(圆形缓冲区,也称作圆形队列（circular queue），循环缓冲区（cyclic buffer），环形缓冲区（ring buffer）)的数据结构，现在简单介绍一下

如下图所示，每一个格子都是一个缓存区，首位相连构成一个环形
![alt 属性文本](./static/ringBuffer.png)

环形队列里有两个指针，一个是push一个是take，记第一个push的元素的下标是0，队列长度是size，每次push或者take，对应指针+1，当超出size时，对应指针取余。

不固定长度的环形队列：这里的实现方式是push超出size时，double size。

ringBuffer暴露 put take flush isEmpty四个方法，其中flush的作用是冲刷队列，即清空剩余元素并返回。

```javascript

function ringBuffer(limit = 10) {
  console.log('init limit:', limit);
  let arr = new Array(limit)
  let length = 0
  let pushIndex = 0
  let popIndex = 0

  const push = it => {
    arr[pushIndex] = it
    pushIndex = (pushIndex + 1) % limit
    length++
  }

  const take = () => {
    if (length != 0) {
      let it = arr[popIndex]
      arr[popIndex] = null
      length--
      popIndex = (popIndex + 1) % limit
      return it
    }
  }

  const flush = () => {
    let items = []
    while (length) {
      items.push(take())
    }
    return items
  }

  return {
    isEmpty: () => length == 0,
    put: it => {
      if (length < limit) {
        push(it)
      } else {
        let doubledLimit
        doubledLimit = 2 * limit
        arr = flush()
        length = arr.length
        pushIndex = arr.length
        popIndex = 0
        arr.length = doubledLimit
        limit = doubledLimit
        push(it)
      }
    },
    take,
    flush,
    show: () => {
      console.log(arr);
    },
  }
}

const buffer = ringBuffer(5);
for (let i = 0; i < 10; i++ ) {
  buffer.put(i + 1);
}
console.log(buffer.take());
console.log(buffer.take());
buffer.show();
buffer.put('x');
buffer.show();

```

Channel

```javascript
export function channel(buffer = buffers.expanding()) {
  let closed = false
  let takers = []

  if (process.env.NODE_ENV !== 'production') {
    check(buffer, is.buffer, INVALID_BUFFER)
  }

  function checkForbiddenStates() {
    if (closed && takers.length) {
      throw internalErr(CLOSED_CHANNEL_WITH_TAKERS)
    }
    if (takers.length && !buffer.isEmpty()) {
      throw internalErr('Cannot have pending takers with non empty buffer')
    }
  }

  function put(input) {
    if (process.env.NODE_ENV !== 'production') {
      checkForbiddenStates()
      check(input, is.notUndef, UNDEFINED_INPUT_ERROR)
    }

    if (closed) {
      return
    }
    if (takers.length === 0) {
      return buffer.put(input)
    }
    const cb = takers.shift()
    cb(input)
  }

  function take(cb) {
    if (process.env.NODE_ENV !== 'production') {
      checkForbiddenStates()
      check(cb, is.func, "channel.take's callback must be a function")
    }

    if (closed && buffer.isEmpty()) {
      cb(END)
    } else if (!buffer.isEmpty()) {
      cb(buffer.take())
    } else {
      takers.push(cb)
      cb.cancel = () => {
        remove(takers, cb)
      }
    }
  }

  function flush(cb) {
    if (process.env.NODE_ENV !== 'production') {
      checkForbiddenStates()
      check(cb, is.func, "channel.flush' callback must be a function")
    }

    if (closed && buffer.isEmpty()) {
      cb(END)
      return
    }
    cb(buffer.flush())
  }

  function close() {
    if (process.env.NODE_ENV !== 'production') {
      checkForbiddenStates()
    }

    if (closed) {
      return
    }

    closed = true

    const arr = takers
    takers = []

    for (let i = 0, len = arr.length; i < len; i++) {
      const taker = arr[i]
      taker(END)
    }
  }

  return {
    take,
    put,
    flush,
    close,
  }
}
```
