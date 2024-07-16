import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import data from "@testData/ScriptDebugger/C93721.json"


test.describe('C93721 Validate user is able to see default function name as "formInit" instead of "main" for form builder(Administer)', () => {

    test('@Env-All @Zephyr-IO-T22688 C93721 Validate user is able to see default function name as "formInit" instead of "main" for form builder(Administer)', async({io,page}) => {

      const id =  await io.createResourceFromAPI(
        data,
        'FLOWS'
      );

      await io.flowBuilder.click(selectors.flowBuilderPagePO.IMPORT)
      await io.flowBuilder.clickByText("Custom settings")
      await io.flowBuilder.clickByText("Launch form builder")
      await io.flowBuilder.clickByText("Script")
      await io.flowBuilder.waitForElementAttached(selectors.basePagePO.SCRIPT_FUNCTION_ID);
      await io.assert.verifyElementAttributeContainsText (selectors.basePagePO.SCRIPT_FUNCTION_ID,"value", 'formInit');
    });
  })
