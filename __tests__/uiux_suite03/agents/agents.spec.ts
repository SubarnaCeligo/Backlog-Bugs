import {filterTestCases} from "@celigo/aut-utilities"
var testCases = [
"C2082",
"C110451",
"C104745",
"T18480_T18478",
];
var flakycases = JSON.parse(process.env.FLAKY_TEST_CASES);

(async () => {
  await filterTestCases(testCases,flakycases,"agents");
})();
