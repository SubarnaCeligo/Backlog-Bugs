import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import C30651 from "@testData/Flows/C26246.json"



test.describe('C93649Validate that user is able to see "postResponseMap" function wherever “Insert function stub” field is present.', () => {

  test.beforeEach(async ({ io }) => {
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
});
    test('Validate that user is able to see "postResponseMap" function wherever “Insert function stub” field is present.', async({io,page}) => {
  
      await io.homePage.click(selectors.basePagePO.RESOURCES)
      await io.connectionPage.clickByText('Scripts')
  
       
      await io.flowBuilder.clickByText("Create script")
    // Ensure that the choose function stub field is visible
    const chooseFunctionStubField = await page.$(selectors.basePagePO.FUNCTION_STUB);
   await chooseFunctionStubField.click();
  
  await io.flowBuilder.selectTextfromDropDown(page,"postResponseMap");
     
  const expectedText = 'Post response map'; // The expected random text
  
  const divTextContent = await chooseFunctionStubField.textContent();
  
  
  expect(divTextContent).toEqual(expectedText);
    });
  })