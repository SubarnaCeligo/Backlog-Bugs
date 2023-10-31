import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import data from "@testData/ScriptDebugger/C93716.json"



test.describe('C93716 Validate user is able to see default function name as "formInit" instead of "main" for form builder', () => {
   
    test('C93716 Validate user is able to see default function name as "formInit" instead of "main" for form builder', async({io,page}) => {
  
      const id =  await io.createResourceFromAPI(
        data,
        'FLOWS'
      );
  
      await io.flowBuilder.clickByText("Import")
      await io.flowBuilder.clickByText("Custom settings")
      await io.flowBuilder.clickByText("Launch form builder")
      await io.flowBuilder.clickByText("Script")
      await io.flowBuilder.waitForElementAttached(selectors.basePagePO.SCRIPT_FUNCTION_ID);
      await io.assert.verifyElementAttributeContainsText ( selectors.basePagePO.SCRIPT_FUNCTION_ID,"value", 'formInit');       
    });
  });