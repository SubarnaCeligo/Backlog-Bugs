import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("C24619_Verify the behaviour of Retry & Resolve dropdown with <1000 errors on Manage whole account user", () => {
    test.beforeEach(async ({ io }) => {
        await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
    });
    test("C24619_Verify the behaviour of Retry & Resolve dropdown with <1000 errors on Manage whole account user UI_Backlog @Zephyr-IO-T7213 @Env-All @Priority-P2", async ({ io, page, }) => {
        await io.homePage.addStep("*** Navigated to home page ***");
        await io.homePage.fill(selectors.integrationPagePO.INTEGRATION_PAGE_SEARCH_BAR, "Tags 1000 errors- Mysql to mysql flow1_DND");
        await io.homePage.addStep("*** Searched for the integration ***");
        await io.flowBuilder.loadingTime();
        await io.homePage.clickByText("Tags 1000 errors- Mysql to mysql flow1_DND");
        await io.homePage.addStep("*** Opened the integration ***");
        await io.homePage.clickByText("Mysql to mysql flow_DND");
        await io.homePage.addStep("*** Opened the flow ***");
        await io.flowBuilder.loadingTime();
        await io.homePage.click(selectors.basePagePO.RUNFLOW);
        await io.homePage.addStep("*** Running the flow ***");
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
        await io.flowBuilder.reloadPage()
        await io.flowBuilder.reloadPage()
        await io.flowBuilder.reloadPage()
        await io.flowBuilder.loadingTime();
        await io.flowBuilder.loadingTime();
        await io.flowBuilder.loadingTime();
        await io.flowBuilder.loadingTime();
        await io.homePage.clickByIndex(selectors.flowBuilderPagePO.ERROR_BUBBLE, 1);
        await io.flowBuilder.loadingTime();
        await io.flowBuilder.loadingTime();
        await io.homePage.clickByIndex(selectors.flowBuilderPagePO.CHECKBOX, 1);
        await io.flowBuilder.clickByText('Retry & next')
        await io.flowBuilder.clickByText('Resolved errors')
        await io.flowBuilder.clickByText('Retries')
        // Validating Resolved errors and retries added
        await io.assert.verifyElementDisplayedByText('Resolved errors', 'Error not available')
        await io.assert.verifyElementDisplayedByText('Retries', 'Error not available')
    });
});
