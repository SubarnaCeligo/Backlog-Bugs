import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import data4 from "@testData/Flows/C25947.json"


test.describe(`C25947 Verify suggested mapping separation boundary must be Cleared on mapping changes`, () => {
     
    test(`@Env-All @Zephyr-IO-T5274 C25947 Verify suggested mapping separation boundary must be Cleared on mapping changes`, async({io,page}) => {
  
        const id =  await io.createResourceFromAPI(
                    data4,
                    'FLOWS'
                  );
         await io.flowBuilder.waitForElementAttached(selectors.basePagePO.ADD_DATA_PROCESSOR)        
         await io.flowBuilder.clickByIndex(selectors.basePagePO.ADD_DATA_PROCESSOR,1)
         await io.flowBuilder.click(selectors.flowBuilderPagePO.IMPORT_MAPPINGS)   
         await io.flowBuilder.click(selectors.mappings.DEFAULT_MAPPING_TYPE.AUTO_MAP)
         await page.hover(selectors.mappings.DEFAULT_MAPPING_TYPE.FIELD_MAPPING_SETTING)
         await io.flowBuilder.click(selectors.mappings.DEFAULT_MAPPING_TYPE.FIELD_MAPPING_REMOVE);
         const separationBoundary = await io.flowBuilder.isVisible(':has-text("New mappings"')
         await io.assert.expectToBeValue(separationBoundary.toString(), 'false', "Element not found");

    });
  })