const aggregate = require('../aggregate');

test('aggregates single coverages', () => {
  const coverages = [
    {
      statements: {
        covered: 8,
        all: 12,
      },
      branches: {
        covered: 0,
        all: 0,
      },
      functions: {
        covered: 0,
        all: 2,
      },
    }
  ];

  expect(aggregate(coverages)).toMatchSnapshot();
});

test('aggregates multiple coverages', () => {
  const coverages = [
    {
      statements: {
        covered: 14,
        all: 27,
      },
      branches: {
        covered: 5,
        all: 10,
      },
      functions: {
        covered: 0,
        all: 0,
      },
    },
    {
      statements: {
        covered: 8,
        all: 12,
      },
      branches: {
        covered: 0,
        all: 0,
      },
      functions: {
        covered: 0,
        all: 2,
      },
    }
  ];

  expect(aggregate(coverages)).toMatchSnapshot();
});

test('empty coverages', () => {
  const result = aggregate([]);
  expect(result).toMatchSnapshot();
})
