import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("TC_T2553", () => {
    test.beforeEach(async ({ io }) => {
        await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
    });
    test("TC_T2553 @Zephyr-IO-T2553 @Env-All @Priority-P2", async ({ io, page }) => {
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
        await io.homePage.clickByText("Update");
        await io.homePage.addStep("*** tried changing import type to Update ***");
        await io.flowBuilder.loadingTime();
        await io.homePage.clickByText("Ignore missing records");
        await io.homePage.addStep("*** checking ignore button after changing import type to Update ***")
        await io.homePage.clickByText("Add");
        await io.homePage.addStep("*** tried changing import type to Add ***");
        await io.flowBuilder.loadingTime();
        await io.homePage.clickByText("Ignore existing records");
        await io.homePage.addStep("*** checking ignore button after changing import type to Add ***")
        await io.homePage.click(selectors.basePagePO.SAVE_AND_CLOSE);
        await io.homePage.addStep("*** Check the buttons after changing import type for update ***");
        await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
    });
});