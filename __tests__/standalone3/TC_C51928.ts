import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import HTTP from "@testData/STANDALONE/TC_C51294.json";

test.describe("TC_C51928", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Beginning of Test Suite ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test.afterEach(async ({io,page}, testInfo) => {
    //*Create Deleted Connection
    test.step("*** Deleting Connection ***", async ()=>{});
    await io.connections.deleteConnection(HTTP.importJSON.name);
  });
  test("@Zephyr-IO-T23358 @Env-All TC_C51928", async ({io,page}, testInfo) => {
    test.step("*** Beginning of Test ***", async ()=>{});
    await io.connections.createConnectionViaAPI(HTTP.importJSON);
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();

    //Export Preview
    await io.flowBuilder.clickCreateFlowButton();
    test.step("*** Clicked on Create Flow ***", async ()=>{});
    await io.homePage.click(selectors.flowBuilderPagePO.ADD_SOURCE);
    test.step("*** Clicked on Export ***", async ()=>{});
    await io.homePage.click(selectors.flowBuilderPagePO.HTTP_FORM_SWITCH);
    test.step("*** Selected HTTP as the adaptor ***", async ()=>{});
    test.step("*** Clicking on create from scratch ***", async ()=>{});
    await io.flowBuilder.click(selectors.basePagePO.CREATE_FROM_SCRATCH);
    await io.homePage.loadingTime()

    await io.homePage.fillWebPage(selectors.connectionsPagePO.CONNECTIONS_DROPDOWN, HTTP.importJSON.name);
    await io.homePage.loadingTime()
    test.step("***Choosing the desired HTTP connection ***", async ()=>{});
    await io.homePage.fillWebPage(selectors.importPagePO.SELECTHTTPMETHOD, "GET");
    test.step("*** Selecting HTTP Method ***", async ()=>{});
    test.step("*** Clicking on Relative URI Handlebar ***", async ()=>{});
    await io.homePage.isVisible(selectors.importPagePO.HTTP_RELATIVEURI);
    await io.homePage.click(selectors.importPagePO.HTTP_RELATIVEURI);
    await io.homePage.isPageReady();
    await io.homePage.fillWebPage(selectors.flowBuilderPagePO.HTTPREQUSTBODY, '{{substring "{{{aws4 connection.http.encrypted.accessKey connection.http.encrypted.secretKey connection.http.encrypted.sessionToken "us-east-1" "execute-api"}}}" 1 66}}');
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.flowBuilderPagePO.PREVIEW);
    test.step("*** Clicking on Preview ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    var result = await io.homePage.getText(selectors.mappings.MAPPER2DOT0PO.PREVIEWRESULT);
    await io.assert.expectToContainValue("The%20output%20of%20this%20handlebar%20expression%20uses", String(result), "");
    test.step("*** Verified Message ***", async ()=>{});

    await io.homePage.click(selectors.basePagePO.CLOSE_RIGHT_DRAWER);
    await io.homePage.click(selectors.basePagePO.DISCARD_CHANGES);
    test.step("*** Clicking on Close ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.click(selectors.importPagePO.IMPORT_CLOSE_DRAWER);
    test.step("*** Clicking on Close ***", async ()=>{});
    await io.homePage.click(selectors.basePagePO.DISCARD_CHANGES);
    test.step("*** Clicking on Discard Changes ***", async ()=>{});

    //Import Preview
    await io.homePage.isPageReady();
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
    await io.homePage.click(selectors.importPagePO.HTTP_RELATIVEURI);
    await io.homePage.isPageReady();
    await io.homePage.fillWebPage(selectors.flowBuilderPagePO.HTTPREQUSTBODY, '{{substring "{{{aws4 connection.http.encrypted.accessKey connection.http.encrypted.secretKey connection.http.encrypted.sessionToken "us-east-1" "execute-api"}}}" 1 66}}');
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.flowBuilderPagePO.PREVIEW);
    test.step("*** Clicking on Preview ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    var result4 = await io.homePage.getText(selectors.mappings.MAPPER2DOT0PO.PREVIEWRESULT);
    await io.assert.expectToContainValue("The%20output%20of%20this%20handlebar%20expression%20uses", String(result4), "");
    test.step("*** Verified Message ***", async ()=>{});
    await io.homePage.click(selectors.basePagePO.CLOSE_RIGHT_DRAWER);
    await io.homePage.click(selectors.basePagePO.DISCARD_CHANGES);
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.click(selectors.importPagePO.IMPORT_CLOSE_DRAWER);
    test.step("*** Clicking on Close ***", async ()=>{});
    await io.homePage.click(selectors.basePagePO.DISCARD_CHANGES);
    test.step("*** Clicking on Discard Changes ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    test.step(" Navigating to Home Page ", async ()=>{});
  });
});
