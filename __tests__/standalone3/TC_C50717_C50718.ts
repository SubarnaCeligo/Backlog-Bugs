import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import HTTP from "@testData/STANDALONE/TC_C50717.json";

test.describe("TC_C50717_C50718", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Beginning of Test Suite ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test.afterEach(async ({io,page}, testInfo) => {
    //*Create Deleted Connection
    test.step("*** Deleting Connection ***", async ()=>{});
    await io.connections.deleteConnection( HTTP.importJSON.name);
  });
  test("@Zephyr-IO-T23354 @Zephyr-IO-T23346 @Env-All TC_C50717_C50718", async ({io,page}, testInfo) => {
    test.step("*** Beginning of Test ***", async ()=>{});
    await io.connections.createConnectionViaAPI(HTTP.importJSON);
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.flowBuilder.clickCreateFlowButton();
    test.step("*** Clicked on Create Flow ***", async ()=>{});
    await io.homePage.click(selectors.flowBuilderPagePO.ADD_SOURCE);
    test.step("*** Clicked on Export ***", async ()=>{});
    await io.homePage.click(selectors.flowBuilderPagePO.HTTP_FORM_SWITCH);
    test.step("*** Clicking on create from scratch ***", async ()=>{});
    await io.flowBuilder.click(selectors.basePagePO.CREATE_FROM_SCRATCH);
    await io.homePage.loadingTime();

    await io.homePage.fillWebPage(selectors.connectionsPagePO.CONNECTIONS_DROPDOWN, HTTP.importJSON.name);
    test.step("***Choosing the desired HTTP connection ***", async ()=>{});
    await io.homePage.loadingTime()
    await io.homePage.fillWebPage(selectors.importPagePO.SELECTHTTPMETHOD, "GET");
    test.step("*** Selecting HTTP Method ***", async ()=>{});
    test.step("*** Clicking on Relative URI Handlebar ***", async ()=>{});
    await io.homePage.fillWebPage(selectors.exportsPagePO.HTTP_RELATIVE_URI, "/setup/category");
    await io.homePage.fillWebPage(selectors.exportsPagePO.EXPORT_TYPE_DROPDOWN, "all");
    test.step("*** Selecting the desired RecordType ***", async ()=>{});
    await io.homePage.click(selectors.importPagePO.CLICKPREVIEW);
    test.step("*** Clicking on Preview ***", async ()=>{});
    await io.homePage.isPageReady();
    var preview = await io.homePage.getText(selectors.importPagePO.PREVIEWDATA);
    await io.assert.expectToContainValue("Failed to generate request headers from template:",String(preview),"")  
    await io.assert.expectToContainValue("handlebars_template_parse_error",String(preview),"");
    await io.assert.expectToContainValue("\\\"id_token\\\" not defined in the model",String(preview),"")
    test.step("*** Verified Error should be thrown in HTTP Response ***", async ()=>{});
    test.step("*** Verified Preview call should fail ***", async ()=>{});

    await io.homePage.click(selectors.basePagePO.CLOSE);
    test.step("*** Clicking on Close ***", async ()=>{});
    await io.homePage.click(selectors.basePagePO.DISCARD_CHANGES);
    test.step("*** Clicking on Discard Changes ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    test.step(" Navigating to Home Page ", async ()=>{});
  });
});
