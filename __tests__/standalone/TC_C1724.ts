
import { test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import TC_C1724 from "@testData/STANDALONE/TC_C1724.json";

test.describe("TC_C1724", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Beginning of Test Suite ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  // test.afterEach(async ({io,page}, testInfo) => {
    // await io.integrationPage.deleteAllFlowsInIntegration("C1724_Stack_Integration");
    // await io.api.deleteIntegrationNonRecursively("C1724_Stack_Integration");
  // });

  test("@Env-All @Zephyr-IO-T6735 TC_C1724", async ({io,page}, testInfo) => {
    await io.homePage.clickUploadIntegrationButton();

    var filepath = TC_C1724["templateJSON"]["Upload_Path"];
    await io.homePage.zipUpload(filepath);

    await io.homePage.isPageLoaded();
    await io.homePage.isPageReady();

    await io.homePage.clickByText("Install integration");
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.templatePagePO.PROCEED_BUTTON);
    await io.homePage.loadingTime();

    await io.homePage.click(selectors.basePagePO.INSTALL);
    await io.homePage.isPageReady();
    await io.homePage.loadingTime();
    let exist = await io.homePage.isVisible(selectors.marketplacePagePO.NEWSTACK);
    let existt = await io.homePage.isVisible(selectors.marketplacePagePO.EXISTING);
    
    await io.assert.expectToBeTrue(exist, "");
    await io.assert.expectToBeTrue(existt, "");

    await io.homePage.click(selectors.marketplacePagePO.NEWSTACK);
    await io.homePage.isPageReady();
    await io.homePage.loadingTime();
    await io.homePage.fillWebPage(selectors.flowBuilderPagePO.RENAME, "TC_C1724");
    await io.homePage.click(selectors.exportsPagePO.EXPORT_TYPE_DROPDOWN);
    await io.homePage.click(selectors.flowBuilderPagePO.SERVER_STACKTYPE);
    
    await io.homePage.fillWebPage(selectors.integrationPagePO.HOST, "http.test");
    await io.homePage.click(selectors.basePagePO.SAVE);
    await io.homePage.isPageReady();
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.integrationPagePO.SETUP_INTEGRATION_CONFIGURE_BUTTON);
    await io.homePage.click(selectors.marketplacePagePO.EXISTING);
    const connectionName = TC_C1724["templateJSON"]["NS_CONNECTION"];
    const conn = io.connMap.get(connectionName);

    await io.homePage.fillWebPage(selectors.basePagePO.CONNECTION, conn);
    await io.homePage.click(selectors.basePagePO.SAVE);
    await io.homePage.isPageReady();
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.basePagePO.INSTALL);
    await io.homePage.isPageReady();
    await io.homePage.loadingTime();
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.isPageLoaded();
    await io.homePage.isPageReady();
    await io.templatePage.validationOfTemplate("C1724_Stack_Integration");
  });
});
