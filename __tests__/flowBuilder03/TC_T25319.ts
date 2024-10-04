import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("TC_T23485", () => {
    test.beforeEach(async ({ io }) => {
        await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
    });
    test("TC_T23485 @Zephyr-IO-T23485 @Env-All @Priority-P2", async ({ io, page }) => {
        await io.homePage.addStep("*** Navigated to home page ***");
        await io.homePage.fill(selectors.integrationPagePO.INTEGRATION_PAGE_SEARCH_BAR, "BacklogAutomationCases_DND");
        await io.homePage.addStep("*** Searched for the integration ***");
        await io.flowBuilder.loadingTime();
        await io.homePage.clickByText("BacklogAutomationCases_DND");
        await io.homePage.addStep("*** Opened the integration ***");
        await io.homePage.clickByText("FTP_FTP");
        await io.homePage.addStep("*** Opened the flow ***");
        await io.flowBuilder.loadingTime();
        await io.homePage.click(selectors.basePagePO.FLOWSETTING)
        await io.homePage.addStep("*** Clicked on settings ***");
        await io.homePage.clickByText("Please select flow");
        await io.homePage.clickByText("IO-T1620_DND");
        await io.homePage.clickByText("Done");
        await io.homePage.click(selectors.flowBuilderPagePO.CLOSE_RIGHT_DRAWER)
        await io.homePage.clickByText("Discard changes");
        await io.homePage.click(selectors.flowBuilderPagePO.RUNTEST_BUTTON);
        await io.homePage.addStep("*** Opened transformation rules ***");
        await io.myAccountPage.waitForElementAttached(selectors.flowBuilderPagePO.RUNTEST_BUTTON);
        await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
    });
});