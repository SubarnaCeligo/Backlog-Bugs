import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("TC_C111349_C111342   Verify the message when api failed to fetch the table", () => {
  test.beforeEach(async ({ io }) => {
    await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test("@Env-All @Zephyr-IO-T8870 Verify the message when api failed to fetch the table", async ({ io, page }) => {
    await io.exportsPage.navigateTo(process.env["IO_UI_CONNECTOR_URL"] + "home");
    await io.homePage.goToMenu("Tools", "Flow builder");
    await io.flowBuilder.click(
      selectors.flowBuilderPagePO.ADD_DESTINATION_OR_LOOKUP
    );
    await io.homePage.loadingTime()
    await io.flowBuilder.fill(
      selectors.settingsPagePO.APP_NAME_INPUT,
      "PostgreSQL"
    );
    await io.flowBuilder.clickByText("PostgreSQL");
    await io.flowBuilder.click(selectors.connectionsPagePO.IMPORT_RECORDS);
    await io.flowBuilder.click(selectors.basePagePO.CREATE_FROM_SCRATCH)
    await io.flowBuilder.click(selectors.exportsPagePO.CONNECTIONS_DROPDOWN);
    await io.flowBuilder.waitForElementAttached(selectors.importPagePO.IMPORT_CREATE_CONNECTION);
    await io.flowBuilder.clickByText("POSTGRE OFFLINE CONNECTION - Offline");
    await io.flowBuilder.click(selectors.basePagePO.SAVE);
    await io.flowBuilder.waitForElementAttached(selectors.exportsPagePO.NAME);
    await io.flowBuilder.fill(selectors.exportsPagePO.NAME, "offline");
    await io.flowBuilder.click(selectors.flowBuilderPagePO.DESTINATIONTABLESEARCHPOSTGRE);
    await io.flowBuilder.waitForElementAttached('text="Unable to retrieve table list. Enter a new query or refresh the  page."')
    await io.assert.verifyElementDisplayedByText(
      "Unable to retrieve table list. Enter a new query or refresh the  page.",
      "'Path to file in HTTP response body' is not displayed"
    );
    await io.importsPage.click(selectors.flowBuilderPagePO.DESTINATIONTABLE_HELPTEXT_ICON);
    await io.assert.verifyElementDisplayedByText(`Select a data destination for bulk inserts. You can bulk insert data into a table.`,
      'prefix lookup text is incorrect');
    await io.flowBuilder.click(selectors.connectionsPagePO.HELPTEXT_CLOSE);
  });
}
)
