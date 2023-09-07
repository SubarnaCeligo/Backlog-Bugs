import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import C733 from "@testData/MyAccount/C733.json"

test.describe.only('Verify when user is logged with google account, Name and Emailfields vaules should be displayed by default', () => { 

    test.beforeEach(async ({ io }) => {
        await io.myAccountPage.navigateTo(io.data.links.MY_ACCOUNT_PAGE_URL);
      });
    test('Verify when user is logged with google account, Name and Emailfields vaules should be displayed by default', async ({ io, page }) => {
        
        
        const expectedDefaultValue = C733.mail;
        const expectedName =  C733.name;
            const emailInput = await page.waitForSelector( `input${selectors.myAccountPagePO.EMAIL_INPUT}`);
        const nameInput = await page.waitForSelector(selectors.flowBuilderPagePO.FLOW_NAME);

        const actualEmailValue = await emailInput.getAttribute("value");
        const actualNameValue = await nameInput.getAttribute("value");

   
        expect(actualEmailValue).toBe(expectedDefaultValue);
        expect(actualNameValue).toBe(expectedName);
  
      });       
  })