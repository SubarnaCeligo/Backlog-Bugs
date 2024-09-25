import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("Verify user can see last 30 days unresolved/open errors", () => {
  test.beforeEach(async ({ io }) => {
    //Navigate to default integration
    await io.homePage.navigateTo(process.env["IO_Integration_URL"]);
  });
  test("@Zephyr-IO-T7287 @Env-All Verify user can see last 30 days unresolved/open errors", async ({ io, page }) => {
    // Search for a DND flow which has been running for more than 2 weeks
    await io.integrationPage.waitForElementAttached(selectors.integrationPagePO.INTEGRATION_PAGE_SEARCH_BAR);
    await io.integrationPage.fill(selectors.integrationPagePO.INTEGRATION_PAGE_SEARCH_BAR, 'Flow_With_Errors_DND');
    await io.integrationPage.delay(2000); // wait for the search to complete

    //Open the flow
    await io.flowBuilder.clickByText('Flow_With_Errors_DND');

    //Open errors dashborad
    await io.flowBuilder.click(selectors.flowBuilderPagePO.ACCOUNT_DASHBOARD_OPEN_ERRORS);

    //Sort the errors in ascending order - Sort direction oldest
    await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.EM2DOT0PO.DOWN_ARROW);
    await io.flowBuilder.reloadPage();
    await io.flowBuilder.click(selectors.flowBuilderPagePO.EM2DOT0PO.DOWN_ARROW);
    await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.EM2DOT0PO.UP_ARROW)

    //Verify if Timestamp filter is set to 'Last 30 days' by default
    await io.flowBuilder.clickButtonByIndex(selectors.em2DotOLineGraphPO.TIMESTAMP_FILTER, 5);
    await io.flowBuilder.waitForElementAttached(selectors.em2DotOLineGraphPO.TIMESTAMP_FILTER_SELECTED);
    const filterSelected = (await io.flowBuilder.getText(selectors.em2DotOLineGraphPO.TIMESTAMP_FILTER_SELECTED)).toString();
    await io.assert.expectToContainValue('Last 30 days', filterSelected, 'Last 30 days filter is not selected')

    //Close the filter tooltip
    await io.flowBuilder.clickButtonByIndex(selectors.em2DotOLineGraphPO.TIMESTAMP_FILTER, 5);
    await io.flowBuilder.delay(5000);

    //Verify if the logs displayed are less than 30 days old
    const dates = await io.flowBuilder.getText(selectors.em2DotOLineGraphPO.DATE_TIME_VALUES);

    //Get the oldest date from the list
    const oldestDateString = dates[0];
    const oldestDate = new Date(oldestDateString);

    // Get the current date
    const currentDate = new Date();

    // Calculate the difference in milliseconds
    const timeDifference = currentDate.getTime() - oldestDate.getTime();

    // Convert the difference to days, add 1 to include current day
    const daysDifference = timeDifference / (1000 * 60 * 60 * 24);

    await io.assert.expectToBeTrue((Math.round(daysDifference) <= 30), 'Last 30 days logs are not displayed');

  });
});