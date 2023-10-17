import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import data from "@testData/Flows/C58484.json"

test.describe(`C58484 UI-Box - mapping fields are not shown for Box import if sample file is uploaded`, () => {
    test(`C58484 UI-Box - mapping fields are not shown for Box import if sample file is uploaded`, async ({
      io,
      page
    }) => {
        const id =  await io.fillFormUI(
            data,
           'FLOWS'
         );
         await io.flowBuilder.waitForElementAttached(selectors.basePagePO.ADD_DATA_PROCESSOR)        
         await io.flowBuilder.clickByIndex(selectors.basePagePO.ADD_DATA_PROCESSOR,1)
         await io.flowBuilder.click(selectors.flowBuilderPagePO.IMPORT_MAPPINGS)   
         await io.flowBuilder.clickByText("Mapper 1.0")
         await io.flowBuilder.click(selectors.mappings.Mapper1dot0PO.DESTINATION_INPUT)
         const dropdownText = await io.flowBuilder.isVisible("text='browserslist.development'")
         await io.assert.expectToBeValue(dropdownText.toString(), 'true', "text not found");
    });
  });
  