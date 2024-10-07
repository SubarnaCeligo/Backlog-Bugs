import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt ,randomNumber} from "@celigo/aut-utilities";
import GEN_001 from "@testData/GENERAL/TC_C28850.json";

test.describe("TC_C28812_SSA_hyperlink", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Navigate to Sign up Page ***", async ()=>{});
  });
  test("@Zephyr-IO-T973 @Env-All TC_C28812_SSA_hyperlink", async ({io,page}, testInfo) => {
    await io.homePage.navigateTo(GEN_001.staging);
    const terms = await page.locator(
      selectors.myAccountPagePO.TERMS_OF_SERVICE
    );
    await terms.isVisible();
    await expect(terms).toBeTruthy;
    test.step("***verifying is terms of service link is clickable  ***", async ()=>{});
    await terms.click();
    test.step("*** clicking on the terms of service link and navigating to trems of service link ***", async ()=>{});
    await terms.isVisible();
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.switchWindowByUrlOrTitle(selectors.homePagePO.STAGING_SIGNUP);
    test.step("*** switching the windows***", async ()=>{});
    const policy = await page.locator(
      selectors.myAccountPagePO.PRIVACY_POLICY
    );
    await policy.isVisible();
    await expect(policy).toBeTruthy;
    test.step("***verifying is privacy policy link is clickable  ***", async ()=>{});
    await policy.click();
    test.step("*** clicking on the privacy policy link and navigating to privacy policy link ***", async ()=>{});
    await policy.isVisible();
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.switchWindowByUrlOrTitle(selectors.homePagePO.STAGING_SIGNUP);
    test.step("*** closing the privacy policy  window  ***", async ()=>{});
    const SSA = await page.locator('[href="https://www.celigo.com/terms-of-service/"]');
    await SSA.isVisible();
    await expect(SSA).toBeTruthy;
    test.step("***verifying is SSA link is clickable  ***", async ()=>{});
    await SSA.click();
    await SSA.isVisible();
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.switchWindowByUrlOrTitle(selectors.homePagePO.STAGING_SIGNUP);
    test.step("*** clicking on the SSA link  and navigating to SSA link ***", async ()=>{});
 
    test.step("*** Signing into IO ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    test.step("*** navigating to homep page***", async ()=>{});
  });
});
