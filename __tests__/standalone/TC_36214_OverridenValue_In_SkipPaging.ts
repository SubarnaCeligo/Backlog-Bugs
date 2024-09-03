
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt ,randomNumber} from "@celigo/aut-utilities";
import HttpAcumatica from "@testData/STANDALONE/HttpAcumatica.json";

const os = require('os');

test.describe("TC_36214_OverridenValue_In_SkipPaging", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("***Beginning of Test Suite ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });

  test("@Env-All @Zephyr-IO-T9910 TC_36214_OverridenValue_In_SkipPaging", async ({io,page}, testInfo) => {
    await io.flowBuilder.clickCreateFlowButton();
    test.step("*** Create Flow Selected ***", async ()=>{});

    await io.homePage.click(selectors.flowBuilderPagePO.ADD_SOURCE);
    test.step("*** Clicked on PageGenerator ***", async ()=>{});

    await io.homePage.click(selectors.flowBuilderPagePO.HTTP_FORM_SWITCH);
    test.step("*** Selected HTTP as the adaptor ***", async ()=>{});

    await io.flowBuilder.click(selectors.basePagePO.CREATE_FROM_SCRATCH);
    await io.homePage.loadingTime();
    test.step("*** Clicking on create from scratch ***", async ()=>{});

    var conn = HttpAcumatica[0]["connectionId"];
    // 

    await io.homePage.fillWebPage(selectors.connectionsPagePO.CONNECTIONS_DROPDOWN, conn);
    test.step("*** Choosing the desired BigCommerce connection ***", async ()=>{});
    await io.homePage.click(selectors.basePagePO.SAVE);
    test.step("*** Clicking on NEXT button ***", async ()=>{});

    await io.homePage.fillWebPage(selectors.flowBuilderPagePO.RENAME, "Acumatica HTTP Export");
    test.step("*** Renaming the PageGenerator ***", async ()=>{});
    await io.homePage.fillWebPage(selectors.exportsPagePO.HTTP_METHOD, "GET");
    test.step("*** Selecting the method from the DROPDOWN ***", async ()=>{});
    test.step("*** writing the Relative URL ***", async ()=>{});
    await io.homePage.fillWebPage(selectors.exportsPagePO.HTTP_RELATIVE_URI, "/Customer?$filter=CustomerName eq 'Sareesh Goruju'&$top=2&$skip={{{export.http.paging.skip}}}");
    await io.homePage.fillWebPage(selectors.exportsPagePO.EXPORT_TYPE_DROPDOWN, "all");
    test.step("*** Selecting the desired RecordType ***", async ()=>{});
    await io.homePage.loadingTime();
    test.step("*** Verifying whether the proper drop-down selected or not ***", async ()=>{});
    await io.homePage.click(selectors.flowBuilderPagePO.PAGE);
    await io.homePage.loadingTime();
    test.step("*** Clicking on Paging Method ***", async ()=>{});
    await io.homePage.fillWebPage(selectors.flowBuilderPagePO.SKIP, "skip");
    test.step("*** Selectting the desired Paging Method ***", async ()=>{});
    test.step("*** Verifying whether the proper method selected ***", async ()=>{});
    await io.homePage.fillWebPage(selectors.flowBuilderPagePO.SKIPNUMBER, "2");
    test.step("*** Overriding the value in skip Page Number ***", async ()=>{});
    await io.homePage.fillWebPage(selectors.flowBuilderPagePO.OVERRIDECODELASTPAGE, "404");
    test.step("*** Overriding the value in last Page status Code ***", async ()=>{});
    await io.homePage.click(selectors.basePagePO.SAVE_AND_CLOSE);
    test.step("*** Clicking On Save And Close ***", async ()=>{});
    await io.homePage.loadingTime();

    //enable debug log
    await io.homePage.click(selectors.flowBuilderPagePO.NOTIFICATION_CONNECTIONS);
    test.step("*** Enable Debug Log ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.clickButtonByIndex(selectors.connectionsPagePO.ACTIONS_MENU_BUTTON, 1);
    await io.homePage.click(selectors.myAccountPagePO.DEBUG);

    test.step("*** Clicked On Debug Connection ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.click( selectors.flowBuilderPagePO.EXPORT);
    test.step("*** Clicked on Export ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.isVisible(selectors.importPagePO.HTTP_RELATIVEURI);
    await io.homePage.click(selectors.importPagePO.HTTP_RELATIVEURI);
    test.step("*** Clicking On Relative Url ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.flowBuilderPagePO.PREVIEW);
    test.step("*** Clicking On Preview Button ***", async ()=>{});
    await io.homePage.loadingTime();
    var Response = await io.homePage.getText(selectors.mappings.MAPPER2DOT0PO.PREVIEWRESULT)
    await io.assert.expectToContainValue( "$skip=2", String(Response), "");
    test.step("***  Verified overridden value should be displayed in AFE 2.0 window   ***", async ()=>{});
    await io.homePage.isVisible(selectors.basePagePO.CLOSE_RIGHT_DRAWER);
    await io.homePage.click(selectors.basePagePO.CLOSE_RIGHT_DRAWER);
    test.step("*** Clicking on Close ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.isVisible(selectors.basePagePO.CLOSE);
    await io.homePage.click(selectors.basePagePO.CLOSE);
    test.step("*** Clicking on Close ***", async ()=>{});
    await io.flowBuilder.click(selectors.myAccountPagePO.LOGS);
    const platform = os.platform();
    if (platform === 'darwin') {
      await page.keyboard.press('Meta+A'); 
      await page.keyboard.press('Meta+C');
    } else {
      await page.keyboard.press('Control+A');
      await page.keyboard.press('Control+C');
    }
    const copiedText = await page.evaluate(() => navigator.clipboard.readText()); 
    await expect(copiedText).toContain("skip=2");
    test.step("Verified overridden value should be displayed in debuglogs", async ()=>{});
  });
});
