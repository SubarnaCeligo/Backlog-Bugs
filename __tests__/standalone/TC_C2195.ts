
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt ,randomNumber} from "@celigo/aut-utilities";


test.describe("TC_C2195", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Navigate to Home Page ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test("@Env-All @Zephyr-IO-T1845 TC_C2195", async ({io,page}, testInfo) => {
    //create connection
    test.step("*** Navigate to Connections ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.goToMenu("Resources","Connections");
    test.step("*** clicked on connection button", async ()=>{});
    await io.homePage.loadingTime();
    test.step("*** Adding new connection ***", async ()=>{});
    await io.homePage.click(selectors.basePagePO.ADD_NEW_RESOURCE);

    test.step("*** Selecting Concur invoice as the adaptor ***", async ()=>{});
    await io.homePage.click(selectors.flowBuilderPagePO.CONCUR_INVOICE);

    test.step("*** Clicking on name help icon ***", async ()=>{});
    await io.homePage.click(selectors.flowBuilderPagePO.NAME_HELPERTEXT);

    const namehelptext = await io.homePage.getText(selectors.connectionsPagePO.HELP_BUBBLE);
    await expect(String(namehelptext)).toContain("Enter a unique name for your connection so that you can easily reference it from other parts of the application.");
    test.step("*** Verified name Help text***", async ()=>{});

    await io.homePage.click(selectors.flowBuilderPagePO.CONCURUSERNAME_HELPERTEXT);
    test.step("*** Clicking on Username help icon ***", async ()=>{});
    const Usernamehelptext = await io.homePage.getText(selectors.connectionsPagePO.HELP_BUBBLE);
    await expect(String(Usernamehelptext)).toContain("which appears in the redirected popup page URL after signin to integrator.io.");
    test.step("*** Verified Username Help text***", async ()=>{});

    await io.homePage.click(selectors.flowBuilderPagePO.CONCURPASSWORD_HELPERTEXT);
    test.step("*** Clicking on Password help icon ***", async ()=>{});
    const Passwordhelptext = await io.homePage.getText(selectors.connectionsPagePO.HELP_BUBBLE);
    await expect(String(Passwordhelptext)).toContain("Multiple layers of protection, including AES 256 encryption, are in place to keep your password safe. When editing this connection, you must re-enter this value each time; it is stored only when the connection is saved and never displayed as text.");
    test.step("*** Verified Password Help text***", async ()=>{});

    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
});
