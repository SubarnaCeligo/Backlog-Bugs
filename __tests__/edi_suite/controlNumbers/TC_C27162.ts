import { test, expect } from "@celigo/ui-core-automation";
import  FTPtoFTP from "@testData/edi_suite/edi.json"
import allure from "allure-playwright";
import * as selectors from "@celigo/aut-selectors";
test.describe("TC_C27162", () => {
  test.beforeEach(async ({ io, }) => {
    await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test.skip("TC_C27162", async ({
    io,page
  }, testInfo) => {
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.loadingTime()

      const id = await io.createResourceFromAPI(FTPtoFTP, "FLOWS");
     await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.TRANSFER);
     await io.flowBuilder.clickByIndex(selectors.flowBuilderPagePO.TRANSFER,1);
     await io.flowBuilder.clickByText("JSON");
     await io.flowBuilder.clickByText("EDI X12");
     await io.flowBuilder.click(selectors.homePagePO.EDI_PROFILE);
    await page.getByRole('menuitem', { name: 'wef' }).click();
    await io.flowBuilder.click(selectors.homePagePO.EDI_FORMAT);
    await io.flowBuilder.clickByText("Generic-004020-810-Purchase order");
    await io.flowBuilder.click(selectors.basePagePO.SAVE_AND_CLOSE);
    await io.flowBuilder.click(selectors.basePagePO.SAVE_AND_CLOSE);
    await io.flowBuilder.click(selectors.flowBuilderPagePO.FLOW_TOGGLE);
    await io.flowBuilder.click(selectors.flowBuilderPagePO.FLOW_DISABLE);
    await test.step("*** Enable and run the Flow *** ", async () => {
      await io.flowBuilder.saveandRunFlow(testInfo.title);
      await io.api.validateJobCountFromAPI(testInfo.title, 
          {
          "ignoreCount": "0",
          "successCount": "2",
          "errorCount": "0"
        }
        )
  });

  });
});
