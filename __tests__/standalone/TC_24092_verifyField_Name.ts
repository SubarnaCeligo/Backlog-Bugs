
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt ,randomNumber} from "@celigo/aut-utilities";


test.describe("TC_24092_verifyField_Name", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Navigate to Home Page ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  
  test("@Env-All @Zephyr-IO-T4443 TC_24092_verifyField_Name", async ({io,page}, testInfo) => {
    await io.homePage.goToMenu("Resources","Connections");
    test.step("*** clicked on connections in Homepage ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.basePagePO.ADD_NEW_RESOURCE);
    test.step("*** clicked on create connection ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.flowBuilderPagePO.MTEAM);
    test.step("*** clicked on Microsoft Teams adaptor ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.fillWebPage(selectors.flowBuilderPagePO.RENAME, "Microsoft Teams Connection");
    test.step("*** Name the Microsoft Teams connection ***", async ()=>{});

    var tanantID = await io.homePage.getText(selectors.flowBuilderPagePO.TENANTID)
    await io.homePage.loadingTime();
    var expected = "Tenant ID";
    expect(tanantID).toContain(expected);
    test.step("*** Verifying the field names Tenant ID   ***", async ()=>{});

    var iClientId = await io.homePage.getText(selectors.connectionsPagePO.ICLIENT)
    await io.homePage.loadingTime();
    var expected1 = "OAuth 2.0 client";
    expect(iClientId).toContain(expected1);
    test.step("*** Verifying the field names IClient   ***", async ()=>{});

    var confiScope = await io.homePage.getText(selectors.flowBuilderPagePO.ADOBE_CONFIGURE_SCOPES1)
    var expected3 = "Scope";
    console.log("confiScope ", confiScope, expected3);
    expect(confiScope).toContain(expected3);
    test.step("*** Verifying the field names Configure scopes  ***", async ()=>{});

    await io.homePage.click(selectors.basePagePO.CLOSE);
    test.step("*** Clicking on Close   ***", async ()=>{});
    await io.homePage.click(selectors.basePagePO.DISCARD_CHANGES);
    test.step("*** Clicking on  Discard Changes    ***", async ()=>{});
  });
});
