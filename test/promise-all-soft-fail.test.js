/**
 * Created by Daniel Biales on 9/30/16.
 */
'use strict';

const assert = require('chai').assert;
const promiseAllSoftFail = require('../index').promiseAllSoftFail;

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
    return promiseAllSoftFail(promiseArray.map((promise)=>promise())).then((result)=> {
      assert.isArray(result, 'promise all result was an array');
      assert.deepEqual(result, expectedResult, 'all promises resolved');
    });
  });

  it('first promise fails, the rest resolve', ()=> {
    let expectedResult = [false, true, true];
    promiseArray[0] = ()=>Promise.reject(false);
    return promiseAllSoftFail(promiseArray.map((promise)=>promise())).then((result)=> {
      assert.isArray(result, 'promise all result was an array');
      assert.deepEqual(result, expectedResult, 'all promises resolved');
    });
  });

  it('second promise fails, the rest resolve', ()=> {
    let expectedResult = [true, false, true];
    promiseArray[1] = ()=>Promise.reject(false);
    return promiseAllSoftFail(promiseArray.map((promise)=>promise())).then((result)=> {
      assert.isArray(result, 'promise all result was an array');
      assert.deepEqual(result, expectedResult, 'all promises resolved');
    });
  });

  it('third promise fails, the rest resolve', ()=> {
    let expectedResult = [true, true, false];
    promiseArray[2] = ()=>Promise.reject(false);
    return promiseAllSoftFail(promiseArray.map((promise)=>promise())).then((result)=> {
      assert.isArray(result, 'promise all result was an array');
      assert.deepEqual(result, expectedResult, 'all promises resolved');
    });
  });

  it('first and second promise fails, the rest resolve', ()=> {
    let expectedResult = [false, false, true];
    promiseArray[0] = ()=>Promise.reject(false);
    promiseArray[1] = ()=>Promise.reject(false);
    return promiseAllSoftFail(promiseArray.map((promise)=>promise())).then((result)=> {
      assert.isArray(result, 'promise all result was an array');
      assert.deepEqual(result, expectedResult, 'all promises resolved');
    });
  });

  it('second and third promise fails, the rest resolve', ()=> {
    let expectedResult = [true, false, false];
    promiseArray[1] = ()=>Promise.reject(false);
    promiseArray[2] = ()=>Promise.reject(false);
    return promiseAllSoftFail(promiseArray.map((promise)=>promise())).then((result)=> {
      assert.isArray(result, 'promise all result was an array');
      assert.deepEqual(result, expectedResult, 'all promises resolved');
    });
  });

  it('all promises fail', ()=> {
    let expectedResult = [false, false, false];
    promiseArray[0] = ()=>Promise.reject(false);
    promiseArray[1] = ()=>Promise.reject(false);
    promiseArray[2] = ()=>Promise.reject(false);
    return promiseAllSoftFail(promiseArray.map((promise)=>promise())).then((result)=> {
      assert.isArray(result, 'promise all result was an array');
      assert.deepEqual(result, expectedResult, 'all promises resolved');
    });
  });
});