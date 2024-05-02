import { filterTestCases } from "@celigo/aut-utilities";
var testCases = [
  "C43526",
  "C33162",
  "C33166",
  "C61343",
  "C33165",
  "C61022",
  "C22818",
  "C63406",
  "C63001",
  "C63111",
  "C52427",
  "C93561",
  "C30504",
  "C113932",
  "C120083",
  "C30482",
  "C103678",
  "C34462",
  "T29043",
  "IO-T29698",
  "IO-T29708",
  "IO-T29711",
  "IO-T29713",
  "IO-T29714",
  "IO-T29716",
  "IO-T29717",
  "IO-T29719",
  "IO-T29720"

];
var flakycases = JSON.parse(process.env.FLAKY_TEST_CASES);
(async () => {
  await filterTestCases(testCases, flakycases, "imports");
})();
