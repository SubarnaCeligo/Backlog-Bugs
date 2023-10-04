import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import data3 from "@testData/Flows/C27372.json"
import data4 from "@testData/Flows/C25947.json"


test.describe(`C27372 Verify AutoMap field button is shown when both extract/generate fields are present and In case anyone is missing, we hide it.`, () => {
     
    test(`C27372 Verify AutoMap field button isnot shown when both extract/generate fields are not present`, async({io,page}) => {
  
        const id =  await io.fillFormUI(
                    data3,
                    'FLOWS'
                  );
         await io.flowBuilder.waitForElementAttached('[data-test="addDataProcessor"]')        
         await io.flowBuilder.clickByIndex('[data-test="addDataProcessor"]',1)
         await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.IMPORT_MAPPINGS)        
         await io.flowBuilder.clickByIndex(selectors.flowBuilderPagePO.IMPORT_MAPPINGS,0)   
         const separationBoundary = await io.flowBuilder.isVisible("[data-test='auto-map']")
         await io.assert.expectToBeValue(separationBoundary.toString(), 'false', "Element not found");

    });
    test(`C27372 Verify AutoMap field button is shown when both extract/generate fields are present and In case anyone is missing, we hide it.`, async({io,page}) => {
  
        const id =  await io.fillFormUI(
                    data4,
                    'FLOWS'
                  );
         await io.flowBuilder.waitForElementAttached('[data-test="addDataProcessor"]')        
         await io.flowBuilder.clickByIndex('[data-test="addDataProcessor"]',1)
         await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.IMPORT_MAPPINGS)        
         await io.flowBuilder.click(selectors.flowBuilderPagePO.IMPORT_MAPPINGS)   
         const separationBoundary = await io.flowBuilder.isVisible("[data-test='auto-map']")
         await io.assert.expectToBeValue(separationBoundary.toString(), 'true', "Element not found");

    });
  })