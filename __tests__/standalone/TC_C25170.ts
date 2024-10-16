
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt ,randomNumber} from "@celigo/aut-utilities";


test.describe("TC_C25170_Verify the field names in Mavenlink Connection.", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Navigate to Home Page ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test("@Env-All @Zephyr-IO-T4458 TC_C25170_Mavenlink_connection_type", async ({io,page}, testInfo) => {
    await io.homePage.loadingTime();
    await io.homePage.goToMenu("Resources","Connections");
    test.step("*** clicked on connection button ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.basePagePO.ADD_NEW_RESOURCE);
    await io.homePage.loadingTime();
    test.step("*** clicked on create connection ***", async ()=>{});

    await io.homePage.click('[data-test="Kantata"]');
    await io.homePage.loadingTime();
    test.step("*** clicked on Mavenlink adaptor ***", async ()=>{});
    await io.homePage.fillWebPage(selectors.flowBuilderPagePO.RENAME, "Kantatalink_Connection");
    test.step("*** Naming the mavenlink  Connection  ***", async ()=>{});
    
    var result = await io.homePage.getTextFromElement(selectors.connectionsPagePO.OAUTH_TWO_CLIENT_LABEL, "OAuth 2.0 client");
    await io.assert.expectToBeTrue(result, "");
    test.step("*** Validation of Iclient field is present  or not ***", async ()=>{});

    await io.homePage.click(selectors.basePagePO.CLOSE);
    test.step("*** Clicking on Close   ***", async ()=>{});
    await io.homePage.click(selectors.basePagePO.DISCARD_CHANGES);
    test.step("*** Clicking on  Discard Changes    ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    test.step("*** Navigating to Home Page   ***", async ()=>{});
  });
});
