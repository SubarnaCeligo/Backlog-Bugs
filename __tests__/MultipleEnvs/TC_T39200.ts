import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("TC_T39200_Test to validate create new environment is visible only in production env", () => {
    test.beforeEach(async ({ io }) => {
        await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
    });
    test("TC_T39200 @Zephyr-IO-T39200 @Env-COREDEV @Priority-P2", async ({ io, page }) => {
        await io.homePage.addStep("*** Navigated to home page ***");
        await io.homePage.loadingTime();
        await io.homePage.loadingTime();
        await io.homePage.clickByText("Production")
        await io.homePage.addStep("*** Clicked on Environment dropdown ***");
        await io.homePage.loadingTime();
        await io.homePage.loadingTime();
        await io.homePage.clickByText("Non production environment")
        await io.homePage.addStep("*** Navigated to Non prod env ***");
        await io.homePage.loadingTime();
        await io.homePage.loadingTime();
        await io.myAccountPage.navigateTo(io.data.links.MY_ACCOUNT_PAGE_URL);
        await io.homePage.addStep("*** Navigated to account page in Non prod env ***");
        await io.homePage.loadingTime();
        await io.homePage.loadingTime();
        await io.homePage.loadingTime();
        const textToCheck = "Environments"; 
        const elementWithText = await page.locator(`text=${textToCheck}`);
        const isElementVisible = await elementWithText.isVisible();
        await io.assert.expectToBeFalse(isElementVisible, "");
        await io.homePage.addStep("*** Verified Environments Tab is not there in Account page in Non Prod ENV ***");
        await io.homePage.clickByText("Non production environment")
        await io.homePage.addStep("*** Clicked on Environment dropdown ***");
        await io.homePage.loadingTime();
        await io.homePage.loadingTime();
        await io.homePage.clickByText("Production")
        await io.homePage.addStep("*** Navigated to back to prod env ***");
        await io.homePage.loadingTime();
        await io.homePage.loadingTime();
        await io.myAccountPage.navigateTo(io.data.links.MY_ACCOUNT_PAGE_URL);
        await io.homePage.loadingTime();
        await io.homePage.addStep("*** Navigated to account page in Non prod env ***");
        await io.homePage.loadingTime();
        await io.homePage.loadingTime();
        const textToCheck1 = "Environments"; 
        const elementWithText1 = await page.locator(`text=${textToCheck1}`);
        const isElementVisible1 = await elementWithText1.isVisible();
        await io.assert.expectToBeTrue(isElementVisible1, "");
        await io.homePage.addStep("*** Verified Environments Tab is there in Account page in Non Prod ENV ***");
        await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
    });
});