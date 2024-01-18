import {expect, test} from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";


test.describe("C46935 Verify, the owner shouldn't be getting an option to select the primary account.", () => {

    test.beforeEach(async ({ io }) => {
         
        await io.myAccountPage.navigateTo(io.data.links.MY_ACCOUNT_PAGE_URL);
        await io.myAccountPage.click(selectors.myAccountPagePO.SECURITY);
        
        
      });
    test("C46935 Verify, the owner shouldn't be getting an option to select the primary account.", async ({io, page}) => {
       
    
        await io.myAccountPage.click(selectors.myAccountPagePO.MFA);
        await io.myAccountPage.click(selectors.myAccountPagePO.MFA_TOGGLE);
       const count = (await page.$$('.MuiTypography-h5')).length;
       const count2 = (await page.$$('.Mui-required')).length;
       await io.assert.expectToBeValue("5",(count+count2).toString(),"Total number of steps is not as expected");
       const mfaChooseAccount = await page.$$("Choose primary account to reset MFA ");
       await io.assert.expectToBeValue("0",mfaChooseAccount.length.toString(),"Element is present which is not expected")
   
       });
    });