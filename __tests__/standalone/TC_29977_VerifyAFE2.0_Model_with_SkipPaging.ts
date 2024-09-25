
import { test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import HttpAcumatica from "@testData/STANDALONE/HttpAcumatica.json";
const os = require('os');

test.describe("TC_29977_VerifyAFE2.0_Model_with_SkipPaging", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("***Beginning of Test Suite ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });

  test("@Env-All @Zephyr-IO-T9932 TC_29977_VerifyAFE2.0_Model_with_SkipPaging", async ({io,page}, testInfo) => {
    await io.flowBuilder.clickCreateFlowButton();
    test.step("*** Create Flow Selected ***", async ()=>{});

    await io.homePage.click(selectors.flowBuilderPagePO.ADD_SOURCE);
    test.step("*** Clicked on PageGenerator ***", async ()=>{});

    await io.homePage.click(selectors.flowBuilderPagePO.HTTP_FORM_SWITCH);
    await io.homePage.loadingTime();
    test.step("*** Selected HTTP as the adaptor ***", async ()=>{});

    await io.flowBuilder.click(selectors.basePagePO.CREATE_FROM_SCRATCH);
    await io.homePage.loadingTime();
    test.step("*** Clicking on create from scratch ***", async ()=>{});


    var conn = HttpAcumatica[0]["connectionId"];
     

    await io.homePage.fillWebPage(selectors.connectionsPagePO.CONNECTIONS_DROPDOWN, conn);
    test.step("*** Choosing the desired Acumatica connection ***", async ()=>{});
    await io.homePage.click(selectors.basePagePO.SAVE);
    test.step("*** Clicking on NEXT button ***", async ()=>{});

    await io.homePage.fillWebPage(selectors.flowBuilderPagePO.RENAME, "Acumatica HTTP Export");
    test.step("*** Renaming the PageGenerator ***", async ()=>{});
    await io.homePage.fillWebPage(selectors.exportsPagePO.HTTP_METHOD, "GET");
    test.step("*** Selecting the method from the DROPDOWN ***", async ()=>{});
    test.step("*** writing the Relative URL ***", async ()=>{});
    await io.homePage.fillWebPage(selectors.exportsPagePO.HTTP_RELATIVE_URI, "/Customer?$filter=CustomerName eq 'Sareesh Goruju'&$top=1&$skip={{{export.http.paging.skip}}}");
    await io.homePage.fillWebPage(selectors.exportsPagePO.EXPORT_TYPE_DROPDOWN, "all");
    test.step("*** Selecting the desired RecordType ***", async ()=>{});
    
    await io.homePage.click(selectors.flowBuilderPagePO.PAGE);
    test.step("*** Clicking on Paging Method ***", async ()=>{});
    await io.homePage.fillWebPage(selectors.flowBuilderPagePO.SKIP, "skip");
    test.step("*** Selectting the desired Paging Method ***", async ()=>{});
    var pagination = await io.homePage.getTextFromElement(selectors.flowBuilderPagePO.SKIP, "Skip number parameter");
    await io.assert.expectToBeTrue(pagination, "");
    await io.homePage.fillWebPage(selectors.flowBuilderPagePO.OVERRIDECODELASTPAGE, "404");
    test.step("*** Adding Override Last Page Status Code ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.isVisible(selectors.importPagePO.HTTP_RELATIVEURI);
    await io.homePage.click(selectors.importPagePO.HTTP_RELATIVEURI);
    test.step("*** Clicking On Relative Url ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.mappings.MAPPER2DOT0PO.PREVIEWRESOURCE);
    

    const platform = os.platform();
    if (platform === 'darwin') {
      await page.keyboard.press('Meta+A'); 
      await page.keyboard.press('Meta+C');
    } else {
      await page.keyboard.press('Control+A');
      await page.keyboard.press('Control+C');
    }

    const paste = await page.evaluate(() => navigator.clipboard.readText()); 

    await io.assert.expectToContainValue("previous_page", String(paste),"");
    await io.assert.expectToContainValue( "full_response",String(paste), "");
    await io.assert.expectToContainValue( "connection",String(paste), "");
    await io.assert.expectToContainValue( "export",String(paste), "");
    await io.assert.expectToContainValue( "settings", String(paste),"");
    test.step("***  Verified Model Format in AFE 2.0 For Skip Paging   ***", async ()=>{});
  });
});
