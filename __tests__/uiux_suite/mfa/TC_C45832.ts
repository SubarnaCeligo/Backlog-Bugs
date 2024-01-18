import {expect, test} from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";


test.describe("C45832 Verify if the user is not able to initiate the authentication until all the digits are entered.", () => {

    test.beforeEach(async ({ io }) => {
         
        await io.myAccountPage.navigateTo(io.data.links.MY_ACCOUNT_PAGE_URL);
        await io.myAccountPage.click(selectors.myAccountPagePO.SECURITY);
        await io.myAccountPage.click(selectors.myAccountPagePO.MFA);
        await io.myAccountPage.click(selectors.myAccountPagePO.MFA_TOGGLE);
        
        
      });
    test("C45832 The two-factor code is always 6 characters long", async ({io, page}) => {
       
         await io.myAccountPage.click(selectors.myAccountPagePO.MOBILE_CODE);
        await io.myAccountPage.fill(selectors.myAccountPagePO.MOBILE_CODE,"123456789");
        const mobilecodevalue = (await (await page.$(selectors.myAccountPagePO.MOBILE_CODE)).getAttribute('value')).toString();
        const length = mobilecodevalue.length;
        await io.assert.expectToBeValue("6",length.toString(),"Length does'nt match");
         
        });

        test("C45832 The user can enter only enter numeric digits for the code.", async ({io, page}) => {
          
             await io.myAccountPage.click(selectors.myAccountPagePO.MOBILE_CODE);
            await io.myAccountPage.fill(selectors.myAccountPagePO.MOBILE_CODE,"abcdef");
            await io.assert.verifyElementDisplayedByText("Numbers only","Text is not displayed properly");
           
             
            });

        test("C45832 The user cannot initiate authentication until all the 6-digit code is provided by the user..", async ({io, page}) => {
          
            await io.myAccountPage.click(selectors.myAccountPagePO.MOBILE_CODE);
            await io.assert.verifyElementAttributeContainsText(selectors.myAccountPagePO.VERIFY,'class', 'Mui-disabled');             
                
         });
        
    });

     
         
     

        