import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("TC_C120214", () => {
    test.beforeEach(async ({ io }) => {
        await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
    });
    test("TC_C120214", async ({ io, page }) => {
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
        await io.flowBuilder.fill(selectors.connectionsPagePO.CONNECTION_INPUT, "ORACLE_DB_Connection");
        await io.homePage.addStep("*** Searched for ORACLE CONNECTION ***");
        await io.homePage.clickByText('ORACLE_DB_Connection');
        await io.homePage.addStep("*** Selected  ORACLE connection ***");
        await io.flowBuilder.click(selectors.basePagePO.SAVE);
        await io.homePage.addStep("*** Clicked on next button ***");
        await io.flowBuilder.waitForElementAttached(selectors.exportsPagePO.NAME);
        await io.flowBuilder.fill(selectors.exportsPagePO.NAME, "NEW");
        await io.homePage.addStep("*** Clicked on 'name' field and gave a name to our import ***");
        await io.flowBuilder.click(selectors.basePagePO.SAVE);
        await io.homePage.click(selectors.flowBuilderPagePO.POSTGREAFEEDITOR);
        await io.homePage.addStep("*** Opened the handlebar expression beside the destination table field  ***");
        await io.assert.verifyElementDisplayedByText(
            "Preview",
            "Expired link error message is not displayed"
          );
        await io.homePage.addStep("*** Checked the handlebar editor page by clicking on preview ***");
        await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
        await io.homePage.addStep("*** Navigated back to home page ***");   
    });
});