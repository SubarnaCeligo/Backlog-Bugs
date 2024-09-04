import {expect, test} from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("C57328 Verify if we refresh the MFA setup page we should be staying on the same page and not navigated to other pages", () => {
  test("@Env-All @Zephyr-IO-T17012 C57328 Verify if we refresh the MFA setup page we should be staying on the same page and not navigated to other pages", async ({io, page}) => {
      await io.myAccountPage.navigateTo(io.data.links.MY_ACCOUNT_PAGE_URL);
      await io.homePage.loadingTime()
      await io.myAccountPage.click(selectors.myAccountPagePO.SECURITY);
      await io.homePage.loadingTime()
      await io.myAccountPage.click(selectors.myAccountPagePO.MFA);
      await io.homePage.loadingTime()
      await io.myAccountPage.reloadPage();
      await io.homePage.loadingTime()
      await io.assert.verifyElementDisplayedByText('Enable MFA', 'Enable MFA is not displayed');
      await io.assert.verifyElementDisplayedByText('Account settings', 'Account settings accordion not displayed');
      await io.assert.verifyElementIsDisplayed(selectors.myAccountPagePO.TRUSTED_DEVICE_FOR_PERIOD_INPUT, 'Trusted device for period is not visible');
  });
});