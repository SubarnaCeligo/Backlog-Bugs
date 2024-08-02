import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import data1 from "@testData/ScriptDebugger/C93824.json"




  
  test.describe('C93824 Validate user is able to see the options script,description,chose function stub while creating "handleRequest" script through flow builder page', () => {
     
    test('@Env-All @Zephyr-IO-T22699 C93824 Validate user is able to see the options script,description,chose function stub while creating "handleRequest" script through flow builder page', async({io,page}) => {
  
      const id =  await io.createResourceFromAPI(
         data1,
        'FLOWS'
      );
  
      await io.flowBuilder.click(selectors.exportsPagePO.EXPORT_ADDPROCESSOR_BUTTON)
      await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.EXPORT_HOOK)
      await io.flowBuilder.click(selectors.flowBuilderPagePO.EXPORT_HOOK)
      await io.flowBuilder.click(selectors.basePagePO.CREATE_SCRIPT_ARIA_LABEL);
      await io.flowBuilder.fill(selectors.importPagePO.NAME, "mockscript");
      await io.flowBuilder.click(selectors.basePagePO.FUNCTION_STUB);   
      await io.flowBuilder.selectTextfromDropDown(page, "handleRequest");
      const expectedText = 'Handle request'; // The expected random text
      await io.assert.verifyElementContainsText( selectors.basePagePO.FUNCTION_STUB,expectedText)
      await io.assert.verifyElementIsDisplayed(selectors.basePagePO.FORM_DESCRIPTION_SELECTOR,"Element is present")
  });
  });