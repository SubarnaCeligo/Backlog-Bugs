
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt ,randomNumber} from "@celigo/aut-utilities";


test.describe("TC_C25171", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Navigate to Home Page ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test("@Env-All @Zephyr-IO-T1871 TC_C25171", async ({io,page}, testInfo) => {
    await io.homePage.loadingTime();
    await io.homePage.goToMenu("Resources","Connections");
    test.step("*** clicked on connection button ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.basePagePO.ADD_NEW_RESOURCE);
    await io.homePage.loadingTime();
    test.step("*** clicked on create connection ***", async ()=>{});
    await io.homePage.click("[data-test='Kantata']");
    test.step("*** clicked on Mavenlink  adaptor ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.click(selectors.flowBuilderPagePO.ICLIENTHELPTEXT);
    test.step("*** Clicking on the question mark ***", async ()=>{});

    var iclienthelptext = await io.homePage.getText(selectors.connectionsPagePO.HELP_BUBBLE);
    await expect(String(iclienthelptext)).toContain("OAuth 2.0 clients are used to securely link your integrator.io account to an external OAuth 2.0 provider for the purpose of acquiring API access tokens. OAuth 2.0 clients can be reused by any number of connections.");
    await io.homePage.click(selectors.connectionsPagePO.HELPTEXT_CLOSE);
    
    await io.homePage.click(selectors.basePagePO.CLOSE);
    test.step("** Verified  the help texts for IClient. **", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    test.step("*** Navigate to Home Page ***", async ()=>{});
  });
});
