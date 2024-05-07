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
  "CIO27733",
  "CIO27734",
  "CIO27735",
  "CIO27736",
  "CIO27737",
  "CIO27738",
  "CIO27740",
  "CIO27741",
  "C34462",
  "T29043",
  "IO-T29698_IO-T29699_IO-T29703_IO-T29705_IO-T29706_IO-T29707",
  "IO-T29708_T29709_IO-T29700_IO-T29701_IO-T29702",
  "IO-T29711_IO-T29712_IO-T29704",
  "IO-T29713_IO-T29712",
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
