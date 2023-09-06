import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import C733 from "@testData/MyAccount/C733.json"

test.describe('Verify when user is logged with google account, Name and Emailfields vaules should be displayed by default', () => { 

    test.beforeEach(async ({ io }) => {
        await io.myAccountPage.navigateTo(io.data.links.MY_ACCOUNT_PAGE_URL);
      });
    test('Verify when user is logged with google account, Name and Emailfields vaules should be displayed by default', async ({ io, page }) => {
        
        
        const expectedDefaultValue = C733.mail;
        const expectedName =  C733.name;
    
        // Get the value attribute of the input element
        const actualEmailValue = await page.getAttribute( selectors.myAccountPagePO.EMAIL_INPUT, "value");
        const actualNameValue = await page.getAttribute(selectors.myAccountPagePO.NAME_INPUT, "value");
   
        // Compare the actual value with the expected default value
        expect(actualEmailValue).toBe(expectedDefaultValue);
        expect(actualNameValue).toBe(expectedName);
           
      });       
  })