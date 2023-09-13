import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import data from "@testData/ScriptDebugger/C93677.json"

test.describe('C93677Validate user is getting auto-fill of funtion stub while creating "branching" script through flow builder hook', () => {
   
    test('Validate user is getting auto-fill of funtion stub while creating "transform" script through flow builder hook', async({io,page}) => {
  
      const id =  await io.fillFormUI(
        data,
        'FLOWS'
      );
  
      await io.flowBuilder.click(selectors.exportsPagePO.EXPORT_ADDPROCESSOR_BUTTON)
  
      await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.EXPORT_HOOK)
      await io.flowBuilder.click(selectors.flowBuilderPagePO.EXPORT_HOOK)
  
      await page.getByLabel('Create script').click();
    
    
      await io.flowBuilder.fill(selectors.importPagePO.NAME, "Branching script");
     
       
     
       // Ensure that the choose function stub field is visible
       const chooseFunctionStubField = await page.$(selectors.basePagePO.FUNCTION_STUB);
      await chooseFunctionStubField.click();
     
      await io.flowBuilder.selectTextfromDropDown(page,"router");
       // Scroll through the list of options to find "Transform" 
     
       await io.flowBuilder.clickByText("Save & close");
     
       // await page.pause();
     
       await page.waitForTimeout(2000)
  
  
  
    await io.flowBuilder.click(selectors.flowBuilderPagePO.EDIT_SCRIPT_LABEL_SELECTOR)
    
    const divSelector = selectors.basePagePO.ACE_CONTENT; // Selector for the <div> element
   
  const divTextContent = await page.textContent(divSelector);
  
  expect(divTextContent).not.toBe(null);
    });
  })