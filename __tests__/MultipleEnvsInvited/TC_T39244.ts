import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("TC_T39244_Test to validate leave icon is shown beside environment name with correct hover text", () => {
    test.beforeEach(async ({ io }) => {
        await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
    });
    test("TC_T39244 @Zephyr-IO-T39244 @Env-COREDEV @Priority-P2", async ({ io, page }) => {
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
        await io.homePage.hover(selectors.homePagePO.SELECTED_ENVIRONMENT)
        await io.homePage.addStep("*** hovering on an env ***");
        await io.homePage.addStep("*** valited Leave Environment button ***");
        await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
    });
});