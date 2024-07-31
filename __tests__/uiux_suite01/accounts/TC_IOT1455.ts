import { test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe('TC_IOT1455 Verify Help texts are scrollable in My account > Users', () => {
   
    test.beforeEach(async ({ io }) => {
        await io.myAccountPage.navigateTo(io.data.links.MY_ACCOUNT_PAGE_URL); 
      });
      test('@Zephyr-IO-T1455 @Env-All  C28995 Verify Help texts are scrollable in My account > Users', async ({
        io,
      }) => {
       
         await io.myAccountPage.addStep("Navigated to Accounts Page URL");
         await io.myAccountPage.click(selectors.myAccountPagePO.USERS);
         await io.myAccountPage.loadingTime();
         await io.myAccountPage.click(selectors.myAccountPagePO.HELP_TEXT);
         await io.myAccountPage.loadingTime();
         const isHelpTextTitleDisplayed = await io.flowBuilder.isVisible("text='Users'");
         await io.assert.expectToBeTrue(isHelpTextTitleDisplayed, "Title  is not displayed");
         
         const isHelpTextDescriptionDisplayed= await await io.flowBuilder.isVisible("text='Invite users to either Administer your account, or Manage or Monitor your integrations. A user who has been invited to Administer an account will have all the same permissions as the account Owner, including inviting users and changing their access rights. A user who has been invited to Manage an integration will have permissions to edit existing flows or create flows within an integration tile. A user who has Monitor permissions will only be allowed to view the integration, they do not have permissions to make any changes. They are however allowed to run the flows within the integration. The user will see only those integrations that you have invited them to.'");
         await io.assert.expectToBeTrue(isHelpTextDescriptionDisplayed, "Description  is not displayed");
  
         });
    });