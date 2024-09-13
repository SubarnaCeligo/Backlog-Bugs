import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("TC_C41240_GraphQLConn_mode need to verify", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Navigate to Home Page ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test("@Zephyr-IO-T9957 @Env-All TC_C41240_GraphQLConn_Mode_validation", async ({io,page}, testInfo) => {
    await io.homePage.loadingTime();
    await io.homePage.goToMenu("Resources","Connections");
    test.step("*** clicked on connection button ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.basePagePO.ADD_NEW_RESOURCE);
    test.step("*** clicked on create connection ***", async ()=>{});

    await io.homePage.click(selectors.connectionsPagePO.GRAPHQL_CONNECTOR);
    test.step("*** clicked on Graphql adaptor ***", async ()=>{});
    await io.homePage.click(selectors.flowBuilderPagePO.MODE_CLOUD);
    
    test.step("*** clicked on Cloud mode  ***", async ()=>{});
    var mode = await io.homePage.isVisible(selectors.flowBuilderPagePO.MODE_CLOUD);
    await io.assert.expectToBeTrue(mode, "");
    test.step("*** Checking that the cloud mode is displaying or not  ***", async ()=>{});
    await io.homePage.click(selectors.flowBuilderPagePO.ON_PREMISE_MODE);
   
    test.step("*** clicked on on premise mode  ***", async ()=>{});
    var resp = await io.homePage.isVisible(selectors.flowBuilderPagePO.ON_PREMISE_MODE);
    await io.assert.expectToBeTrue(resp, "");
    test.step("*** Checking that the on Premise mode is displaying or not  ***", async ()=>{});
  });
});
