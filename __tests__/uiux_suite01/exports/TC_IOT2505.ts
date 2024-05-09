import { test , expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("@Author - MayankOmar IO-T2505_Should show Integration Apps option when permssions are granted.", () => {
    test.beforeEach(async ({ io }) => {
        await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
    });
    test("@Zephyr-IO-T2505 @Epic-IO-62008  @Env-All @Priority-P3 Should show Integration Apps option when permssions are granted.", async ({ io, page }) => {
        await io.homePage.addStep("*** Navigated to home page ***");
        await io.homePage.click(selectors.basePagePO.DRAWERTOGGLE);
        await io.homePage.addStep("*** Clicked on Drawer toggle button ***");
        await io.homePage.click(selectors.basePagePO.RESOURCES);
        await io.homePage.addStep("*** Clicked on Resources ***");
        await io.myAccountPage.waitForElementAttached(selectors.integrationPagePO.INTEGRATIONAPPS);
        const element = await page.$(selectors.integrationPagePO.INTEGRATIONAPPS);
        await io.homePage.addStep("*** Getting Element Integration apps using selector ***");
        const text = await element.innerText();
        await io.homePage.addStep("*** Getting text from element ***");
        expect(text).toBe("Integration apps");
        await io.homePage.addStep("*** Verifying text from element ***");
    });
});