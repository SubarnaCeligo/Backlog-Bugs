
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt ,randomNumber} from "@celigo/aut-utilities";


test.describe("TC_C2174", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Navigate to Home Page ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test("@Env-All @Zephyr-IO-T1841 TC_C2174", async ({io,page}, testInfo) => {
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.goToMenu("Resources","Connections");
    test.step("*** clicked on connection button", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.basePagePO.ADD_NEW_RESOURCE);
    test.step("*** clicked on create connection ***", async ()=>{});
    await io.homePage.click("[data-test='Concur Expense']");
    test.step("*** clicked on Concur Expense adaptor ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.click(selectors.flowBuilderPagePO.G2NAMEHELPTEXT);
    test.step("*** Clicked on the question mark for name***", async ()=>{});

    var helptextforname = await io.homePage.getText(selectors.connectionsPagePO.HELP_BUBBLE);
    await expect(String(helptextforname)).toContain("Enter a unique name for your connection so that you can easily reference it from other parts of the application.");

    await io.homePage.click(selectors.flowBuilderPagePO.CONCURUSERNAME_HELPERTEXT);
    const helptextforusername = await io.homePage.getText(selectors.connectionsPagePO.HELP_BUBBLE);
    await expect(String(helptextforusername)).toContain("Please enter the value of id which appears in the redirected popup page URL after signin to integrator.io.");
    await io.homePage.click(selectors.flowBuilderPagePO.CONCURPASSWORD_HELPERTEXT);
    const helptextforpassword = await io.homePage.getText(selectors.connectionsPagePO.HELP_BUBBLE);
    await expect(String(helptextforpassword)).toContain("Please enter the value of requestToken which appears in the redirected popup page URL after signin to integrator.io.");
    await io.homePage.click(selectors.flowBuilderPagePO.FULFILLMENTTOKENHELPTEXT);
    const helptextfortoken = await io.homePage.getText(selectors.connectionsPagePO.HELP_BUBBLE);
    await expect(String(helptextfortoken)).toContain("Click the Generate token button to have integrator.io fill in an encrypted access token or enter the token generated for you by Concur Expense. Multiple layers of protection are in place, including AES 256 encryption, to keep your connection's token safe. When editing this form later, you must generate this value again; it is stored only when the connection is saved and never displayed as text.");
    test.step("*** Verified Helptext should be present for all the fields in concur connection. ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    test.step("*** Navigate to Home Page ***", async ()=>{});
  });
});
