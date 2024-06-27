import {filterTestCases} from "@celigo/aut-utilities"
var testCases = [
  "C58036",
  "T1127",
  "C27422"
];
var flakycases = JSON.parse(process.env.FLAKY_TEST_CASES);
    (async () => {
      await filterTestCases(testCases,flakycases,"IAF2.0")
    })();
