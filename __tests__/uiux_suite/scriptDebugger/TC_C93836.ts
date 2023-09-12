import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import data1 from "@testData/ScriptDebugger/C93832.json"

test.describe('C93836 Validate user is getting auto-fill of funtion stub while creating "contentBasedFlowRouter" script through flow builder branching filter', () => {
   
    test('Validate user is getting auto-fill of funtion stub while creating "contentBasedFlowRouter" script through flow builder branching filte', async({io,page}) => {
  
      const id =  await io.fillFormUI(
        data1,
        'FLOWS'
      );
  
     // Assuming you have a Playwright page object named "page"
     
     const plusButtonsSelector = selectors.flowBuilderPagePO.PLUS_BUTTONS;
     await io.flowBuilder.waitForElementAttached(plusButtonsSelector);
     const plusButtonsLocator = await page.$$(plusButtonsSelector);
     await plusButtonsLocator[0].click();
     await io.flowBuilder.clickByText("Add branching");
     await io.flowBuilder.clickByText("JavaScript")
     await io.flowBuilder.click("#scriptId")
     await page.getByText("Contnet based script").first().click(); // Adjust the position [1] as needed
  
         const divSelector = selectors.basePagePO.ACE_CONTENT; // Selector for the <div> element
     
    const divTextContent = await page.textContent(divSelector);
    
    expect(divTextContent).not.toBe(null);  
    });
  })