
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt ,randomNumber} from "@celigo/aut-utilities";


test.describe("TC_C29381_Verify_if_an_error_is_shown_when_tryig_to_authorize_the_connection_with_providing_the_Invalid _values.", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Navigate to Home Page ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test("@Zephyr-IO-T4549 @Env-All TC_C29381_Quickbase_connection_type", async ({io,page}, testInfo) => {
    await io.homePage.loadingTime();
    await io.homePage.goToMenu("Resources","Connections");
    test.step("*** clicked on connection button ***", async ()=>{});
    await io.homePage.loadingTime();

    await io.homePage.click(selectors.basePagePO.ADD_NEW_RESOURCE);
    test.step("*** clicked on create connection ***", async ()=>{});
    
    await io.homePage.click(selectors.flowBuilderPagePO.QUICKBASE);
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();

    test.step("*** clicked on Quick base  adaptor ***", async ()=>{});
    await io.homePage.fillWebPage(selectors.flowBuilderPagePO.RENAME, "Quick base_Connection");
    test.step("*** Naming the Quick base  Connection  ***", async ()=>{});
    await io.homePage.fillWebPage(selectors.flowBuilderPagePO.HOST_NAME, "celigolabs.quickbase.com");
    test.step("*** Naming the Host name field***", async ()=>{});
    await io.homePage.fillWebPage(selectors.flowBuilderPagePO.TOKENVALUE, "b55j2z_ppr4_0_hb94xrbw9epb8bfunacrd8hka2g");
    test.step("*** Naming the Token name field***", async ()=>{});
    await io.homePage.fillWebPage( selectors.flowBuilderPagePO.APP_ID, "Cs1222");
    test.step("*** Naming the APP Id  field***", async ()=>{});
    await io.homePage.click(selectors.basePagePO.TEST_CONNECTION);
    test.step("*** Clicking on Test Connection  ***", async ()=>{});
   
    var result = await io.homePage.getTextFromElement(selectors.basePagePO.NOTIFICTION_BAR, "Your test was not successful. Check your information and try again");
    await io.assert.expectToBeTrue(result, "");
    test.step("*** Validation of Connection is not succesfull and verifying the error  ***", async ()=>{});
    await io.homePage.click(selectors.basePagePO.CLOSE);
    test.step("*** Clicking on Close   ***", async ()=>{});
    await io.homePage.click(selectors.basePagePO.DISCARD_CHANGES);
    test.step("*** Clicking on  Discard Changes    ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    test.step("*** Navigating to Home Page   ***", async ()=>{});
  });
});
