import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import data from "@testData/ScriptDebugger/C93662.json"

test.describe('C93662 Validate user is able to see the options script,description,chose function stub while creating "formInit" script through flow builder page', () => {
   
    test('@Env-All @Zephyr-IO-T22629 C93662 Validate user is able to see the options script,description,chose function stub while creating "formInit" script through flow builder page', async({io,page}) => {
  
      const id =  await io.createResourceFromAPI(
        data,
        'FLOWS'
      );
      await io.flowBuilder.click(selectors.exportsPagePO.EXPORT_ADDPROCESSOR_BUTTON)
      await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.EXPORT_HOOK)
      await io.flowBuilder.click(selectors.flowBuilderPagePO.EXPORT_HOOK)
      await io.flowBuilder.click(selectors.basePagePO.CREATE_SCRIPT_ARIA_LABEL);
      await io.assert.verifyElementIsDisplayed(selectors.basePagePO.FORM_DESCRIPTION_SELECTOR,"Element is present")
      await io.assert.verifyElementIsDisplayed(selectors.basePagePO.FUNCTION_STUB,"Element is present")
     
    });
  })