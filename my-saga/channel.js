export const stdChannel = () => {
  let currentTakers = [];
  function take(taker, matcher){
    taker['MATCH'] = matcher;
    taker.cancel = () => {
      currentTakers = currentTakers.filter(item => item !== taker);
    }
    currentTakers.push(taker);
  }
  function put(input) {
    currentTakers.forEach(taker => {
      if(taker['MATCH'](input)) {
        taker.cancel();
        taker(input);
      }
    });
  }
  return { take, put }
}

const channel = stdChannel();

function next() {

}
function matcher(input) {
  return input.type === 'ASYNC_ADD';
}
channel.take(next, matcher);

channel.put({type: 'ASYNC_ADD'});
channel.put({type: 'ASYNC_ADD'});
channel.put({type: 'ASYNC_ADD'});