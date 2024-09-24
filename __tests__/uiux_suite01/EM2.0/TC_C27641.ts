import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import playload from "@testData/profile/updatePreference.json"


test.describe("Verify flow run time is displayed correct on Line Graph when changed the 'last run' value", () => {
  test.beforeEach(async ({ io }) => {
    //Set relative timestamp to true
    playload.showRelativeDateTime = false;
    const resp = await io.api.putCall('v1/preferences',playload);
  });
  test("@Zephyr-IO-T7368 @Env-All Verify flow run time is displayed correct on Line Graph when changed the 'last run' value", async ({ io, page }) => {

    //Navigate to default integration
    await io.homePage.navigateTo(process.env["IO_Integration_URL"]);

    // Search for a DND flow which has been running for more than 2 weeks
    await io.integrationPage.waitForElementAttached(selectors.integrationPagePO.INTEGRATION_PAGE_SEARCH_BAR);
    await io.integrationPage.fill(selectors.integrationPagePO.INTEGRATION_PAGE_SEARCH_BAR, 'Flow_With_Errors2_DND');
    
    //Wait for search to complete
    await io.integrationPage.waitForElementAttached(selectors.flowBuilderPagePO.ACTIONS_SELECTOR);
 
    //Open the flow
    await io.integrationPage.clickByText('Flow_With_Errors2_DND');

    //Open line graph
    await io.flowBuilder.click(selectors.flowBuilderPagePO.CHARTS);

    //Select 'Last 15 days' from the filter
    await io.flowBuilder.click(selectors.em2DotOLineGraphPO.FILTER_CHEVRON_ICON);
    await io.flowBuilder.waitForElementAttached(selectors.basePagePO.ARROW_POPPER);
    await io.flowBuilder.click(selectors.em2DotOLineGraphPO.LAST_15DAYS);
    await io.flowBuilder.getByRoleClick('button', 'Apply');
    await io.flowBuilder.delay(10000);

    //Get all x -axis values in an array and extract first and last dates from graph
    const last15Days = await io.flowBuilder.getText(selectors.em2DotOLineGraphPO.LINE_GRAPH_XAXIS);
    const first10Chars = last15Days[0].slice(0, 10);
    const last10Chars = last15Days[0].slice(-10);

    // Convert the substrings to Date objects
    const firstDate = new Date(`${first10Chars.slice(6, 10)}-${first10Chars.slice(0, 2)}-${first10Chars.slice(3, 5)}`);
    const lastDate = new Date(`${last10Chars.slice(6, 10)}-${last10Chars.slice(0, 2)}-${last10Chars.slice(3, 5)}`);

    // Calculate the difference in milliseconds
    const timeDifference = lastDate.getTime() - firstDate.getTime();

    // Convert the time difference to days, add 1 to include current day
    const daysDifference = timeDifference / (1000 * 60 * 60 * 24) + 1;

    //Verify if x-xis shows last 15 days
    await io.assert.expectToBeValue('15', daysDifference.toString(), "Last 15 days graph is not displayed")

    // Switch the filter to 'Last 7 days'
    await io.flowBuilder.click(selectors.em2DotOLineGraphPO.FILTER_CHEVRON_ICON);
    await io.flowBuilder.waitForElementAttached(selectors.basePagePO.ARROW_POPPER);
    await io.flowBuilder.click(selectors.em2DotOLineGraphPO.LAST_7DAYS);
    await io.flowBuilder.getByRoleClick('button', 'Apply');
    await io.flowBuilder.delay(10000);

    const last07Days = await io.flowBuilder.getText(selectors.em2DotOLineGraphPO.LINE_GRAPH_XAXIS);

    // Extract the first and last dates
    const first10Chars2 = last07Days[0].slice(0, 10);
    const last10Chars2 = last07Days[0].slice(-10);

    // Convert the substrings to Date objects
    const firstDate2 = new Date(`${first10Chars2.slice(6, 10)}-${first10Chars2.slice(0, 2)}-${first10Chars2.slice(3, 5)}`);
    const lastDate2 = new Date(`${last10Chars2.slice(6, 10)}-${last10Chars2.slice(0, 2)}-${last10Chars2.slice(3, 5)}`);

    // Calculate the difference in milliseconds
    const timeDifference2 = lastDate2.getTime() - firstDate2.getTime();

    // Convert the time difference to days
    const daysDifference2 = timeDifference2 / (1000 * 60 * 60 * 24) + 1;

    await io.assert.expectToBeValue('7', daysDifference2.toString(), "Last 7 days graph is not displayed")

  });
});