import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("TC_C113519_Verify hover text is not displayed when message drop down is opened in Error window", () => {
    test.beforeEach(async ({ io }) => {
        await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
    });
    test("C113519 @Env-All @Priority-P2 @Zephyr-IO-T8193", async ({ io, page }) => {
        await io.homePage.addStep("*** Navigated to home page ***");
        await io.homePage.fill(selectors.integrationPagePO.INTEGRATION_PAGE_SEARCH_BAR, "Tags 1000 errors- Mysql to mysql flow_DND");
        await io.homePage.addStep("*** Searched for the integration ***");
        await io.flowBuilder.loadingTime();
        await io.homePage.clickByText("Tags 1000 errors- Mysql to mysql flow_DND");
        await io.homePage.addStep("*** Opened the integration ***");
        await io.homePage.clickByText("Mysql to mysql flow_DND");
        await io.homePage.addStep("*** Opened the flow ***");
        await io.flowBuilder.loadingTime();
        await io.homePage.click(selectors.basePagePO.RUNFLOW);
        await io.homePage.addStep("*** Running the flow ***");
        await io.flowBuilder.loadingTime();
        await io.flowBuilder.loadingTime();
        await io.flowBuilder.waitForElementAttached(selectors.basePagePO.RUNFLOW);
        await io.homePage.addStep("*** Flow ran succesfully ***");
        await io.flowBuilder.loadingTime();
        await io.homePage.click(selectors.flowBuilderPagePO.ERROR_BUBBLE);
        await io.homePage.addStep("*** Opened Error bage ***");
        await io.flowBuilder.loadingTime();
        await io.homePage.clickByText("Timestamp");
        await io.homePage.addStep("*** Checked hover text is not there after clicking on Timestamp ***");
        await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
        await io.homePage.addStep("*** Navigated to home page ***");
    });
});