import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe('C61022', () => {
    test.beforeEach(async ({ io }) => {
        await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    });
  
    test('Verify that while creating import Advanced firls should be collapsed ', async({io,page}) => {
    
        await io.homePage.clickByText('Resources');
        await io.homePage.clickByText('Imports')
        await io.homePage.clickByText(' Create import')
        await page.click(selectors.importPagePO.NETSUITE_IMPORT)
        await page.click(selectors.importPagePO.NETSUITE_CONNECTIONS);
         await io.homePage.clickByText('NETSUITE CONNECTION')
         await page.type(selectors.importPagePO.NETSUITE_NAME, 'import');
         await io.homePage.clickByText('Next');
    
         const initialAriaExpanded = await page.getAttribute(selectors.importPagePO.ADVANCED, 'aria-expanded');
    
         expect(initialAriaExpanded).toBe('false'); 
    });
  })

