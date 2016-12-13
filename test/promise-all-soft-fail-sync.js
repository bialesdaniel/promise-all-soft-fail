/**
 * Created by Daniel Biales on 12/13/16.
 */

const assert = require('chai').assert;
const promiseAllSoftFailSync = require('../index').promiseAllSoftFailSync;

let asyncTask = (delay) =>
  new Promise((resolve, reject) => {
    if (delay < 10) {
      setTimeout(function () {
        resolve(delay);
      }, delay);
    } else {
      setTimeout(function () {
        reject(delay);
      }, delay);
    }
  });

describe('promise-all-soft-fail-sync', ()=> {

  it('all promises resolve in order', ()=> {
    let expectedResult = [5, 3, 1];
    return promiseAllSoftFailSync([asyncTask(expectedResult[0]), asyncTask(expectedResult[1]), asyncTask(expectedResult[2])]).then((result)=> {
      assert.isArray(result, 'promise all result was an array');
      assert.deepEqual(result, expectedResult, 'all promises resolved');
    });
  });
  it('first promise fails, the rest resolve', ()=> {
    let expectedResult = [11, 3, 1];
    return promiseAllSoftFailSync([asyncTask(expectedResult[0]), asyncTask(expectedResult[1]), asyncTask(expectedResult[2])]).then((result)=> {
      assert.isArray(result, 'promise all result was an array');
      assert.deepEqual(result, expectedResult, 'all promises resolved');
    });
  });

  it('second promise fails, the rest resolve', ()=> {
    let expectedResult = [5, 11, 1];
    return promiseAllSoftFailSync([asyncTask(expectedResult[0]), asyncTask(expectedResult[1]), asyncTask(expectedResult[2])]).then((result)=> {
      assert.isArray(result, 'promise all result was an array');
      assert.deepEqual(result, expectedResult, 'all promises resolved');
    });
  });

  it('third promise fails, the rest resolve', ()=> {
    let expectedResult = [5, 3, 11];
    return promiseAllSoftFailSync([asyncTask(expectedResult[0]), asyncTask(expectedResult[1]), asyncTask(expectedResult[2])]).then((result)=> {
      assert.isArray(result, 'promise all result was an array');
      assert.deepEqual(result, expectedResult, 'all promises resolved');
    });
  });

  it('first and second promise fails, the rest resolve', ()=> {
    let expectedResult = [11, 12, 1];
    return promiseAllSoftFailSync([asyncTask(expectedResult[0]), asyncTask(expectedResult[1]), asyncTask(expectedResult[2])]).then((result)=> {
      assert.isArray(result, 'promise all result was an array');
      assert.deepEqual(result, expectedResult, 'all promises resolved');
    });
  });

  it('second and third promise fails, the rest resolve', ()=> {
    let expectedResult = [5, 11, 12];
    return promiseAllSoftFailSync([asyncTask(expectedResult[0]), asyncTask(expectedResult[1]), asyncTask(expectedResult[2])]).then((result)=> {
      assert.isArray(result, 'promise all result was an array');
      assert.deepEqual(result, expectedResult, 'all promises resolved');
    });
  });

  it('all promises fail', ()=> {
    let expectedResult = [11, 12, 13];
    return promiseAllSoftFailSync([asyncTask(expectedResult[0]), asyncTask(expectedResult[1]), asyncTask(expectedResult[2])]).then((result)=> {
      assert.isArray(result, 'promise all result was an array');
      assert.deepEqual(result, expectedResult, 'all promises resolved');
    });
  });
});

