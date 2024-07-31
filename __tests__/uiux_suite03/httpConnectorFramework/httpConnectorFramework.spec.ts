import {filterTestCases} from "@celigo/aut-utilities"
var testCases = [
  "C77873",
  "T32558",
  "T32564",
  "IO-T35074",
  "IO-T35084",
  "IO-T35083",
  "IO-T35105",
];
var flakycases = JSON.parse(process.env.FLAKY_TEST_CASES);
    (async () => {
      await filterTestCases(testCases,flakycases,"httpConnectorFramework")
    })();

