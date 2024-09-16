import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("C77905 To verify that the user should be able to create the Amazon/Salesforce oauth2.0 connection successfully.", () => {
  test.beforeEach(async ({ io }) => {
    await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
});
test.afterEach(async ({ io }) => {
  await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
});
  test("@Env-All @Zephyr-IO-T22129 C77905 To verify that the user should be able to create the Amazon/Salesforce oauth2.0 connection successfully.", async ({ io, page }) => {
    let x = await io.connections.getConnection("AMAZON SP API CONNECTION");
    let authorizationUrl = await io.api.getCall("v1/connection/" + x._id + "/oauth2");
    await io.exportsPage.navigateTo(authorizationUrl.authorizationUrl);
    await io.flowBuilder.loadingTime();
    let logpage = false;
    try{
      await io.assert.verifyElementDisplayedByText(
        "Email or mobile phone number",
        "Verify Email or mobile phone number is not displayed"
      );
      await io.assert.verifyElementDisplayedByText(
        "Continue",
        "Continue button is displayed"
      );
    logpage = true;
    }
    catch(e){
      try{
        await io.assert.verifyElementDisplayedByText(
          "amazon seller central",
          "amazon seller central is not displayed"
        );
        logpage = true;
      }
      catch(e){
        logpage = false;
      }
    }

    await io.assert.expectToBeTrue(logpage, 'Unable to get login page');


    let valid = false;
    if (authorizationUrl.authorizationUrl.includes('https://sellercentral.amazon')) {
      valid = true
    }
    await io.assert.expectToBeTrue(valid, 'unable to get amazon seller central url');

  });
}); 
