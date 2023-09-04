import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import C30651 from "@testData/Flows/C26246.json"



test.describe('C93649Validate that user is able to see "postResponseMap" function wherever “Insert function stub” field is present.', () => {
   
    test('Validate that user is able to see "postResponseMap" function wherever “Insert function stub” field is present.', async({io,page}) => {
  
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
  
  await io.flowBuilder.selectTextfromDropDown(page,"postResponseMap");
     
  const expectedText = 'Post response map'; // The expected random text
  
  const divTextContent = await chooseFunctionStubField.textContent();
  
  
  expect(divTextContent).toEqual(expectedText);
    });
  })