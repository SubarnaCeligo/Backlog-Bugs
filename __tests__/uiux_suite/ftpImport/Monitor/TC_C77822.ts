import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import data from "@testData/FtpImport/C77822.json"
 
 test.describe(`C77822 Validate User is able to see the more actions icon when download retry data option is available (Monitor account)`, () => {
        test(`C77822 Validate User is able to see the more actions icon when download retry data option is available (Monitor account)`, async ({
          io,
          page
        }) => {
            const id =  await io.fillFormUI(
                data,
               'FLOWS'
             );
             await io.api.runBatchFlowViaAPI('C77805', id);
             const lastRun = page.getByText('Last run')
             await lastRun.waitFor({state: 'visible', timeout: 180000});
             await io.flowBuilder.clickByTextByIndex("1 error", 1);
             await io.assert.verifyElementIsDisplayed(selectors.flowBuilderPagePO.FTP_BRIDGE_ERROR_MORE_BUTTON,"Element is present") 
        });
      });