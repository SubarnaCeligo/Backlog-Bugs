import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import data1 from "@testData/ScriptDebugger/C93821.json"

test.describe('C93821 Validate user is able to create "handleRequest" script through flow builder page', () => {
   
    test('@Env-All @Zephyr-IO-T22696 C93821 Validate user is able to create "handleRequest" script through flow builder page', async({io,page}) => {
  
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
      await io.flowBuilder.clickByText("Save & close");
      await io.flowBuilder.waitForElementAttached(':has-text("mockscript")');
      await io.assert.verifyElementText(selectors.flowBuilderPagePO.SCRIPT_ID, 'mockscript');
  });
  });