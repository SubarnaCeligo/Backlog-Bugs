import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import data from "@testData/ScriptDebugger/C93679.json"


test.describe('C93679Validate user is getting auto-fill of funtion stub while creating "filter" script through flow builder hook', () => {
   
    test('Validate user is getting auto-fill of funtion stub while creating "filter" script through flow builder hook', async({io,page}) => {
  
      const id =  await io.fillFormUI(
        data,
        'FLOWS'
      );
  
      await io.flowBuilder.click(selectors.exportsPagePO.EXPORT_ADDPROCESSOR_BUTTON)
  
      await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.EXPORT_HOOK)
      await io.flowBuilder.click(selectors.flowBuilderPagePO.EXPORT_HOOK)
  
      await io.flowBuilder.click("[aria-label='Create script']");
    
    
      await io.flowBuilder.fill(selectors.importPagePO.NAME, "Filter script");
     
       
     
       // Ensure that the choose function stub field is visible
       const chooseFunctionStubField = await page.$(selectors.basePagePO.FUNCTION_STUB);
      await chooseFunctionStubField.click();
     
      await io.flowBuilder.selectTextfromDropDown(page,"filter");
       // Scroll through the list of options to find "Transform" 
     
       await io.flowBuilder.clickByText("Save & close");
     
       // await page.pause();
     
  
  
  
    await io.flowBuilder.click(selectors.flowBuilderPagePO.EDIT_ECRIPT_LABEL_SELECTOR)
    
    const divSelector = selectors.basePagePO.ACE_CONTENT; // Selector for the <div> element
   
  const divTextContent = await page.textContent(divSelector);
  
  expect(divTextContent).not.toBe(null);
    });
  })