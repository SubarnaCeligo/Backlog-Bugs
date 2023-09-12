import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import data1 from "@testData/ScriptDebugger/C93832.json"

test.describe.only('C93834Validate user is getting auto-fill of function stub while creating "preSavePage" script through flow builder hook', () => {
   
    test('Validate user is getting auto-fill of function stub while creating "preSavePage" script through flow builder hook', async({io,page}) => {
  
      
    
        const id =  await io.fillFormUI(
          data1,
          'FLOWS'
        );
    
        await io.flowBuilder.click(selectors.exportsPagePO.EXPORT_ADDPROCESSOR_BUTTON)
    
        await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.EXPORT_HOOK)
        await io.flowBuilder.click(selectors.flowBuilderPagePO.EXPORT_HOOK)

        await io.flowBuilder.click("[aria-label='Create script']");
  
        await io.flowBuilder.fill(selectors.importPagePO.NAME, "Pre save page  script");
       
         
       
         // Ensure that the choose function stub field is visible
         const chooseFunctionStubField = await page.$(selectors.basePagePO.FUNCTION_STUB);
        await chooseFunctionStubField.click();
       
        await io.flowBuilder.selectTextfromDropDown(page,"preSavePage");
         // Scroll through the list of options to find "Transform" 
       
         await io.flowBuilder.clickByText("Save & close");
       
         // await page.pause();
           
      await io.flowBuilder.click(selectors.flowBuilderPagePO.EDIT_ECRIPT_LABEL_SELECTOR)
      
      const divSelector = selectors.basePagePO.ACE_CONTENT; // Selector for the <div> element
     
    const divTextContent = await page.textContent(divSelector);
    
    expect(divTextContent).not.toBe(null);
  
  // Check if the element exists and has non-null text content
   
    });
  })