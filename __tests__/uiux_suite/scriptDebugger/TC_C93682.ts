import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import data from "@testData/ScriptDebugger/C93682.json"


test.describe('C93682Validate user is getting auto-fill of funtion stub while creating "postSubmit" script through flow builder hook', () => {
   
    test('Validate user is getting auto-fill of funtion stub while creating "postSubmit" script through flow builder hook', async({io,page}) => {
  
      const id =  await io.fillFormUI(
        data,
        'FLOWS'
      );
  
      await io.flowBuilder.click(selectors.exportsPagePO.EXPORT_ADDPROCESSOR_BUTTON)
  
      await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.EXPORT_HOOK)
      await io.flowBuilder.click(selectors.flowBuilderPagePO.EXPORT_HOOK)
      await io.flowBuilder.click(selectors.basePagePO.CREATE_SCRIPT_ARIA_LABEL);
    
    
      await io.flowBuilder.fill(selectors.importPagePO.NAME, "Post submit script");
      await io.flowBuilder.click(selectors.basePagePO.FUNCTION_STUB);   
      await io.flowBuilder.selectTextfromDropDown(page,"postSubmit");
       await io.flowBuilder.clickByText("Save & close");
    await io.flowBuilder.click(selectors.flowBuilderPagePO.EDIT_SCRIPT_LABEL_SELECTOR)
    
    const divSelector = selectors.basePagePO.ACE_CONTENT; // Selector for the <div> element
   
  const divTextContent = await page.textContent(divSelector);
  
  expect(divTextContent).not.toBe(null);
    });
  })