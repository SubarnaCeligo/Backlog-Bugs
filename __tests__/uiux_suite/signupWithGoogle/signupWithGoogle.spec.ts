import {filterTestCases} from "@celigo/aut-utilities"
var testCases = ["C65744",
"C67037",
"C67038"
];
var flakycases = JSON.parse(process.env.FLAKY_TEST_CASES);
    (async () => {
      await filterTestCases(testCases,flakycases,"signupWithGoogle")
    })();