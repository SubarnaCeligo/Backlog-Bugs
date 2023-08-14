import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe('Verify when user is logged with google account, Name and Emailfields vaules should be displayed by default', () => { 

    test.beforeEach(async ({ io }) => {
        await io.myAccountPage.navigateTo(io.data.links.MY_ACCOUNT_PAGE_URL);
      });
    test('Verify when user is logged with google account, Name and Emailfields vaules should be displayed by default', async ({ io, page }) => {
        
        const expectedDefaultValue = "harshita.rai+2@celigo.com";
        const expectedName = "Harshita Rai"
    
        // Get the value attribute of the input element
        const actualValue = await page.getAttribute("[type=email]", "value");
        const actualNameValue = await page.getAttribute("[type=text]", "value");
    
        // Compare the actual value with the expected default value
        expect(actualValue).toBe(expectedDefaultValue);
           
      });       
  })