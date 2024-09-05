import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import data from "@testData/FtpImport/C77813.json"

test.describe(`C77813 Validate User is able to see the vertical line when download retry data option is available (Manager account)`, () => {
    test(`@Env-All @Zephyr-IO-T21620 C77813 Validate User is able to see the vertical line when download retry data option is available (Manager account)`, async ({
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
         await io.flowBuilder.clickByIndex(selectors.flowBuilderPagePO.FTP_BRIDGE_ERROR_MORE_BUTTON,2);
         await io.homePage.loadingTime()
         await io.flowBuilder.waitForElementAttached(':has-text("Download retry data")');
         await io.assert.verifyElementText( selectors.basePagePO.MENU_ITEM, 'Download retry data');


    });
  });


