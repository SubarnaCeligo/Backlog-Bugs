import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import data from "@testData/FtpImport/C77815.json"


test.describe(`C77815 Validate User is not seeing the vertical line when download retry data option is not available (Manager account)`, () => {
    test(`C77815 Validate User is not seeing the vertical line when download retry data option is not available (Manager account)`, async ({
      io,
      page
    }) => {
        const id =  await io.createResourceFromAPI(
            data,
           'FLOWS'
         );
         await io.api.runBatchFlowViaAPI('C77815', id);
         const lastRun = page.getByText('Last run')
         await lastRun.waitFor({state: 'visible', timeout: 360000});
         
         await io.flowBuilder.clickByTextByIndex("1 error", 1);
        const element = await io.flowBuilder.isVisible(selectors.basePagePO.MENU_ITEM)
        await io.assert.expectToBeValue(element.toString(), "false", "Element is not present")
          
    });
  });