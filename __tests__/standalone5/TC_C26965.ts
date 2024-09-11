
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt ,randomNumber} from "@celigo/aut-utilities";


test.describe("TC_C26965_Walmart_connection_type.", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Navigate to Home Page ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test("@Zephyr-IO-T4478 @Env-All TC_C26965_Walmart_connection_Error _should_thrown ", async ({io,page}, testInfo) => {
    await io.homePage.loadingTime();
    await io.homePage.goToMenu("Resources","Connections");
    test.step("*** clicked on connection button ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.basePagePO.ADD_NEW_RESOURCE);
    test.step("*** clicked on create connection ***", async ()=>{});
    await page.keyboard.type("Walmart");
    await io.homePage.click(selectors.flowBuilderPagePO.WALMART);
    await io.homePage.loadingTime();
    test.step("*** clicked on Walmart   adaptor ***", async ()=>{});
    await io.homePage.fillWebPage(selectors.flowBuilderPagePO.RENAME, "Walmart_Connection");
    await io.homePage.click(selectors.connectionsPagePO.WALMART_CANADA_IMAGE);
    test.step("*** Naming the Walmart Connection  ***", async ()=>{});
    await io.homePage.fillWebPage(selectors.flowBuilderPagePO.CONSUMERID, "6dcdfcf2-73ae-4fa7-b353-74a2ff5e7353");
    test.step("*** Naming the Consumer Id  Field   ***", async ()=>{});
    await io.homePage.fillWebPage(selectors.flowBuilderPagePO.CONSUMER_KEY, "random-text");
    test.step("*** Naming the Consumer key   Field   ***", async ()=>{});
    await io.homePage.fillWebPage(selectors.connectionsPagePO.HTTP_UNENCRYPTED_LOCALEID, "en_CA");
    await io.homePage.click(selectors.basePagePO.TEST_CONNECTION);
    test.step("*** Clicking on Test Connection  ***", async ()=>{});
    await io.homePage.isPageReady();
    var result = await io.homePage.getTextFromElement(selectors.basePagePO.NOTIFICTION_BAR, "Your test was not successful. Check your information and try again");
    await io.assert.expectToBeTrue(result, "");
  });
});