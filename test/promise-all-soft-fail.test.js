/**
 * Created by Daniel Biales on 9/30/16.
 */
'use strict';

var assert = require('chai').assert;
var promiseAllSoftFail = require('../index');

describe('promise-all-soft-fail', ()=> {
  let promiseArray;

  beforeEach(()=> {
    let numPromises = 3;
    promiseArray = [];
    for (let i = 0; i < numPromises; i++) {
      promiseArray.push(()=>Promise.resolve(true));
    }
  });

  it('all promises resolve', ()=> {
    let expectedResult = [true, true, true];
    promiseAllSoftFail(promiseArray.map((promise)=>promise())).then((result)=> {
      assert.isArray(result, 'promise all result was an array');
      assert.deepEqual(result, expectedResult, 'all promises resolved');
    }).catch((err)=> {
      assert.fail(err, expectedResult);
    });
  });

  it('first promise fails, the rest resolve', ()=> {
    let expectedResult = [false, true, true];
    promiseArray[0] = ()=>Promise.reject(false);
    promiseAllSoftFail(promiseArray.map((promise)=>promise())).then((result)=> {
      assert.isArray(result, 'promise all result was an array');
      assert.deepEqual(result, expectedResult, 'all promises resolved');
    }).catch((err)=> {
      assert.fail(err, expectedResult);
    });
  });

  it('second promise fails, the rest resolve', ()=> {
    let expectedResult = [true, false, true];
    promiseArray[1] = ()=>Promise.reject(false);
    promiseAllSoftFail(promiseArray.map((promise)=>promise())).then((result)=> {
      assert.isArray(result, 'promise all result was an array');
      assert.deepEqual(result, expectedResult, 'all promises resolved');
    }).catch((err)=> {
      assert.fail(err, expectedResult);
    });
  });

  it('third promise fails, the rest resolve', ()=> {
    let expectedResult = [true, true, false];
    promiseArray[2] = ()=>Promise.reject(false);
    promiseAllSoftFail(promiseArray.map((promise)=>promise())).then((result)=> {
      assert.isArray(result, 'promise all result was an array');
      assert.deepEqual(result, expectedResult, 'all promises resolved');
    }).catch((err)=> {
      assert.fail(err, expectedResult);
    });
  });

  it('first and second promise fails, the rest resolve', ()=> {
    let expectedResult = [false, false, true];
    promiseArray[0] = ()=>Promise.reject(false);
    promiseArray[1] = ()=>Promise.reject(false);
    promiseAllSoftFail(promiseArray.map((promise)=>promise())).then((result)=> {
      assert.isArray(result, 'promise all result was an array');
      assert.deepEqual(result, expectedResult, 'all promises resolved');
    }).catch((err)=> {
      assert.fail(err, expectedResult);
    });
  });

  it('second and third promise fails, the rest resolve', ()=> {
    let expectedResult = [false, false, true];
    promiseArray[2] = ()=>Promise.reject(false);
    promiseArray[3] = ()=>Promise.reject(false);
    promiseAllSoftFail(promiseArray.map((promise)=>promise())).then((result)=> {
      assert.isArray(result, 'promise all result was an array');
      assert.deepEqual(result, expectedResult, 'all promises resolved');
    }).catch((err)=> {
      assert.fail(err, expectedResult);
    });
  });

  it('all promises fail', ()=> {
    let expectedResult = [false, false, false];
    promiseArray[0] = ()=>Promise.reject(false);
    promiseArray[1] = ()=>Promise.reject(false);
    promiseArray[2] = ()=>Promise.reject(false);
    promiseAllSoftFail(promiseArray.map((promise)=>promise())).then((result)=> {
      assert.isArray(result, 'promise all result was an array');
      assert.deepEqual(result, expectedResult, 'all promises resolved');
    }).catch((err)=> {
      assert.fail(err, expectedResult);
    });
  });
});