
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt ,randomNumber} from "@celigo/aut-utilities";


test.describe("TC_C2012_C2010", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Beginning of Test Suite ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test("@Env-All @Zephyr-IO-T5832 @Zephyr-IO-T5830 TC_C2012_C2010", async ({io,page}, testInfo) => {
    await io.homePage.goToMenu("Resources","API tokens");
    test.step("*** Clicked On API Token Icon ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.basePagePO.TOOLTIP);
    const apitextEl = await page.getByText("API tokens are required to access the integrator.io API, which can be used to perform CRUD operations on any resource in your account, or to synchronously get data in and out of any application that integrator.io can connect with. API tokens can be provisioned with full or minimal access. API tokens can be revoked or reactivated at any time. Tokens can be regenerated (as a security best practice to rotate the secret keys being stored externally). IMPORTANT: it may take up to one minute for API token changes to propagate and take effect.");
    await apitextEl.waitFor({ state: 'visible', timeout: 30000 });
    await expect(apitextEl).toBeVisible();
    await io.homePage.click(selectors.connectionsPagePO.HELPTEXT_CLOSE);

    test.step("*** Verified the helptext for token  ***", async ()=>{});

    await io.homePage.click(selectors.connectionsPagePO.CREATEAPITOKEN);
    test.step("*** Clicked On Create API Token Button ***", async ()=>{});

    await io.homePage.click(selectors.exportsPagePO.NAME_HELP_TEXT);
    const nameEl = await page.getByText("Name your token so that you can easily reference it from other parts of the application");
    await nameEl.waitFor({ state: 'visible', timeout: 30000 });
    await expect(nameEl).toBeVisible();
    await io.homePage.click(selectors.connectionsPagePO.HELPTEXT_CLOSE);
    test.step("*** Verified the helptext for name in create token page  ***", async ()=>{});

    await io.homePage.click(selectors.exportsPagePO.DESCRIPTION_HELP_TEXT);
    const descriptionEl = await page.getByText("Describe how your token is being used and be sure to mention exactly where your token is being stored externally.");
    await descriptionEl.waitFor({ state: 'visible', timeout: 30000 });
    await expect(descriptionEl).toBeVisible();
    await io.homePage.click(selectors.connectionsPagePO.HELPTEXT_CLOSE);
    test.step("*** Verified the content for description ***", async ()=>{});
    
    await io.homePage.click("[id='autoPurgeAt'] [data-test='help-text-icon']");
    const autoPergeEl = await page.getByText("Select the time after which the token should be automatically purged from the system.");
    await autoPergeEl.waitFor({ state: 'visible', timeout: 30000 });
    await expect(autoPergeEl).toBeVisible();
    await io.homePage.click(selectors.connectionsPagePO.HELPTEXT_CLOSE);
    test.step("*** Verified the helptext for autoputge token in create token page  ***", async ()=>{});

    await io.homePage.click(selectors.basePagePO.CLOSE);
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
});
