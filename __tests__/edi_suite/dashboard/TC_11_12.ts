import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("Verify that EDI activity can be filtered using single FA status.", () => {
  test.beforeEach(async ({ io }) => {
    await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test("Verify that EDI activity can be filtered using single FA status.", async ({ io, page }) => {
    //Go to Dashboard
    await io.myAccountPage.navigateTo(process.env["IO_UI_CONNECTOR_URL"] + "dashboard");

    //Go to EDI activity
    await io.homePage.click("[data-test= 'edi-activity']");

    //Verify FA status filter - Single value
    await io.homePage.click("[data-test= 'fa-status-filter']");
    await io.homePage.waitForElementAttached('#arrow-popper');

    //Select filter
    await io.homePage.clickByText('Accepted');

    //Apply
    await io.homePage.clickByText('Apply');

    //Get all status values from filtered data

    //Check if it matches with applied filter.


     //Verify FA status filter - Multiple values
     await io.homePage.click("[data-test= 'fa-status-filter']");
     await io.homePage.waitForElementAttached('#arrow-popper');
 
     //Select filter
     await io.homePage.clickByText('Accepted');
     await io.homePage.clickByText('Rejected');
 
     //Apply
     await io.homePage.clickByText('Apply');
 
     //Get all status values from filtered data
 
     //Check if it matches with applied filter.
   
    
  });
});