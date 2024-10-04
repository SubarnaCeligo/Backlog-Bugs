import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("TC_T2542", () => {
    test.beforeEach(async ({ io }) => {
        await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
    });
    test("TC_T2542 @Zephyr-IO-T2542 @Env-All @Priority-P2", async ({ io, page }) => {
        await io.homePage.addStep("*** Navigated to home page ***");
        await io.flowBuilder.loadingTime();
        await io.homePage.fill(selectors.integrationPagePO.INTEGRATION_PAGE_SEARCH_BAR, "01_SalesForce Real Time Import Flowsss");
        await io.homePage.addStep("*** Searched for the integration ***");
        await io.flowBuilder.loadingTime();
        await io.homePage.clickByText("01_SalesForce Real Time Import Flowsss");
        await io.flowBuilder.loadingTime();
        await io.homePage.addStep("*** Opened the integration ***");
        await io.flowBuilder.loadingTime();
        await io.homePage.clickByText("_1_SF Account to NS Customer_Real time import flow 2");
        await io.flowBuilder.loadingTime();
        await io.homePage.addStep("*** Opened the flow ***");
        await io.flowBuilder.loadingTime();
        await io.homePage.click(selectors.flowBuilderPagePO.IMPORT);
        await io.flowBuilder.loadingTime();
        await io.homePage.addStep("*** Opened NS import ***");
        await io.flowBuilder.loadingTime();
        await io.flowBuilder.click(selectors.importPagePO.NS_IMPORT_RT);
        await io.flowBuilder.loadingTime();
        await io.homePage.clickByText("Customer");
        await io.flowBuilder.loadingTime();
        await io.flowBuilder.click(selectors.importPagePO.NS_IMPORT_RT);
        await io.flowBuilder.loadingTime();
        await io.homePage.clickByText("Customer Deposit");
        await io.homePage.addStep("*** tried changing record type ***");
        await io.homePage.click(selectors.basePagePO.SAVE_AND_CLOSE);
        await io.homePage.addStep("*** Tried saving import after record type change ***");
        await io.homePage.addStep("*** import not saved unable to change recordType ***");
        await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
    });
});