import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import data1 from "@testData/ScriptDebugger/C93828.json"


test.describe('C93828 Validate user is getting auto-fill of function stub while creating "postAggregate" script through flow builder page', () => {
   
    test('C93828 Validate user is getting auto-fill of function stub while creating "postAggregate" script through flow builder page', async({io,page}) => {
  
      const id =  await io.createResourceFromAPI(
        data1,
        'FLOWS'
      );
  
      await io.flowBuilder.click(selectors.exportsPagePO.EXPORT_ADDPROCESSOR_BUTTON)
  
      await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.EXPORT_HOOK)
      await io.flowBuilder.click(selectors.flowBuilderPagePO.EXPORT_HOOK)
  
  
      await io.flowBuilder.click(selectors.basePagePO.CREATE_SCRIPT_ARIA_LABEL);
  
      await io.flowBuilder.click(selectors.basePagePO.FUNCTION_STUB);   
      await io.flowBuilder.selectTextfromDropDown(page,"postAggregate");
      let divTextContent = await io.flowBuilder.getText(selectors.basePagePO.ACE_CONTENT);
      await io.assert.expectNotToBeNull(divTextContent,"Value is not null")
    });
  })