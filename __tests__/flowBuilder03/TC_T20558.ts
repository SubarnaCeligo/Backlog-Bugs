import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("TC_T20558_Verify transformation 2.0 rules with complex structure", () => {
    test.beforeEach(async ({ io }) => {
        await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
    });
    test("TC_T20558 @Zephyr-IO-T1620 @Env-All @Priority-P2", async ({ io, page }) => {
        await io.homePage.addStep("*** Navigated to home page ***");
        await io.homePage.fill(selectors.integrationPagePO.INTEGRATION_PAGE_SEARCH_BAR, "BacklogAutomationCases_DND");
        await io.homePage.addStep("*** Searched for the integration ***");
        await io.flowBuilder.loadingTime();
        await io.homePage.clickByText("BacklogAutomationCases_DND");
        await io.homePage.addStep("*** Opened the integration ***");
        await io.homePage.clickByText("FTP_FTP");
        await io.homePage.addStep("*** Opened the flow ***");
        await io.flowBuilder.loadingTime();
        await io.homePage.click(selectors.basePagePO.EXPORTTRANSFORMATION);
        await io.homePage.addStep("*** Opened transformation rules ***");
        await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
    });
});