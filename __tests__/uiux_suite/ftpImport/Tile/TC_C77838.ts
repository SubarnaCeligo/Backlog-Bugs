import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import data from "@testData/FtpImport/C77838.json"

test.describe(`C77838 Validate User is able to see the more actions icon when download retry data option is available (Tile level access account)`, () => {
    test(`C77838 Validate User is able to see the more actions icon when download retry data option is available (Tile level access account)`, async ({
      io,
      page
    }) => {
        const id =  await io.fillFormUI(
            data,
           'FLOWS'
         );
         await io.api.runBatchFlowViaAPI('C77805', id);
         const lastRun = page.getByText('Last run')
         await lastRun.waitFor({state: 'visible', timeout: 200000});
         await io.flowBuilder.clickByTextByIndex("1 error", 1);
         await io.assert.verifyElementIsDisplayed(selectors.flowBuilderPagePO.FTP_BRIDGE_ERROR_MORE_BUTTON,"Element is present") 
    });
  });