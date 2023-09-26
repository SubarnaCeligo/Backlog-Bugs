import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import data from "@testData/ScriptDebugger/C93670.json"

test.describe('C93670 Validate user is getting auto-fill of function stub while creating "formInit" script through flow builder page', () => {
   
    test('C93670Validate user is getting auto-fill of function stub while creating "formInit" script through flow builder page', async({io,page}) => {
  
      const id =  await io.fillFormUI(
       data,
        'FLOWS'
      );
  
      await io.flowBuilder.click(selectors.exportsPagePO.EXPORT_ADDPROCESSOR_BUTTON)
  
      await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.EXPORT_HOOK)
      await io.flowBuilder.click(selectors.flowBuilderPagePO.EXPORT_HOOK)
  
      await io.flowBuilder.click(selectors.basePagePO.CREATE_SCRIPT_ARIA_LABEL);
   
      await io.flowBuilder.click(selectors.basePagePO.FUNCTION_STUB);   
      await io.flowBuilder.selectTextfromDropDown(page,"formInit");
      let divTextContent = await io.flowBuilder.getText(selectors.basePagePO.ACE_CONTENT);
      await io.assert.expectNotToBeNull(divTextContent,"Value is not null")
    });
  })