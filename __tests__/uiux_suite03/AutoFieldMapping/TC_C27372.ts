import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import data3 from "@testData/Flows/C27372.json"
import data4 from "@testData/Flows/C25947.json"


test.describe(`C27372 Verify AutoMap field button is shown when both extract/generate fields are present and In case anyone is missing, we hide it.`, () => {

    test(`@Env-All @Zephyr-IO-T5291 C27372 Verify AutoMap field button isnot shown when both extract/generate fields are not present`, async({io,page}) => {

        const id =  await io.createResourceFromAPI(
                    data3,
                    'FLOWS'
                  );
         await io.flowBuilder.waitForElementAttached(selectors.basePagePO.ADD_DATA_PROCESSOR)
         await io.flowBuilder.clickByIndex(selectors.basePagePO.ADD_DATA_PROCESSOR,1)
         await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.IMPORT_MAPPINGS)
         await io.flowBuilder.clickByIndex(selectors.flowBuilderPagePO.IMPORT_MAPPINGS,0)
         const separationBoundary = await io.flowBuilder.isVisible(selectors.mappings.DEFAULT_MAPPING_TYPE.AUTO_MAP)
         await io.assert.expectToBeValue(separationBoundary.toString(), 'false', "Element not found");

    });
    test(`@Env-All @Zephyr-IO-T5291 C27372 Verify AutoMap field button is shown when both extract/generate fields are present and In case anyone is missing, we hide it.`, async({io,page}) => {

        const id =  await io.createResourceFromAPI(
                    data4,
                    'FLOWS'
                  );
         await io.flowBuilder.waitForElementAttached(selectors.basePagePO.ADD_DATA_PROCESSOR)
         await io.flowBuilder.clickByIndex(selectors.basePagePO.ADD_DATA_PROCESSOR,1)
         await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.IMPORT_MAPPINGS)
         await io.flowBuilder.click(selectors.flowBuilderPagePO.IMPORT_MAPPINGS)
         const separationBoundary = await io.flowBuilder.isVisible(selectors.mappings.DEFAULT_MAPPING_TYPE.AUTO_MAP)
         await io.assert.expectToBeValue(separationBoundary.toString(), 'true', "Element not found");

    });
  })