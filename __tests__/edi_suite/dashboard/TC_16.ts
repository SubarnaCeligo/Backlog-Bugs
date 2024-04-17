import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("Verify that clicking on the 'Rejected' FA status  shows the details of the document", () => {
  test.beforeEach(async ({ io }) => {
    await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test("Verify that clicking on the 'Rejected' FA status  shows the details of the document", async ({ io, page }) => {

    //Go to Dashboard
    await io.myAccountPage.navigateTo(process.env["IO_UI_CONNECTOR_URL"] + "dashboard");

    //Open EDI activity
     await io.homePage.isVisible("[data-test= 'edi-activity']");

     //Apply Rejected filter
     await io.homePage.click("[data-test= 'fa-status-filter']");
     await io.homePage.waitForElementAttached('#arrow-popper');
 
     //Select filter
     await io.homePage.clickByText('Rejected');
 
     //Apply
     await io.homePage.clickByText('Apply');

     //Click on "Rejected" hyperlink
     await io.homePage.clickByTextByIndex("Rejected", 0);

     //Verify contents
     await io.homePage.waitForElementAttached('#arrow-popper');

 

  });
});