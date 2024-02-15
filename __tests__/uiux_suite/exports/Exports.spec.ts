import { filterTestCases } from "@celigo/aut-utilities";
var testCases = [
  "C27965",
  "C27969",
  "C28172",
  "C28173",
  "C22915",
  "C94287",
  "C64846",
  "C65758",
  "C65759",
  "C67232",
  "C65696",
  "C58484",
  "C27545",
  "C22817",
  "C69769",
  "C113465",
  "C22828",
  "C120059",
  "C28883"
];
var flakycases = JSON.parse(process.env.FLAKY_TEST_CASES);
(async () => {
  await filterTestCases(testCases, flakycases, "exports");
})();
