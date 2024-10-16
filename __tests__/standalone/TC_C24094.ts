
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt ,randomNumber} from "@celigo/aut-utilities";


test.describe("TC_C24094_Verify_if_an_error_is_shown_on_UI_when_tryig_to_authorize_the_connection_without_providing_the_mandatory_values.", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Navigate to Home Page ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test("@Env-All @Zephyr-IO-T4444 TC_C24094_Microsoft_Team_connection_type", async ({io,page}, testInfo) => {
    await io.homePage.loadingTime();
    await io.homePage.goToMenu("Resources","Connections");
    test.step("*** clicked on connection button", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.basePagePO.ADD_NEW_RESOURCE);
    await io.homePage.loadingTime();
    test.step("*** clicked on create connection ***", async ()=>{});

    await io.homePage.click(selectors.flowBuilderPagePO.MTEAM);
    await io.homePage.loadingTime();
    test.step("*** clicked on Microsoft Teams adaptor ***", async ()=>{});
    await io.homePage.fillWebPage(selectors.flowBuilderPagePO.RENAME, "Microsoft_Teams_Connection");
    test.step("*** Naming the Microsoft Teams Connection  ***", async ()=>{});
    await io.homePage.click(selectors.basePagePO.SAVE);
    test.step("*** Clicking on save and Authorize without providing mandatory fields    ***", async ()=>{});
    await io.homePage.click(selectors.flowBuilderPagePO.TENANTID);
    test.step("*** Clicking on Teenant Id field   ***", async ()=>{});
    
    var result = await io.homePage.getTextFromElement(selectors.flowBuilderPagePO.TENANTID, "A value must be provided");
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
