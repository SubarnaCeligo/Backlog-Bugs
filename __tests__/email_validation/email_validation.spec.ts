import {filterTestCases} from "@celigo/aut-utilities"
var testCases = [
// "C1465",
// "C20688",
// "C21535",
// "C22272_C22271",
// "C22277",
// // "C22303",
// "C22304_C22273",
// "C22305",
// "C22306_C25792",
// "C22310",
// "C25704",
// "C27516",
// "C45204"
"C47437"
];
var flakycases = JSON.parse(process.env.FLAKY_TEST_CASES);

(async () => {
  await filterTestCases(testCases,flakycases);
})();
