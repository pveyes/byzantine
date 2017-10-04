// type StartEnd = {
//   // line from
//   start: { line: number, column: number },
//   end: { line: number, column: number }
// };
//
// type StatementIdCountMap = {
//   // id: count
//   [id: string]: number,
// };
//
// type Coverage = {
//   path: string,
//   statementMap: {
//     [statementId: string]: StartEnd
//   },
//   fnMap: {
//     [functionId: string]: {
//       name: string,
//       decl: StartEnd,
//       loc: StartEnd,
//     }
//   },
//   branchMap: {
//     [index: string]: {
//       loc: StartEnd,
//       type: string,
//       locations: Array<StartEnd>,
//       line: number,
//     }
//   },
//   // hash of statements count
//   s: StatementIdCountMap,
//   // hash of branch counts
//   b: StatementIdCountMap,
//   // hash of function counts
//   f: StatementIdCountMap,
// };
//
// type CoverageJSON = {
//   [path: string]: Coverage
// }

function generateEmptyReport() {
  return {
    covered: 0,
    all: 0,
  };
}

/**
 * Istanbul coverage parser based on
 * https://github.com/gotwarlost/istanbul/blob/master/coverage.json.md
 */
module.exports = function parseCoverage(json) {
  const paths = Object.keys(json);

  return paths.map((path) => {
    const coverage = json[path];

    const branches = generateEmptyReport();
    const statements = generateEmptyReport();
    const functions = generateEmptyReport();

    const branchIds = Object.keys(coverage.b);
    branchIds.forEach(id => {
      const result = coverage.b[id];
      result.forEach(r => {
        branches.covered += r > 0 ? 1 : 0;
        branches.all += 1;
      });
    });

    const statementIds = Object.keys(coverage.s);
    statementIds.forEach(id => {
      statements.covered += coverage.s[id] > 0 ? 1 : 0;
      statements.all += 1;
    });

    const functionIds = Object.keys(coverage.f);
    functionIds.forEach(id => {
      functions.covered += coverage.f[id] > 0 ? 1 : 0;
      functions.all += 1;
    });

    // We don't return line coverage because it's no longer relevant
    // https://github.com/gotwarlost/istanbul/issues/639
    return {
      path,
      branches,
      statements,
      functions,
    };
  })
}
