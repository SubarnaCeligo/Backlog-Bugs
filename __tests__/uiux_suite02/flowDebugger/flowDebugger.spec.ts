import { filterTestCases } from "@celigo/aut-utilities";
var testCases = [
  // "C102846",
  // "C107963",
  // "C107965",
  // "C107968",
  // "C108104",
  // "C108152",
  // "C108153",
  // "C108154",
  // "C108160",
  // "C108161",
  // "C108203",
  // "C108497",
  // "C110728",
  // "C110731",
  // "C111321",
  // "C111357",
  // "C111364",
  // "C111366",
  // "C111369",
  // "C111373",
  // "C111378",
  // "C111381",
  // "C111387",
  // "C111388",
  // "C111397",
  // "C111412",
  // "C112117",
  // "C112351",
  // "C112781_C112782_C112783",
  // "C113073",
  // "C113640",
  // "C115343",
  // "C115532",
  // "C115651",
  // "C115861",
  // "C116958",
  // "C117288",
  // // "C41074",
  // "C55445",
  // "C55446",
  // "C55447",
  // "C59678",
  // "C94527",
  // "C94560",
  // "C94646",
  // "C96303",
  // "C104576",
  // "C119631",
  // // "C120065",
  // "C120351",
  // "C108690",
  // "C108675",
  // "C108674",
  // "C108677",
  // "C108679",
  // "C108683",
  // "C41223",
  // "C108686",
  // "C108688",
  // "C108685",
  // "C108693",
  // "C65037",
  // "C98698",
  // "C34489",
  // "C108673",
  // "C98708",
  // "C108176",
  // "C107706",
  // "C108177",
  // "C108692",
  // "C108678",
  // "C108691",
  // "C98712",
  // "C108701",
  // "C108687",
  // "C98691",
  // "C108699",
  // "C65036",
  // "C34539",
  // "C108694",
  // "T23942",
  // "IOT24399",
  // "C105610",
  // "IO-T24908",
  // "T24938",
  // "T24944",
  // "T24909",
  // "C55454",
  // "C59674",
  // "IO-T24878",
  // "T2477",
  // "T18956",
  "T2492"
];
var flakycases = JSON.parse(process.env.FLAKY_TEST_CASES);
(async () => {
  await filterTestCases(testCases, flakycases, "flowDebugger");
})();
