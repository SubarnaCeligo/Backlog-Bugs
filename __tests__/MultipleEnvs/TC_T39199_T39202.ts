import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("TC_T39199_T39202_Test to validate new user is able to create new multiple non prod environments && Test to validate user with owner/admin access is able to create new environments", () => {
    test.beforeEach(async ({ io }) => {
        await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
    });
    test("TC_T39199_T39202 @Zephyr-IO-T39199 @Zephyr-IO-T39202 @Env-COREDEV @Priority-P2", async ({ io, page }) => {
        await io.homePage.addStep("*** Navigated to home page ***");
        await io.homePage.loadingTime();
        await io.homePage.loadingTime();
        await io.myAccountPage.navigateTo(io.data.links.MY_ACCOUNT_PAGE_URL);
        await io.homePage.addStep("*** Navigated to account page ***");
        await io.homePage.loadingTime();
        await io.homePage.loadingTime();
        await io.myAccountPage.clickByText("Environments");
        await io.homePage.addStep("*** Navigated to Environments tab ***");
        await io.homePage.loadingTime();
        await io.homePage.loadingTime();
        await io.myAccountPage.clickByText("Create environment");
        await io.homePage.addStep("*** clicked on Create Environment button ***");
        await io.homePage.loadingTime();
        await io.homePage.loadingTime();
        await io.homePage.click(selectors.basePagePO.ADD_NAME);
        await page.keyboard.press('/');
        await io.homePage.addStep("*** added name for the Environment ***");
        await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
    });
});