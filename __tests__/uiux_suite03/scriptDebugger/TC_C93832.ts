import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import data1 from "@testData/ScriptDebugger/C93832.json"

test.describe('C93832 Validate user is getting auto-fill of function stub while creating "chandleRequest" script through flow builder hook', () => {
   
    test('@Env-All @Zephyr-IO-T22707 C93832 Validate user is getting auto-fill of function stub while creating "handleRequest" script through flow builder hook', async({io,page}) => {
  
      
    
        const id =  await io.createResourceFromAPI(
          data1,
          'FLOWS'
        );
    
        await io.flowBuilder.click(selectors.exportsPagePO.EXPORT_ADDPROCESSOR_BUTTON)
    
        await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.EXPORT_HOOK)
        await io.flowBuilder.click(selectors.flowBuilderPagePO.EXPORT_HOOK)
        await io.flowBuilder.click(selectors.basePagePO.CREATE_SCRIPT_ARIA_LABEL);
        await io.flowBuilder.fill(selectors.importPagePO.NAME, "Handle request script");
        await io.flowBuilder.click(selectors.basePagePO.FUNCTION_STUB);   
        await io.flowBuilder.selectTextfromDropDown(page,"handleRequest");
        await io.flowBuilder.clickByText("Save & close");
        await io.flowBuilder.click(selectors.flowBuilderPagePO.EDIT_SCRIPT_LABEL_SELECTOR)
        let divTextContent = await io.flowBuilder.getText(selectors.basePagePO.ACE_CONTENT);
        await io.assert.expectNotToBeNull(divTextContent,"Value is not null")

    });
  })