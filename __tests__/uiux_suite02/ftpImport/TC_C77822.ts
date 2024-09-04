import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import data from "@testData/FtpImport/C77822.json"

 test.describe(`C77822 Validate User is able to see the more actions icon when download retry data option is available (Monitor account)`, () => {
        test(`@Env-All @Zephyr-IO-T21629 C77822 Validate User is able to see the more actions icon when download retry data option is available (Monitor account)`, async ({
          io,
          page
        }) => {
            const id =  await io.createResourceFromAPI(
                data,
               'FLOWS'
             );
             await io.api.runBatchFlowViaAPI('C77805', id);
             await io.homePage.loadingTime()
             const lastRun = page.getByText('Last run')
             await lastRun.waitFor({state: 'visible', timeout: 600000});
         await io.homePage.delay(30000)
             await io.flowBuilder.clickByTextByIndex("1 error", 0);
             await io.homePage.loadingTime()
             await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.FTP_BRIDGE_ERROR_MORE_BUTTON);
             await io.assert.verifyElementIsDisplayed(selectors.flowBuilderPagePO.FTP_BRIDGE_ERROR_MORE_BUTTON,"Element is present")
        });
      });