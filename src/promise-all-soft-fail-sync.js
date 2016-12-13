module.exports = function (promiseArray) {
  return makeMeLookSync(function* () {
    for (let promise of promiseArray) {
      yield promise;
    }
  }).then(result=>result);
};

let makeMeLookSync = fn => {
  return new Promise((resolve)=> {
    let results = [];
    let iterator = fn();
    let loop = result => {
      if (!result.done && result.value.then((res) => {
          results.push(res);
          loop(iterator.next(res));
        }, (err)=> {
          results.push(err);
          loop(iterator.next(err));
        })) {
      } else {
        resolve(results);
      }
    };
    loop(iterator.next());
  });
};