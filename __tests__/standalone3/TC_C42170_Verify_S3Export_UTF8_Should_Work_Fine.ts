import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("TC_C42170_Verify_S3Export_UTF8_Should_Work_Fine", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    await io.homePage.loadingTime();
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.loadingTime();
  });
  test("@Zephyr-IO-T17148 @Env-All TC_C42170_Verify_S3Export_UTF8_Should_Work_Fine", async ({io,page}, testInfo) => {
    await io.homePage.loadingTime()
    await io.flowBuilder.clickCreateFlowButton();
    test.step("*** Create Flow Selected ***", async ()=>{});

    await io.homePage.click(selectors.flowBuilderPagePO.ADD_SOURCE);
    test.step("*** Clicked on PageGenerator ***", async ()=>{});

    await io.homePage.click(selectors.flowBuilderPagePO.AMAZONS3);
    test.step("*** Selected s3 as the adaptor ***", async ()=>{});

    test.step("*** Clicking on create from scratch ***", async ()=>{});
    await io.flowBuilder.click(selectors.basePagePO.CREATE_FROM_SCRATCH);

    await io.homePage.loadingTime() 

    await io.homePage.fillWebPage(selectors.connectionsPagePO.CONNECTIONS_DROPDOWN, "S3 CONNECTION");
    test.step("*** Choosing the desired s3 connection ***", async ()=>{});
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
