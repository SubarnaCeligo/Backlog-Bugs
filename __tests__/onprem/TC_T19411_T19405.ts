import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("TC_T19411_T19405  Verify the message when api failed to fetch the table", () => {
 test.beforeEach(async ({ io }) => {
    await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test(" @Zephyr-IO-T19411_T19405 @Env-All @Priority-P2 Verify the message when api failed to fetch the table", async ({ io, page }) => {
    await io.homePage.loadingTime();
        await io.homePage.goToMenu("Tools", "Flow builder");
        await io.flowBuilder.click(
            selectors.flowBuilderPagePO.ADD_DESTINATION_OR_LOOKUP
        );
        await io.homePage.addStep("*** Clicked on add destination or lookup ***");
        await io.homePage.click(selectors.flowBuilderPagePO.ORACLEDB_APPLICATION);
        await io.homePage.addStep("*** Clicked on ORACLE application ***");
        await io.flowBuilder.clickByText("Import records into destination application");
        await io.homePage.addStep("*** Selected import records option ***");
        await io.flowBuilder.clickByText("Create flow step");
        await io.flowBuilder.click(selectors.connectionsPagePO.CONNECTIONS_DROPDOWN);
        await io.flowBuilder.fill(selectors.connectionsPagePO.CONNECTIONS_DROPDOWN,'ORACLE_DB_Connection_Invalid_Creds');
        await io.flowBuilder.click(selectors.connectionsPagePO.CONNECTION_OPTION_TEXT);
    await io.flowBuilder.waitForElementAttached(selectors.exportsPagePO.NAME);
    await io.flowBuilder.fill(selectors.exportsPagePO.NAME, "offline");
    await io.importsPage.click(selectors.flowBuilderPagePO.DESTINATIONTABLE_HELPTEXT_ICON);
    await io.flowBuilder.click(selectors.connectionsPagePO.HELPTEXT_CLOSE);
    await io.homePage.addStep("*** Clicked on destination table search field ***");
    await io.importsPage.click(selectors.importPagePO.EXPAND_MOCK_RESPONSE);
    await io.homePage.click(selectors.flowBuilderPagePO.DESTINATIONTABLESEARCHPOSTGRE);
    await io.homePage.addStep("*** Clicked on destination table search field ***");
    await io.flowBuilder.waitForElementAttached('text="Unable to retrieve table list. Enter a new query or refresh the  page."')
    await io.assert.verifyElementDisplayedByText(
      "Unable to retrieve table list. Enter a new query or refresh the  page.",
      "'Path to file in HTTP response body' is not displayed"
    );
  });
}
)