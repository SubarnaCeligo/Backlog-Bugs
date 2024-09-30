import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("TC_T1655", () => {
    test.beforeEach(async ({ io }) => {
        await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
    });
    test("T1655 @Env-All @Priority-P2 @Zephyr-IO-T1655", async ({ io, page }) => {
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
        await io.flowBuilder.loadingTime();
        await io.flowBuilder.loadingTime();
        await io.flowBuilder.loadingTime();
        await io.flowBuilder.loadingTime();
        await io.flowBuilder.loadingTime();
        await io.flowBuilder.reloadPage()
        await io.flowBuilder.reloadPage()
        await io.flowBuilder.reloadPage()
        await io.flowBuilder.waitForElementAttached(selectors.basePagePO.RUNFLOW);
        await io.homePage.addStep("*** Flow ran succesfully ***");
        await io.flowBuilder.loadingTime();
        await io.flowBuilder.loadingTime();
        await io.flowBuilder.loadingTime();
        await io.flowBuilder.loadingTime();
        await io.flowBuilder.loadingTime();
        await io.flowBuilder.loadingTime();
        await io.flowBuilder.loadingTime();
        await io.flowBuilder.loadingTime();
        await io.homePage.clickByIndex(selectors.flowBuilderPagePO.ERROR_BUBBLE, 1);
        await io.homePage.addStep("*** Opened Error bage ***");
        await io.homePage.click(selectors.basePagePO.IDNEXTPAGE);
        await io.homePage.click(selectors.basePagePO.IDNEXTPAGE);
        await io.homePage.click(selectors.basePagePO.IDNEXTPAGE);
        await io.homePage.click(selectors.basePagePO.IDNEXTPAGE);
        await io.homePage.click(selectors.basePagePO.IDNEXTPAGE);
        await io.homePage.click(selectors.basePagePO.IDNEXTPAGE);
        await io.homePage.click(selectors.basePagePO.IDNEXTPAGE);
        await io.homePage.click(selectors.basePagePO.IDNEXTPAGE);
        await io.homePage.click(selectors.basePagePO.IDNEXTPAGE);
        await io.homePage.click(selectors.basePagePO.IDNEXTPAGE);
        await io.homePage.click(selectors.basePagePO.IDNEXTPAGE);
        await io.homePage.click(selectors.basePagePO.IDNEXTPAGE);
        await io.homePage.click(selectors.basePagePO.IDNEXTPAGE);
        await io.homePage.click(selectors.basePagePO.IDNEXTPAGE);
        await io.homePage.click(selectors.basePagePO.IDNEXTPAGE);
        await io.homePage.click(selectors.basePagePO.IDNEXTPAGE);
        await io.homePage.click(selectors.basePagePO.IDNEXTPAGE);
        await io.homePage.click(selectors.basePagePO.IDNEXTPAGE);
        await io.homePage.click(selectors.basePagePO.IDNEXTPAGE);
        await io.homePage.click(selectors.basePagePO.IDNEXTPAGE);
        await io.homePage.click(selectors.basePagePO.IDNEXTPAGE);
        await io.flowBuilder.loadingTime();
        await io.flowBuilder.loadingTime();
        await io.homePage.click(selectors.dashboardPagePO.DOWNWARD_ARROW);
        await io.homePage.addStep("*** Checked hover text is not there after clicking on Timestamp ***");
        await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
        await io.homePage.addStep("*** Navigated to home page ***");
    });
});