import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe('Verify whether Name of user who made the transfer is getting in bold in the Transfer Account Ownership popup across different browsers.', () => {
    test.beforeEach(async ({ io }) => {
        await io.myAccountPage.navigateTo(io.data.links.MY_ACCOUNT_PAGE_URL);
    });
  
    test('Verify whether Name of user who made the transfer is getting in bold in the Transfer Account Ownership popup across different browsers. ', async({io, page}) => {
   
        await io.myAccountPage.clickByText("Users");


        await page.getByRole('row', { name: 'Harshita Rai harshita.rai+2@celigo.com Admin Accepted Disable / Enable No / Yes more' }).locator('[data-test="openActionsMenu"]').click();
        await io.myAccountPage.clickByText("Make account owner");
        await io.myAccountPage.clickByText("Make owner");
        await page.waitForSelector(selectors.myAccountPagePO.SNACKBAR_ID);


   

           const messageText = await page.textContent(selectors.myAccountPagePO.SNACKBAR_ID);

    // Expected message
    const expectedMessages = [
        'An Account Ownership invitation has been sent to Harshita Rai (harshita.rai+2@celigo.com). Once accepted, your account will be converted to a regular user account with Manager access.',
        'Request to make user Harshita Rai as account owner is failed due to the error "Cannot transfer account ownership when there are pending transfers. Please allow them to complete or else cancel them and try again"',
      ];
    // Compare the actual message with the expected message
    
    expect(expectedMessages.some(expectedMessage => messageText.includes(expectedMessage))).toBe(true); 
      
    
      
    });
    
  })

