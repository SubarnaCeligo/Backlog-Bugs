
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt ,randomNumber} from "@celigo/aut-utilities";
import HTTP from "@testData/STANDALONE/TC_C22695.json";

test.describe("TC_C22695", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Navigate to Home Page ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test("@Env-All @Zephyr-IO-T4636 TC_C22695", async ({io,page}, testInfo) => {
    await io.homePage.loadingTime();
    await io.homePage.goToMenu("Resources","Connections");
    test.step("*** clicked on connection button", async ()=>{});
    await io.homePage.loadingTime();
    test.step("*** Opening Connection via ConnectionID ***", async ()=>{});
    
    await (await page.locator(selectors.flowBuilderPagePO.SEARCHBUTTON)).isVisible();
    await io.homePage.fillWebPage(selectors.flowBuilderPagePO.SEARCHBUTTON, "http");
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.integrationPagePO.OPENACTIONSMENU);
    await io.homePage.click(selectors.integrationPagePO.EDIT);
    
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();

    let result1 = await io.homePage.getText(selectors.connectionsPagePO.HTTPCONNECTIONGUIDELINK);
    await io.assert.expectToBeValue(String(result1), "Connection guide", "");

    let result2 = await io.homePage.getElement(selectors.marketplacePagePO.HTTP);
    expect(result2).toBeDefined();
    
    test.step(" *** Verify that  connection form with respective connection guide link is shown *** ", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    test.step("*** Navigating to Home Page   ***", async ()=>{});
  });
});
