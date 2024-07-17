import {filterTestCases} from "@celigo/aut-utilities"
var testCases = [
  "C42051",
  "C42038"
];
var flakycases = JSON.parse(process.env.FLAKY_TEST_CASES);
    (async () => {
      await filterTestCases(testCases,flakycases,"resourceAliases")
    })();
