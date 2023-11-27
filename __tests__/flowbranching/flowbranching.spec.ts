import {filterTestCases} from "@celigo/aut-utilities"
var testCases = [
"flowbranching_api",
"flowbranching_UI",
"C110781_C110787_C110788_C111507"
];
var flakycases = JSON.parse(process.env.FLAKY_TEST_CASES);

(async () => {
  await filterTestCases(testCases,flakycases,"flowbranching");
})();


