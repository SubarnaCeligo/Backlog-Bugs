import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("TC_IO74286_Unable to see the refresh button for selecting the account in RPNS IA", () => {
    test.beforeEach(async ({ io }) => {
        await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
        await io.homePage.loadingTime();
    });
    test("@Bug-IO-74286 @Env-IAQA @Priority-P2 @Zephyr-T30146", async ({ io, page }) => {
        await io.homePage.addStep("*** Navigated to home page ***");
        await io.homePage.fill(selectors.integrationPagePO.INTEGRATION_PAGE_SEARCH_BAR, "Payout to Reconciliation");
        await io.homePage.addStep("*** Searched for the integration ***");
        await io.flowBuilder.loadingTime();
        await io.homePage.clickByText("Payout to Reconciliation");
        await io.homePage.addStep("*** Opened the integration ***");
        await io.flowBuilder.loadingTime();
        await io.flowBuilder.loadingTime();
        await io.flowBuilder.loadingTime();
        await io.homePage.click(selectors.integrationPagePO.SELECTCHILDBUTTON);
        await io.homePage.addStep("*** Clicked on child button ***");
        await io.flowBuilder.loadingTime();
        await io.homePage.clickByText("Amazon");
        await io.homePage.addStep("*** Clicked on Amazon ***");
        await io.homePage.click(selectors.flowBuilderPagePO.SETTINGS);
        await io.homePage.addStep("*** Opened settings section ***");
        await io.homePage.click(selectors.flowBuilderPagePO.REFRESH_RECORD_TYPE);
        await io.homePage.addStep("*** Verified the refresh button by clicking it ***");
        await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
        await io.homePage.addStep("*** Navigated to home page ***");
    });
});