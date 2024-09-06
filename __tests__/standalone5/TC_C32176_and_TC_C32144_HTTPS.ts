import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import HTTP from "@testData/STANDALONE/HTTP_connection.json";

var conn = HTTP[0]["connectionId"];

test.describe("HTTP_standalone_imports", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Beginning of Test Suite ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.loadingTime()
  });

  test("@Zephyr-IO-T9692 @Env-All TC_C32176_Ignore new records & update existing records.", async ({io,page}, testInfo) => {
    await io.flowBuilder.clickCreateFlowButton();
    test.step("*** Create Flow Selected ***", async ()=>{});
    await io.homePage.loadingTime()
    await io.homePage.click(selectors.flowBuilderPagePO.ADD_DESTINATION_OR_LOOKUP);
    test.step("*** Clicked on PageProcessor ***", async ()=>{});

    await io.homePage.click(selectors.flowBuilderPagePO.HTTP_FORM_SWITCH);
    test.step("*** Selected HTTP  as the adaptor ***", async ()=>{});

    test.step("*** Clicking on type of import ***", async ()=>{});

    await io.homePage.click(selectors.flowBuilderPagePO.SELECTED_IMPORT_RECORDS);
    test.step("*** Choosing type of import from dropdown ***", async ()=>{});
    await io.homePage.click(selectors.exportsPagePO.CREATE_FROM_SCRATCH);

    await io.homePage.loadingTime()
    await io.homePage.click(selectors.basePagePO.CONNECTION);
    await page.keyboard.type(conn);
    await io.homePage.clickByText(conn);
    test.step("*** Choosing the desired connection ***", async ()=>{});
    await io.homePage.click(selectors.basePagePO.SAVE);
    await io.homePage.loadingTime();
    var data = await page.locator(selectors.flowBuilderPagePO.SIMPLE_FORM_SWITCH);
    if(await data.isVisible()) {
      await io.homePage.click(selectors.basePagePO.HTTP_2DOT0);
    }
    test.step("*** Clicking on NEXT button ***", async ()=>{});
    await io.homePage.fillWebPage(selectors.flowBuilderPagePO.RENAME, "AutomationStandalone_HTTP_IMPORT");
    test.step("*** Renaming the PageProcessor ***", async ()=>{});
    await io.homePage.click(selectors.exportsPagePO.HTTP_METHOD);
    test.step("*** Http method clicking  ***", async ()=>{});
    await io.homePage.fillWebPage(selectors.exportsPagePO.COMPOSITE_METHOD, "composite");
    test.step("*** Selecting the desired Http method  ***", async ()=>{});
    await io.homePage.click(selectors.exportsPagePO.COMPOSITE_DROPDOWN);
    test.step("*** clicking on the composity type dropdown ***", async ()=>{});
    await io.homePage.click(selectors.importPagePO.IGNORE_UPDATE);
    test.step("*** clicking on the ignore and update existing type ***", async ()=>{});
    var res = await io.homePage.getTextFromElement(selectors.importPagePO.UPDATE_VERIFY, "Update existing records");
    await io.assert.expectToBeTrue(res, "");
  });
  test("@Zephyr-IO-T9689 @Env-All TC_C32144_Create new  & update existing records.", async ({io,page}, testInfo) => {
    await io.flowBuilder.clickCreateFlowButton();
    test.step("*** Create Flow Selected ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.flowBuilderPagePO.ADD_DESTINATION_OR_LOOKUP);
    test.step("*** Clicked on PageProcessor ***", async ()=>{});

    await io.homePage.click(selectors.flowBuilderPagePO.HTTP_FORM_SWITCH);
    test.step("*** Selected HTTP  as the adaptor ***", async ()=>{});

    test.step("*** Clicking on type of import ***", async ()=>{});

    await io.homePage.click(selectors.flowBuilderPagePO.SELECTED_IMPORT_RECORDS);
    test.step("*** Choosing type of import from dropdown ***", async ()=>{});
    await io.homePage.click(selectors.exportsPagePO.CREATE_FROM_SCRATCH);
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.basePagePO.CONNECTION);
    await page.keyboard.type(conn);
    await io.homePage.clickByText(conn);
    test.step("*** Choosing the desired connection ***", async ()=>{});
    await io.homePage.click(selectors.basePagePO.SAVE);
    await io.homePage.loadingTime();
    var data = await page.locator(selectors.flowBuilderPagePO.SIMPLE_FORM_SWITCH);
    if(await data.isVisible()) {
      await io.homePage.click(selectors.basePagePO.HTTP_2DOT0);
    }
    test.step("*** Clicking on NEXT button ***", async ()=>{});
    await io.homePage.fillWebPage(selectors.flowBuilderPagePO.RENAME, "AutomationStandalone_HTTP_IMPORT");
    test.step("*** Renaming the PageProcessor ***", async ()=>{});
    await io.homePage.click(selectors.exportsPagePO.HTTP_METHOD);
    test.step("*** Http method clicking  ***", async ()=>{});
    await io.homePage.fillWebPage(selectors.exportsPagePO.COMPOSITE_METHOD, "composite");
    test.step("*** Selecting the desired Http method  ***", async ()=>{});
    await io.homePage.click(selectors.exportsPagePO.COMPOSITE_DROPDOWN);
    test.step("*** clicking on the composity type dropdown ***", async ()=>{});
    await io.homePage.click(selectors.importPagePO.CREATE_UPDATE);
    test.step("*** clicking on the create  and update existing type ***", async ()=>{});
    var rest = await io.homePage.getTextFromElement(selectors.importPagePO.CREATE_VERIFY, "Create new records");
    await io.assert.expectToBeTrue(rest, "");
  });
});
