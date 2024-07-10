import {filterTestCases} from "@celigo/aut-utilities"
var testCases = [
"C69768",
"T31782_T31783_T31790",
"T31784_T31785_T31794",
"T31786_T31787",
"T31788_T31789_T31795",
"T31792",
"T31791",
"IO-T34556"
];
var flakycases = JSON.parse(process.env.FLAKY_TEST_CASES);
    (async () => {
      await filterTestCases(testCases,flakycases,"dataloader");
    })();
