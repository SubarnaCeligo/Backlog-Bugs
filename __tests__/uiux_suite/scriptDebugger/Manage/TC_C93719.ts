import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import data from "@testData/ScriptDebugger/C93719.json"



test.describe('C93719 Validate user is able to see default function name as "formInit" instead of "main" for form builder(Manage)', () => {
   
    test('C93719 Validate user is able to see default function name as "formInit" instead of "main" for form builder(Manage)', async({io,page}) => {
  
      const id =  await io.fillFormUI(
        data,
        'FLOWS'
      );
  
      await io.flowBuilder.clickByText("Import")
      await io.flowBuilder.clickByText("Custom settings")
      await io.flowBuilder.clickByText("Launch form builder")
      await io.flowBuilder.clickByText("Script")
      await io.flowBuilder.waitForElementAttached(selectors.basePagePO.SCRIPT_FUNCTION_ID);
      await io.assert.verifyElementAttributeContainsText (selectors.basePagePO.SCRIPT_FUNCTION_ID,"value", 'formInit');       
    });
  })