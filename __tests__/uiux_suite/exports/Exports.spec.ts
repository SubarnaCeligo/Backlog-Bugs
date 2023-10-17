require("./TC_C27965");
require("./TC_C27969");
require("./TC_C28172");
require("./TC_C28173");
require("./TC_C22915");
require("./TC_C94287");
require('./TC_C64846');
require('./TC_C65758');
require('./TC_C65759');
require('./TC_C67232');
require('./TC_C65696');
require("./TC_C58484")

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
//     await io.fillFormUI(C55447, "EXPORT");
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
//     await io.fillFormUI(C51543, "EXPORT");
//     // await io.webActions.click(selectors.basePagePO.ADD_NEW_RESOURCE);
//     // await connectionsPage.selectApplication(exportTD.C51543.APP_NAME);
//     // await exportsPage.selectConnection(exportTD.C51543.CONNECTION_NAME);
//     // await io.webActions.fill(selectors.basePagePO.NAME, exportTD.C51543.NAME);
//     // await io.webActions.click(selectors.basePagePO.SAVE);
//     // await io.webActions.click(
//     //   selectors.exportsPagePO.ASSISTANT_META_DATA_RESOURCE
//     // );
//     // await settingsPage.selectTextFromDropDown("Balance");
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
require("./TC_C22817");
