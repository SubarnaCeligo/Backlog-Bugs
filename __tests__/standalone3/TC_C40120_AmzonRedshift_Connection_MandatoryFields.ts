import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("TC_ C40120_AmazonRedshift_CreateConnection_MandatoryFields", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Navigate to Home Page ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test("@Zephyr-IO-T7562 @Env-All TC_ C40120_AmazonRedshift_CreateConnection_MandatoryFields", async ({io,page}, testInfo) => {
    await io.homePage.loadingTime();
    await io.homePage.goToMenu("Resources","Connections");
    test.step("*** Navigated to Connections Page ***", async ()=>{});
    await io.homePage.click(selectors.basePagePO.ADD_NEW_RESOURCE);
    test.step("*** Clicked on Create New Connection ***", async ()=>{});
    await io.homePage.click(selectors.connectionsPagePO.AMAZON_REDSHIFT);
    await io.homePage.loadingTime();
    test.step("*** Selected Amazon Redshift as the adaptor ***", async ()=>{});
    await io.homePage.fillWebPage(selectors.connectionsPagePO.CONNECTIONNAME, "amazonRedshift");
    await io.homePage.click(selectors.basePagePO.SAVE_AND_CLOSE);
    test.step("*** Clicking on save and close button without filling mandatory fields ***", async ()=>{});
    var accesskeyError = await page.locator(
      selectors.connectionsPagePO.AMAZON_REDSHIFT_ACCESS_KEY_ID_ERROR
    ).isVisible();
    await io.assert.expectToBeTrue(accesskeyError, "");
    var secretAccessKeyError = await page.locator(
      selectors.connectionsPagePO.AMAZON_REDSHIFT_SECRET_ACCESS_KEY_ERROR
    ).isVisible();
    await io.assert.expectToBeTrue(secretAccessKeyError, "");
    var usernameError = await page.locator(
      selectors.connectionsPagePO.AMAZON_REDSHIFT_CONNECTION_USERNAME_ERROR
    ).isVisible();
    await io.assert.expectToBeTrue(usernameError, "");
    var databasenameError = await page.locator(
      selectors.connectionsPagePO.AMAZON_REDSHIFT_CONNECTION_DATABASE_ERROR
    ).isVisible();
    await io.assert.expectToBeTrue(databasenameError, "");
    var clusternameError = await page.locator(
      selectors.connectionsPagePO.AMAZONREDSHIFT_CLUSTERNAME_ERROR
    ).isVisible();
    await io.assert.expectToBeTrue(clusternameError, "");
    test.step("*** All mandatory fields error message validated ***", async ()=>{});
    await page.locator(selectors.basePagePO.CLOSE).click();

    await page.locator(selectors.basePagePO.DISCARD_CHANGES).click();
  });
});
