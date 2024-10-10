
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
const os = require('os');

test.describe("TC_62090", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Beginning of Test Suite ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
  });
  test("@Env-All @Zephyr-IO-T23001 TC_62090", async ({io,page}, testInfo) => {
    await io.homePage.goToMenu("Tools","Playground");
    test.step("Clicked on Dev playground button", async ()=>{});
    await io.homePage.loadingTime();
    
    await io.homePage.clickByText("Form builder");
    await io.homePage.loadingTime();

    await io.homePage.clickByText("Field dictionary");
    await io.homePage.loadingTime();
    
    await io.homePage.enterHugeData(selectors.playgroundPO.DATE_SETTING, "03/03/2024");

    await io.homePage.click(selectors.playgroundPO.TESTFORM);
    await io.homePage.loadingTime();
    await io.flowBuilder.click(selectors.mappings.MAPPER2DOT0PO.PREVIEWRESULT);
    const platform = os.platform();
    if (platform === 'darwin') {
      await page.keyboard.press('Meta+A'); 
      await page.keyboard.press('Meta+C');
    } else {
      await page.keyboard.press('Control+A');
      await page.keyboard.press('Control+C');
    }

    const copiedText = await page.evaluate(() => navigator.clipboard.readText()); 
    await expect(copiedText).toContain("/03/2024");
    test.step("Expect month to be 03 and year to be 2024", async ()=>{});

    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
});
