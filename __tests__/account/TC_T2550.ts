import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("TC_T2550", () => {
    test.beforeEach(async ({ io }) => {
        await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
    });
    test("TC_T2550 @Zephyr-IO-T2550 @Env-All @Priority-P2", async ({ io, page }) => {
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
        await io.homePage.clickByText("Add or Update");
        await io.homePage.addStep("*** tried changing import type to Add or Update ***");
        await io.flowBuilder.loadingTime();
        await io.homePage.click(selectors.basePagePO.SAVE_AND_CLOSE);
        await io.homePage.addStep("*** Check the buttons after changing import type for Add or update ***");
        await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
    });
});