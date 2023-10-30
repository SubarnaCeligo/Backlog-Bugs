import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import data from "@testData/ScriptDebugger/C93680.json";

test.describe('C93680 Validate user is getting auto-fill of funtion stub while creating "preMap" script through flow builder hook', () => {
   
    test('C93680 Validate user is getting auto-fill of funtion stub while creating "preMap" script through flow builder hook', async({io,page}) => {
  
      const id =  await io.createResourceFromAPI(
        data,
        'FLOWS'
      );
  
      await io.flowBuilder.click(selectors.exportsPagePO.EXPORT_ADDPROCESSOR_BUTTON)
  
      await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.EXPORT_HOOK)
      await io.flowBuilder.click(selectors.flowBuilderPagePO.EXPORT_HOOK)
  
      await io.flowBuilder.click(selectors.basePagePO.CREATE_SCRIPT_ARIA_LABEL);
      await io.flowBuilder.fill(selectors.importPagePO.NAME, "Pre map script");
      await io.flowBuilder.click(selectors.basePagePO.FUNCTION_STUB);   
      await io.flowBuilder.selectTextfromDropDown(page,"preMap");
       // Scroll through the list of options to find "Transform" 
     
      await io.flowBuilder.clickByText("Save & close");
      await io.flowBuilder.click(selectors.flowBuilderPagePO.EDIT_SCRIPT_LABEL_SELECTOR)
      let divTextContent = await io.flowBuilder.getText(selectors.basePagePO.ACE_CONTENT);
      await io.assert.expectNotToBeNull(divTextContent,"Value is not null")
    });
  })
