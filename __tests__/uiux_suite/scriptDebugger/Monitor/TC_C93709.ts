import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import C93708 from "../../../../testData/ScriptDebugger/C93708.json"


test.describe('C93709 Validate user is able to create "formInit" script through flow builder page (Monitor)', () => {
    test('C93709 Validate user is able to create "formInit" script through flow builder page (Monitor)', async({io,page}) => {
      await io.homePage.navigateTo(process.env["IO_Integration_URL"]);
      await io.flowBuilder.clickByText('TC_51661_DND');
      await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.ADD_DATA_PROCESSOR);
      await io.flowBuilder.clickByIndex(selectors.flowBuilderPagePO.ADD_DATA_PROCESSOR, 0);
      await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.EXPORT_HOOK);
      await io.flowBuilder.click(selectors.flowBuilderPagePO.EXPORT_HOOK);
      await io.assert.verifyElementAttributeContainsText(`${selectors.basePagePO.CREATE_SCRIPT_ARIA_LABEL} button`, 'class', 'Mui-disabled');
    });
});