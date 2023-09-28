import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import data from "@testData/FtpImport/C77829.json"

test.describe(`C77829 Validate User is able to see the vertical line when download retry data option is available (Administer account)`, () => {
    test(`C77829 Validate User is able to see the vertical line when download retry data option is available (Administer account)`, async ({
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
         await io.flowBuilder.click(selectors.flowBuilderPagePO.FTP_BRIDGE_ERROR_MORE_BUTTON);
         await io.flowBuilder.waitForElementAttached(':has-text("Download retry data")');
         await io.assert.verifyElementText(selectors.basePagePO.MENU_ITEM, 'Download retry data');
        
          
    });
  });