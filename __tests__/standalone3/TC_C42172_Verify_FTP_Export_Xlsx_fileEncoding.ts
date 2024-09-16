import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import FTP from "@testData/STANDALONE/ftp_connection.json";

test.describe("TC_C42172_Verify_FTP_Export_Xlsx_fileEncoding", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Navigate to Home Page ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test("@Zephyr-IO-T17149 @Env-All TC_C42172_Verify_FTP_Export_Xlsx_fileEncoding", async ({io,page}, testInfo) => {
    test.step("*** Clicking on create flow ***", async ()=>{});
    await io.homePage.loadingTime()
    await io.flowBuilder.clickCreateFlowButton();

    test.step("*** Clicking on export button ***", async ()=>{});
    await io.homePage.click(selectors.flowBuilderPagePO.ADD_SOURCE);

    test.step("*** selecting FTP ***", async ()=>{});
    await io.homePage.click(selectors.connectionsPagePO.FTP_CONNECTION);

    test.step("*** Clicking on create from scratch ***", async ()=>{});
    await io.flowBuilder.click(selectors.basePagePO.CREATE_FROM_SCRATCH);

    await io.homePage.loadingTime()

    test.step("*** Choosing the desired FTP connection ***", async ()=>{});
    var conn = FTP[0]["connectionId"];
    await io.homePage.loadingTime() 

    await io.homePage.fillWebPage(selectors.connectionsPagePO.CONNECTIONS_DROPDOWN, conn);
    test.step("*** Choosing the desired GraphQL connection ***", async ()=>{});
    await io.homePage.loadingTime()

    test.step("*** Select file type as xlsx ***", async ()=>{});
    await io.homePage.fillWebPage(selectors.exportsPagePO.FILE_TYPE, "xlsx");

    test.step("*** Clicking FTP advanced ***", async ()=>{});
    await io.homePage.click(selectors.mappings.MAPPER2DOT0PO.ADVANCED);
    test.step("*** Clickng on File encoding***", async ()=>{});
    await io.homePage.click(selectors.flowBuilderPagePO.FILEENCODING);

    test.step("*** validating UFT-16LE and Windows-1252 removed in Xlsx type file encoding***", async ()=>{});
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
