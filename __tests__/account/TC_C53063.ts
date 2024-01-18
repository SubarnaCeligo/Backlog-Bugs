import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import ProfessionalLicense from '@testData/Flows/ProfessionalLicense.json';
import { MyAccountPage } from "@celigo/ui-core-automation/dist/src/pageFactory/pages/MyAccountPage";

test.describe('C53063 Verify that the 30 and 60 days option is enable for license types Professional tire', () => {
   
    test.beforeEach(async ({ io }) => {
        await io.myAccountPage.navigateTo(io.data.links.MY_ACCOUNT_PAGE_URL); 
      });
     
    test('C53063 Verify that the 30 and 60 days option is enable for license types Professional tire', async ({
      io,
      page
    }) => {
     
        const licenses = await io.api.getCall("v1/licenses");   
        let putcall =await io.api.putCall(`v1/test/licenses/${process.env["IO_Integration_ID"]}`, ProfessionalLicense);
      

          await io.myAccountPage.click(selectors.myAccountPagePO.DATA_RETENTION);
          await io.myAccountPage.click(selectors.myAccountPagePO.DATA_RETENTION_PERIOD);
      
          await io.assert.verifyElementIsDisplayed(selectors.myAccountPagePO.THIRTY_DAYS,"Element is not displayed properly");
          await io.assert.verifyElementIsDisplayed(selectors.myAccountPagePO.SIXTY_DAYS,"Element is not displayed properly");
          
          await io.assert.verifyElementAttributeContainsText(selectors.myAccountPagePO.NINETY_DAYS,'class', 'Mui-disabled')
          await io.assert.verifyElementAttributeContainsText(selectors.myAccountPagePO.ONEEIGHTY_DAYS,'class', 'Mui-disabled')
      
          await io.assert.verifyElementContainsText(selectors.myAccountPagePO.ONEEIGHTY_DAYS,"upgrade required")
          await io.assert.verifyElementContainsText(selectors.myAccountPagePO.NINETY_DAYS,"upgrade required")

       });
      });
