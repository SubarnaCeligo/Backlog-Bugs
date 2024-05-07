import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("C108197", () => {
    test.beforeEach(async ({ io }) => {
      await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
      await io.homePage.loadingTime()
    });
    test("@Env-All @Zephyr-IO-T24175 C108197 Verify the fields of export when installed using ZIP using PKCE", async ({ io, page }) => {
      await io.connectionPage.navigateTo(io.data.links.CONNECTIONS_PAGE_URL);
      await io.connectionPage.click(selectors.basePagePO.ADD_NEW_RESOURCE);
      await io.connectionPage.waitForElementAttached(selectors.connectionsPagePO.CONNECTION_SEARCH);
      await io.connectionPage.fill(selectors.connectionsPagePO.CONNECTION_SEARCH, 'http');
      await io.connectionPage.waitForElementAttached(selectors.basePagePO.HTTP_2DOT0)
      await io.connectionPage.click(selectors.basePagePO.HTTP_2DOT0);
      await io.flowBuilder.loadingTime();
      await io.connectionPage.fill(selectors.connectionsPagePO.CONNECTION_NAME, '108197_connection');
      await io.connectionPage.fill(selectors.connectionsPagePO.BASE_URI, 'https://qa.staging.integrator.io');
      await io.connectionPage.click(selectors.connectionsPagePO.SLACK_AUTH_TYPE);
      await io.connectionPage.clickByText("Custom");
      await io.flowBuilder.loadingTime();
      await io.connectionPage.click(
        selectors.connectionsPagePO.REFRESH_TOKEN_CUSTOM
      );
      await io.connectionPage.fill('[name="/http/auth/token/refreshToken"]', 'testC108197');
      await io.connectionPage.click(selectors.flowBuilderPagePO.REFRESH_HTTP_METHOD);
      await io.connectionPage.clickByText("GET");
      await io.connectionPage.click(selectors.basePagePO.SAVE_AND_CLOSE);
      await io.flowBuilder.loadingTime();
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
    await page.getByText("108197_connection",{exact: false}).first().click();
    await io.connectionPage.click(selectors.basePagePO.SAVE);
    await io.homePage.click(
      selectors.integrationPagePO.SETUP_INTEGRATION_INSTALL_BUTTON
    );
    await page.locator('a:has-text("C107061")').nth(1).click();
    await io.flowBuilder.click(selectors.flowBuilderPagePO.EXPORT);
    await io.flowBuilder.click(selectors.connectionsPagePO.EDIT_RESOURCE);
    await io.homePage.loadingTime();
    await io.flowBuilder.delay(5000);
    });
});