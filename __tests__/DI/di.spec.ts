import { filterTestCases } from "@celigo/aut-utilities";
var testCases = [
  //"T30768_T30768_T30769",
  //"T30781_T30771_T30776",
  //"T30793_T30774_T30810",
  //"T30779_T30784_T30787",
  //"T30783_T30782_T30777_T30778",
  //"T30794_T30789_T30795",
  "T30805_T30819_T30800_T30802_T30816",
  // "TC_T30803_T30818_T30815_T30807",
  // "TC_T30847_T30801_T30822_T30811"

];
var flakycases = JSON.parse(process.env.FLAKY_TEST_CASES);
(async () => {
  await filterTestCases(testCases, flakycases);
})();
