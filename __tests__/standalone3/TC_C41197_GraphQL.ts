import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";


test.describe("TC_C41197_GraphQLConn_verify_HTTP_Method", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Navigate to Home Page ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test("@Zephyr-IO-T9956 @Env-All TC_C41197_GraphQLConn_Verifying_the_GET_And_POST_Method", async ({io,page}, testInfo) => {
    await io.homePage.loadingTime();
    await io.homePage.goToMenu("Resources","Connections");
    test.step("*** clicked on connection button ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.basePagePO.ADD_NEW_RESOURCE);
    test.step("*** clicked on create connection ***", async ()=>{});

    await io.homePage.click(selectors.connectionsPagePO.GRAPHQL_CONNECTOR);
    test.step("*** clicked on Graphql adaptor ***", async ()=>{});
    await io.homePage.click(selectors.connectionsPagePO.PING_METHOD);
    test.step("*** clicked on HTTP Method drop down ***", async ()=>{});
    var resp = await io.homePage.isVisible(selectors.importPagePO.HTTPPOSTMETHOD);
    await io.assert.expectToBeTrue(resp, "");
    test.step("*** Verifying that the on POST Method  is displaying or not  ***", async ()=>{});
    await io.homePage.fillWebPage(selectors.importPagePO.HTTPPOSTMETHOD, "POST");
    test.step("*** Selecting the POST Method   ***", async ()=>{});
    await io.homePage.click(selectors.connectionsPagePO.PING_METHOD);
    test.step("*** clicked on HTTP Method drop down ***", async ()=>{});
    var respt = await io.homePage.isVisible(selectors.exportsPagePO.HTTP_METHOD_GET);
    await io.assert.expectToBeTrue(respt, "");
    test.step("*** Verifying that the on GET  Method  is displaying ***", async ()=>{});
    await io.homePage.fillWebPage(selectors.exportsPagePO.HTTP_METHOD_GET, "GET");
    var respet = await io.homePage.isVisible(selectors.importPagePO.GET_METHOD_VERIFY);
    await io.assert.expectToBeTrue(respet, "");
    
    test.step("*** Verifying that the on GET  Method  is displaying or not  ***", async ()=>{});
  });
});
