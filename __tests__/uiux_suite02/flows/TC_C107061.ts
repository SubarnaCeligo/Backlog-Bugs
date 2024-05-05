import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("C107061", () => {
    test.beforeEach(async ({ io }) => {
      await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
      await io.homePage.loadingTime()
    });
    test("@Env-QA @Env-IAQA @Zephyr-IO-T15072 C113406 Verify the fields when user select HMAC signature method", async ({ io, page }) => {
      // await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
      // await io.homePage.click(selectors.basePagePO.RESOURCES);
      // await io.connectionPage.click(selectors.connectionsPagePO.ICLIENTSTAB);
      // await io.connectionPage.click(selectors.basePagePO.ADD_NEW_RESOURCE);
      // await io.connectionPage.waitForElementAttached(selectors.basePagePO.INPUT_NAME_SELECTOR);
      // await io.connectionPage.fill(selectors.basePagePO.INPUT_NAME_SELECTOR, "107061_ICLIENT");
      // await io.connectionPage.waitForElementAttached(selectors.connectionsPagePO.OAUTH2_GRANT_TYPE);
      // await io.connectionPage.click(selectors.connectionsPagePO.OAUTH2_GRANT_TYPE);
      // await io.connectionPage.selectTextfromDropDown(page, "authorizecodewithpkce");
      // await io.connectionPage.fill(selectors.connectionsPagePO.CLIENTS_ID, 'test-C107061');
      // await io.connectionPage.fill(selectors.connectionsPagePO.CLIENTSECRET3PL, 'test-C107061');
      // await io.connectionPage.fill(selectors.connectionsPagePO.AUTHORIZATION_URL, "https://qa.staging.integrator.io");
      // await io.connectionPage.fill(selectors.connectionsPagePO.ACCESS_TOKEN_URL, "https://qa.staging.integrator.io");
      // await io.connectionPage.fill(selectors.connectionsPagePO.VALID_DOMAIN, "qa.staging.integrator.io");
      // await io.connectionPage.click(selectors.connectionsPagePO.ACCESS_TOKEN);
      // await io.connectionPage.selectTextfromDropDown(page, "header");
      // await io.connectionPage.click(selectors.basePagePO.SAVE_AND_CLOSE);
      // await io.connectionPage.navigateTo(io.data.links.CONNECTIONS_PAGE_URL);
      // await io.connectionPage.click(selectors.basePagePO.ADD_NEW_RESOURCE);
      // await io.connectionPage.waitForElementAttached(selectors.connectionsPagePO.CONNECTION_SEARCH);
      // await io.connectionPage.fill(selectors.connectionsPagePO.CONNECTION_SEARCH, 'http');
      // await io.connectionPage.waitForElementAttached(selectors.basePagePO.HTTP_2DOT0)
      // await io.connectionPage.click(selectors.basePagePO.HTTP_2DOT0);
      // await io.flowBuilder.loadingTime();
      // await io.connectionPage.fill(selectors.connectionsPagePO.CONNECTION_NAME, 'CONNECTION_C107061');
      // await io.connectionPage.fill(selectors.connectionsPagePO.BASE_URI, 'https://qa.staging.integrator.io');
      // await io.connectionPage.click(selectors.connectionsPagePO.SLACK_AUTH_TYPE);
      // await io.connectionPage.clickByText("OAuth 2.0");
      // await io.connectionPage.click(selectors.connectionsPagePO.ICLIENTID);
      // await io.connectionPage.clickByText("107061_ICLIENT");
      // await io.connectionPage.click(selectors.basePagePO.SAVE);
      await io.homePage.addStep("Creating and running the flow");
      await io.homePage.navigateTo(
        `${io.data.links.HOME_PAGE_URL}/installIntegration`
      );
      const fileChooserPromise = page.waitForEvent("filechooser");
      await io.homePage.clickByText("Choose file");
      const fileChooser = await fileChooserPromise;
      await fileChooser.setFiles("testData/inputData/FlowBuilder/TC_C107061_1.zip");
      await io.homePage.addStep("Uploaded integration zip file");
    await io.homePage.clickByText("Install integration");
    await io.homePage.click(selectors.basePagePO.DIALOG_PROCEED_BUTTON);
    await io.homePage.click(
      selectors.integrationPagePO.SETUP_INTEGRATION_CONFIGURE_BUTTON
    );
    await io.homePage.clickByText("Use existing connection");
    await io.homePage.clickByText("Please select");
    await io.connectionPage.clickByText("CONNECTION_C107061 - Offline");
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
      // await io.connectionPage.click(selectors.await io.connectionPage.fill(selectors.connectionsPagePO.VALID_DOMAIN, "demo.docusign.net");connectionsPagePO.JWTSIGNATURE);
      // await io.connectionPage.selectTextfromDropDown(page, "rsa-sha256");
      // await io.connectionPage.fill(selectors.connectionsPagePO.PRIVATEKEY, C113408.PRIVATE_KEY);
      // await page.locator(selectors.connectionsPagePO.PAYLOAD_JWT).nth(0).click({ clickCount: 3 });
      // await page.keyboard.press('Backspace');
      // await io.connectionPage.enterHugeData(
      //   selectors.connectionsPagePO.PAYLOAD_JWT,
      //   '{"sub":"20fee198-5d7f-4f2e-8840-3accab296c5e","iss":"2e4a8e0b-6448-4b02-8c7b-264eb997ab05","aud":"account-d.docusign.com","scope":"signature impersonation"}'
      // );
      // await io.connectionPage.fill(selectors.connectionsPagePO.AUTHORIZATION_URL, "https://account-d.docusign.com/oauth/auth");
      // await io.connectionPage.fill(selectors.connectionsPagePO.ACCESS_TOKEN_URL, "https://account-d.docusign.com/oauth/token");
      // await io.connectionPage.fill(selectors.connectionsPagePO.VALID_DOMAIN, "demo.docusign.net");
      // await io.connectionPage.click(selectors.connectionsPagePO.ACCESS_TOKEN);
      // await io.connectionPage.selectTextfromDropDown(page, "header");
      // await io.connectionPage.click(selectors.connectionsPagePO.OAUTH_SCHEMES);
      // await io.connectionPage.selectTextfromDropDown(page, "Bearer");
      // await io.connectionPage.click(selectors.basePagePO.SAVE_AND_CLOSE);
      await io.flowBuilder.delay(15000);
        // await io.connectionPage.navigateTo(io.data.links.CONNECTIONS_PAGE_URL);
        // await io.connectionPage.click(selectors.basePagePO.ADD_NEW_RESOURCE);
        // await io.connectionPage.waitForElementAttached(selectors.connectionsPagePO.CONNECTION_SEARCH);
        // await io.connectionPage.fill(selectors.connectionsPagePO.CONNECTION_SEARCH, 'Gusto');
        // await io.connectionPage.waitForElementAttached(selectors.connectionsPagePO.GUSTO_CONNECTION);
        // await io.connectionPage.click(selectors.connectionsPagePO.GUSTO_CONNECTION);
        // await io.flowBuilder.loadingTime();
        // await io.connectionPage.waitForElementAttached(selectors.integrationPagePO.ADDNEWRESOURCE);
        // await io.connectionPage.click(selectors.connectionsPagePO.CREATE_ICLIENT);
        
        // await io.connectionPage.waitForElementAttached(selectors.basePagePO.HTTP_2DOT0);
        // await io.connectionPage.clickByIndex(selectors.basePagePO.HTTP_2DOT0, 1);
      });
});