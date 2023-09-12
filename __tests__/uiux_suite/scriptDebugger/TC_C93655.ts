
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import data from "@testData/ScriptDebugger/C93655.json"


test.describe('C93655Validate user is able to create "filter" script through flow builder page', () => {
   
    test('Validate user is able to create "filter" script through flow builder page', async({io,page}) => {
  
      const id =  await io.fillFormUI(
        data,
        'FLOWS'
      );
  
      await io.flowBuilder.click(selectors.exportsPagePO.EXPORT_ADDPROCESSOR_BUTTON)
  
      await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.EXPORT_HOOK)
      await io.flowBuilder.click(selectors.flowBuilderPagePO.EXPORT_HOOK)
  
   await page.getByLabel('Create script').click();
  
  
   await io.flowBuilder.fill(selectors.importPagePO.NAME, "mockscript");
  
    
  
    // Ensure that the choose function stub field is visible
    const chooseFunctionStubField = await page.$(selectors.basePagePO.FUNCTION_STUB);
   await chooseFunctionStubField.click();
  
   const elementSelector = selectors.basePagePO.FILTER_FUNCTION;
  const element = await page.locator(elementSelector);
  
  // Scroll the element into view
  await element.scrollIntoViewIfNeeded();
    
   await io.flowBuilder.click(elementSelector)
    // Scroll through the list of options to find "Transform" 
  
    await io.flowBuilder.clickByText("Save & close");
  
    // await page.pause();
  
     
    });
  })