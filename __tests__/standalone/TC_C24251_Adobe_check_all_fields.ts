
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt ,randomNumber} from "@celigo/aut-utilities";


test.describe("TC_C24251_adobe_check_all_fields", async () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Navigate to Home Page ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test("@Env-All @Zephyr-IO-T4451 TC_C24251_adobe_check_all_fields", async ({io,page}, testInfo) => {
    await io.homePage.loadingTime();
    await io.homePage.goToMenu("Resources","Connections");
    test.step("*** clicked on connection button", async ()=>{});
    await io.homePage.loadingTime();

    await io.homePage.click(selectors.basePagePO.ADD_NEW_RESOURCE);
    await io.homePage.loadingTime();
    test.step("*** clicked on create connection ***", async ()=>{});

    await io.homePage.click(selectors.flowBuilderPagePO.ADOBESIGN);
    await io.homePage.loadingTime();
    test.step("*** clicked on adobe Sign adaptor ***", async ()=>{});
    var adobe_name = await io.homePage.getText(selectors.myAccountPagePO.FORNAME)
    var expected1 = "Name your connection";
    expect(adobe_name).toContain(expected1);
    test.step("*** Verifying the field name   ***", async ()=>{});
    var adobe_subdomain = await io.homePage.getText(selectors.flowBuilderPagePO.ADOBE_SUBDOMAIN1);
    var expected2 = "Subdomain";
    expect(adobe_subdomain).toContain(expected2);
    test.step("*** verifying the Subdomain field name ***", async ()=>{});
    var adobe_email = await io.homePage.getText(selectors.flowBuilderPagePO.ADOBE_EMAIL1);
    var expected3 = "Email Id";
    expect(adobe_email).toContain(expected3);
    test.step("*** verifying the Email field name ***", async ()=>{});
    var adobe_iclient = await io.homePage.getText(selectors.connectionsPagePO.ICLIENT);
    var expected4 = "OAuth 2.0 client";
    expect(adobe_iclient).toContain(expected4);
    test.step("*** verifying the Iclient field name ***", async ()=>{});
    
    var adobe_configure_scopes = await io.homePage.getText(selectors.flowBuilderPagePO.ADOBE_CONFIGURE_SCOPES1);
    var expected6 = "Scope";
    expect(adobe_configure_scopes).toEqual(expected6);
    test.step("*** verifying the configure field name ***", async ()=>{});
    await io.homePage.click(selectors.basePagePO.CLOSE);
    test.step("*** clicking close button ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    test.step("*** Navigating to Home Page   ***", async ()=>{});
  });
});
