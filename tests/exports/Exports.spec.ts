import { test, expect } from "@lib/BaseTest";
import * as selectors from "@selectors/Selectors";
import * as C55447 from "@testData/Exports/C55447.json";
import * as C51543 from "@testData/Exports/C51543.json";

test.describe("Export Flows Test Cases", async () => {
  test.beforeEach(async ({ io }) => {
    await io.exportsPage.navigateTo(io.data.links.EXPORTS_PAGE_URL);
  });

  test.skip("C55447 Verify the error message when data size is more than 1 MB for export & lookup", async ({
    io,
  }) => {
    await io.fillForm(C55447, "EXPORT");
    // await io.webActions.click(selectors.BasePagePO.ADD_NEW_RESOURCE);
    // await connectionsPage.selectApplication(exportTD.C55447.APP_NAME);
    // await exportsPage.selectConnection(exportTD.C55447.CONNECTION_NAME);
    // await io.webActions.fill(selectors.BasePagePO.NAME, exportTD.C55447.NAME);
    // await io.webActions.click(selectors.BasePagePO.SAVE);
    // await io.webActions.click(
    //   selectors.ExportsPagePO.MOCK_OUTPUT_ARIA_EXPAND_BUTTON
    // );
    // await io.webActions.click(selectors.ExportsPagePO.MOCK_OUTPUT_WINDOW);
    // await io.webActions.pasteFileContent(
    //   "src/testData/HugeData/C55447.json",
    //   selectors.ExportsPagePO.MOCK_OUTPUT_TEXTAREA
    // );
    var error = await io.assert.getText(
      selectors.ExportsPagePO.MOCK_OUTPUT_DATA_SIZE_ERROR
    );
    await expect(error).toBe(
      "Mock output cannot be larger than 1 MB. Decrease your mock data size and try again."
    );
  });

  test.skip("C51543 Verify the allignmnet after adding multiple query parameters", async ({
    io,
  }) => {
    await io.fillForm(C51543,"EXPORT");
    // await io.webActions.click(selectors.BasePagePO.ADD_NEW_RESOURCE);
    // await connectionsPage.selectApplication(exportTD.C51543.APP_NAME);
    // await exportsPage.selectConnection(exportTD.C51543.CONNECTION_NAME);
    // await io.webActions.fill(selectors.BasePagePO.NAME, exportTD.C51543.NAME);
    // await io.webActions.click(selectors.BasePagePO.SAVE);
    // await io.webActions.click(
    //   selectors.ExportsPagePO.ASSISTANT_META_DATA_RESOURCE
    // );
    // await settingsPage.selectTextFromDropDown("Balance");
    // await io.webActions.click(
    //   selectors.ExportsPagePO.ASSISTANT_META_DATA_OPERATION
    // );
    // await settingsPage.selectTextFromDropDown("List all balance history");
    // var map: Map<any, any> = new Map();
    // map.set("expand[]", "a");
    // map.set("limit", "a");
    // map.set("available_on", "a");
    // map.set("created", "a");
    // map.set("currency", "a");
    // map.set("ending_before", "a");
    // map.set("starting_after", "a");
    // map.set("payout", "a");
    // map.set("source", "a");
    // map.set("type", "a");
    // await exportsPage.fillQueryParameters(map);
    // await io.webActions.click(selectors.ExportsPagePO.CONFIGURE_EXPORT_TYPE);
    // await assert.checkSnapshot(
    //   selectors.ExportsPagePO.QUERY_PARAMETERS_AREA,
    //   "C51543.png"
    // );
    // await io.webActions.click(selectors.BasePagePO.CLOSE);
    // await io.webActions.click(selectors.BasePagePO.DISCARD_CHANGES);
  });
});
