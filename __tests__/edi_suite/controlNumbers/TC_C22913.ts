import { test, expect } from "@celigo/ui-core-automation";
import  FTPtoFTP from "@testData/edi_suite/edi.json"
import * as selectors from "@celigo/aut-selectors";
test.describe("@Author-RajVikram TC_22913", () => {
  test.beforeEach(async ({ io, }) => {
    await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test("@Epic-IO-74526 @Priority-P3 @Env-ALL @Zephyr-IO-T5393", async ({
    io,page
  }, testInfo) => {
  
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.loadingTime()
    await io.createResourceFromAPI(FTPtoFTP, "FLOWS");
    await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.TRANSFER);
    await io.flowBuilder.clickByIndex(selectors.flowBuilderPagePO.TRANSFER,1);
    await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.DIRECTORYHANLEBAR);
    let isVisibleImport = await io.flowBuilder.isVisible(selectors.flowBuilderPagePO.DIRECTORYHANLEBAR)
    await io.assert.expectToBeTrue(isVisibleImport, "FTP Directory Path is not visible");
    await io.flowBuilder.click(selectors.flowBuilderPagePO.CLOSE);
    await io.flowBuilder.clickByIndex(selectors.flowBuilderPagePO.TRANSFER,0);
    await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.DIRECTORYHANLEBAR);
    let isVisibleExport = await io.flowBuilder.isVisible(selectors.flowBuilderPagePO.DIRECTORYHANLEBAR)
    await io.assert.expectToBeTrue(isVisibleExport, "FTP Directory Path is not visible");
  });
});
