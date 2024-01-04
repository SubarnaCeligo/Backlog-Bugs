import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
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
        let  LID= "6595487f92df6f0af1f73f89"
        let putcall =await io.api.putCall(`v1/test/licenses/${LID}`,{
          "_id": LID,
          "expires": "2021-01-01T00:00:00.000Z",
          "type": "endpoint",
          "tier": "professional",
          "supportTier": "preferred",
          "sandbox": true,
          "numEndpoints": 100,
          "numAddOnEndpoints": 0,
          "numFlows": 10,
          "numAddOnFlows": 0,
          "numTradingPartners": 9,
          "numAddOnTradingPartners": 0,
          "numAgents": 0,
          "numAddOnAgents": 0,
          "numSandboxEndpoints": 100,
          "numSandboxAddOnEndpoints": 10,
          "numSandboxFlows": 0,
          "numSandboxAddOnFlows": 0,
          "numSandboxTradingPartners": 0,
          "numSandboxAddOnTradingPartners": 0,
          "numSandboxAgents": 0,
          "numSandboxAddOnAgents": 0,
          "apiManagement": true,
          "resumable": false,
          "sso": false,
          "maxAllowedDataRetention": 60
        });
      

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
