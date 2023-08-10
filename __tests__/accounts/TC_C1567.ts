import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe('C1567', () => {
    test.beforeEach(async ({ io }) => {
        await io.myAccountPage.navigateTo(io.data.links.MY_ACCOUNT_PAGE_URL);
    });
  
    test('C1567 test automation', async({io, page}) => {
   
        await io.myAccountPage.clickByText("Users");
        await io.myAccountPage.clickByText("Invite user");
        await io.myAccountPage.clickByText("Custom");
        await page.click(selectors.myAccountPagePO.CUSTOM_MONITOR_ALL)
        await page.click(selectors.myAccountPagePO.MONITOR_ALL_BUTTON);
        await page.click('[data-value="6459f5fc6df4b9686c0b7145"]')
    
        const checkboxSelector = selectors.myAccountPagePO.MONITOR_ALL_BUTTON;
    
        // Check if the checkbox is selected (checked)
        const isChecked = await page.isChecked(checkboxSelector);
      
        expect(isChecked).toBe(false);
    
      
    });
    
  })

