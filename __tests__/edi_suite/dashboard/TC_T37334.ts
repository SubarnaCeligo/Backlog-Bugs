import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("@Author-Shriti S Verify that the headers are frozen on EDI documents dashboard", () => {
  test.beforeEach(async ({ io }) => {
    await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test("@Epic-IO-89827 @Env-QA @Zephyr-IO-T37334 @Priority-P2 Verify that the headers are frozen on EDI documents dashboard", async ({ io, page }) => {

    //Go to Dashboard
    await io.myAccountPage.navigateTo(process.env["IO_UI_CONNECTOR_URL"] + "dashboard");
    await io.homePage.loadingTime();

    //Verify if EDI activity tab is visible
    await io.homePage.waitForElementAttached(selectors.dashboardPagePO.EDI_ACTIVITY_TAB);

    //Click on EDI Activity
    await io.homePage.click(selectors.dashboardPagePO.EDI_ACTIVITY_TAB);
    await io.homePage.waitForElementAttached(selectors.dashboardPagePO.DOCUMENTS_AUTO_SELECTED);

    //Click on date filter
    await io.homePage.click(selectors.myAccountPagePO.DATEFILTER);
    await io.homePage.waitForElementAttached(selectors.basePagePO.ARROW_POPPER);

    //Get all available filter values
    await io.homePage.clickByText('Last 180 days');
    await io.homePage.clickByText('Apply');
    await io.homePage.loadingTime();

    // Locate the table header
    const headerSelector = selectors.dashboardPagePO.DOCTYPE_FILTER; 

    // Get the initial position of the header
    const initialPosition = await page.$eval(headerSelector, el => el.getBoundingClientRect().top);

    // Scroll down the page
    await page.mouse.wheel(0, 1000); // scroll down 100px
    await io.homePage.loadingTime();

    // Get the position of the header after scrolling
    const afterScrollPosition = await page.$eval(headerSelector, el => el.getBoundingClientRect().top);

    await io.assert.expectToBeTrue(initialPosition === afterScrollPosition, 'Table header is not frozen');
    


  });
});