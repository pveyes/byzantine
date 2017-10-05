module.exports = function aggregateCoverage(coverages) {
  let statements = 0;
  let statementCount = 0;
  let branches = 0;
  let branchCount = 0;
  let functions = 0;
  let functionCount = 0;

  if (coverages.length === 0) {
    return {
      statements: null,
      branches: null,
      functions: null,
    };
  }

  coverages.forEach(coverage => {
    statements += coverage.statements.covered;
    statementCount += coverage.statements.all;

    branches += coverage.branches.covered;
    branchCount += coverage.branches.all;

    functions += coverage.functions.covered;
    functionCount += coverage.functions.all;
  });

  if (statementCount === 0) {
    statements = 100;
  } else {
    statements = statements / statementCount * 100;
  }

  if (branchCount === 0) {
    branches = 100;
  } else {
    branches = branches / branchCount * 100;
  }

  if (functionCount === 0) {
    functions = 100;
  } else {
    functions = functions / functionCount * 100;
  }

  return {
    statements,
    branches,
    functions,
  };
}
