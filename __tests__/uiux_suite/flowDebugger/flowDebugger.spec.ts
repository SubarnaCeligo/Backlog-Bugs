import {filterTestCases} from "@celigo/aut-utilities"
var testCases = [
"C59678",
"C55445", 
"C55447", 
"C55446", 
"C96303", 
"C41074", 
"C108203", 
"C102846", 
"C108160", 
"C108161", 
"C108104", 
"C108152", 
"C108153", 
"C108154", 
"C107968", 
"C108497", 
"C107965", 
"C107963"
];
var flakycases = JSON.parse(process.env.FLAKY_TEST_CASES);
    (async () => {
      await filterTestCases(testCases,flakycases,"flowDebugger")
    })();

