import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe(
  "C50903 Verify that user should be able to select either of MFA or SSO in invite user page",
  () => {
    test("@Env-All @Zephyr-IO-T19652 C50903 Verify that user should be able to select either of MFA or SSO in invite user page", async ({
      io,
      page
    }) => {
       await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL)
       await io.myAccountPage.waitForElementAttached(selectors.basePagePO.ACCOUNT_BUTTON)
       await io.homePage.click(selectors.basePagePO.ACCOUNT_BUTTON)

       await io.homePage.click(selectors.myAccountPagePO.USERS)
       await io.myAccountPage.clickByText('Invite user')

        await io.myAccountPage.waitForElementAttached(selectors.myAccountPagePO.ACCOUNT_MFA_REQUIRED)

        // Check if the toggle is unchecked
        await io.assert.verifyElementAttributeContainsText(selectors.myAccountPagePO.ACCOUNT_MFA_REQUIRED, 'aria-checked', 'false');

    });
  }
);