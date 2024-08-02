import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import data from "@testData/ScriptDebugger/C93666.json"


test.describe('C93666 Validate user is able to see the options script,description,chose function stub while creating "postSubmit" script through flow builder page', () => {
   
    test('@Env-All @Zephyr-IO-T22633 C93666  Validate user is able to see the options script,description,chose function stub while creating "postSubmit" script through flow builder page', async({io,page}) => {
  
      const id =  await io.createResourceFromAPI(
         data,
        'FLOWS'
      );
  
      await io.flowBuilder.click(selectors.exportsPagePO.EXPORT_ADDPROCESSOR_BUTTON)
  
      await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.EXPORT_HOOK)
      await io.flowBuilder.click(selectors.flowBuilderPagePO.EXPORT_HOOK)
  
      await io.flowBuilder.click(selectors.basePagePO.CREATE_SCRIPT_ARIA_LABEL);
      await io.flowBuilder.fill(selectors.importPagePO.NAME, "mockscript");
        // Ensure that the choose function stub field is visible
      await io.flowBuilder.click(selectors.basePagePO.FUNCTION_STUB);   
      await io.flowBuilder.selectTextfromDropDown(page,"postSubmit");
      const expectedText = 'Post submit'; // The expected random text
      
      await io.assert.verifyElementContainsText( selectors.basePagePO.FUNCTION_STUB,expectedText)
      await io.assert.verifyElementIsDisplayed(selectors.basePagePO.FORM_DESCRIPTION_SELECTOR,"Element is present")
        
    });
  })