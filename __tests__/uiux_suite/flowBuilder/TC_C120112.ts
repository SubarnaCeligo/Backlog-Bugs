import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("C120112   Verify the message when api failed to fetch the table", () => {
  test.beforeEach(async ({ io }) => {
    await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test("Verify the message when api failed to fetch the table", async ({ io, page }) => {
    await page.pause();
    await io.exportsPage.navigateTo(process.env["IO_UI_CONNECTOR_URL"] + "home");
    await io.homePage.goToMenu("Tools", "Flow builder");
    await io.flowBuilder.click(
      selectors.flowBuilderPagePO.ADD_DESTINATION_OR_LOOKUP
    );
    await io.flowBuilder.clickByText("MariaDB");
    await io.flowBuilder.clickByText("Import records into destination application");
    await io.flowBuilder.click(selectors.exportsPagePO.CONNECTIONS_DROPDOWN);
    await io.flowBuilder.clickByText("MariaDBOffline - Offline");
    await io.flowBuilder.click(selectors.basePagePO.SAVE);
    await io.flowBuilder.waitForElementAttached(selectors.exportsPagePO.NAME);
    await io.flowBuilder.fill(selectors.exportsPagePO.NAME, "offline");
    await io.flowBuilder.click('[data-test="search-rdbms.bulkInsert.tableName"]');
    await io.importsPage.click(selectors.importPagePO.EXPAND_MOCK_RESPONSE);
    await io.flowBuilder.waitForElementAttached(selectors.basePagePO.MUI_CIRCULAR_PROGRESS);
    await page.waitForTimeout(8000);
    await io.flowBuilder.click('[data-test="search-rdbms.bulkInsert.tableName"]');
    await io.flowBuilder.waitForElementAttached('text="Unable to retrieve table list. Enter a new query or refresh the  page."')
    await io.assert.verifyElementDisplayedByText(
      "Unable to retrieve table list. Enter a new query or refresh the  page.",
      "'Path to file in HTTP response body' is not displayed"
    );


    await io.importsPage.click('[id="rdbms.bulkInsert.tableName"]>div>div>button');
    await io.assert.verifyElementDisplayedByText(`Select a data destination for bulk inserts. You can bulk insert data into a table.`,
          'prefix lookup text is incorrect');
        await io.flowBuilder.click(selectors.connectionsPagePO.HELPTEXT_CLOSE);
  });
}
)
