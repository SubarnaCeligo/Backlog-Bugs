import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("TC_C41043_GraphQLConn_UI", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Navigate to Home Page ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test("@Zephyr-IO-T9953 @Env-QA TC_C41043_GraphQLConn_UI", async ({io,page}, testInfo) => {
    await io.homePage.loadingTime();
    await io.homePage.goToMenu("Resources","Connections");
    test.step("*** clicked on connection button ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.basePagePO.ADD_NEW_RESOURCE);
    await io.homePage.loadingTime();
    test.step("*** clicked on create connection ***", async ()=>{});
    var name = await io.homePage.getText(selectors.basePagePO.UNIVERSAL_APPLICATION_HEADING);
    expect(name).toBe("Universal connectors");

    var list = await io.homePage.getText(selectors.basePagePO.UNIVERSAL_CONNECTORS_LIST);
    await io.assert.expectToContainValue("\"FTP\",\"GraphQL\",\"HTTP\"",JSON.stringify(list), "");
    test.step("*** clicked on Graphql adaptor and verified that GrapQL is in universal connectors and above HTTP and below FTP ***", async ()=>{});
  });
});
