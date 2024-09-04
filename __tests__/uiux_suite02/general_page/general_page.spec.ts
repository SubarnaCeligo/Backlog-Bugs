import {filterTestCases} from "@celigo/aut-utilities"
var testCases = [
    "C29283",
    "C60115",
    "C67020",
    "C67026",
    "C46625",
    "C111920",
    "C27079",
    "C27068",
    "IOT860"
  ];
    var flakycases = JSON.parse(process.env.FLAKY_TEST_CASES);
    (async () => {
      await filterTestCases(testCases,flakycases,"general_page")
    })();

