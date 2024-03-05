import {filterTestCases} from "@celigo/aut-utilities"
var testCases = [
// "C49539"
// "C47992"
// "C47425"
// "C93992"
// "C93993"
// "C93994"
// "C93995"
// "C93996"
// "C93997"
// "C59975"
// "C68107"
// "C59977"
// "C69565"
// "C102708"
// "C68531"
// "C68554"
"C68560",
"C68561",
"C68562",
"C68563",
"C68564",
"C68565",
// "C107972"
// "C68488"
// "C68492"
// "C68493"
// "C65961"
// "C69064"
// "C68544"
"C117329"
];
var flakycases = JSON.parse(process.env.FLAKY_TEST_CASES);
    (async () => {
      await filterTestCases(testCases,flakycases,"flowBranching")
    })();