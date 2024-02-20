import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe(
  "C50903 Verify that user should be able to select either of MFA or SSO in invite user page",
  () => {
    test("C50903 Verify that user should be able to select either of MFA or SSO in invite user page", async ({
      io,
      page
    }) => {
       await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL)
       await io.homePage.waitForElementAttached('.MuiButtonBase-root.MuiIconButton-root.MuiIconButton-colorInherit.MuiIconButton-sizeSmall')
       await io.homePage.clickByIndex('.MuiButtonBase-root.MuiIconButton-root.MuiIconButton-colorInherit.MuiIconButton-sizeSmall',1)
       
       await io.homePage.click(selectors.myAccountPagePO.USERS)
       await io.myAccountPage.clickByText('Invite user')

        await io.myAccountPage.waitForElementAttached(selectors.myAccountPagePO.ACCOUNT_MFA_REQUIRED)       
        // Find the "Require MFA" toggle element
        const mfaToggle = await page.$(selectors.myAccountPagePO.ACCOUNT_MFA_REQUIRED);

        // Check if the toggle is unchecked
        const isChecked = await mfaToggle.$eval('input', input => input.checked);

        // Assert that the toggle is unchecked
        expect(isChecked).toBeFalsy();


    });
  }
);