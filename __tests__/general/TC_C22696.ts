import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt ,randomNumber} from "@celigo/aut-utilities";


test.describe("TC_C22696", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Beginning of Test Suite ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.homePagePO.PRODUCTION_WDIO);
  });
  test("@Zephyr-IO-T3082 @Env-All  TC_C22696", async ({io,page}, testInfo) => {
    //*Create Connection
    await io.homePage.navigateTo(io.connectorUrl + "connections");
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.click(selectors.basePagePO.ADD_NEW_RESOURCE);
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.connectionsPagePO.FTP_CONNECTION);
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.basePagePO.LINK);
    await io.homePage.loadingTime();
    await io.homePage.switchWindowByUrlOrTitle("https://docs.celigo.com/hc/en-us/articles/360045263152-Set-up-an-FTP-connection-");
    await io.homePage.loadingTime();
    let page1 = await io.homePage.switchWindow()
    await io.homePage.loadingTime()
    const url = await page1.url();
    await io.homePage.loadingTime();
    await io.assert.expectToContainValue(url, "https://docs.celigo.com/hc/en-us/articles/360045263152-Set-up-an-FTP-connection-", "");
    
    await io.homePage.click(selectors.basePagePO.CLOSE);
  });
});
