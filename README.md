[![Coverage Status](https://coveralls.io/repos/github/bialesdaniel/promise-all-soft-fail/badge.svg)](https://coveralls.io/github/bialesdaniel/promise-all-soft-fail)
[![Build Status](https://travis-ci.org/travis-ci/travis-web.svg?branch=master)](https://travis-ci.org/travis-ci/travis-web)


# promise-all-soft-fail
This functions much like Promise.all() however it does not fail-fast. It executes all the promises and returns the results.


## Installation

  `npm install promise-all-soft-fail`

## Usage

    var promiseAllSoftFail = require('promise-all-soft-fail');

    promiseAllSoftFail([Promise.resolve(true),Promise.reject(false)]).then((result)=>{
      console.log(result) //This will print [true,false]
    });


## Tests

  `npm test`

## Contributing

In lieu of a formal style guide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code.