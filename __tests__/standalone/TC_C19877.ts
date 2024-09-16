
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
const os = require('os');

test.describe("TC_C19877", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Navigate to Home Page ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test("@Env-All @Zephyr-IO-T4816 TC_C19877", async ({io,page}, testInfo) => {
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.loadingTime();
    await io.homePage.goToMenu("Tools","Data loader");
    test.step("Clicked on Dev playground button", async ()=>{});
    await io.homePage.loadingTime();
    test.step("***Clicking on the Data Loader Export***", async ()=>{});
    await io.homePage.click(selectors.exportsPagePO.DATALOADEREXPORT);
    test.step("*** Selecting Filetype ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.fillWebPage(selectors.exportsPagePO.FILE_TYPE, "csv");
    await io.homePage.loadingTime();

    const fileChooserPromise = page.waitForEvent("filechooser");
    await io.homePage.clickByText("Choose file");
    const fileChooser = await fileChooserPromise;
    await fileChooser.setFiles("testData/assets/FTP_uploads/TC_C19877.csv");
    await io.homePage.loadingTime();
    
    test.step("*** Uploaded Valid CSV File ***", async ()=>{});
    await io.homePage.click(selectors.flowBuilderPagePO.HAS_HEADER_ROW);
    await io.homePage.click(selectors.importPagePO.CLICKPREVIEW);
    test.step("*** Clicked On Preview ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();

    await io.flowBuilder.click(selectors.importPagePO.PREVIEWDATA);

    const platform = os.platform();
    if (platform === 'darwin') {
      await page.keyboard.press('Meta+A'); 
      await page.keyboard.press('Meta+C');
    } else {
      await page.keyboard.press('Control+A');
      await page.keyboard.press('Control+C');
    }

    const previewData = await page.evaluate(() => navigator.clipboard.readText()); 
    expect(previewData).toContain('"CustomerName": "34 Newegg Estella Pan"');
    expect(previewData).toContain('"Item Name": "ACC00002"');
    expect(previewData).toContain('"Amount": "27"');
    expect(previewData).toContain('"Quantity": "1"');
    test.step("*** Verified User should be able to view correct preview data. ***", async ()=>{});

    await io.homePage.click(selectors.basePagePO.CLOSE);
    test.step("*** Clicked On Close ***", async ()=>{});
    await io.homePage.click(selectors.basePagePO.DISCARD_CHANGES);
    test.step("*** Clicked On Discard Changes ***", async ()=>{});

    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    test.step("*** Naviating to Home Page ***", async ()=>{});
  });
});
