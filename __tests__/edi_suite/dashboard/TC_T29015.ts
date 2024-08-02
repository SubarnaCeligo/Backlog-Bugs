import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("@Author-Shriti S Verify that EDI flows can be filtered using date range filter.", () => {
  test.beforeEach(async ({ io }) => {
    await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test("@Env-All @Epic-IO-31713 @Priority-P2 @Zephyr-IO-T29015 Verify that EDI flows can be filtered using date range filter.", async ({ io, page }) => {

    //Go to Dashboard
    await io.myAccountPage.navigateTo(process.env["IO_UI_CONNECTOR_URL"] + "dashboard");
    await io.homePage.loadingTime();

    //Verify if EDI activity tab is visible
    await io.homePage.waitForElementAttached(selectors.dashboardPagePO.EDI_ACTIVITY_TAB);

    //Click on EDI Activity
    await io.homePage.click(selectors.dashboardPagePO.EDI_ACTIVITY_TAB);
    await io.homePage.waitForElementAttached(selectors.dashboardPagePO.DOCUMENTS_AUTO_SELECTED)

    //Open flows dashboard
    await io.homePage.clickByTextByIndex('Documents', 0);
    await io.homePage.waitForElementAttached(selectors.dashboardPagePO.FLOWS);
    await io.homePage.click(selectors.dashboardPagePO.FLOWS);
    await io.homePage.waitForElementAttached(selectors.dashboardPagePO.FILTER_BUTTON);

    //Click on date filter
    await io.homePage.click(selectors.myAccountPagePO.DATEFILTER);
    await io.homePage.waitForElementAttached(selectors.basePagePO.ARROW_POPPER);

    //Get all available filter values
    await io.homePage.clickByText('Last 180 days');
    await io.homePage.clickByText('Apply');
    await io.homePage.loadingTime();

    //sort results in ascending order 
    await io.homePage.click('thead > tr > th:nth-child(5)');
    await io.homePage.loadingTime();
    
    let dates = (await io.homePage.getText(selectors.dashboardPagePO.LAST_RUN)).toString();
    // console.log(dates);
    let datesArray: string[] = dates.split(',');

    //Get the oldest date from the list
    const oldestDateString = datesArray[0];
    const oldestDate = new Date(oldestDateString);

    // Get the current date
    const currentDate = new Date();

    // Calculate the difference in milliseconds
    const timeDifference = currentDate.getTime() - oldestDate.getTime();

    // Convert the difference to days, add 1 to include current day
    const daysDifference = timeDifference / (1000 * 60 * 60 * 24);

    await io.assert.expectToBeTrue((Math.round(daysDifference) <= 180), 'Last 180 days data is not displayed');


  });
});