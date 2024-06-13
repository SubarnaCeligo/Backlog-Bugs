import {expect, test} from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("C26333Verify switching in an account which has different sorts of permissions for each Organisation where SSO=false.", () => {
  test("@Env-All @Zephyr-IO-T1411 C26333Verify switching in an account which has different sorts of permissions for each Organisation where SSO=false.", async ({io, page}) => {
      await io.myAccountPage.navigateTo(io.data.links.MY_ACCOUNT_PAGE_URL);
      await io.myAccountPage.click(selectors.myAccountPagePO.SECURITY);
      await io.homePage.loadingTime
      await io.assert.verifyElementIsDisplayed(selectors.myAccountPagePO.DISABLEORENABLE, 'SSO is enabled');
  });
});