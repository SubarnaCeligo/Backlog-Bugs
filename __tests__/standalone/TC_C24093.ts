
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt ,randomNumber} from "@celigo/aut-utilities";


test.describe("TC_C24093", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Navigate to Home Page ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test("@Env-All @Zephyr-IO-T1868 TC_C24093", async ({io,page}, testInfo) => {
    await io.homePage.loadingTime();
    await io.homePage.goToMenu("Resources","Connections");
    test.step("*** clicked on connection button", async ()=>{});
    await io.homePage.click(selectors.basePagePO.ADD_NEW_RESOURCE);
    await io.homePage.loadingTime();
    
    test.step("*** clicked on create connection ***", async ()=>{});
    await io.homePage.click("[data-test='Microsoft Teams']");
    test.step("*** clicked on microsoft teams  adaptor ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.click(selectors.flowBuilderPagePO.TENANTIDHELPTEXT);
    test.step("*** Clicking on the question mark ***", async ()=>{});

    var tenanthelptext = await io.homePage.getText(selectors.connectionsPagePO.HELP_BUBBLE);
    await expect(String(tenanthelptext)).toContain("Enter your Microsoft Teams directory ID (tenant ID).How to retrieve the tenant ID:1. Sign in to your Azure portal.2. From Azure services, click App registrations.3. Select the required application that you use for Microsoft Teams.4. Navigate to Overview > Essentials, and locate the Directory (tenant) ID.");
    await io.homePage.click(selectors.connectionsPagePO.HELPTEXT_CLOSE);

    await io.homePage.click(selectors.flowBuilderPagePO.ICLIENTHELPTEXT);
    test.step("*** Clicking on the question mark ***", async ()=>{});
    const iclienthelptext = await io.homePage.getText(selectors.connectionsPagePO.HELP_BUBBLE);
    await expect(String(iclienthelptext)).toContain("OAuth 2.0 clients are used to securely link your integrator.io account to an external OAuth 2.0 provider for the purpose of acquiring API access tokens. OAuth 2.0 clients can be reused by any number of connections.");
    await io.homePage.click(selectors.connectionsPagePO.HELPTEXT_CLOSE);

    await io.homePage.click(selectors.flowBuilderPagePO.CONFIGURESCOPEHELPTEXT);
    test.step("*** Clicking on the question mark ***", async ()=>{});
    const configurescopehelptext = await io.homePage.getText(selectors.connectionsPagePO.HELP_BUBBLE);
    await expect(String(configurescopehelptext)).toContain("List the scopes to grant access to authorization server requests. Separate multiple scopes with a space character, unless you are providing an alternative delimiter, below.");
    await io.homePage.click(selectors.connectionsPagePO.HELPTEXT_CLOSE);
    test.step("** Verified  the help texts for Tenant ID,Iclient,call back URL and scopes. **", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    test.step("*** Navigate to Home Page ***", async ()=>{});
  });
});
