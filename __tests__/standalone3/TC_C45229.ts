import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("TC_C45229", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Navigate to Home Page ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.loadingTime();
  });
  test("@Zephyr-IO-T22124 @Env-All TC_C45229", async ({io,page}, testInfo) => {
    test.step("*** Opening Connection via ConnectionID ***", async ()=>{});
    await io.homePage.goToMenu("Resources", "Connections");
    test.step("*** clicked on connection button ***", async () => { });
    await io.homePage.loadingTime();
    await io.homePage.fillWebPage(selectors.flowBuilderPagePO.SEARCHBUTTON, "AMAZON SP API CONNECTION");
    await io.homePage.loadingTime();
    
    await io.homePage.click(selectors.basePagePO.DRAWERTOGGLE);
    await io.homePage.click(selectors.basePagePO.DRAWERTOGGLE);
    await io.flowBuilder.clickByText('AMAZON SP API CONNECTION');

    var disabledApiType = await io.homePage.isVisible(selectors.connectionsPagePO.DISABLEDAPITYPE);
    await io.assert.expectToBeTrue(disabledApiType, "");

    var disabledSellingPartnerId = await io.homePage.isVisible(selectors.connectionsPagePO.DISABLEDSELLINGPARTNERID);
    await io.assert.expectToBeTrue(disabledSellingPartnerId, "");
  });
});
