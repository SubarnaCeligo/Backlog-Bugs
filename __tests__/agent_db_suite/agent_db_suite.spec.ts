import { filterTestCases } from "@celigo/aut-utilities";
var testCases = [

  //  "C120199",
  //  "C120205",
  //  "C120208",
  //  "C120212",
   "C120217",
  //  "C120218",
 
];
var flakycases = JSON.parse(process.env.FLAKY_TEST_CASES);
(async () => {
  await filterTestCases(testCases, flakycases);
})();
