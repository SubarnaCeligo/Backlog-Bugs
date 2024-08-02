import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import data from "@testData/FtpImport/C77831.json"


test.describe(`C77831 Validate User is not seeing the vertical line when download retry data option is not available (Administer  account)`, () => {
    test(`@Env-All @Zephyr-IO-T21638 C77831 Validate User is not seeing the vertical line when download retry data option is not available (Administer  account)`, async ({
      io,
      page
    }) => {
        const id =  await io.createResourceFromAPI(
            data,
           'FLOWS'
         );
         await io.api.runBatchFlowViaAPI('C77831', id);
         const lastRun = page.getByText('Last run')
         await lastRun.waitFor({state: 'visible', timeout: 360000});
         await io.homePage.delay(30000)
         
         await io.flowBuilder.clickByTextByIndex("1 error", 0);
        const element = await io.flowBuilder.isVisible(selectors.basePagePO.MENU_ITEM)
        await io.assert.expectToBeValue(element.toString(), "false", "Element is not present")
          
    });
  });