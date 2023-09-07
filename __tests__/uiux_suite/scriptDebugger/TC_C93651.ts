import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe('C93651Validate that user is getting prefill function stub for "postResponseMap" function', () => {
   
  test.beforeEach(async ({ io }) => {
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
});

    test('Validate that user is getting prefill function stub for "postResponseMap" function', async({io,page}) => {
  
      
      await io.homePage.click(selectors.basePagePO.RESOURCES);
      await io.connectionPage.clickByText('Scripts')
  
      await io.flowBuilder.clickByText("Create script")
    
  
    // Ensure that the choose function stub field is visible
    const chooseFunctionStubField = await page.$(selectors.basePagePO.FUNCTION_STUB);
   await chooseFunctionStubField.click();
  
  
   await io.flowBuilder.selectTextfromDropDown(page,"postResponseMap");
  
    await page.waitForTimeout(3000);
    
    const divSelector = selectors.basePagePO.ACE_CONTENT; // Selector for the <div> element

// Check if the selector matches an element
const divElement = await page.$(divSelector);
const divTextContent = await divElement.textContent();
  expect(divTextContent).not.toBeNull();
   
  
    });
  })