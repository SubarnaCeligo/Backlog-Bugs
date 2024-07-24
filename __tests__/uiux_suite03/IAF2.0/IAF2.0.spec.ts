import {filterTestCases} from "@celigo/aut-utilities"
var testCases = [
  "C58036",
  "T1127",
  "IOT2292"
 // "C27422" commenting this out as we are facing issue while installing the IA only on platform3 and 5 will unpark once resolved
];
var flakycases = JSON.parse(process.env.FLAKY_TEST_CASES);
    (async () => {
      await filterTestCases(testCases,flakycases,"IAF2.0")
    })();
