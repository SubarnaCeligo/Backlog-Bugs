import { test, expect } from "@lib/BaseTest";


test.describe("Export Flows Test Cases", async ()=>{
    test.beforeEach(async({exportsPage, webActions })=>{
        await webActions.navigateTo(exportsPage.EXPORTS_PAGE_URL);
    });

    test("C55447 Verify the error message when data size is more than 1 MB for export & lookup", async ({
      exportsPagePO,
      exportsPage,
      connectionsPage,
      webActions,
      commonPagePO,
      exportTD
    }) => {
      await webActions.click(commonPagePO.ADD_NEW_RESOURCE);
      await connectionsPage.selectApplication(exportTD.C55447.APP_NAME);
      await exportsPage.selectConnection(exportTD.C55447.CONNECTION_NAME);
      await webActions.fill(commonPagePO.NAME, exportTD.C55447.NAME);
      await webActions.click(commonPagePO.SAVE);
      await webActions.click(exportsPagePO.MOCK_OUTPUT_WINDOW);
      await webActions.pasteFileContent(
        "testData/HugeData/C55447.json",
        exportsPagePO.MOCK_OUTPUT_TEXTAREA
      );
      var error = await webActions.getText(
        exportsPagePO.MOCK_OUTPUT_DATA_SIZE_ERROR
      );
      await expect(error).toBe(
        "Mock output cannot be larger than 1 MB. Decrease your mock data size and try again."
      );
    });

    test("C51543 Verify the allignmnet after adding multiple query parameters", async ({
      connectionsPage,
      settingsPage,
      webActions,
      commonPagePO,
      exportsPagePO,
      exportsPage,
      exportTD,
      assert
    }) => {
      await webActions.click(commonPagePO.ADD_NEW_RESOURCE);
      await connectionsPage.selectApplication(exportTD.C51543.APP_NAME);
      await exportsPage.selectConnection(exportTD.C51543.CONNECTION_NAME);
      await webActions.fill(commonPagePO.NAME, exportTD.C51543.NAME);
      await webActions.click(commonPagePO.SAVE);
      await webActions.click(exportsPagePO.ASSISTANT_META_DATA_RESOURCE);
      await settingsPage.selectTextFromDropDown("Balance");
      await webActions.click(exportsPagePO.ASSISTANT_META_DATA_OPERATION);
      await settingsPage.selectTextFromDropDown("List all balance history");
      var map: Map<any, any> = new Map();
      map.set("expand[]", "a");
      map.set("limit", "a");
      map.set("available_on", "a");
      map.set("created", "a");
      map.set("currency", "a");
      map.set("ending_before", "a");
      map.set("starting_after", "a");
      map.set("payout", "a");
      map.set("source", "a");
      map.set("type", "a");
      await exportsPage.fillQueryParameters(map);
      await webActions.click(exportsPagePO.CONFIGURE_EXPORT_TYPE);
      await assert.checkSnapshot(
        exportsPagePO.QUERY_PARAMETERS_AREA,
        "C51543.png"
      );
      await webActions.click(commonPagePO.CLOSE);
      await webActions.click(commonPagePO.DISCARD_CHANGES);
    });
})