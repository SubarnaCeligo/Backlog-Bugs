import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("C107001_Verify sorting column If a user navigates to the next batch of 1000 errors and applies new sorting", () => {
    test.beforeEach(async ({ io }) => {
        await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
    });
    test("C107001_Verify sorting column If a user navigates to the next batch of 1000 errors and applies new sorting UI_Backlog @Zephyr-IO-T1656 @Env-All @Priority-P2", async ({ io, page, }) => {
        await io.homePage.addStep("*** Navigated to home page ***");
        await io.homePage.fill(selectors.integrationPagePO.INTEGRATION_PAGE_SEARCH_BAR, "Tags 1000 errors- Mysql to mysql flow3_DND");
        await io.homePage.addStep("*** Searched for the integration ***");
        await io.flowBuilder.loadingTime();
        await io.homePage.clickByText("Tags 1000 errors- Mysql to mysql flow3_DND");
        await io.homePage.addStep("*** Opened the integration ***");
        await io.homePage.clickByText("Mysql to mysql flow_DND");
        await io.homePage.addStep("*** Opened the flow ***");
        await io.flowBuilder.loadingTime();
        await io.homePage.click(selectors.basePagePO.RUNFLOW);
        await io.homePage.addStep("*** Running the flow ***");
        await io.flowBuilder.loadingTime();
        await io.flowBuilder.loadingTime();
        await io.flowBuilder.loadingTime();
        await io.flowBuilder.loadingTime();
        await io.flowBuilder.loadingTime();
        await io.flowBuilder.loadingTime();
        await io.flowBuilder.waitForElementAttached(selectors.basePagePO.RUNFLOW);
        await io.homePage.addStep("*** Flow ran successfully ***");
        await io.flowBuilder.loadingTime();
        await io.flowBuilder.loadingTime();
        await io.flowBuilder.loadingTime();
        await io.flowBuilder.loadingTime();
        await io.flowBuilder.loadingTime();
        await io.flowBuilder.loadingTime();
        await io.flowBuilder.loadingTime();
        await io.flowBuilder.loadingTime();
        await io.flowBuilder.loadingTime();
        await io.flowBuilder.loadingTime();
        await io.flowBuilder.loadingTime();
        await io.flowBuilder.loadingTime();
        await io.flowBuilder.reloadPage()
        await io.flowBuilder.reloadPage()
        await io.flowBuilder.reloadPage()
        await io.flowBuilder.loadingTime();
        await io.flowBuilder.loadingTime();
        await io.flowBuilder.loadingTime();
        await io.flowBuilder.loadingTime();
        await io.homePage.clickByIndex(selectors.flowBuilderPagePO.ERROR_BUBBLE, 1);
        await io.homePage.clickByTextByIndex("Timestamp", 1)
        // Validating sorting column applied
        await io.assert.verifyElementDisplayedByText('Error Details', 'Error not available')
    });
});