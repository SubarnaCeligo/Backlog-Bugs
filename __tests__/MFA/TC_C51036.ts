import {expect, test} from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("C51036 Verify a message is shown to the user after the account settings are saved.", () => {
  test("@Env-All C51036 @Zephyr-IO-T19637 Verify a message is shown to the user after the account settings are saved.", async ({io, page}) => {
      console.log({ a: io.data.links})
      await io.myAccountPage.navigateTo(io.data.links.MY_ACCOUNT_PAGE_URL);
      await io.homePage.loadingTime()
      await io.myAccountPage.click(selectors.myAccountPagePO.SECURITY);
      await io.homePage.loadingTime()
      await io.myAccountPage.click(selectors.myAccountPagePO.MFA);
      await io.homePage.loadingTime()
      var randomNumber = Math.floor(Math.random() * 900) + 100; // random number between 100-999
      await io.myAccountPage.fill(selectors.myAccountPagePO.TRUSTED_DEVICE_FOR_PERIOD_INPUT, randomNumber);
      await page.keyboard.down('Tab')
      await page.keyboard.down('Enter')
      await io.myAccountPage.waitForElementAttached(selectors.flowGroupingPagePO.ALERT_MESSAGE);
      await io.assert.verifyElementText(selectors.flowGroupingPagePO.ALERT_MESSAGE, 'MFA account settings saved successfully.');
  });
});