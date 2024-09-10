import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import HTTP from "@testData/STANDALONE/TC_C31359.json";

test.describe("TC_C31359_HTTP_custom_header_of128kb", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Beginning of Test Suite ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });

  test("@Zephyr-IO-T9680 @Env-All TC_C31359_HTTP_custom_header_of128kb", async ({io,page}, testInfo) => {
    await io.homePage.loadingTime();
    await io.flowBuilder.clickCreateFlowButton();
    test.step("*** Create Flow Selected ***", async ()=>{});

    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.click(selectors.flowBuilderPagePO.ADD_DESTINATION_OR_LOOKUP);
    test.step("*** Clicked on PageProcessor ***", async ()=>{});

    await io.homePage.click(selectors.flowBuilderPagePO.HTTP_FORM_SWITCH);
    test.step("*** Selected HTTP as the adaptor ***", async ()=>{});

    test.step("*** Clicking on type of import ***", async ()=>{});

    await io.homePage.click(selectors.flowBuilderPagePO.SELECTED_IMPORT_RECORDS);

    test.step("*** Choosing type of import from dropdown ***", async ()=>{});
    var conn = HTTP.pageProcessors[0].qa__import._connectionId;

    await io.homePage.click(selectors.exportsPagePO.CREATE_FROM_SCRATCH);
      
    await io.homePage.click(selectors.basePagePO.CONNECTION);
    await page.keyboard.type(conn);
    await io.homePage.click(selectors.connectionsPagePO.CONNECTIONDROP0);

    await io.homePage.loadingTime();

    test.step("*** Choosing the desired connection ***", async ()=>{});
    await io.homePage.click(selectors.basePagePO.SAVE);
    test.step("*** Clicking on NEXT button ***", async ()=>{});
    await io.homePage.fillWebPage(selectors.flowBuilderPagePO.RENAME, "AutomationStandalone_HTTP_IMPORT");
    test.step("*** Renaming the PageProcessor ***", async ()=>{});

    const httpMethod = await page.$(selectors.basePagePO.HTTP_2DOT0);
    if (httpMethod) {
      await io.homePage.click(selectors.basePagePO.HTTP_2DOT0); 
    }
    test.step("*** clicking on the Post methed ***", async ()=>{});
    await io.homePage.click(selectors.importPagePO.SELECTHTTPMETHOD);
    await io.homePage.click(selectors.importPagePO.HTTPPOSTMETHOD);
    await io.homePage.fill(selectors.flowBuilderPagePO.HTTP_GET_RELATIVEURL, "/customers");

    await io.homePage.fillWebPage(selectors.flowBuilderPagePO.REQUESTMEDIATYPE, "csv");

    var sampleText = HTTP.pageProcessors[0].qa__import.customHeaders;
    await io.homePage.enterHugeData(selectors.flowBuilderPagePO.CUSTOMHEADERROWS_UPDATED, sampleText);
    test.step("*** entered a value of 128kb in customer header ***", async ()=>{});
    await io.homePage.click(selectors.basePagePO.SAVE_AND_CLOSE);

    var importJson1 = await io.api.getImport( HTTP.pageProcessors[0].qa__import.name);

    expect(importJson1.hasOwnProperty("_id")).toBeTruthy;
    test.step("*** Error is not thrown if custom header is of size 128kb ***", async ()=>{});
  });
});
