import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import C30651 from "@testData/Flows/C26246.json"


test.describe('C93668Validate user is getting auto-fill of funtion stub while creating "transform" script through flow builder page', () => {
   
    test('Validate user is getting auto-fill of funtion stub while creating "transform" script through flow builder page', async({io,page}) => {
  
      const id =  await io.fillFormUI(
        C30651,
        'FLOWS'
      );
  
      await io.flowBuilder.click('[data-test="addDataProcessor"]:nth-child(2)')
  
      await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.EXPORT_HOOK)
      await io.flowBuilder.click(selectors.flowBuilderPagePO.EXPORT_HOOK)
  
   await page.getByLabel('Create script').click();
  
    
  
    // Ensure that the choose function stub field is visible
    const chooseFunctionStubField = await page.$(selectors.basePagePO.FUNCTION_STUB);
   await chooseFunctionStubField.click();
    
  
    
   await io.flowBuilder.selectTextfromDropDown(page,"transform");
  
   await page.waitForTimeout(3000);
  
    const divSelector = selectors.basePagePO.ACE_CONTENT; // Selector for the <div> element
  const expectedFunctionCode = `function transform (options) {
    return options.record
  }`; // Replace with the actual function definition
  
  const divTextContent = await page.textContent(divSelector);
  
  console.log('hi',divTextContent);
  
  // Remove comments and whitespace from the text content for accurate comparison
  const cleanedDivTextContent = divTextContent.replace(/\/\*[\s\S]*?\*\/|\/\/.*/g, '').replace(/\s/g, '');
  
  // Remove comments and whitespace from the expected function code for accurate comparison
  const cleanedExpectedFunctionCode = expectedFunctionCode.replace(/\/\*[\s\S]*?\*\/|\/\/.*/g, '').replace(/\s/g, '');
  
  // Check if the cleaned expected function code is present in the cleaned text content
  const isFunctionPresent = cleanedDivTextContent.includes(cleanedExpectedFunctionCode);
  
  // Expect the function to be present in the <div> content
  expect(isFunctionPresent).toBeTruthy();
  
    });
  })