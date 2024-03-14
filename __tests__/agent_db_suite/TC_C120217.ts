import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("TC_C120217_C120211 Verify the message when api failed to fetch the table", () => {
  test.beforeEach(async ({ io }) => {
    await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test("Verify the message when api failed to fetch the table", async ({ io, page }) => {
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
        await io.homePage.addStep("*** Searched for ORACLE CONNECTION ***");
        await io.flowBuilder.clickByText("asdf - Offline");
        await io.flowBuilder.click(selectors.basePagePO.SAVE);
    await io.flowBuilder.waitForElementAttached(selectors.exportsPagePO.NAME);
    await io.flowBuilder.fill(selectors.exportsPagePO.NAME, "offline");
    await io.importsPage.click(selectors.flowBuilderPagePO.DESTINATIONTABLE_HELPTEXT_ICON);
   
await io.importsPage.click(selectors.importPagePO.EXPAND_MOCK_RESPONSE);
    await io.flowBuilder.waitForElementAttached(selectors.basePagePO.MUI_CIRCULAR_PROGRESS);
    await page.waitForTimeout(8000);
    await io.importsPage.click(selectors.flowBuilderPagePO.DESTINATIONTABLE_HELPTEXT_ICON);
   
    await io.flowBuilder.waitForElementAttached('text="Unable to retrieve table list. Enter a new query or refresh the  page."')
    await io.assert.verifyElementDisplayedByText(
      "Unable to retrieve table list. Enter a new query or refresh the  page.",
      "'Path to file in HTTP response body' is not displayed"
    );
  });
}
)