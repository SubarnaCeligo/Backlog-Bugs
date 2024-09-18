import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import FTP from "@testData/STANDALONE/AzureBlobStorage_Connection.json";

test.describe("TC_C42175_Verify_Azure_Export_Xlsx_FileEncoding", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Navigate to Home Page ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test("@Zephyr-IO-T17158 @Env-All TC_C42175_Verify_Azure_Export_Xlsx_FileEncoding", async ({io,page}, testInfo) => {
    await io.homePage.loadingTime()
    await io.flowBuilder.clickCreateFlowButton();
    test.step("*** Create Flow Selected ***", async ()=>{});

    await io.homePage.click(selectors.flowBuilderPagePO.ADD_SOURCE);
    test.step("*** Clicked on PageGenerator ***", async ()=>{});

    await io.homePage.click(selectors.flowBuilderPagePO.AZUREBLOBSTORAGE);
    test.step("*** Selected azure as the adaptor ***", async ()=>{});

    test.step("*** Clicking on create from scratch ***", async ()=>{});
    await io.flowBuilder.click(selectors.basePagePO.CREATE_FROM_SCRATCH);

    await io.homePage.loadingTime() 
    var conn = FTP[0]["connectionId"];
    await io.homePage.fillWebPage(selectors.connectionsPagePO.CONNECTIONS_DROPDOWN, conn);

    test.step("*** Choosing the desired azure connection ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.fillWebPage(selectors.flowBuilderPagePO.RENAME, "S3 export");
    test.step("*** writing Import Name ***", async ()=>{});

    test.step("*** Select file type as xlsx ***", async ()=>{});
    await io.homePage.fillWebPage(selectors.exportsPagePO.FILE_TYPE, "xlsx");
    test.step("*** Clicking advanced ***", async ()=>{});
    await io.homePage.click(selectors.mappings.MAPPER2DOT0PO.ADVANCED);
    test.step("*** Clickng on File encoding***", async ()=>{});
    await io.homePage.click(selectors.flowBuilderPagePO.FILEENCODING);

    test.step("*** validating UFT-16LE and Windows-1252 removed in xlsx type file encoding***", async ()=>{});
    const dropdownElements = ["UTF-8", "UTF-16LE", "Windows-1252"];
    const loc = selectors.flowBuilderPagePO.SELECTPAGINGMETHOD;
    for(var a = 0; a < loc.length; a++) {
      let utf8 = await io.homePage.getDropDownValue(loc, dropdownElements[0]);
      let utf16 = await io.homePage.getDropDownValue(loc, dropdownElements[1]);
      let win1252Data = await io.homePage.getDropDownValue(loc, dropdownElements[2]);
      await io.assert.expectToBeFalse(utf16, "");
      await io.assert.expectToBeTrue(utf8, "");
      await io.assert.expectToBeFalse(win1252Data, "");
    }
    await io.homePage.clickButtonByIndex(selectors.flowBuilderPagePO.SELECTPAGINGMETHOD, 1);
    test.step("*** Closing the export ***", async ()=>{});
    await io.homePage.click(selectors.basePagePO.CLOSE);
    await io.homePage.click(selectors.basePagePO.DISCARD_CHANGES);
  });
});
