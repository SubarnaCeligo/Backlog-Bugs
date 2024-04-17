import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("Verify that clicking on 'Flows' shows all the completed EDI flows", () => {
  test.beforeEach(async ({ io }) => {
    await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test("Verify that clicking on 'Flows' shows all the completed EDI flows", async ({ io, page }) => {
    //Go to Dashboard
    await io.myAccountPage.navigateTo(process.env["IO_UI_CONNECTOR_URL"] + "dashboard");

    //Go to EDI activity
    await io.homePage.click("[data-test= 'edi-activity']");

    //Open Flows


    await io.homePage.addStep("Verify that EDI flows can be filtered using date range filter");

    //Click on date filter
    await io.homePage.click('button.MuiButton-outlined');
    await io.homePage.waitForElementAttached('#arrow-popper');

    await io.homePage.clickByText('Last 7 days');

    //Get the dates displayed.
    //Verify if the logs displayed are less than 30 days old
     const dates = await io.flowBuilder.getText("<dates selector>");

     //Get the oldest date from the list
     const oldestDateString = dates[0];
     const oldestDate = new Date(oldestDateString);
 
     // Get the current date
     const currentDate = new Date();
 
     // Calculate the difference in milliseconds
     const timeDifference = currentDate.getTime() - oldestDate.getTime();
 
     // Convert the difference to days, add 1 to include current day
     const daysDifference = timeDifference / (1000 * 60 * 60 * 24);
 
     await io.assert.expectToBeTrue((Math.round(daysDifference) <= 7), 'Last 7 days logs are not displayed');

  });
});