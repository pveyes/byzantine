# Byzantine

[![Greenkeeper badge](https://badges.greenkeeper.io/pveyes/byzantine.svg)](https://greenkeeper.io/)

> Istanbul json coverage parser

## Install

Byzantine expects node 6

```sh
yarn add byzantine
# or
npm install byzantine --save
```

## Usage

Byzantine has 2 module: `parse` and `aggregate`:

```js
const parse = require('byzantine');
const aggregate = require('byzantine/aggregate');
const json = require('./coverage/coverage-final.json');

// returns Array<Coverage>
const coverages = parse(json);
// returns CoverageAggregate
const { statements, branches, functions } = aggregate(coverages);
```

The main module (`byzantine`) returns array of simplified coverage information.

```js
type Coverage {
  path: String
  statements: CoverageData
  branches: CoverageData
  functions: CoverageData
}

type CoverageData {
  covered: Int
  all: Int
}
```

`aggregate` returns percentage of coverage for each category in `Float`, or `null` for empty array

```js
type CoverageAggregate {
  statements: ?Float
  branches: ?Float
  functions: ?Float
}
```

## License

MIT
