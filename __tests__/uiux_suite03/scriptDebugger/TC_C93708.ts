import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import C93708 from "@testData/ScriptDebugger/C93708.json"


test.describe('C93708 Validate user is able to create "formInit" script through flow builder page(Manage)', () => {
    test('@Env-All @Zephyr-IO-T22675 C93708 Validate user is able to create "formInit" script through flow builder page(Manage)', async({io,page}) => {
      await io.createResourceFromAPI(C93708,'FLOWS');
      await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.ADD_DATA_PROCESSOR);
      await io.flowBuilder.clickByIndex(selectors.flowBuilderPagePO.ADD_DATA_PROCESSOR, 0);
      await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.EXPORT_HOOK)
      await io.flowBuilder.click(selectors.flowBuilderPagePO.EXPORT_HOOK)
      await io.flowBuilder.click(selectors.basePagePO.CREATE_SCRIPT_ARIA_LABEL);
      await io.flowBuilder.fill(selectors.importPagePO.NAME, "test_script");
      await io.flowBuilder.click(selectors.basePagePO.FUNCTION_STUB);   
      await io.flowBuilder.click(selectors.basePagePO.FORM_INIT_FUNCTION);
      await io.flowBuilder.click(selectors.basePagePO.SAVE_AND_CLOSE);
      await io.flowBuilder.waitForElementAttached(':has-text("test_script")');
      await io.assert.verifyElementText(selectors.flowBuilderPagePO.SCRIPT_ID, 'test_script');
    });
});