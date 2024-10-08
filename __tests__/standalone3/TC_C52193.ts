import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import FTP from "@testData/STANDALONE/TC_C50651.json";

test.describe("TC_C52193", () => {
  test.afterEach(async ({io,page}, testInfo) => {
    test.step("*** Deleting resources ***", async ()=>{});
    await io.connections.deleteConnection(FTP.PostBody.name)
  });

  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Beginning of Test Suite ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });

  test("@Zephyr-IO-T23360 @Env-All TC_C52193", async ({io,page}, testInfo) => {
    test.step("** Getting response from post request ***", async () => { });
    await io.api.postCall("v1/connections", JSON.stringify(FTP.PostBody));
    test.step("** Creating Connection from post request ***", async () => { });
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    test.step("** Navigating to Home Page ***", async () => { });
    
    await io.homePage.loadingTime();
    await io.flowBuilder.clickCreateFlowButton();
    test.step("*** Clicked on Create Flow ***", async ()=>{});
    await io.homePage.click(selectors.flowBuilderPagePO.ADD_SOURCE);
    test.step("*** Clicked on Export ***", async ()=>{});
    await io.homePage.click(selectors.flowBuilderPagePO.HTTP_FORM_SWITCH);
    test.step("*** Selected HTTP as the adaptor ***", async ()=>{});
    await io.homePage.loadingTime();
    test.step("*** Clicking on create from scratch ***", async ()=>{});
    await io.flowBuilder.click(selectors.basePagePO.CREATE_FROM_SCRATCH);

    await io.homePage.loadingTime()
    await io.homePage.fillWebPage(selectors.connectionsPagePO.CONNECTIONS_DROPDOWN, FTP.PostBody.name);
    test.step("***Choosing the desired HTTP connection ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.fillWebPage(selectors.importPagePO.SELECTHTTPMETHOD, "GET");
    test.step("*** Selecting HTTP Method ***", async ()=>{});
    test.step("*** Clicking on Relative URI Handlebar ***", async ()=>{});
    await io.homePage.fillWebPage(selectors.exportsPagePO.HTTP_RELATIVE_URI, "/setup/category");
    await io.homePage.fillWebPage(selectors.exportsPagePO.EXPORT_TYPE_DROPDOWN, "all");
    test.step("*** Selecting the desired RecordType ***", async ()=>{});
    await io.homePage.click(selectors.importPagePO.CLICKPREVIEW);
    test.step("*** Clicking on Preview ***", async ()=>{});
    await io.homePage.loadingTime();
    var verify2 = await io.homePage.copyResourceData(selectors.importPagePO.PREVIEWDATA);
    await io.assert.expectNotToBeNull(verify2, "");
    test.step("*** Export Data Preview is happening ***", async ()=>{});

    await io.homePage.click(selectors.basePagePO.CLOSE);
    test.step("*** Clicking on Close ***", async ()=>{});
    await io.homePage.click(selectors.basePagePO.DISCARD_CHANGES);
    test.step("*** Clicking on Discard Changes ***", async ()=>{});
  });
});
