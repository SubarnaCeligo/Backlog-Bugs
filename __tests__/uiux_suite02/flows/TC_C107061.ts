import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("C107061", () => {
  test.beforeEach(async ({ io }) => {
    await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.loadingTime()
  });
  test("@Env-All @Zephyr-IO-T23913 C107061 Verify the fields of export when installed using ZIP using PKCE", async ({ io, page }) => {
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.click(selectors.basePagePO.RESOURCES);
    await io.connectionPage.click(selectors.connectionsPagePO.ICLIENTSTAB);
    await io.connectionPage.click(selectors.basePagePO.ADD_NEW_RESOURCE);
    await io.connectionPage.waitForElementAttached(selectors.basePagePO.INPUT_NAME_SELECTOR);
    await io.connectionPage.fill(selectors.basePagePO.INPUT_NAME_SELECTOR, "107061_ICLIENT");
    await io.connectionPage.waitForElementAttached(selectors.connectionsPagePO.OAUTH2_GRANT_TYPE);
    await io.connectionPage.click(selectors.connectionsPagePO.OAUTH2_GRANT_TYPE);
    await io.connectionPage.selectTextfromDropDown(page, "authorizecodewithpkce");
    await io.connectionPage.fill(selectors.connectionsPagePO.CLIENTS_ID, 'test-C107061');
    await io.connectionPage.fill(selectors.connectionsPagePO.CLIENTSECRET3PL, 'test-C107061');
    await io.connectionPage.fill(selectors.connectionsPagePO.AUTHORIZATION_URL, "https://qa.staging.integrator.io");
    await io.connectionPage.fill(selectors.connectionsPagePO.ACCESS_TOKEN_URL, "https://qa.staging.integrator.io");
    await io.connectionPage.fill(selectors.connectionsPagePO.VALID_DOMAIN, "qa.staging.integrator.io");
    await io.connectionPage.click(selectors.connectionsPagePO.ACCESS_TOKEN);
    await io.connectionPage.selectTextfromDropDown(page, "header");
    await io.connectionPage.click(selectors.basePagePO.SAVE_AND_CLOSE);
    await io.connectionPage.navigateTo(io.data.links.CONNECTIONS_PAGE_URL);
    await io.connectionPage.click(selectors.basePagePO.ADD_NEW_RESOURCE);
    await io.connectionPage.waitForElementAttached(selectors.connectionsPagePO.CONNECTION_SEARCH);
    await io.connectionPage.fill(selectors.connectionsPagePO.CONNECTION_SEARCH, 'http');
    await io.connectionPage.waitForElementAttached(selectors.basePagePO.HTTP_2DOT0)
    await io.connectionPage.click(selectors.basePagePO.HTTP_2DOT0);
    await io.flowBuilder.loadingTime();
    await io.connectionPage.fill(selectors.connectionsPagePO.CONNECTION_NAME, 'CONNECTION_C107061');
    await io.connectionPage.fill(selectors.connectionsPagePO.BASE_URI, 'https://qa.staging.integrator.io');
    await io.connectionPage.click(selectors.connectionsPagePO.SLACK_AUTH_TYPE);
    await io.connectionPage.clickByText("OAuth 2.0");
    await io.connectionPage.click(selectors.connectionsPagePO.ICLIENTID);
    const iClientId = await page.getByText("107061_ICLIENT").first();
    await iClientId.click();
    await io.connectionPage.click(selectors.basePagePO.SAVE);
    await io.homePage.addStep("Creating and running the flow");
    await io.homePage.navigateTo(
      `${io.data.links.HOME_PAGE_URL}/installIntegration`
    );
    const fileChooserPromise = page.waitForEvent("filechooser");
    await io.homePage.clickByText("Choose file");
    const fileChooser = await fileChooserPromise;
    await fileChooser.setFiles("testData/inputData/FlowBuilder/TC_C107061.zip");
    await io.homePage.addStep("Uploaded integration zip file");
    await io.homePage.clickByText("Install integration");
    await io.homePage.click(selectors.basePagePO.DIALOG_PROCEED_BUTTON);
    await io.homePage.click(
      selectors.integrationPagePO.SETUP_INTEGRATION_CONFIGURE_BUTTON
    );
    await io.homePage.clickByText("Use existing connection");
    await io.homePage.clickByText("Please select");
    let connMap = await io.api.loadConnections()
    let id = connMap.get("CONNECTION_C107061")
    await io.homePage.selectTextfromDropDown(page, id)
    await io.connectionPage.click(selectors.basePagePO.SAVE);
    await io.homePage.click(
      selectors.integrationPagePO.SETUP_INTEGRATION_INSTALL_BUTTON
    );
    await page.locator('a:has-text("C107061")').nth(1).click();
    await io.flowBuilder.click(selectors.flowBuilderPagePO.EXPORT);
    await io.flowBuilder.click(selectors.connectionsPagePO.EDIT_RESOURCE);
    await io.homePage.loadingTime();
    const element = page.locator(selectors.connectionsPagePO.ICLIENTID);
    await element.scrollIntoViewIfNeeded();
    const editimport1 = await page.$$(selectors.connectionsPagePO.EDIT_RESOURCE);
    await editimport1[1].click();
    await expect(page.getByText("Authorization code with PKCE")).toBeVisible();
    await page.getByText("test-C107061");
  });
});