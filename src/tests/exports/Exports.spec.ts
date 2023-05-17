import { test, expect } from "@lib/BaseTest";
import * as selectors  from "@selectors/Selectors";


test.describe("Export Flows Test Cases", async ()=>{
    test.beforeEach(async({exportsPage, basePage })=>{
        await basePage.navigateTo(exportsPage.EXPORTS_PAGE_URL);
    });

    test("C55447 Verify the error message when data size is more than 1 MB for export & lookup", async ({
      exportsPage,
      connectionsPage,
      exportTD,
      basePage,
    }) => {
      await basePage.click(selectors.BasePagePO.ADD_NEW_RESOURCE);
      await connectionsPage.selectApplication(exportTD.C55447.APP_NAME);
      await exportsPage.selectConnection(exportTD.C55447.CONNECTION_NAME);
      await basePage.fill(selectors.BasePagePO.NAME, exportTD.C55447.NAME);
      await basePage.click(selectors.BasePagePO.SAVE);
      await basePage.click(selectors.ExportsPagePO.MOCK_OUTPUT_ARIA_EXPAND_BUTTON);
      await basePage.click(selectors.ExportsPagePO.MOCK_OUTPUT_WINDOW);
      await basePage.pasteFileContent(
        "src/testData/HugeData/C55447.json",
        selectors.ExportsPagePO.MOCK_OUTPUT_TEXTAREA
      );
      var error = await basePage.getText(
        selectors.ExportsPagePO.MOCK_OUTPUT_DATA_SIZE_ERROR
      );
      await expect(error).toBe(
        "Mock output cannot be larger than 1 MB. Decrease your mock data size and try again."
      );
    });

    test("C51543 Verify the allignmnet after adding multiple query parameters", async ({
      connectionsPage,
      settingsPage,
      basePage,
      exportsPage,
      exportTD,
      assert
    }) => {
      await basePage.click(selectors.BasePagePO.ADD_NEW_RESOURCE);
      await connectionsPage.selectApplication(exportTD.C51543.APP_NAME);
      await exportsPage.selectConnection(exportTD.C51543.CONNECTION_NAME);
      await basePage.fill(selectors.BasePagePO.NAME, exportTD.C51543.NAME);
      await basePage.click(selectors.BasePagePO.SAVE);
      await basePage.click(selectors.ExportsPagePO.ASSISTANT_META_DATA_RESOURCE);
      await settingsPage.selectTextFromDropDown("Balance");
      await basePage.click(selectors.ExportsPagePO.ASSISTANT_META_DATA_OPERATION);
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
      await basePage.click(selectors.ExportsPagePO.CONFIGURE_EXPORT_TYPE);
      await assert.checkSnapshot(
        selectors.ExportsPagePO.QUERY_PARAMETERS_AREA,
        "C51543.png"
      );
      await basePage.click(selectors.BasePagePO.CLOSE);
      await basePage.click(selectors.BasePagePO.DISCARD_CHANGES);
    });
})