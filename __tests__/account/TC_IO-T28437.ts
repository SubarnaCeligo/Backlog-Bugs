import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { MyAccountPage } from "@celigo/ui-core-automation/dist/src/pageFactory/pages/MyAccountPage";

test.describe('IO-T28437 Verify the warning message when the user 1 tries to makeowner account for user 2 when already user 3 is pending to accept owner account request', () => {
   
    test.beforeEach(async ({ io }) => {
        await io.myAccountPage.navigateTo(io.data.links.MY_ACCOUNT_PAGE_URL); 
      });
      test('@Zephyr-IO-T28437 @Env-All IO-T28437 Verify the warning message when the user 1 tries to makeowner account for user 2 when already user 3 is pending to accept owner account request', async ({
        io,
        page
      }) => {
       
         await io.myAccountPage.addStep("Navigated to Accounts Page URL");
         await io.myAccountPage.click(selectors.myAccountPagePO.USERS);
         await io.myAccountPage.loadingTime();
         await io.myAccountPage.clickByIndex(selectors.myAccountPagePO.OPEN_ACTIONSMENU,1);
         await io.myAccountPage.click(selectors.myAccountPagePO.MAKE_ACCOUNT_OWNER);
       
         await io.myAccountPage.click(selectors.myAccountPagePO.MAKEOWNER_POPUP);
         await io.assert.verifyElementDisplayedByText("An account transfer is already pending. Delete the pending transfer at My Account > Transfers before retransferring the account.","Warning message is not as expected");

  
         });
    });