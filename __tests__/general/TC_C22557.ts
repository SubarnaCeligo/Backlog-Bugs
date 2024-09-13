import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt ,randomNumber} from "@celigo/aut-utilities";


test.describe("TC_C22557 ", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    await test.step("*** Beginning of Test Suite ***",()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test("@Zephyr-IO-T2315 @Env-All TC_C22557", async ({io,page}, testInfo) => {
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.loadingTime();
    await io.homePage.goToMenu("Tools","Playground");
    await test.step("Clicked on Dev playground button",()=>{});
    await io.homePage.loadingTime();
    await io.homePage.clickByText(
      "Form builder"
    );
    await io.homePage.clickByText(
      "Simple form"
    );
await test.step(
      "*** Clicking on the Simple Form option in dev playground ***"
, async ()=>{});
    await io.homePage.isPageLoaded();
    await io.homePage.isPageReady();
     
   await page.locator('[data-test="mode"]').getByText('Create').click();
   
    await io.homePage.click(
      selectors.playgroundPO.TESTFORM
    );
    var paste = await io.homePage.copyResourceData(
      selectors.mappings.MAPPER2DOT0PO.PREVIEWRESULT
    );
    expect(paste).toContain(`"mode": "Create"`);
    await expect(paste).toBeTruthy();
await test.step(
      "Verified App crash should not happen in Devplayground"
, async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await test.step("Navigating to homepage",()=>{});
  });
});
