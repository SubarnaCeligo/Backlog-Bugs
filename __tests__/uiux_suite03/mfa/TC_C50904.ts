import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe(
  "C50904 C99342 Verify the validation message if user wants to to select both SSO & MFA",
  () => {
    test("@Env-All @Zephyr-IO-T19653 @Zephyr-IO-T25378 C50904 C99342 Verify the validation message if user wants to to select both SSO & MFA", async ({
      io,
      page
    }) => {
       await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL)
       await io.myAccountPage.waitForElementAttached(selectors.basePagePO.ACCOUNT_BUTTON)  
       await io.homePage.click(selectors.basePagePO.ACCOUNT_BUTTON)
       
       await io.homePage.click(selectors.myAccountPagePO.USERS)
       await io.myAccountPage.clickByText('Invite user')

        await io.myAccountPage.waitForElementAttached(selectors.myAccountPagePO.MFA_TOGGLE)    
        // Click require MFA toggle
        await io.myAccountPage.click(selectors.myAccountPagePO.REQUIRE_MFA_TOGGLE);

        // Click require SSO toggle
        await io.myAccountPage.click(selectors.myAccountPagePO.REQUIRE_SSO_TOGGLE);
        

        //check if the error message is displayed
        const hoverText = (await io.myAccountPage.getText(selectors.em2DotOLineGraphPO.ASSIGNEE_PILL_HOVERTEXT)).toString();
        await io.assert.expectToContainValue(
          "You can’t require both MFA and SSO for a user.",
          hoverText,
          'Hovertext did not appear'
        );
    });
  }
);