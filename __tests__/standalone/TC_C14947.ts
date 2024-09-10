import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("TC_C14947_MDN_encoding_field_should_display", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Navigate to Home Page ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test("@Env-All @Zephyr-IO-T4406 TC_C14947_AS2_connection_type", async ({io,page}, testInfo) => {
    await io.homePage.loadingTime();
    await io.homePage.goToMenu("Resources","Connections");
    test.step("*** clicked on connection button", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.basePagePO.ADD_NEW_RESOURCE);
    test.step("*** clicked on create connection ***", async ()=>{});

    await io.homePage.click(selectors.connectionsPagePO.AS2_CONNECTOR);
    await io.homePage.loadingTime()
    test.step("*** clicked on AS2 adaptor ***", async ()=>{});
    await io.homePage.fillWebPage(selectors.flowBuilderPagePO.RENAME, "AS2_Connection");
    test.step("*** Naming the AS2 Connection  ***", async ()=>{});
    
    var result = await io.homePage.getTextFromElement("[for='as2.userStationInfo.mdn.mdnEncoding']", "MDN encoding");
    await io.assert.expectToBeTrue(result, "");
    test.step("*** Veryfying  the  MDN Encoding field is present or not ***", async ()=>{});
    await io.homePage.click(selectors.basePagePO.CLOSE);
    test.step("*** Clicking on Close ***", async ()=>{});
    await io.homePage.click(selectors.basePagePO.DISCARD_CHANGES);
    test.step("*** Clicking on  Discard Changes    ***", async ()=>{});
  });
});
