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
  "C28883",
  "C2044",
  "C19744",
  "C19743",
  "C25984",
  "C26004",
  "C26026",
  "C106839",
  "C106840",
  "C26006",
  "C25575",
  "C18471",
  "C26002",
  "C26029",
  "C25988",
  "C25993",
  "C25998",
  "C25810",
  "C25811",
  "C25985",
  "C25987",
  "C25989",
  "C25574",
  "C25582",
  "C25994",
  "C26000",
  "IO-T2957"
];
var flakycases = JSON.parse(process.env.FLAKY_TEST_CASES);
(async () => {
  await filterTestCases(testCases, flakycases, "exports");
})();
