import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import data from "@testData/ScriptDebugger/C93669.json" 


test.describe('C93669Validate user is getting auto-fill of function stub while creating "branching" script through flow builder page', () => {
   
    test('Validate user is getting auto-fill of function stub while creating "branching" script through flow builder page', async({io,page}) => {
  
      const id =  await io.fillFormUI(
        data,
        'FLOWS'
      );
  
      await io.flowBuilder.click(selectors.exportsPagePO.EXPORT_ADDPROCESSOR_BUTTON)
  
      await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.EXPORT_HOOK)
      await io.flowBuilder.click(selectors.flowBuilderPagePO.EXPORT_HOOK)
  
   await page.getByLabel('Create script').click();
  
    
  
    // Ensure that the choose function stub field is visible
    const chooseFunctionStubField = await page.$(selectors.basePagePO.FUNCTION_STUB);
   await chooseFunctionStubField.click();
  
  
   await io.flowBuilder.selectTextfromDropDown(page,"router");
  
    await page.waitForTimeout(3000);
    
    const divSelector = selectors.basePagePO.ACE_CONTENT; // Selector for the <div> element

    // Check if the selector matches an element
    const divElement = await page.$(divSelector);
    const divTextContent = await divElement.textContent();
      expect(divTextContent).not.toBeNull();
    });
  })