import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("TC_C40385_Verify_edit_mock", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Beginning of Test Suite ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test("@Zephyr-IO-T5911 @Env-All TC_C40385_Verify_edit_mock", async ({io,page}, testInfo) => {
    await io.homePage.loadingTime();
    await io.homePage.goToMenu("Resources","Imports");
    test.step("*** clicked on connection button ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.integrationPagePO.ADDNEWRESOURCE);
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.flowBuilderPagePO.HTTP_FORM_SWITCH);
    test.step("*** Selected HTTP  as the adaptor ***", async ()=>{});
    test.step("*** Choosing type of import from dropdown ***", async ()=>{});
     
    await io.homePage.fillWebPage(selectors.connectionsPagePO.CONNECTIONS_DROPDOWN, "HTTP ZENDESK CONNECTION");
    test.step("*** Choosing the desired connection ***", async ()=>{});
    await io.homePage.fillWebPage(selectors.flowBuilderPagePO.RENAME, "C40385_AutomationStandalone_HTTP_IMPORT");
    test.step("*** Renaming the PageProcessor ***", async ()=>{});
    await io.homePage.click(selectors.basePagePO.SAVE);
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    var data = await page.locator(selectors.flowBuilderPagePO.SIMPLE_FORM_SWITCH);
    if(await data.isVisible()) {
      await io.homePage.click(selectors.basePagePO.HTTP_2DOT0);
    }
    test.step("*** Clicking on NEXT button ***", async ()=>{});

    await io.homePage.click(selectors.exportsPagePO.HTTP_METHOD);
    test.step("*** Http method clicking  ***", async ()=>{});
    await io.homePage.fillWebPage(selectors.importPagePO.HTTPPOSTMETHOD, "POST");
    test.step("*** Selecting the desired Http method  ***", async ()=>{});
    await io.homePage.fillWebPage(selectors.exportsPagePO.HTTP_RELATIVEURI, "/Users");
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.flowBranchingPO.EDIT_MOCK_INPUT);
    test.step("*** Click on Edit mock input  ***", async ()=>{});
    await io.homePage.fillWebPage(selectors.mappings.MAPPER2DOT0PO.PREVIEWRESOURCE, '{"name":"ipass"}');
    test.step("*** added the  json   ***", async ()=>{});
    var resul = await io.homePage.isVisible(selectors.mappings.MAPPER2DOT0PO.PREVIEWRESOURCE);
    await io.assert.expectToBeTrue(resul, "");
    test.step("*** Verified Edit mock input allows users to modify the input data for Page Processors.. ***", async ()=>{});
    await io.homePage.click(selectors.basePagePO.CLOSE_RIGHT_DRAWER);
    await io.homePage.click(selectors.flowBuilderPagePO.CLOSING_IMPORT);
    test.step("*** Clicked on close drawer   ***", async ()=>{});
    await io.homePage.click(selectors.basePagePO.DISCARD_CHANGES);
    test.step("*** Clicked on Discard changes  ***", async ()=>{});
  });
});
