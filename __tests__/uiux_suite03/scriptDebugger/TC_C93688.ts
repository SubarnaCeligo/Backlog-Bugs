import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import data1 from "@testData/ScriptDebugger/C93688.json"



test.describe('C93688 Validate user is getting auto-fill of funtion stub while creating "preMap" script through flow builder branching filter', () => {
   
    test('@Env-All @Zephyr-IO-T22655 C93688 Validate user is getting auto-fill of funtion stub while creating "preMap" script through flow builder branching filte', async({io,page}) => {
  
      const id =  await io.createResourceFromAPI(
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
     await io.flowBuilder.clickByTextByIndex("Pre map script",0)
     let divTextContent = await io.flowBuilder.getText(selectors.basePagePO.ACE_CONTENT);
     await io.assert.expectNotToBeNull(divTextContent,"Value is not null")
    });
  })