import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import data from "@testData/FtpImport/C77823.json"

test.describe(`C77823 Validate User is not seeing the vertical line when download retry data option is not available (Monitor account)`, () => {
    test(`@Env-All C77823 Validate User is not seeing the vertical line when download retry data option is not available (Monitor account)`, async ({
      io,
      page
    }) => {
        const id =  await io.createResourceFromAPI(
            data,
           'FLOWS'
         );
         await io.api.runBatchFlowViaAPI('C77823', id);
         const lastRun = page.getByText('Last run')
         await lastRun.waitFor({state: 'visible', timeout: 360000});
         
         await io.flowBuilder.clickByTextByIndex("1 error", 1);
        const element = await io.flowBuilder.isVisible(selectors.basePagePO.MENU_ITEM)
        await io.assert.expectToBeValue(element.toString(), "false", "Element is not present")
          
    });
  });
