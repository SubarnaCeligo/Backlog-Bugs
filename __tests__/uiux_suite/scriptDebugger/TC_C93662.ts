import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import C30651 from "@testData/Flows/C26246.json"

test.describe('C93662Validate user is able to see the options script,description,chose function stub while creating "formInit" script through flow builder page', () => {
   
    test('Validate user is able to see the options script,description,chose function stub while creating "formInit" script through flow builder page', async({io,page}) => {
  
      const id =  await io.fillFormUI(
        C30651,
        'FLOWS'
      );
  
  
      await io.flowBuilder.click(selectors.exportsPagePO.EXPORT_ADDPROCESSOR_BUTTON)
  
      await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.EXPORT_HOOK)
      await io.flowBuilder.click(selectors.flowBuilderPagePO.EXPORT_HOOK)
  
   await page.getByLabel('Create script').click();
  
   const descriptionField = await page.$(selectors.basePagePO.FORM_DESCRIPTION_SELECTOR);
    expect(descriptionField).not.toBeNull();
  
    // Ensure that the choose function stub field is visible
    const chooseFunctionStubField = await page.$(selectors.basePagePO.FUNCTION_STUB);
    expect(chooseFunctionStubField).not.toBeNull();
     
    });
  })