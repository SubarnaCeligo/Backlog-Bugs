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
"C107963",
"C112781_C112782_C112783",
"C110728",
"C110731",
"C112117",
"C112351",
"C94560",
"C94527",
"C94646",
"C113640",
"C111364",
"C111373",
"C111366",
"C111378",
"C115861",
];
var flakycases = JSON.parse(process.env.FLAKY_TEST_CASES);
    (async () => {
      await filterTestCases(testCases,flakycases,"flowDebugger")
    })();
