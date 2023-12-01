import {filterTestCases} from "@celigo/aut-utilities"
var testCases = [
"C27965",
"C27969",
"C28172",
"C28173",
"C22915",
"C94287",
"C64846",
"C65758",
"C65759",
"C67232",
"C65696",
"C58484",
"C27545",
"C64846",
"C65758",
"C65759",
"C67232",
"C65696",
"C58484",
"C22817",
"C69769"
];
var flakycases = JSON.parse(process.env.FLAKY_TEST_CASES);
    (async () => {
      await filterTestCases(testCases,flakycases,"exports")
    })();
// import { test, expect } from "@celigo/ui-core-automation";
// import * as selectors from "@celigo/aut-selectors";
// import * as C55447 from "@testData/Exports/C55447.json";
// import * as C51543 from "@testData/Exports/C51543.json";

// test.describe("Export Flows Test Cases", async () => {
//   test.beforeEach(async ({ io }) => {
//     await io.exportsPage.navigateTo(io.data.links.EXPORTS_PAGE_URL);
//   });

//   test.skip("C55447 Verify the error message when data size is more than 1 MB for export & lookup", async ({
//     io
//   }) => {
//     await io.createResourceFromAPI(C55447, "EXPORT",
//     // await io.webActions.click(selectors.basePagePO.ADD_NEW_RESOURCE);
//     // await connectionsPage.selectApplication(exportTD.C55447.APP_NAME);
//     // await exportsPage.selectConnection(exportTD.C55447.CONNECTION_NAME);
//     // await io.webActions.fill(selectors.basePagePO.NAME, exportTD.C55447.NAME);
//     // await io.webActions.click(selectors.basePagePO.SAVE);
//     // await io.webActions.click(
//     //   selectors.exportsPagePO.MOCK_OUTPUT_ARIA_EXPAND_BUTTON
//     // );
//     // await io.webActions.click(selectors.exportsPagePO.MOCK_OUTPUT_WINDOW);
//     // await io.webActions.pasteFileContent(
//     //   "src/testData/HugeData/C55447.json",
//     //   selectors.exportsPagePO.MOCK_OUTPUT_TEXTAREA
//     // );
//     await io.assert.verifyElementText(
//       selectors.exportsPagePO.MOCK_OUTPUT_DATA_SIZE_ERROR,
//       "Mock output cannot be larger than 1 MB.Decrease your mock data size and try again."
//     );
//   });

//   test.skip("C51543 Verify the allignmnet after adding multiple query parameters", async ({
//     io
//   }) => {
//     await io.createResourceFromAPI(C51543, "EXPORT",
//     // await io.webActions.click(selectors.basePagePO.ADD_NEW_RESOURCE);
//     // await connectionsPage.selectApplication(exportTD.C51543.APP_NAME);
//     // await exportsPage.selectConnection(exportTD.C51543.CONNECTION_NAME);
//     // await io.webActions.fill(selectors.basePagePO.NAME, exportTD.C51543.NAME);
//     // await io.webActions.click(selectors.basePagePO.SAVE);
//     // await io.webActions.click(
//     //   selectors.exportsPagePO.ASSISTANT_META_DATA_RESOURCE
//     // );
//     // await settingsPage.selectTextFromDropDown("Balance",
//     // await io.webActions.click(
//     //   selectors.exportsPagePO.ASSISTANT_META_DATA_OPERATION
//     // );
//     // await settingsPage.selectTextFromDropDown("List all balance history");
//     // var map: Map<any, any> = new Map();
//     // map.set("expand[]", "a");
//     // map.set("limit", "a");
//     // map.set("available_on", "a");
//     // map.set("created", "a");
//     // map.set("currency", "a");
//     // map.set("ending_before", "a");
//     // map.set("starting_after", "a");
//     // map.set("payout", "a");
//     // map.set("source", "a");
//     // map.set("type", "a");
//     // await exportsPage.fillQueryParameters(map);
//     // await io.webActions.click(selectors.exportsPagePO.CONFIGURE_EXPORT_TYPE);
//     // await assert.checkSnapshot(
//     //   selectors.exportsPagePO.QUERY_PARAMETERS_AREA,
//     //   "C51543.png"
//     // );
//     // await io.webActions.click(selectors.basePagePO.CLOSE);
//     // await io.webActions.click(selectors.basePagePO.DISCARD_CHANGES);
//   });
// });
