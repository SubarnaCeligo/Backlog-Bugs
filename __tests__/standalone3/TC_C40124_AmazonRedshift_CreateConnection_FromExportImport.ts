import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("TC_ C40124_AmazonRedshift_CreateConnection_FromExportAndImport", () => {
  test.beforeEach(async ({ io, page }, testInfo) => {
    test.step("*** Navigate to Home Page ***", async () => { });
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });

  test("@Zephyr-IO-T7564 @Env-All TC_C40124_AmazonRedshiftConnection_FromExport", async ({ io, page }, testInfo) => {
    await io.homePage.loadingTime();
    await io.homePage.goToMenu("Resources", "Exports");
    await io.homePage.loadingTime();
    test.step("*** Navigated to Exports Page ***", async () => { });
    await io.homePage.click(selectors.basePagePO.ADD_NEW_RESOURCE);
    await io.homePage.loadingTime();
    test.step("*** Clicked on Create New Export ***", async () => { });
    await io.homePage.click(selectors.connectionsPagePO.AMAZON_REDSHIFT);
    test.step("*** Selected Amazon Redshift as the adaptor ***", async () => { });
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.connectionsPagePO.CREATECONNECTION_FROMEXPORTIMPORT);
    await io.homePage.loadingTime();
    test.step("*** Clicked on + to create new connection ***", async () => { });
    var connector = await page.locator(
      selectors.connectionsPagePO.AMAZONREDSHIFT
    ).isVisible();
    await io.assert.expectToBeTrue(connector, "");
    test.step("*** Verified that a drawer to create Amazon Redshift connection is opened ***", async () => { });
    await io.homePage.reloadPage();
    await io.homePage.click(selectors.flowBuilderPagePO.CLOSINGDRAWER);
    await io.homePage.click(selectors.flowBuilderPagePO.CLOSINGDRAWER);
  });


  test("@Zephyr-IO-T7564 @Env-All TC_C40124_AmazonRedshiftConnection_FromImport", async ({ io, page }, testInfo) => {
    await io.homePage.loadingTime();
    await io.homePage.goToMenu("Resources", "Imports");
    await io.homePage.loadingTime();
    test.step("*** Navigated to Imports Page ***", async () => { });
    await io.homePage.click(selectors.basePagePO.ADD_NEW_RESOURCE);
    test.step("*** Clicked on Create New Import ***", async () => { });
    await io.homePage.click(selectors.connectionsPagePO.AMAZON_REDSHIFT);
    test.step("*** Selected Amazon Redshift as the adaptor ***", async () => { });
    await io.homePage.click(selectors.connectionsPagePO.CREATECONNECTION_FROMEXPORTIMPORT);
    await io.homePage.loadingTime();
    test.step("*** Clicked on + to create new connection ***", async () => { });
    var connector = await page.locator(
      selectors.connectionsPagePO.AMAZONREDSHIFT
    ).isVisible();
    await io.assert.expectToBeTrue(connector, "");
    test.step("*** Verified that a drawer to create Amazon Redshift connection is opened ***", async () => { });
  });
});
