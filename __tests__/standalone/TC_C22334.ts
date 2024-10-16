
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt ,randomNumber} from "@celigo/aut-utilities";


test.describe("TC_C22334", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Navigate to Home Page ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test("@Env-All @Zephyr-IO-T4629 TC_C22334", async ({io,page}, testInfo) => {
    await io.homePage.loadingTime();
    await io.homePage.goToMenu("Resources","Connections");
    test.step("*** clicked on connection button", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.fillWebPage(selectors.flowBuilderPagePO.SEARCHBUTTON, "FTP");
    await io.homePage.loadingTime();
    test.step("*** Searching for FTP connection  ***", async ()=>{});
    await io.homePage.clickButtonByIndex(selectors.flowBuilderPagePO.ACTION_WDIO, 1);
    await io.homePage.click(selectors.integrationPagePO.OPENACTIONSMENU);
    test.step("*** Clicking action dropdown in ftp connection  ***", async ()=>{});
    var txt = await io.homePage.getTextFromElement(selectors.flowBuilderPagePO.TRADINGPARTNER, "trading partner");
    await io.assert.expectToBeTrue(txt, "");
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    test.step("*** Navigate to Home page  ***", async ()=>{});
  });
});
