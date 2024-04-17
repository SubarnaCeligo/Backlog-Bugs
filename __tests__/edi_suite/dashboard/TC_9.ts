import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("Verify EDI dashboard when there is no EDI activity in the account.", () => {
  test.beforeEach(async ({ io }) => {
    await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test("Verify EDI dashboard when there is no EDI activity in the account.", async ({ io, page }) => {
    //Go to Dashboard
    await io.myAccountPage.navigateTo(process.env["IO_UI_CONNECTOR_URL"] + "dashboard");

    //Go to EDI activity
    await io.homePage.click("[data-test= 'edi-activity']");

    //Verify message
    let message = (await io.homePage.getText('.MuiTypography-body1')).toString();
    await io.assert.expectToBeValue('No EDI activity to report', message, 'Message is not displayed.');
   
    
  });
});