import { filterTestCases } from "@celigo/aut-utilities"
var testCases = [
  // "C22352",
  // "C2512",
  // "C39939",
  // "C2467",
  // "C28383",
  // "C28390",
  // "C65079",
  // "C65078",
  // "C65081",
  // "C65083",
  // "C65088",
  // "C69770",
  // "C102559",
  // "C102560",
  // "C102561",
  // "C102562",
  // "C102563",
  // "C102903",
  // "C2148",
  // "C59380",
  // "C69560",
  // "C1077",
  // "C39971",
  // "C57329",
  // "C29053",
  // "C19150",
  // "C56639",
  // "C56641",
  // "C45328",
  // "C32964",
  "C27905",
  "C42979",
  "C2475",
  "C24202",
  "C22296",
  "C23885",
  "C15491",
  "C25797",
  "C2758",
  "C19568",
  "C113519",
  "C23882",
  "C19949",
  "C1479"

];

var flakycases = JSON.parse(process.env.FLAKY_TEST_CASES);
(async () => {
  await filterTestCases(testCases, flakycases, "Homepage")
})();
