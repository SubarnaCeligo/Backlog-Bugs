import {filterTestCases} from "@celigo/aut-utilities"
var testCases = [
    "C118293",
    "C118294",
    "C118295",
    "C118296",
    "C118297",
    "C118298",
    "C118299",
    "C118300",
    "C118301",
    "C118302",
    "C118303",
    "C118304",
    "C118305_C118308_C118309",
    "C118306",
    "C118307",
    "C118310",
    "C118312",
    "C118387_C118393",
    "C118388_C118394",
    "C118389",
    "C118390",
    "C118395_C118396",
    "C118397",
    "T29671"
    //This suite is dedicated to assign error epic which is using a dediacted account, please do not add new cases here
  ];
    var flakycases = JSON.parse(process.env.FLAKY_TEST_CASES);
    (async () => {
      await filterTestCases(testCases,flakycases,"assign")
    })();

