import { filterTestCases } from "@celigo/aut-utilities";
var testCases = [
  "C61932",
  "C1516",
  "C39973",
  //"C57331", Need to setup separate suite for this
  "C58439",
  "C66307",
  "C59642",
  "C59659",
  "C56424",
  "IOT1124",
  "C52880",
  "C59861",
  "C59938",
  "T1087",
  "C59780",
  "T898",
  "IO-T37526",
];
var flakycases = JSON.parse(process.env.FLAKY_TEST_CASES);
(async () => {
  await filterTestCases(testCases, flakycases);
})();
