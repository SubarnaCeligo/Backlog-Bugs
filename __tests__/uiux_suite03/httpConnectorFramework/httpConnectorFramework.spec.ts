import {filterTestCases} from "@celigo/aut-utilities"
var testCases = [
  "C77873",
  "T32558",
  "T32564",
];
var flakycases = JSON.parse(process.env.FLAKY_TEST_CASES);
    (async () => {
      await filterTestCases(testCases,flakycases,"httpConnectorFramework")
    })();

