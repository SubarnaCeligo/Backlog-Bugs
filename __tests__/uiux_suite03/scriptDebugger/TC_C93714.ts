import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import data from "@testData/ScriptDebugger/C93714.json"


test.describe('C93714 Validate user is getting auto-fill of funtion stub while creating "postResponseMap" script through flow builder page (Administer)', () => {
   
    test('@Env-All @Zephyr-IO-T22681 C93712 Validate user is getting auto-fill of funtion stub while creating "postResponseMap" script through flow builder page (Administer)', async({io,page}) => {
  
      const id =  await io.createResourceFromAPI(
        data,
        'FLOWS'
      );
  
      await io.flowBuilder.click(selectors.exportsPagePO.EXPORT_ADDPROCESSOR_BUTTON)
  
      await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.EXPORT_HOOK)
      await io.flowBuilder.click(selectors.flowBuilderPagePO.EXPORT_HOOK)
  
      await io.flowBuilder.click(selectors.basePagePO.CREATE_SCRIPT_ARIA_LABEL);
      
        // Ensure that the choose function stub field is visible
      await io.flowBuilder.click(selectors.basePagePO.FUNCTION_STUB);    
      await io.flowBuilder.selectTextfromDropDown(page,"postResponseMap");
      let divTextContent = await io.flowBuilder.getText(selectors.basePagePO.ACE_CONTENT);
      await io.assert.expectNotToBeNull(divTextContent,"Value is not null")
    });
  })
