import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import data1 from "@testData/ScriptDebugger/C93830.json"


test.describe('C93830Validate user is getting auto-fill of function stub while creating "preSavePage" script through flow builder page', () => {
   
    test('Validate user is getting auto-fill of function stub while creating "preSavePage" script through flow builder page', async({io,page}) => {
  
      const id =  await io.fillFormUI(
        data1,
        'FLOWS'
      );
  
      await io.flowBuilder.click(selectors.exportsPagePO.EXPORT_ADDPROCESSOR_BUTTON)
  
      await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.EXPORT_HOOK)
      await io.flowBuilder.click(selectors.flowBuilderPagePO.EXPORT_HOOK)
  
   await page.getByLabel('Create script').click();
  
    
  
    // Ensure that the choose function stub field is visible
    const chooseFunctionStubField = await page.$(selectors.basePagePO.FUNCTION_STUB);
   await chooseFunctionStubField.click();
  
  
   await io.flowBuilder.selectTextfromDropDown(page,"preSavePage");
  
    await page.waitForTimeout(3000);
    
  const divSelector = selectors.basePagePO.ACE_CONTENT; // Selector for the <div> element
  
  // Check if the selector matches an element
  const divElement = await page.$(divSelector);
  const divTextContent = await divElement.textContent();
    expect(divTextContent).not.toBeNull();
  
  // Check if the element exists and has non-null text content
   
    });
  })