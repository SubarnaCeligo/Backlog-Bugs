import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import data1 from "@testData/ScriptDebugger/C93831.json"




test.describe('C93831Validate user is getting auto-fill of function stub while creating "contentBasedFlowRouter" script through flow builder hook', () => {
   
    test('Validate user is getting auto-fill of function stub while creating "contentBasedFlowRouter" script through flow builder hook', async({io,page}) => {
  
      
    
        const id =  await io.fillFormUI(
          data1,
          'FLOWS'
        );
    
        await io.flowBuilder.click(selectors.exportsPagePO.EXPORT_ADDPROCESSOR_BUTTON)
    
        await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.EXPORT_HOOK)
        await io.flowBuilder.click(selectors.flowBuilderPagePO.EXPORT_HOOK)
      await io.flowBuilder.click(selectors.basePagePO.CREATE_SCRIPT_ARIA_LABEL);
        await io.flowBuilder.fill(selectors.importPagePO.NAME, "Contnet based  script");
        await io.flowBuilder.click(selectors.basePagePO.FUNCTION_STUB);   
        await io.flowBuilder.selectTextfromDropDown(page,"contentBasedFlowRouter");
         await io.flowBuilder.clickByText("Save & close");
      await io.flowBuilder.click(selectors.flowBuilderPagePO.EDIT_SCRIPT_LABEL_SELECTOR)
      
      const divSelector = selectors.basePagePO.ACE_CONTENT; // Selector for the <div> element
     
    const divTextContent = await page.textContent(divSelector);
    
    expect(divTextContent).not.toBe(null);
  
  // Check if the element exists and has non-null text content
   
    });
  })