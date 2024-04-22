import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import data from "@testData/FtpImport/C77805.json"

test.describe(`C77805 Validate User is able to see the vertical line when download retry data option is available (Owner account)`, () => {
    test(`C77805 Validate User is able to see the vertical line when download retry data option is available (Owner account)`, async ({
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
         await lastRun.waitFor({state: 'visible', timeout: 360000});
         await io.flowBuilder.clickByTextByIndex("1 error", 1);
         await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.FTP_BRIDGE_ERROR_MORE_BUTTON);
         await io.flowBuilder.clickByIndex(selectors.flowBuilderPagePO.FTP_BRIDGE_ERROR_MORE_BUTTON,1);
         await io.flowBuilder.waitForElementAttached(':has-text("Download retry data")');
         await io.assert.verifyElementText(selectors.basePagePO.MENU_ITEM, 'Download retry data');
    });
  });