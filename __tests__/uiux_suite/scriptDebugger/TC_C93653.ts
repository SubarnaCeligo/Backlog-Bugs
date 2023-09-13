import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import data from "@testData/ScriptDebugger/C93653.json"



test.describe('C93653Validate user is able to create "branching" script through flow builder page', () => {
   
    test('Validate user is able to create "branching" script through flow builder page', async({io,page}) => {
  
      const id =  await io.fillFormUI(
         data,
        'FLOWS'
      );
  
      await io.flowBuilder.click( selectors.exportsPagePO.EXPORT_ADDPROCESSOR_BUTTON)
  
      await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.EXPORT_HOOK)
      await io.flowBuilder.click(selectors.flowBuilderPagePO.EXPORT_HOOK)
  
   await page.getByLabel('Create script').click();
  
  
   await io.flowBuilder.fill(selectors.importPagePO.NAME, "mockscript");
  
    
  
    // Ensure that the choose function stub field is visible
    const chooseFunctionStubField = await page.$(
      selectors.basePagePO.FUNCTION_STUB
    );
    await chooseFunctionStubField.click();

    await io.flowBuilder.selectTextfromDropDown(page, "router");
    // Scroll through the list of options to find "Transform"

    await io.flowBuilder.clickByText("Save & close");

    // await page.pause();
  });
});
