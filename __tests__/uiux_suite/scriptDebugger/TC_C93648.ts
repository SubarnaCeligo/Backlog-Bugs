import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";


test.describe('C93648Validate that user is able to see "formInit" function wherever “Insert function stub” field is present.', () => {
   
  test.beforeEach(async ({ io }) => {
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
});
    test('Validate that user is able to see "formInit" function wherever “Insert function stub” field is present.', async({io,page}) => {
  
      await io.homePage.click(selectors.basePagePO.RESOURCES);
      await io.connectionPage.clickByText('Scripts')
  
      await io.flowBuilder.clickByText("Create script")
  
  
   await io.flowBuilder.fill(selectors.importPagePO.NAME, "mockscript");
  
    
  
    // Ensure that the choose function stub field is visible
    const chooseFunctionStubField = await page.$(selectors.basePagePO.FUNCTION_STUB);
   await chooseFunctionStubField.click();
  
   const formInitField = await page.$(selectors.basePagePO.FORM_INIT_FUNCTION);
  
   expect(formInitField).not.toBeNull();
  
  
    
    });
  })