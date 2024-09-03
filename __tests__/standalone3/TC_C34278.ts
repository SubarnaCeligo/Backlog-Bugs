import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("TC_C34278", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Navigate to Home Page ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test("@Zephyr-IO-T1899 @Env-All TC_C34278", async ({io,page}, testInfo) => {
    await io.homePage.loadingTime();
    await io.homePage.goToMenu("Resources","Connections");
    test.step("*** clicked on connection button ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.basePagePO.ADD_NEW_RESOURCE);
    test.step("*** clicked on create connection ***", async ()=>{});
    await io.homePage.click(selectors.connectionsPagePO.ADP_CONNECTION);
    test.step("*** clicked onADP Workforce Now adaptor ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.flowBuilderPagePO.FULFILLMENTICLIENTHELPTEXT);
    await io.homePage.loadingTime();
    test.step("*** Clicking on the question mark ***", async ()=>{});
    const helptext = await page.locator(selectors.connectionsPagePO.CONNHELPTEXT).textContent();
    await io.homePage.click(selectors.connectionsPagePO.HELPTEXT_CLOSE)
    await io.homePage.loadingTime();
    await io.assert.expectToContainValue( "Generate a CSR file and send it to your ADP representative to receive the Client ID and client secret to enter for your connection",String(helptext), "");
    test.step("*** Verified the help text added against 'Client id' field by clicking on ? symbol ***", async ()=>{});
    
    await io.assert.verifyElementAttributeContainsText(
      selectors.connectionsPagePO.CLIENT_ID_CANTFIND_LINK,
      'href',
      'https://docs.celigo.com/hc/en-us/articles/360038433932#Client-Info');

    await io.homePage.click(selectors.basePagePO.CLOSE);
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    test.step("*** Navigate to Home Page ***", async ()=>{});
  });
});
