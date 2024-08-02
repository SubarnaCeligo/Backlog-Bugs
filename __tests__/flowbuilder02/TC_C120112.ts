import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("C120112   Verify the message when api failed to fetch the table", () => {
  test.beforeEach(async ({ io }) => {
    await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test("@Zephyr-IO-T10098 @Env-All @Priority-P2 Verify the message when api failed to fetch the table", async ({ io, page }) => {
    await io.exportsPage.navigateTo(process.env["IO_UI_CONNECTOR_URL"] + "home");
    await io.homePage.navigateTo(process.env["IO_Integration_URL"]);
    await io.flowBuilder.loadingTime();
    await io.homePage.click(selectors.flowBuilderPagePO.CREATEFLOW);
    await io.flowBuilder.click(
      selectors.flowBuilderPagePO.ADD_DESTINATION_OR_LOOKUP
    );
    await io.flowBuilder.click(selectors.flowBuilderPagePO.GROUP_RECORD_FIELD);
    await io.flowBuilder.clickByText('MariaDB');
    await io.flowBuilder.clickByText("Import records into destination application");
    // await io.flowBuilder.clickByText('Create from scratch');
    await io.flowBuilder.click(selectors.basePagePO.CREATE_FROM_SCRATCH);
    await io.flowBuilder.click(selectors.exportsPagePO.CONNECTIONS_DROPDOWN);

    await io.flowBuilder.clickByText("MariaDBOffline - Offline");
    await io.flowBuilder.click(selectors.basePagePO.SAVE);
    await io.flowBuilder.waitForElementAttached(selectors.exportsPagePO.NAME);
    await io.flowBuilder.fill(selectors.exportsPagePO.NAME, "offline");
    await io.flowBuilder.click(selectors.flowBuilderPagePO.ORACLEDB_BULKINSERT);
    await io.importsPage.click(selectors.importPagePO.EXPAND_MOCK_RESPONSE);
    await io.flowBuilder.waitForElementAttached(selectors.basePagePO.MUI_CIRCULAR_PROGRESS);
    await io.flowBuilder.click(selectors.flowBuilderPagePO.ORACLEDB_BULKINSERT);
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
