import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import C30651 from "@testData/Flows/C26246.json"


test.describe('C93657Validate user is able to create "postMap" script through flow builder page', () => {
   
    test('Validate user is able to create "postMap" script through flow builder page', async({io,page}) => {
  
      const id =  await io.fillFormUI(
        C30651,
        'FLOWS'
      );
  
      await io.flowBuilder.click('[data-test="addDataProcessor"]:nth-child(2)')
  
      await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.EXPORT_HOOK)
      await io.flowBuilder.click(selectors.flowBuilderPagePO.EXPORT_HOOK)
  
   await page.getByLabel('Create script').click();
  
   await io.flowBuilder.fill(selectors.importPagePO.NAME, "mockscript");
    
  
    // Ensure that the choose function stub field is visible
    const chooseFunctionStubField = await page.$(selectors.basePagePO.FUNCTION_STUB);
   await chooseFunctionStubField.click();
  
   // Ensure that the choose function stub field is visible
    
  await io.flowBuilder.selectTextfromDropDown(page,"postMap");
   // Scroll through the list of options to find "Transform" 
  
   await io.flowBuilder.clickByText("Save & close");
  
   // await page.pause();
  
   await page.waitForTimeout(5000)
  
   await io.flowBuilder.waitForElementAttached(selectors.basePagePO.SCRIPT_DEBUGGER_SELECTOR);
  
   const divSelector = selectors.basePagePO.SCRIPT_DEBUGGER_SELECTOR; // Replace with the appropriate selector
  const expectedText = 'mockscript'; // The expected random text
  
  const divElement = await page.locator(divSelector);
  const divTextContent = await divElement.textContent();
  
  console.log(divTextContent)
  
  expect(divTextContent).toEqual(expectedText);
     
   
  
    });
  })