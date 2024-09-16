import { filterTestCases } from "@celigo/aut-utilities";
var testCases = [
  "C51036",
  "C50896",
  "C50901",
  "C50906",
  "C50905",
  "C50900",
  "C45581",
  "C45823",
  "C69015",
  "C45579",
  "C45580",
  "C51044",
  "C57328",
  "C45830",
  "C41699",
  "C41684",
  "C41700",
  "C2206",
  "C50903",
  "C1583",
  //"C63261", // logout testcase
  //"C57327_C50895_C50907", // logout testcase
  "T19621",
  "T17234",
  "T17246",
  "T19656",
  "T17217",
  "C50998",
  "C50904",
  "T17222",
  //"C45822", //MFA Reset case, it will effect the whole suite
  //"C45832"  //MFA Reset case, it will effect the whole suite
];
var flakycases = JSON.parse(process.env.FLAKY_TEST_CASES);

(async () => {
  await filterTestCases(testCases, flakycases);
})();
