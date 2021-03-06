/**
 * Created by Daniel Biales on 12/13/16.
 */
module.exports = promiseAllSoftFail;

function promiseAllSoftFail(promiseArray) {
  return Promise.all(promiseArray.map(softFail)).then((results)=> {
    return results;
  });
}

function softFail(promise) {
  return new Promise((resolve) => {
    promise
      .then(resolve)
      .catch(resolve);
  });
}