import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe('Verify that while creating import Advanced firls should be collapsed ', () => {
    test.beforeEach(async ({ io }) => {
        await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    });
  
    test('@Env-All @Zephyr-IO-T23059 Verify that while creating import Advanced firls should be collapsed ', async({io,page}) => {
    
        await io.homePage.click(selectors.basePagePO.RESOURCES);
        await io.homePage.clickByText('Imports')
        await io.homePage.clickByText(' Create import')
        await io.importsPage.click(selectors.importPagePO.NETSUITE_IMPORT)
        await io.importsPage.click(selectors.importPagePO.NETSUITE_CONNECTIONS);
         await io.homePage.clickByText('NETSUITE CONNECTION')
         await page.type(selectors.importPagePO.NAME, 'import');
         await io.homePage.clickByText('Next');
    
         const initialAriaExpanded = await page.getAttribute(selectors.importPagePO.ADVANCED, 'aria-expanded');
    
         expect(initialAriaExpanded).toBe('false'); 
    });
  })

