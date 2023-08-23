import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe('Verify, we are able not able to see the re-rendering of page when we update /change the drop down values for assistant export/import', () => {
    test.beforeEach(async ({ io }) => {
        await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    });
  
    test('Verify, we are able not able to see the re-rendering of page when we update /change the drop down values for assistant export/import ', async({io,page}) => {
    
        await io.homePage.clickByText('Resources');
        await io.homePage.clickByText('Imports')
        await io.homePage.clickByText(' Create import')
        await io.importsPage.click(selectors.importPagePO.HTTP_IMPORT)
        await io.importsPage.click(selectors.basePagePO.CONNECTION_DROPDOWN);
         await io.homePage.clickByText('3PL CONNECTION')

       

         await io.homePage.fill(selectors.importPagePO.NAME_INPUT, "import");

         await io.importsPage.clickByText("Next");

    

         const divSelector =selectors.exportsPagePO.HTTP_METHOD_DROPDOWN;

         await io.importsPage.waitForElementAttached(divSelector)
         await io.importsPage.click(divSelector)
        

        await io.importsPage.clickByText("Composite")

      
        const initialContent = await page.textContent(selectors.exportsPagePO.HTTP_METHOD_DROPDOWN);

        // Interact with the dropdown

        const divSelector2 = selectors.exportsPagePO.HTTP_METHOD_DROPDOWN;
        await io.importsPage.waitForElementAttached(divSelector2)
        await io.importsPage.click(divSelector)

        await io.importsPage.clickByText("DELETE")

  // Interact with the dropdown
  
  const updatedContent = await page.textContent( selectors.exportsPagePO.HTTP_METHOD_DROPDOWN);
  expect(updatedContent).not.toBe(initialContent); // Assert that content has changed
 
    });
  })
