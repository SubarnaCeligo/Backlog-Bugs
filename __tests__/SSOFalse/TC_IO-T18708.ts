import { test, expect, links } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt } from "@celigo/aut-utilities";
test.describe('@Env-All @Zephyr-IO-T18708 Verify whether ""Request Upgrade"" button available in Security tab if SSO flag is f from endpoint type license', () => {

    test('@Env-All @Zephyr-IO-T18708 Verify whether ""Request Upgrade"" button available in Security tab if SSO flag is f from endpoint type license', async ({
      io,
      page
    }) => {
      await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
      await io.homePage.navigateTo(io.data.links.MY_ACCOUNT_PAGE_URL);  
      await io.myAccountPage.click(selectors.myAccountPagePO.SECURITY);
      await io.assert.verifyElementDisplayedByText('Request upgrade','Request Upgrade button is not visible');
    });
});
