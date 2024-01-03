import {filterTestCases} from "@celigo/aut-utilities"
var testCases = [
    "C110068", // C110068 should be at the end.
  ];
    var flakycases = JSON.parse(process.env.FLAKY_TEST_CASES);
    (async () => {
      await filterTestCases(testCases,flakycases)
    })();

