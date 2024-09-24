import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("TC_CIO54642", () => {
  test("@Env-All @Zephyr-IO-TCIO54642 Verify SSL type fields", async ({
    io,
    page
  }) => {
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.waitForElementAttached(selectors.basePagePO.TOOLS);
    await io.homePage.goToMenu("Resources", "Connections");
    await io.flowBuilder.waitForElementAttached(selectors.connectionsPagePO.CREATE_CONNECTION);
    await io.flowBuilderDashboard.loadingTime();
    await io.flowBuilder.click(selectors.connectionsPagePO.CREATE_CONNECTION);
    await io.flowBuilder.waitForElementAttached(selectors.settingsPagePO.APP_NAME_INPUT);
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.fill(
      selectors.settingsPagePO.APP_NAME_INPUT,
      "HTTP"
    );
    await io.flowBuilder.waitForElementAttached(selectors.connectionsPagePO.HTTP_CNNECTOR);
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.click(selectors.connectionsPagePO.HTTP_CNNECTOR);
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.fill(
      selectors.importPagePO.HTTP_BASEURI, "https://google.com"
    );
    await io.flowBuilder.fill(
      selectors.exportsPagePO.BQNAME, "SSL FIELDS TEST"
    );
    await io.connectionPage.click(selectors.connectionsPagePO.AUTH_TYPE);
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.waitForElementAttached(selectors.connectionsPagePO.CUSTOM);
    await io.flowBuilder.loadingTime();
    await io.connectionPage.click(selectors.connectionsPagePO.CUSTOM);
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.click(selectors.importPagePO.ADVANCED);
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.click(selectors.connectionsPagePO.SSL_CERTIFICATE);
    await io.flowBuilder.click(selectors.connectionsPagePO.SSL_PFX);
    await io.assert.expectToBeTrue(await (await page.$("[data-test='http.clientCertificates.pfx']")).isVisible(), "SSL cerificate is not visible");
    await io.assert.expectToBeTrue(await (await page.$(selectors.connectionsPagePO.SSL_PASSPHRASE)).isVisible(), "SSL passphrase is not visible");
    await io.flowBuilder.click(selectors.basePagePO.SAVE);
    await io.flowBuilder.loadingTime();
    await expect(page.getByText('A value must be provided')).toBeVisible();
    let fileInput2 = await page.$(selectors.basePagePO.UPLOAD_FILE);
    await fileInput2.setInputFiles("testData/inputData/Exports/export.json");
    await io.flowBuilder.click(selectors.basePagePO.SAVE);
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.waitForElementAttached(selectors.connectionsPagePO.SSL_CERTIFICATE);
    await io.flowBuilder.click(selectors.connectionsPagePO.SSL_CERTIFICATE);
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.click(selectors.connectionsPagePO.SSL_PEM);
    await io.assert.expectToBeTrue(await (await page.$(selectors.connectionsPagePO.SSL_CLIENT_KEY)).isVisible(), "SSL client key is visible");
    await io.assert.expectToBeTrue(await (await page.$(selectors.connectionsPagePO.SSL_CLIENT_CERT)).isVisible(), "SSL client cert is visible");
    await io.assert.expectToBeTrue(await (await page.$(selectors.connectionsPagePO.SSL_PASSPHRASE)).isVisible(), "SSL passphrase is not visible");
    let fileInput1 = await page.$(selectors.basePagePO.UPLOAD_FILE);
    await fileInput1.setInputFiles("testData/inputData/Exports/T28409.xml");
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.click(selectors.basePagePO.SAVE);
    await expect(page.getByText('A value must be provided')).toBeVisible();
    
    await io.flowBuilder.click(selectors.connectionsPagePO.SSL_CERTIFICATE);
    await io.flowBuilder.click(selectors.connectionsPagePO.SSL_PFX);
    let fileInput3 = await page.$(selectors.basePagePO.UPLOAD_FILE);
    await fileInput3.setInputFiles("testData/inputData/Exports/export.json");
    await io.flowBuilder.click(selectors.basePagePO.SAVE_AND_CLOSE);
    await io.flowBuilder.loadingTime();
    await io.homePage.fill(selectors.connectionsPagePO.CONNECTION_PAGE_SEARCH_BAR, "SSL FIELDS TEST");
    await io.homePage.loadingTime()
    await io.homePage.click(selectors.integrationPagePO.OPENACTIONSMENU);
    await io.homePage.loadingTime();
    await io.flowBuilder.click(selectors.connectionsPagePO.DELETE_CONNECTION);
    await io.flowBuilder.click(selectors.basePagePO.DELETE);
  });
});