import { filterTestCases } from "@celigo/aut-utilities";
var testCases = [
  "C53343",
  "C53344",
  "C53345",
  "C53346",
  "C63011",
  "C63015",
  "C63021",
  "C63022",
  "C63024",
  "C63061",
  "C63064",
  "C63002",
  "C63003",
  "C63005",
  "C63006",
  "C63007",
  "C63008",
  "C63010",
  "C64961",
  "C67220",
  "C59643",
  "C59644",
  "C59657",
  "C59658",
  "C59859",
  "C60099",
  "C55826",
  "C63003",
  "C63004",
  "C68717",
  "C63062",
  "C67117",
  "C65462",
  "C65490",
  "C67022",
  "C52775",
  "C97060",
  "C113528",
  "C113520",
  "C113527",
  "C112773",
  "C112774",
  "C112776",
  "C112777",
  "C112778",
  "C112779",
  "C109343",
  "CIO44682",
  "C112065",
  "C112070",
  "C112075",
  "C112080",
  "C113404",
  "C63009",
  "C68978",
  "C77905",
  "C51572"
];

var flakycases = JSON.parse(process.env.FLAKY_TEST_CASES);

(async () => {
  await filterTestCases(testCases, flakycases, "connections");
})();
