import { test, expect } from "@celigo/ui-core-automation";
import  FTPtoFTP from "@testData/edi_suite/edi.json"
import allure from "allure-playwright";
import * as selectors from "@celigo/aut-selectors";
import FDR from "@testData/edi_suite/Generic_Import_997.json"

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
     await io.flowBuilder.click(selectors.homePagePO.EDI_PROFILE);
    await page.getByRole('menuitem', { name: 'AA_EDI_CONTROL_NUMBERS_DND' }).click();
    await io.flowBuilder.fill(selectors.homePagePO.EDI_FORMAT+ ' input', 'Generic-005010-997-Functional Acknowledgment');
    await io.exportsPage.loadingTime();
    await io.exportsPage.waitForElementAttached(selectors.flowBuilderPagePO.PATH_TO_MANY_OPTIONS);
    await io.exportsPage.clickByIndex(selectors.flowBuilderPagePO.PATH_TO_MANY_OPTIONS, 0);
    await io.exportsPage.loadingTime();

      //Open parser helper
      await io.exportsPage.waitForElementAttached(selectors.exportsPagePO.PARSER_HELPER);
      await io.exportsPage.clickByIndex(selectors.exportsPagePO.PARSER_HELPER, 1);
      await io.homePage.loadingTime();
  
      // Locate the textarea for FDR
      const textarea = await page.$(selectors.flowBuilderPagePO.RULE);
  
      if (textarea) {
        // Click the textarea to focus on it
        await textarea.click();
  
        // Select all text and delete it
        await io.homePage.loadingTime();
        await page.keyboard.press('Control+A');
        await page.keyboard.press('Meta+A');
        await page.keyboard.press('Backspace');
      }
      //Add new FDR
      await io.homePage.loadingTime();
      await io.exportsPage.fill(selectors.flowBuilderPagePO.FDR_TEXTAREA, JSON.stringify(FDR));
      await io.homePage.loadingTime();


      // Locate the textarea for FDR
      const textarea2 = await page.$(selectors.exportsPagePO.FORM_DEFINITION);
  
      if (textarea2) {
        // Click the textarea to focus on it
        await textarea2.click();
  
        // Select all text and delete it
        await io.homePage.loadingTime();
        await page.keyboard.press('Control+A');
        await page.keyboard.press('Meta+A');
        await page.keyboard.press('Backspace');
      }
       //Fill sample data
      await io.homePage.loadingTime();
      await io.exportsPage.fill(selectors.exportsPagePO.SAMPLE_DATA_TEXTAREA, '{}');
      await io.homePage.loadingTime();
      await io.exportsPage.clickByTextByIndex('Save & close', 1);

    await io.homePage.loadingTime();
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