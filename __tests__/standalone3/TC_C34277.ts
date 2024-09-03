import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("TC_C34277", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Navigate to Home Page ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test("@Zephyr-IO-T1898 @Env-All TC_C34277", async ({io,page}, testInfo) => {
    await io.homePage.loadingTime();
    await io.homePage.goToMenu("Resources","Connections");
    test.step("*** clicked on connection button ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.basePagePO.ADD_NEW_RESOURCE);
    test.step("*** clicked on create connection ***", async ()=>{});
    await io.homePage.click(selectors.connectionsPagePO.ADP_CONNECTION);
    test.step("*** clicked onADP Workforce Now adaptor ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.click("//label[@for='settings.accounttype']/../button");
    test.step("*** Clicking on the question mark ***", async ()=>{});
    await io.homePage.loadingTime();
    const helptext = await page.locator(selectors.connectionsPagePO.CONNHELPTEXT).textContent();
    await io.assert.expectToContainValue("Select Production if your API endpoint starts with https://api.adp.com. Select UAT if it starts with https://uat-api.adp.com.Was this helpful?",String(helptext),  "");
    test.step("*** Verified the help text added against 'Account Type' field by clicking on ? symbol ***", async ()=>{});
    
  });
});
