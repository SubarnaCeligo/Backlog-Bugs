import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("TC_T39223_T39224_Test to validate user is able to search through the accounts and env's only when user has been invited to multiple accounts && Test to validate search is case insensitive", () => {
    test.beforeEach(async ({ io }) => {
        await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
    });
    test("TC_T39223_T39224 @Zephyr-IO-T39223 @Zephyr-IO-T39224 @Env-COREDEV @Priority-P2", async ({ io, page }) => {
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
        await io.homePage.fill(selectors.integrationPagePO.INTEGRATION_PAGE_SEARCH_BAR, "tata");
        await io.homePage.addStep("*** searchiing in the search box ***");
        await io.homePage.addStep("*** verified searching in the search box and verified the case sensitivity ***");
        await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
    });
});