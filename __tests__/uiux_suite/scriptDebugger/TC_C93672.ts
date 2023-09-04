import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import C30651 from "@testData/Flows/C26246.json"


test.describe('C93672Validate user is getting auto-fill of funtion stub while creating "preMap" script through flow builder page', () => {
   
    test('Validate user is getting auto-fill of funtion stub while creating "preMap" script through flow builder page', async({io,page}) => {
  
      const id =  await io.fillFormUI(
        C30651,
        'FLOWS'
      );
  
      await io.flowBuilder.click(selectors.exportsPagePO.EXPORT_ADDPROCESSOR_BUTTON)
  
      await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.EXPORT_HOOK)
      await io.flowBuilder.click(selectors.flowBuilderPagePO.EXPORT_HOOK)
  
   await page.getByLabel('Create script').click();
  
    
  
    // Ensure that the choose function stub field is visible
    const chooseFunctionStubField = await page.$(selectors.basePagePO.FUNCTION_STUB);
   await chooseFunctionStubField.click();
  
  
   await io.flowBuilder.selectTextfromDropDown(page,"preMap");
  //  await locator.scrollIntoViewIfNeeded();
   
  //  // Click on the element
  //  await locator.click();
    // Scroll through the list of options to find "Transform" 
  
    await page.waitForTimeout(3000);
  
    const divSelector =  selectors.basePagePO.ACE_CONTENT; // Selector for the <div> element
   
  
  const divTextContent = await page.textContent(divSelector);
  
  const expectedText = 'preMapFunction stub:';
  
  // Create a regular expression to match the expected text with some flexibility in spacing
  const regExp = new RegExp(expectedText.replace(/\s+/g, '\\s*'));
  
  // Check if the textToSearch contains the expected text using the regular expression
  const isMatch = regExp.test(divTextContent);
  
  // Expect the match to be true
  expect(isMatch).toBeTruthy();
   
  
    });
  })
  