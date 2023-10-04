import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import data1 from "@testData/Flows/C68545.json"

test.describe(`C68545 Verify user is able to use 'Edit mock input' section`, () => {
   
    test(`C68545 Verify user is able to use 'Edit mock input' section`, async({io,page}) => {
  
      const id =  await io.fillFormUI(
        data1,
        'FLOWS'
      );

      await io.flowBuilder.clickByText("Import");
      await io.flowBuilder.waitForElementAttached("[data-test='edit-mock-input']")
      await io.flowBuilder.click("[data-test='edit-mock-input']")
      await io.flowBuilder.waitForElementAttached(':has-text("Fetch latest input data")');
        await io.assert.verifyElementText('[data-test="fetchLatestInputData"]', 'Fetch latest input data');
 
      
    });
  })