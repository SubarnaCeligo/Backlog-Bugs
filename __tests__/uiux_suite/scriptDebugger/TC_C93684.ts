import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import data1 from "@testData/ScriptDebugger/C93684.json"


test.describe('C93684 Validate user is getting auto-fill of funtion stub while creating "transform" script through flow builder branching filter', () => {
   
    test('Validate user is getting auto-fill of funtion stub while creating "transform" script through flow builder branching filte', async({io,page}) => {
  
      const id =  await io.fillFormUI(
        data1,
        'FLOWS'
      );
  
     // Assuming you have a Playwright page object named "page"
     
     const plusButtonsSelector = selectors.flowBuilderPagePO.PLUS_BUTTONS;
     await io.flowBuilder.waitForElementAttached(plusButtonsSelector);
     await io.flowBuilder.clickByIndex(plusButtonsSelector, 0)
     await io.flowBuilder.clickByText("Add branching");
     await io.flowBuilder.clickByText("JavaScript")
     await io.flowBuilder.click(selectors.basePagePO.SCRIPT_ID)
  await io.flowBuilder.clickByTextByIndex("Transform script",0)

  
         const divSelector = selectors.basePagePO.ACE_CONTENT; // Selector for the <div> element
     
    const divTextContent = await page.textContent(divSelector);

    
    expect(divTextContent).not.toBe(null);  
    });
  })