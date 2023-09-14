import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import data from "@testData/ScriptDebugger/C93664.json"


test.describe('C93664Validate user is able to see the options script,description,chose function stub while creating "preMap" script through flow builder page', () => {
   
    test('Validate user is able to see the options script,description,chose function stub while creating "preMap" script through flow builder page', async({io,page}) => {
  
      const id =  await io.fillFormUI(
        data,
        'FLOWS'
      );
  
      await io.flowBuilder.click(selectors.exportsPagePO.EXPORT_ADDPROCESSOR_BUTTON)
  
      await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.EXPORT_HOOK)
      await io.flowBuilder.click(selectors.flowBuilderPagePO.EXPORT_HOOK)
      await io.flowBuilder.click(selectors.basePagePO.CREATE_SCRIPT_ARIA_LABEL);
  
  
   await io.flowBuilder.fill(selectors.importPagePO.NAME, "mockscript");
  
    const chooseFunctionStubField = await page.$(selectors.basePagePO.FUNCTION_STUB);
    await io.flowBuilder.click(selectors.basePagePO.FUNCTION_STUB);   
  
  await io.flowBuilder.selectTextfromDropDown(page,"preMap");
  
     const descriptionField = await page.$(selectors.basePagePO.FORM_DESCRIPTION_SELECTOR);
    expect(descriptionField).not.toBeNull();
  
    expect(chooseFunctionStubField).not.toBeNull();
  
  const expectedText = 'Pre map'; // The expected random text
  
  const divTextContent = await chooseFunctionStubField.textContent();
  
  expect(divTextContent).toEqual(expectedText);
    
    });
  });