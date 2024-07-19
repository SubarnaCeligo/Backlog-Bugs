import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import data from "@testData/FtpImport/C77830.json"

test.describe(`C77830 Validate User is able to see the more actions icon when download retry data option is available (Administer account)`, () => {
    test(`@Env-All @Zephyr-IO-T21621 C77814 Validate User is able to see the more actions icon when download retry data option is available (Administer account)`, async ({
      io,
      page
    }) => {
        const id =  await io.createResourceFromAPI(
            data,
           'FLOWS'
         );
         await io.api.runBatchFlowViaAPI('C77805', id);
         const lastRun = page.getByText('Last run')
         await lastRun.waitFor({state: 'visible', timeout: 360000});
         await io.homePage.delay(30000)
         await io.flowBuilder.clickByTextByIndex("1 error", 0);
         await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.FTP_BRIDGE_ERROR_MORE_BUTTON);
         await io.assert.verifyElementIsDisplayed (selectors.flowBuilderPagePO.FTP_BRIDGE_ERROR_MORE_BUTTON,"Element is present") 
    });
  });