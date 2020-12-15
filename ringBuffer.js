
function ringBuffer(limit = 10, overflowAction) {
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
        switch (overflowAction) {
          case 5:
            doubledLimit = 2 * limit

            arr = flush()

            length = arr.length
            pushIndex = arr.length
            popIndex = 0

            arr.length = doubledLimit
            limit = doubledLimit

            push(it)
            break
          default:
          // DROP
        }
      }
    },
    take,
    flush,
    show: () => {
      console.log(arr);
    },
  }
}

const buffer = ringBuffer(5, 5);
for (let i = 0; i < 10; i++ ) {
  buffer.put(i + 1);
}
console.log(buffer.take());
console.log(buffer.take());
buffer.show();
buffer.put('x');
buffer.show();
