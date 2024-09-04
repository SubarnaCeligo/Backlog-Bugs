import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("TC_C113934_Verify Error page numbering is correct on applying tag to the errors of last page when there exists more than 1000 errors", () => {
    test.beforeEach(async ({ io }) => {
        await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
    });
    test("C113934 @Env-All @Priority-P2 @Zephyr-IO-113934", async ({ io, page }) => {
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
        await io.flowBuilder.reloadPage();
        await io.flowBuilder.reloadPage();
        await io.flowBuilder.waitForElementAttached(selectors.basePagePO.RUNFLOW);
        await io.flowBuilder.reloadPage();
        await io.flowBuilder.reloadPage();
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
        await io.homePage.addStep("*** Opened the error page ***");
        await io.flowBuilder.loadingTime();
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
        await io.homePage.addStep("*** Moved to page with 1000th error ***");
        await io.homePage.click(selectors.flowBuilderPagePO.ERROR_TAG);
        await io.homePage.addStep("*** Clicked on error tage ***");
        await io.flowBuilder.loadingTime();
        await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
        await io.homePage.addStep("*** Navigated to home page ***");
    });
});