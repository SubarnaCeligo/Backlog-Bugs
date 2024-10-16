
import { test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("TC_C28820_Verify_if_an_error_is_shown_on_UI_when_tryig_to_authorize_the_connection_without_providing_the_mandatory_values.", () => {
  test.beforeEach(async ({ io }) => {
    test.step("*** Navigate to Home Page ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test("@Env-All @Zephyr-IO-T4544 TC_C28820_Paylocity_connection_type", async ({io,page}, testInfo) => {
    await io.homePage.loadingTime();
    await io.homePage.goToMenu("Resources","Connections");
    test.step("*** clicked on connection button ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.basePagePO.ADD_NEW_RESOURCE);
    test.step("*** clicked on create connection ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.flowBuilderPagePO.PAYLOCITY);
    await io.homePage.loadingTime();
    test.step("*** clicked on Paylocity  adaptor ***", async ()=>{});
    await io.homePage.fillWebPage(selectors.flowBuilderPagePO.RENAME, "Paylocity_Connection");
    await io.homePage.click(selectors.basePagePO.SAVE);
    await io.homePage.loadingTime();
    var result = await io.homePage.getTextFromElement(selectors.flowBuilderPagePO.COMPANY_ID, "A value must be provided");
    await io.assert.expectToBeTrue(result, "");    
  });
});
