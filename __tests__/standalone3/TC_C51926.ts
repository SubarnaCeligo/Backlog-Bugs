import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import TC from "@testData/STANDALONE/OrderHive_Conn.json";
import HTTP from "@testData/STANDALONE/TC_C51294.json";

test.describe("TC_C51926", () => {
  test.afterEach(async ({io,page}, testInfo) => {
    //*Create Deleted Connection
    test.step("*** Deleting Connection ***", async ()=>{});
    await io.connections.deleteConnection(HTTP.importJSON.name);
  });
  test("@Zephyr-IO-T23356 @Env-All TC_C51926", async ({io,page}, testInfo) => {
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.connections.createConnectionViaAPI(HTTP.importJSON);

    await io.homePage.isPageReady();
    await io.homePage.loadingTime();
    await io.flowBuilder.clickCreateFlowButton();
    test.step("*** Clicked on Create Flow ***", async ()=>{});
    await io.homePage.loadingTime();

    await io.homePage.click(selectors.flowBuilderPagePO.ADD_DESTINATION_OR_LOOKUP);
    test.step("*** Clicked on Import ***", async ()=>{});
    await io.homePage.click(selectors.flowBuilderPagePO.HTTP_FORM_SWITCH);
    test.step("*** Selected HTTP as the adaptor ***", async ()=>{});
    await io.homePage.click(selectors.flowBuilderPagePO.SELECTED_IMPORT_RECORDS);
    test.step("*** Clicking on create from scratch ***", async ()=>{});
    await io.flowBuilder.click(selectors.basePagePO.CREATE_FROM_SCRATCH);
    await io.homePage.loadingTime()

    await io.homePage.fillWebPage(selectors.connectionsPagePO.CONNECTIONS_DROPDOWN, HTTP.importJSON.name);
    await io.homePage.loadingTime()
    await io.homePage.isPageReady();
    await io.homePage.fillWebPage(selectors.importPagePO.SELECTHTTPMETHOD, "POST");
    test.step("*** Selecting HTTP Method ***", async ()=>{});

    test.step("*** Clicking on Relative URI Handlebar ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.importPagePO.HTTP_RELATIVEURI);
    await io.homePage.fillWebPage(selectors.flowBuilderPagePO.HTTPREQUSTBODY, `{"id":"{{substring "{{{aws4 connection.http.encrypted.access_key_id connection.http.encrypted.secret_key connection.http.encrypted.session_token 'us-east-1' 'execute-api'}}}" "0" "109"}}"}`);
    await io.homePage.isPageReady();
    await io.homePage.click(selectors.flowBuilderPagePO.PREVIEW);
    test.step("*** Clicking on Preview ***", async ()=>{});
    await io.homePage.isPageReady();
    var preview = await io.homePage.getText(selectors.mappings.MAPPER2DOT0PO.PREVIEWRESULT);
    await io.assert.expectToContainValue("{\"id\":\"%3CThe%20output%20of%20this%20handlebar%20express", String(preview).trim(), "");
    await io.assert.expectToContainValue("%20Check%20import%20preview%20for%20the%20right%20outp", String(preview).trim(), "");

    test.step("*** Verified Message ***", async ()=>{});
    await io.homePage.click(selectors.basePagePO.CLOSE_RIGHT_DRAWER);
    await io.homePage.click(selectors.basePagePO.DISCARD_CHANGES);
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.click(selectors.importPagePO.IMPORT_CLOSE_DRAWER);
    test.step("*** Clicking on Close ***", async ()=>{});
    await io.homePage.click(selectors.basePagePO.DISCARD_CHANGES);
    test.step("*** Clicking on Discard Changes ***", async ()=>{});
  });
});
