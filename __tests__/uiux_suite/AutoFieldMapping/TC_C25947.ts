import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import data4 from "@testData/Flows/C25947.json"


test.describe(`C25947 Verify suggested mapping separation boundary must be Cleared on mapping changes`, () => {
     
    test(`C25947 Verify suggested mapping separation boundary must be Cleared on mapping changes`, async({io,page}) => {
  
        const id =  await io.fillFormUI(
                    data4,
                    'FLOWS'
                  );
         await io.flowBuilder.waitForElementAttached('[data-test="addDataProcessor"]')        
         await io.flowBuilder.clickByIndex('[data-test="addDataProcessor"]',1)
         await io.flowBuilder.click(selectors.flowBuilderPagePO.IMPORT_MAPPINGS)   
         await io.flowBuilder.click("[data-test='auto-map']")
         await page.hover('[data-test="fieldMappingSettings-0"]')
         await io.flowBuilder.click('[data-test="fieldMappingRemove-0"]');
         const separationBoundary = await io.flowBuilder.isVisible(':has-text("New mappings"')
         await io.assert.expectToBeValue(separationBoundary.toString(), 'false', "Element not found");

    });
  })