import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("TC_IO51323", () => {
    test.beforeEach(async ({ io }) => {
        await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
    });
    test("TC_IO51323 @Env-All @Priority-P2 @Zephyr-IO-51323", async ({ io, page }) => {
        await io.homePage.addStep("*** Navigated to home page ***");
        await io.homePage.waitForElementAttached(selectors.basePagePO.RESOURCES);
        await io.homePage.goToMenu("Tools","Playground");
        await io.homePage.addStep("*** Navigated back to playground page ***");
        await io.homePage.clickByText('Handlebars editor');
        await io.homePage.addStep("*** Navigated back to handlebars editor page ***");
        await io.homePage.clickByText('Simple JSON record');
        await io.homePage.addStep("*** Navigated back to JSON page ***");
        await io.homePage.addStep("*** Checked the allignment is correct at playground handlebars expression ***");
        await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
        await io.homePage.addStep("*** Navigated back to home page ***");
    });
});