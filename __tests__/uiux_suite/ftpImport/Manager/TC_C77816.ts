import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import data from "@testData/FtpImport/C77816.json"


test.describe(`C77816 Validate User is not seeing the more actions when download retry data option is not available (Manager account)`, () => {
    test(`C77816 Validate User is not seeing the more actions when download retry data option is not available (Manager account)`, async ({
      io,
      page
    }) => {
        const id =  await io.fillFormUI(
            data,
           'FLOWS'
         );
         await io.api.runBatchFlowViaAPI('C77816', id);
         const lastRun = page.getByText('Last run')
         await lastRun.waitFor({state: 'visible', timeout: 180000});
         
         await io.flowBuilder.clickByTextByIndex("1 error", 1);
        const element = await io.flowBuilder.isVisible(selectors.flowBuilderPagePO.FTP_BRIDGE_ERROR_MORE_BUTTON)
        await io.assert.expectToBeValue(element.toString(), "false", "Element is not present")
          
    });
  });

