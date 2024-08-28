import { test, expect } from "@celigo/ui-core-automation";
import  FTPtoFTP from "@testData/edi_suite/edi.json"
import allure from "allure-playwright";
import * as selectors from "@celigo/aut-selectors";
test.describe("@Author-SaiPhanindra TC_27162", () => {
  test.beforeEach(async ({ io, }) => {
    await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test("@Epic-IO-46279 @Priority-P2 @Env-All @Zephyr-IO-27162", async ({
    io,page
  }, testInfo) => {
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.loadingTime();

      const id = await io.createResourceFromAPI(FTPtoFTP, "FLOWS");
     await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.TRANSFER);
     await io.flowBuilder.clickByIndex(selectors.flowBuilderPagePO.TRANSFER,1);
     await io.flowBuilder.clickByText("JSON");
     await io.flowBuilder.clickByText("EDI X12");
     await io.flowBuilder.waitForElementAttached(selectors.homePagePO.EDI_PROFILE);
     await io.flowBuilder.click(selectors.homePagePO.EDI_PROFILE);
    await page.getByRole('menuitem', { name: 'AA_EDI_CONTROL_NUMBERS_DND' }).click();
    //Select Parsing def
    await io.exportsPage.loadingTime();
    await io.exportsPage.click(selectors.homePagePO.EDI_FORMAT);
    await io.exportsPage.loadingTime();
    if (await page.url().includes("https://staging.")) {
      await io.exportsPage.waitForElementAttached(selectors.exportsPagePO.PARSING_DEF_DROPDOWN);
      await io.exportsPage.clickByIndex(selectors.exportsPagePO.PARSING_DEF_DROPDOWN, 3);
    }else{
    await io.exportsPage.waitForElementAttached(selectors.exportsPagePO.PARSING_DEF_DROPDOWN);
    await io.exportsPage.clickByIndex(selectors.exportsPagePO.PARSING_DEF_DROPDOWN, 2);
    }

    await io.exportsPage.waitForElementAttached(selectors.basePagePO.FTP_DIRECTORY_PATH);
    await io.exportsPage.fill(selectors.basePagePO.FTP_DIRECTORY_PATH, '/test');

    //Save
    await io.flowBuilder.click(selectors.basePagePO.SAVE_AND_CLOSE);
    await io.homePage.loadingTime();
    await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.FLOW_TOGGLE);
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
