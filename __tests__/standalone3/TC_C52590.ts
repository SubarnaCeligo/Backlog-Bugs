import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("TC_C52590", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Navigate to Home Page ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test("@Zephyr-IO-T17182 @Env-All TC_C52590", async ({io,page}, testInfo) => {
    await io.homePage.loadingTime();
    await io.homePage.goToMenu("Resources","Connections");
    test.step("*** clicked on connection button ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.basePagePO.ADD_NEW_RESOURCE);
    test.step("*** clicked on create connection ***", async ()=>{});
    await io.homePage.click(selectors.connectionsPagePO.THREEPL_CONNECTION);
    test.step("*** clicked on 3pl adaptor ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.basePagePO.HTTP_2DOT0);
    await io.homePage.loadingTime();
    test.step("*** clicked on HTTP Toggle button ***", async ()=>{});
    await io.homePage.click(selectors.connectionsPagePO.SLACK_AUTH_TYPE);
    test.step("*** clicked on Auth type dropdown ***", async ()=>{});
    await io.homePage.loadingTime();
    test.step("*** Validate the Basic and OAuth types present in auth type dropdown ***", async ()=>{});
    const exist = await io.homePage.isVisible(selectors.connectionsPagePO.BASIC);
    await io.assert.expectToBeTrue(exist, "");
    const existOAuth = await io.homePage.isVisible(selectors.connectionsPagePO.OAUTH);
    await io.assert.expectToBeTrue(existOAuth, "");
  });
});
