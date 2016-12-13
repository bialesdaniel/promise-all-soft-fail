[![npm version](https://badge.fury.io/js/promise-all-soft-fail.svg)](https://badge.fury.io/js/promise-all-soft-fail)
[![Coverage Status](https://coveralls.io/repos/github/bialesdaniel/promise-all-soft-fail/badge.svg?branch=master)](https://coveralls.io/github/bialesdaniel/promise-all-soft-fail?branch=master)
[![Build Status](https://travis-ci.org/bialesdaniel/promise-all-soft-fail.svg?branch=master)](https://travis-ci.org/bialesdaniel/promise-all-soft-fail)


# promise-all-soft-fail
This functions much like Promise.all() however it does not fail-fast. It executes all the promises and returns the results.


## Installation

  `npm install promise-all-soft-fail`

## Usage

####promiseAllSoftFail([promiseArray])
This functions much like Promise.all() however it does not fail-fast. It executes all the promises and returns the results.

    let promiseAllSoftFail = require('promise-all-soft-fail').promiseAllSoftFail;

    promiseAllSoftFail([Promise.resolve(true),Promise.reject(false)]).then((result)=>{
      console.log(result); //This will print [true,false]
    });
####promiseAllSoftFailSync([promiseArray])
This executes all the promises in an array in sequential order. It will execute all the promises whether they resolve or reject. This returns an array of the resolved or rejected values.

    let promiseAllSoftFailSync = require('promise-all-soft-fail').promiseAllSoftFailSync;

    promiseAllSoftFailSync([Promise.resolve(1),Promise.reject(2),Promise.resolve(3)]).then((result)=>{
      console.log(result); //This will print [1,2,3]
    });

## Tests

  Test
  `npm test`

  Coverage
  `npm run cover`

## Contributing

In lieu of a formal style guide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code.