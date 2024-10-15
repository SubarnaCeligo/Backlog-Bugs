import { test, expect, links } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
test.describe('IO-T18708 Verify whether ""Request Upgrade"" button available in Security tab if SSO flag is false from endpoint type license', () => {
  test.beforeEach(async ({ io }) => {
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);  
  });
    test('@Env-All @Zephyr-IO-T18708 IO-T18708 Verify whether ""Request Upgrade"" button available in Security tab if SSO flag is false from endpoint type license', async ({
      io,
      page
    }) => {
      await io.homePage.navigateTo(io.data.links.MY_ACCOUNT_PAGE_URL);
      await io.myAccountPage.click(selectors.myAccountPagePO.SECURITY);
      await io.assert.verifyElementDisplayedByText('Request upgrade','Request Upgrade button is not visible');
    });
});