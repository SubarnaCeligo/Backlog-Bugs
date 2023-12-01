import { filterTestCases } from "@celigo/aut-utilities";
var testCases = [
  "C1458",
  "C1459",
  "C53278",
  "C56649",
  "C2203",
  "C27977",
  "C27978",
  "C33167",
  "C53277",
  "C45340",
  "C1466",
  "C22457",
  "C33161",
  "C53278",
  "C56649",
  "C59848",
  "C60440",
  "C59978",
  "C59979",
  "C28982"
];
var flakycases = JSON.parse(process.env.FLAKY_TEST_CASES);
(async () => {
  await filterTestCases(testCases, flakycases, "flows");
})();
