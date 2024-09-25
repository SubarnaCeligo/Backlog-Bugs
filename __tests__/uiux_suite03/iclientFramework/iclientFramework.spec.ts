
import { filterTestCases } from "@celigo/aut-utilities";
var testCases = [

  //"C64881",
  // "C64882",
   "C64900",
  // "IO-T27292"

];
var flakycases = JSON.parse(process.env.FLAKY_TEST_CASES);
(async () => {
  await filterTestCases(testCases, flakycases, "iclientFramework");
})();
