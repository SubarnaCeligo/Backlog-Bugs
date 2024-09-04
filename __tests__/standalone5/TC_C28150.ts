
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt ,randomNumber} from "@celigo/aut-utilities";

test.describe("TC_C28150_HTTP_connection_type.", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Navigate to Home Page ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test("@Env-All @Zephyr-IO-T4520 TC_C28150_HTTP_connection_type_setting ", async ({io,page}, testInfo) => {
    await io.homePage.loadingTime();
    await io.homePage.goToMenu("Resources","Connections");
    test.step("*** clicked on connection button ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.basePagePO.ADD_NEW_RESOURCE);
    await io.homePage.loadingTime();
    test.step("*** clicked on REST  Connection  ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.basePagePO.HTTP_2DOT0);
    test.step("*** clicked on HTTP  Connection  ***", async ()=>{});
    await io.homePage.click(selectors.connectionsPagePO.HOW_TO_TESTCONNECTION);
    test.step("*** Clicking on How to test this connection  ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.clickButtonByIndex(selectors.flowBuilderPagePO.RELATIVEURI, 1);
    test.step("*** Clicking on AFE field   ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.mappings.MAPPER2DOT0PO.PREVIEWRESOURCE);
    test.step("*** Clicking on Connection setting   ***", async ()=>{});

    var result = await io.homePage.isVisible(selectors.mappings.MAPPER2DOT0PO.PREVIEWRESOURCE);
    await io.assert.expectToBeTrue(result, "");
    test.step("*** Validation of Connection setting is displying or not and verification   ***", async ()=>{});
    var resul = await page.$$(selectors.basePagePO.CLOSE);
    await resul[1].click();
    test.step("*** Clicking on Close   ***", async ()=>{});
    await io.homePage.click(selectors.basePagePO.CLOSE);
    test.step("*** clicking on  close button ***", async ()=>{});

    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    test.step("*** Navigating to Home Page   ***", async ()=>{});
  });
});
