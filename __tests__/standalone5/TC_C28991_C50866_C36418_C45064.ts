
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt ,randomNumber} from "@celigo/aut-utilities";
import TC from "@testData/STANDALONE/TC_Help_Text.json";

test.describe("TC_C28991_C50866_C36418_C45064", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Beginning of Test Suite ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test("@Env-All @Zephyr-IO-T1906 @Zephyr-IO-T1918 @Zephyr-IO-T1908 @Zephyr-IO-T1910 TC_C28991_C50866_C36418_C45064", async ({io,page}, testInfo) => {
      var flow = await io.api.createImpOrExpAndFlowsThruAPI(TC);
      await test.step("*** Created Flows :" + flow.get(TC.name)["flowName"],async ()=>{}
      );
  
      //Navigate to Flow Page
      await io.flowBuilder.navigateToTheFlow( flow.get(TC.name)["flowId"]
      );
      await io.homePage.loadingTime();
      await io.homePage.isPageReady();
  
      //45064
      await io.homePage.click(selectors.flowBuilderPagePO.TRANSFER);
      test.step("*** Clicking on Export ***", async ()=>{});
      await io.homePage.loadingTime();
      await io.homePage.click(selectors.importPagePO.ADVANCED);
      test.step("*** Clicking on Advanced ***", async ()=>{});
  
      //Decompress files
      await io.homePage.click(selectors.flowBuilderPagePO.DECOMPRESS);
      test.step("*** Clicking on Decompress ***", async ()=>{});
      var deCompress = await io.homePage.getText(selectors.flowBuilderPagePO.PAGE_INFO_TEXT)
      await io.assert.expectToContainValue( "If you’re exporting compressed files, set this field to True. Once you check this field, a dropdown field appears for you to choose the compression format", String(deCompress), "");
      test.step("*** verified Help Text for Decompress Files ***", async ()=>{});
      await io.homePage.click(selectors.basePagePO.CLOSE);
      test.step("*** Clicking on Close ***", async ()=>{});
      await io.homePage.loadingTime();
  
      var imp = await page.$$(selectors.flowBuilderPagePO.TRANSFER);
      await imp[1].click();
      
      test.step("*** Clicking on Export ***", async ()=>{});
  
      await io.homePage.click(selectors.importPagePO.ADVANCED);
      test.step("*** Clicking on Advanced ***", async ()=>{});
  
      //Compress files:
      await io.homePage.loadingTime();
      await io.homePage.click(selectors.flowBuilderPagePO.COMPRESS);
      test.step("*** Clicking on Compress ***", async ()=>{});
      var compress = await io.homePage.getText(selectors.flowBuilderPagePO.PAGE_INFO_TEXT)
      await io.assert.expectToContainValue( "If you would like to compress files before they are posted to the import application, set this field to True. Once you check this field, a dropdown field appears for you to choose the compression format",String(compress), "");
      test.step("*** verified Help Text for Compress Files ***", async ()=>{});
      await io.homePage.click(selectors.basePagePO.CLOSE);
      test.step("*** Clicking on Close ***", async ()=>{});
      await io.homePage.loadingTime();
      await io.homePage.isPageReady();
  
      //36418
      await io.homePage.click(selectors.flowBuilderPagePO.RUN_HISTORY);
      test.step("*** Clicking on Run History ***", async ()=>{});
  
      //help text for Flows
      await io.homePage.click(selectors.flowBuilderPagePO.FLOW);
      test.step("*** Clicking on flow ***", async ()=>{});

      await io.assert.verifyElementTextByIndex(selectors.flowBuilderPagePO.PAGE_INFO_TEXT, `Expand a flow run to see the historical breakdown of success, ignored, errors and pages encountered at each flow step (such as an export) from previous flow runs. The total number of errors, if any, reported at that flow step contains a link to complete details and actions for each error.Was this helpful?`, 0);

      

      await io.homePage.clickByIndex(selectors.flowBuilderPagePO.FLOW, 2);

      await page.waitForTimeout(500);
      
      await io.assert.verifyElementTextByIndex(selectors.flowBuilderPagePO.PAGE_INFO_TEXT, `The numbers in this column represent a historical snapshot of the error count when a flow was run. To preserve the historical nature of these stats, the numbers in this column are not updated when you retry and/or resolve the same errors.Was this helpful?`, 0);
  
      // //50866(Setting Description)
      await io.homePage.click(selectors.flowBuilderPagePO.IMPORT_MAPPINGS);
      await io.homePage.click(selectors.mappings.MAPPER2DOT0PO.SETTINGSBUTTONS);
      var desc = await page.$$(selectors.flowBuilderPagePO.SETTDESC);
      await desc[1].click();
      var des = await io.homePage.getText(selectors.flowBuilderPagePO.PAGE_INFO_TEXT)
      await io.assert.expectToContainValue( "Describe your mappings so that other users can quickly understand the logic without having to read through the configurations. It's a good idea to highlight any nuances that you or someone else might need to know for later revisions. Also, as you make changes to the mappings, remember to keep this setting up to date.",String(des), "");

      var close = await page.$$(selectors.basePagePO.CLOSE);
      await close[1].click();
      await io.homePage.click(selectors.basePagePO.CLOSE);
      
      await io.homePage.click(selectors.importPagePO.CLICKIMPORT);
      await io.homePage.click(selectors.importPagePO.EDITLOOKUP);
      await io.homePage.click("[id='_name'] button");
      var nameText = await io.homePage.getText(selectors.flowBuilderPagePO.PAGE_INFO_TEXT)
      await io.assert.expectToContainValue( "Enter a unique name so that you can identify this lookup later.", String(nameText), "");
    
  });
});
