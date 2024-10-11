
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("TC_C21254_oracle_onpremise", async () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Navigate to Home Page ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test("@Env-All @Zephyr-IO-T4428 TC_C21254_oracle_onpremise", async ({io,page}, testInfo) => {
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.goToMenu("Resources","Connections");
    test.step("*** clicked on connection button", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.basePagePO.ADD_NEW_RESOURCE);
    await io.homePage.loadingTime();
    test.step("*** clicked on create connection ***", async ()=>{});
    await (await page.locator(selectors.flowBuilderPagePO.ORACLE)).isVisible();
    await io.homePage.click(selectors.flowBuilderPagePO.ORACLE);
    test.step("*** clicked on Oacle adaptor ***", async ()=>{});
    
    const locator = page.locator(selectors.flowBuilderPagePO.ON_PREMISE_MODE);
    await expect(locator).toBeChecked();

    test.step("*** onpremise radio buttom ***", async ()=>{});
    await io.homePage.click(selectors.basePagePO.CLOSE);
    test.step("*** clicking close button ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    test.step("*** Navigating to Home Page   ***", async ()=>{});
  });
});
