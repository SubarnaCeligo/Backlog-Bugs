import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("@Author-Shriti S Verify that documents dropwdown is changed to match other dropdown components on EDI dashbaord", () => {
    test.beforeEach(async ({ io }) => {
        await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
    });
    test("@Env-QA @Epic-IO-95266 @Priority-P2 @Zephyr-IO-T38490 Verify that documents dropwdown is changed to match other dropdown components on EDI dashbaord", async ({ io, page }) => {

        //Go to Dashboard
        await io.myAccountPage.navigateTo(process.env["IO_UI_CONNECTOR_URL"] + "dashboard");
        await io.homePage.loadingTime();

        //Wait for EDI activity tab to be visible
        await io.homePage.waitForElementAttached(selectors.dashboardPagePO.EDI_ACTIVITY_TAB);

        //Click on EDI Activity
        await io.homePage.click(selectors.dashboardPagePO.EDI_ACTIVITY_TAB);
        await io.homePage.waitForElementAttached(selectors.dashboardPagePO.DOCUMENTS_AUTO_SELECTED)
        // Locate the element
        const element = await page.locator(selectors.dashboardPagePO.DOCUMENTS_AUTO_SELECTED);

        // Get the font size using page.evaluate
        const fontSize = await page.evaluate((el) => {
            return window.getComputedStyle(el).fontSize;
        }, await element.elementHandle());

        // Log the font size
        await io.assert.expectToBeValue("15px", fontSize, 'Font size for documents dropwdown is not updated');


    });
});