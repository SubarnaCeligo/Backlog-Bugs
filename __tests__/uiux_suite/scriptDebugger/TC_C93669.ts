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
  
      await io.flowBuilder.click(selectors.basePagePO.CREATE_SCRIPT_ARIA_LABEL);
   
    // Ensure that the choose function stub field is visible
    await io.flowBuilder.click(selectors.basePagePO.FUNCTION_STUB);   
   await io.flowBuilder.selectTextfromDropDown(page,"router");
  
    
    const divSelector = selectors.basePagePO.ACE_CONTENT; // Selector for the <div> element

    // Check if the selector matches an element
    const divElement = await page.$(divSelector);
    const divTextContent = await divElement.textContent();
      expect(divTextContent).not.toBeNull();
    });
  })