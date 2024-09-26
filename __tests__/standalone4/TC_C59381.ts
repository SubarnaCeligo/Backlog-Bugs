
import { test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("TC_C59381", () => {
  let flowId;
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Navigate to Home Page ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test.afterEach(async ({ io, page }, testInfo) => {
    await test.step("*** Navigate to Home Page ***", async () => { });
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test("TC_C59381 @Env-All @Zephyr-IO-T1613", async ({io,page}, testInfo) => {
    // C59381 To verify that the IO preview for xlsx export will show first sheet of the file in Preview result
    await io.homePage.navigateTo(io.data.links.EXPORTS_PAGE_URL);
    await io.homePage.loadingTime();
    await io.flowBuilder.click(selectors.basePagePO.ADD_NEW_RESOURCE);

    await io.flowBuilder.fill(selectors.settingsPagePO.APP_NAME_INPUT, 'ftp');
    await io.flowBuilder.click(selectors.connectionsPagePO.FTP_CONNECTION);

    await io.flowBuilder.click(selectors.connectionsPagePO.CONNECTIONS_DROPDOWN);
    await io.flowBuilder.fill(selectors.connectionsPagePO.CONNECTIONS_DROPDOWN, 'FTP CONNECTION');
    await io.exportsPage.clickByTextByIndex('FTP CONNECTION', 0);
    await io.homePage.fill(selectors.connectionsPagePO.NAME_INPUT, 'FTP_Export');
    await io.flowBuilder.click(selectors.basePagePO.SAVE);
    await io.homePage.loadingTime();

    await io.flowBuilder.click(selectors.exportsPagePO.FILE_TYPE);
    await io.flowBuilder.click(selectors.exportsPagePO.FILE_TYPE_XLSX);
    let fileInput1 = await page.$(selectors.basePagePO.UPLOAD_FILE);
    await fileInput1.setInputFiles("testData/inputData/STANDALONE/TC_C59381.xlsx");

    await io.homePage.loadingTime();
    test.step("*** Clicking Preview ***", async () => { });
    await io.homePage.click(selectors.importPagePO.CLICKPREVIEW);
    
    const previewData = await io.homePage.getText(selectors.importPagePO.PREVIEWDATA)
    await io.assert.expectToContainValue('"Column0": "abc1"',String(previewData), "");
    await io.assert.expectNotToContainValue('"xyz1"', String(previewData), "");
  });
});
