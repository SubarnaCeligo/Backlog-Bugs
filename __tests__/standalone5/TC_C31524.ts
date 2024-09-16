import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import HTTP from "@testData/STANDALONE/TC_C32175.json";

test.describe("TC_C31524_MFNImport_With_MessageID_Field&Update", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Beginning of Test Suite ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });

  test("@Zephyr-IO-T9684 @Env-All TC_C31524_MFNImport_With_MessageID_Field&Update", async ({io,page}, testInfo) => {
    await io.homePage.loadingTime();
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
    var conn = HTTP[0]["connectionId"];
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
    await io.homePage.loadingTime();
    test.step("*** Clicking on NEXT button ***", async ()=>{});
    await io.homePage.fillWebPage(selectors.flowBuilderPagePO.RENAME, "AutomationStandalone_HTTP_IMPORT_COMPOSITE");
    test.step("*** Renaming the PageProcessor ***", async ()=>{});
    await io.homePage.click(selectors.exportsPagePO.HTTP_METHOD);
    test.step("*** Http method clicking  ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.fillWebPage(selectors.exportsPagePO.COMPOSITE_METHOD, "composite");
    test.step("*** Selecting the desired Http method  ***", async ()=>{});

    await io.homePage.click(selectors.exportsPagePO.COMPOSITE_DROPDOWN);
    test.step("*** clicking on the composity type dropdown ***", async ()=>{});
    await io.homePage.click(selectors.importPagePO.IGNORE_UPDATE);
    test.step("*** clicking on the Ignore new  and update existing type ***", async ()=>{});

    var rest = await io.homePage.getTextFromElement(selectors.importPagePO.IGNORE_EXISTING, "Identify existing records");

    await expect(rest && io.assert.checkElementState( selectors.importPagePO.IGNORE_EXISTING, "isVisible")).toBeTruthy();
    test.step("*** The header is displayed as Identify existing records ***", async ()=>{});
    test.step("*** End of Test Suite ***", async ()=>{});
  });
});
