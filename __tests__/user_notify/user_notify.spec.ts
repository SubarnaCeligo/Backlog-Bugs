import {filterTestCases} from "@celigo/aut-utilities"
var testCases = [
"C118374_C118381_C118380",
"C118366_C118376_C118375_C118371_C118373_C118367",
];
var flakycases = JSON.parse(process.env.FLAKY_TEST_CASES);

(async () => {
  await filterTestCases(testCases,flakycases);
})();