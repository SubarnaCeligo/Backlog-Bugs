import {filterTestCases} from "@celigo/aut-utilities"
var testCases = [
  // "C53063",
  //   "C110068", // C110068 should be at the end.,
    "C1234"
  ];
    var flakycases = JSON.parse(process.env.FLAKY_TEST_CASES);
    (async () => {
      await filterTestCases(testCases,flakycases)
    })();