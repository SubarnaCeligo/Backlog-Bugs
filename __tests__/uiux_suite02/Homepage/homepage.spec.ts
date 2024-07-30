import { filterTestCases } from "@celigo/aut-utilities"
var testCases = [
  "C22352",
  "C2512",
  "C39939",
  "C2467",
  "C28383",
  "C28390",
 // "C65079", // removing as per the feature https://celigo.atlassian.net/browse/IO-76756
 // "C65078", // removing as per the feature https://celigo.atlassian.net/browse/IO-76756
  "C65083",
  "C65088",
  "C69770",
  //"C102560", //obsolete
  "C102903",
 // "C2148", // removing as per the feature https://celigo.atlassian.net/browse/IO-76756
  "C59380",
  "C69560",
  "C1077",
  //"C39971", //obsolete
  "C57329",
  "C29053",
 // "C19150", // removing as per the feature https://celigo.atlassian.net/browse/IO-76756
  "C56639",
  "C56641",
 // "C45328", // removing as per the feature https://celigo.atlassian.net/browse/IO-76756
  "C32964",
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
  "C1479",
  "C42384",
  "C42448",
  "C41692",
  "C42439",
  "C42444",
  "C41691",
  "C41702",
  "C36735",
  "C1517",
  "C36435",
  "C41698",
  "C34112",
  "C42442",
  "C12171",
  "C23059",
  "C19141",
  "C25866",
  "C755",
  "C26333",
  "C752",
  "C23046"
];

var flakycases = JSON.parse(process.env.FLAKY_TEST_CASES);
(async () => {
  await filterTestCases(testCases, flakycases, "Homepage")
})();
