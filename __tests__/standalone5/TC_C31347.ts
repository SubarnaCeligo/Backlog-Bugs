
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import HTTP from "@testData/STANDALONE/TC_C31347.json";

test.describe("TC_C31347_HTTP_custom_header_above_128kb", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Beginning of Test Suite ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });

  test("@Zephyr-IO-T9678 @Env-All TC_C31347_HTTP_custom_header_above_128kb", async ({io,page}, testInfo) => {
    await io.flowBuilder.clickCreateFlowButton();
    test.step("*** Create Flow Selected ***", async ()=>{});

    await io.homePage.click(selectors.flowBuilderPagePO.ADD_DESTINATION_OR_LOOKUP);
    test.step("*** Clicked on PageProcessor ***", async ()=>{});

    await io.homePage.click(selectors.flowBuilderPagePO.HTTP_FORM_SWITCH);
    test.step("*** Selected HTTP as the adaptor ***", async ()=>{});

    test.step("*** Clicking on type of import ***", async ()=>{});

    await io.homePage.click(selectors.flowBuilderPagePO.SELECTED_IMPORT_RECORDS);

    await io.homePage.click(selectors.exportsPagePO.CREATE_FROM_SCRATCH);

    test.step("*** Choosing type of import from dropdown ***", async ()=>{});
    var conn = HTTP.pageProcessors[0].qa__import._connectionId;
      
    await io.homePage.click(selectors.basePagePO.CONNECTION);
    await page.keyboard.type(conn);
    await io.homePage.click(selectors.connectionsPagePO.CONNECTIONDROP0);
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
    await io.homePage.fillWebPage(selectors.exportsPagePO.HTTP_RELATIVE_URI, "/customers");

    await io.homePage.fillWebPage(selectors.flowBuilderPagePO.REQUESTMEDIATYPE, "csv");
   
    var sampleText = HTTP.pageProcessors[0].qa__import.customHeaders;
    await io.homePage.enterHugeData(selectors.flowBuilderPagePO.CUSTOMHEADERROWS_UPDATED, sampleText);
    test.step("*** entered a value greater than 128kb in customer header ***", async ()=>{});
    
    await io.homePage.click(selectors.basePagePO.SAVE_AND_CLOSE);
    
    var errorMsg = await io.homePage.getText(selectors.basePagePO.NOTIFICTION_BAR);

    expect(errorMsg.includes( "The maximum size of the field: file.csv.customHeaderRows.0 in the Import document should be 65536 characters.")).toBeTruthy();

    test.step("*** Error is thrown as expected if custom header is entred greater than 128kb ***", async ()=>{});
  });
});
