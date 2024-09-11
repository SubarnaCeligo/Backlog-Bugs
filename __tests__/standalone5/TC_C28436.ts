
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt ,randomNumber} from "@celigo/aut-utilities";


test.describe(" TC_C28436_Freshservice_connection_type.", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Navigate to Home Page ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test("@Env-All @Zephyr-IO-T4532 TC_C28436_Verify_if_an_error_is_shown_on_UI_when_tryig_to_authorize_the_connection_without_providing_the_mandatory_values.", async ({io,page}, testInfo) => {
    await io.homePage.loadingTime();
    await io.homePage.goToMenu("Resources","Connections");
    test.step("*** clicked on connection button ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.basePagePO.ADD_NEW_RESOURCE);
    test.step("*** clicked on create connection ***", async ()=>{});

    await io.homePage.click(selectors.flowBuilderPagePO.FRESHSERVICE);
    test.step("*** clicked on Freshservice adaptor ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.fillWebPage(selectors.flowBuilderPagePO.RENAME, "Freshservice_Connection");
    test.step("*** Naming the Freshservice Connection  ***", async ()=>{});
    await io.homePage.click(selectors.basePagePO.SAVE);
    test.step("*** Clicking on save and Authorize without providing mandatory fields    ***", async ()=>{});
    await io.homePage.click(selectors.connectionsPagePO.AUTH_BASIC_USERNAME);
    test.step("*** Clicking on API Key  field   ***", async ()=>{});
    
    var result = await io.homePage.getTextFromElement(selectors.connectionsPagePO.AUTH_BASIC_USERNAME, "A value must be provided");
    await io.assert.expectToBeTrue(result, "");
    test.step("*** Validation of 'A value must be provided' error is displaying or not  ***", async ()=>{});
    await io.homePage.click(selectors.basePagePO.CLOSE);
    test.step("*** Clicking on Close   ***", async ()=>{});
    await io.homePage.click(selectors.basePagePO.DISCARD_CHANGES);
    test.step("*** Clicking on  Discard Changes    ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    test.step("*** Navigating to Home Page   ***", async ()=>{});
  });
});
