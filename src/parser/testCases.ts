export type TestCase = {
  label?: string;
  expression: string;
  expected?: number | boolean;
  shouldFail?: boolean;
};

export const testCases: TestCase[] = [
  // Required examples
  {
    expression: "1 + 2 = 3",
    expected: true,
  },
  {
    expression: "2 * 3 + 4 = 10",
    expected: true,
  },
  {
    expression: "2 * (3 + 4) = 10",
    expected: false,
  },
  {
    expression: "6 = 10 / 2 + 1",
    expected: true,
  },
  {
    expression: "12 + 3 != 4 / 2 + 5",
    expected: true,
  },
  {
    expression: "2 + 3 * 2 = 10",
    expected: false,
  },
  {
    expression: "2 * 3 + 4 != 10",
    expected: false,
  },
  {
    expression: "1 + (2 = 3",
    shouldFail: true,
  },

  // Additional robustness cases
  {
    label: "handles left-associative division",
    expression: "10 / 2 / 5",
    expected: 1,
  },
  {
    label: "follows JavaScript numeric semantics for division by zero",
    expression: "10 / 0",
    expected: Infinity,
  },
  {
    label: "follows JavaScript numeric semantics for zero divided by zero",
    expression: "0 / 0",
    expected: NaN,
  },

  // Bonus features
  {
    label: "supports exponentiation",
    expression: "2 ** 3",
    expected: 8,
  },
  {
    label: "applies exponentiation before multiplication",
    expression: "2 * 3 ** 2",
    expected: 18,
  },
  {
    label: "treats exponentiation as right-associative",
    expression: "2 ** 3 ** 2",
    expected: 512,
  },
  {
    label: "supports unary minus",
    expression: "-5 + 2",
    expected: -3,
  },
  {
    label: "supports unary plus",
    expression: "+5 + 2",
    expected: 7,
  },
  {
    label: "supports unary operator with grouped expressions",
    expression: "-(2 + 3)",
    expected: -5,
  },
  {
    label: "supports exponentiation with negative exponent",
    expression: "5 ** -2",
    expected: 0.04,
  },
];

export function normalizeTestCases(testCases: TestCase[]) {
  return testCases.map((testCase) => ({
    ...testCase,

    label:
      testCase.label ??
      (testCase.shouldFail
        ? `fails parsing for "${testCase.expression}"`
        : `evaluates "${testCase.expression}" to ${String(testCase.expected)}`),
  }));
}

export const normalizedTestCases = normalizeTestCases(testCases);

export const normalizedAstTestCases = normalizedTestCases
  .filter(({ shouldFail }) => !shouldFail)
  .map((testCase) => ({
    ...testCase,
    label: `snapshots AST for "${testCase.expression}"`,
  }));
