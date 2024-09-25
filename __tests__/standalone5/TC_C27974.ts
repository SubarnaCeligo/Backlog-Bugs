import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import HTTP from "@testData/STANDALONE/HTTP_connection.json";

test.describe("HTTP_standalone_import_label_Test_cases", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Beginning of Test Suite ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test("@Zephyr-IO-T9946 @Env-All TC_C27974_verify the label Where would you like to transfer from.", async ({io,page}, testInfo) => {
    await io.flowBuilder.clickCreateFlowButton();
    test.step("*** Create Flow Selected ***", async ()=>{});

    await io.homePage.click(selectors.flowBuilderPagePO.ADD_DESTINATION_OR_LOOKUP);
    test.step("*** Clicked on PageProcessor ***", async ()=>{});

    await io.homePage.click(selectors.flowBuilderPagePO.HTTP_FORM_SWITCH);
    test.step("*** Selected HTTP  as the adaptor ***", async ()=>{});

    test.step("*** Clicking on type of import ***", async ()=>{});

    await io.homePage.click(selectors.connectionsPagePO.TRANSFER_FILES);
    await io.homePage.click(selectors.exportsPagePO.CREATE_FROM_SCRATCH)
    test.step("*** Choosing the transfer files into destination ***", async ()=>{});
    var conn = HTTP[0]["connectionId"];

    await io.homePage.loadingTime();
    await io.homePage.click(selectors.basePagePO.CONNECTION);
    await page.keyboard.type(conn);
    await io.homePage.clickByText(conn);
    await io.homePage.loadingTime();

    test.step("*** Choosing the desired connection ***", async ()=>{});
    await io.homePage.loadingTime();

    var data = await page.locator(selectors.flowBuilderPagePO.SIMPLE_FORM_SWITCH);
    if(await data.isVisible()) {
      await io.homePage.click(selectors.basePagePO.HTTP_2DOT0);
    }
    
    test.step("*** Clicking on NEXT button ***", async ()=>{});
    await io.homePage.fillWebPage(selectors.flowBuilderPagePO.RENAME, "AutomationStandalone_HTTP_IMPORT");
    test.step("*** Renaming the PageProcessor ***", async ()=>{});
    await io.homePage.click(selectors.exportsPagePO.NON_STANDARD_API_TAB);
    test.step("*** clicking on non standard Api ***", async ()=>{});
    
    await io.assert.verifyElementContainsText(selectors.exportsPagePO.NON_STANDARD_API_TAB, "Non-standard API response patterns")
    test.step("*** Verifying whether the Non-standard API response pattern is displayed  ***", async ()=>{});
    await io.assert.verifyElementContainsText(selectors.flowBuilderPagePO.PATH_TO_BODY, "Path to id field in HTTP response body");
    
    var res = await io.homePage.isVisible(selectors.importPagePO.HELP_ID);
    await io.assert.expectToBeTrue(res, '');
  });
});
