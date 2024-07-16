import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import data1 from "@testData/Flows/C14284.json"


test.describe(`C14284 Verify in mappings whether all the payment instruments fields are shown and working as expected.`, () => {
     
    test(`@Env-All @Zephyr-IO-T2727 C14284 Verify in mappings whether all the payment instruments fields are shown and working as expected.`, async({io,page}) => {
  
        const id =  await io.createResourceFromAPI(
                    data1,
                    'FLOWS'
                  );

         await io.flowBuilder.click(selectors.flowBuilderPagePO.IMPORT_MAPPINGS)   
         await io.flowBuilder.waitForElementAttached(':has-text("Card Brand (InternalId)")');
         await io.assert.verifyElementTextByIndex(` ${selectors.mappings.MAPPER1DOT0PO.DESTINATION_INPUT} textarea`, "Card Brand (InternalId)",0)      
                   

    });
  })