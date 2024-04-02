import { filterTestCases } from "@celigo/aut-utilities";
var testCases = [
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
  "C63261",
  "CZZ57327_C50895_C50907",
];
var flakycases = JSON.parse(process.env.FLAKY_TEST_CASES);

(async () => {
  await filterTestCases(testCases, flakycases);
})();
