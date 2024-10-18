import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("TC_T39226_Test to validate account name is used as search key instead of environment name", () => {
    test.beforeEach(async ({ io }) => {
        await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
    });
    test("TC_T39225 @Zephyr-IO-T39225 @Env-COREDEV @Priority-P2", async ({ io, page }) => {
        await io.homePage.addStep("*** Navigated to home page ***");
        await io.homePage.loadingTime();
        await io.homePage.loadingTime();
        await io.myAccountPage.navigateTo(io.data.links.MY_ACCOUNT_PAGE_URL);
        await io.homePage.addStep("*** Navigated to account page ***");
        await io.homePage.loadingTime();
        await io.homePage.loadingTime();
        await io.myAccountPage.click(selectors.homePagePO.SELECTED_ACCOUNT);
        await io.homePage.addStep("*** invoked Environments dropdown ***");
        await io.homePage.loadingTime();
        await io.homePage.loadingTime();
        await io.homePage.fill(selectors.integrationPagePO.INTEGRATION_PAGE_SEARCH_BAR, "webhook");
        await io.homePage.addStep("*** searching in the search box with ENV name ***");
        await io.homePage.addStep("*** verified no results are shown as we are searching with env name ***");
        await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
    });
});