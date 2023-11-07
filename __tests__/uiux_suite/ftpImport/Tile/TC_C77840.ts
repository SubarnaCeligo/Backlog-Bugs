import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import data from "@testData/FtpImport/C77840.json"


test.describe(`C77840 Validate User is not seeing the more actions when download retry data option is not available (Tile level access account)`, () => {
    test(`C77840 Validate User is not seeing the more actions when download retry data option is not available (Tile level access account)`, async ({
      io,
      page
    }) => {
        const id =  await io.createResourceFromAPI(
            data,
           'FLOWS'
         );
         await io.api.runBatchFlowViaAPI('C77840', id);
         const lastRun = page.getByText('Last run')
         await lastRun.waitFor({state: 'visible', timeout: 180000});
         
         await io.flowBuilder.clickByTextByIndex("1 error", 1);
        const element = await io.flowBuilder.isVisible(selectors.flowBuilderPagePO.FTP_BRIDGE_ERROR_MORE_BUTTON)
        await io.assert.expectToBeValue(element.toString(), "false", "Element is not present")
          
    });
  });

