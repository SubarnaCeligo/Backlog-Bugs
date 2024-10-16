
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import FTP from "@testData/STANDALONE/TC_C33416_Verify_TraceKey_PP_Export_output_Presavepage_Hook.json";

test.describe("TC_C27541 Connection' Object in Sample Data Does Not Include 'HTTP' Sub-object", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Navigate to Home Page ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });

  test("@Zephyr-IO-T5466 @Env-All TC_C27541 Connection' Object in Sample Data Does Not Include 'HTTP' Sub-object", async ({io,page}, testInfo) => {
    await io.flowBuilder.clickCreateFlowButton();

    test.step("*** Clicking on Import button ***", async ()=>{});
    await io.homePage.click(selectors.flowBuilderPagePO.ADD_DESTINATION_OR_LOOKUP);
    await io.homePage.click(selectors.flowBuilderPagePO.HTTP_FORM_SWITCH);
    test.step("*** Selected HTTP as the adaptor ***", async ()=>{});
    test.step("*** Clicking on what would you like to do ", async ()=>{});

    test.step("*** Clicking on Import records ***", async ()=>{});
    await io.homePage.click(selectors.flowBuilderPagePO.SELECTED_IMPORT_RECORDS);
    await io.homePage.click(selectors.exportsPagePO.CREATE_FROM_SCRATCH);
    await io.homePage.loadingTime();
    const connection = "HTTP ZENDESK CONNECTION"
    await io.homePage.click(selectors.basePagePO.CONNECTION);
    await page.keyboard.type(connection);
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.connectionsPagePO.CONNECTIONDROP0);
    await io.homePage.loadingTime();

    test.step("***Choosing the desired HTTP connection ***", async ()=>{});
    await io.homePage.click(selectors.basePagePO.SAVE);
    test.step("*** Clicking on NEXT button ***", async ()=>{});
    test.step("*** Entering Name ***", async ()=>{});
    await io.homePage.fillWebPage(selectors.basePagePO.ADD_NAME, "AutomationStandalone_Http export");
    test.step("*** Selecting HTTP Method ***", async ()=>{});
    await io.homePage.fillWebPage(selectors.importPagePO.SELECTHTTPMETHOD, "POST");

    test.step("*** Entering data into the Relative Uri ***", async ()=>{});
    await io.homePage.fillWebPage(selectors.exportsPagePO.HTTP_RELATIVEURI, "/tickets/81.json");

    test.step("*** Clicking on Relative URI Handlebar ***", async ()=>{});
    await io.homePage.clickButtonByIndex(selectors.exportsPagePO.HTTP_RELATIVEURI, 1);

    await io.homePage.loadingTime();
    await io.homePage.isPageReady();

    test.step("*** Verifying Connection object in sample data ***", async ()=>{});
    var data = await io.homePage.copyResourceData(selectors.mappings.MAPPER2DOT0PO.PREVIEWRESOURCE);
    await io.assert.expectToContainValue("connection",data,  "");
    await io.assert.expectToContainValue("http",data,  "");
    await io.assert.expectToContainValue( "unencrypted",data,  "");
    await io.assert.expectToContainValue( "encrypted", data, "");
  });
});
