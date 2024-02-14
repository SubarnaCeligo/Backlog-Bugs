import {filterTestCases} from "@celigo/aut-utilities"
var testCases = [
"C21052",
"C14706",
"C25638",
"C2843"
];
var flakycases = JSON.parse(process.env.FLAKY_TEST_CASES);
    (async () => {
      await filterTestCases(testCases,flakycases,"react")
    })();

