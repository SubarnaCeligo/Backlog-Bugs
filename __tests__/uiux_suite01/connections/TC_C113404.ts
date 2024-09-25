import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import * as C113408 from "@testData/Connections/TC_C113408.json";

test.describe("C113404", () => {
  test.beforeEach(async ({ io }) => {
    await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.loadingTime()
  });

  test("@Env-All @Env-IAQA @Zephyr-IO-T15070 C113404 Verify user able see JWT field in HTTP 2.0 framework", async ({ io, page }) => {
    await io.connectionPage.navigateTo(io.data.links.CONNECTIONS_PAGE_URL);
    await io.homePage.loadingTime()
    await io.connectionPage.click(selectors.basePagePO.ADD_NEW_RESOURCE);
    await io.connectionPage.waitForElementAttached(selectors.connectionsPagePO.CONNECTION_SEARCH);
    await io.connectionPage.fill(selectors.connectionsPagePO.CONNECTION_SEARCH, 'Gusto');
    await io.connectionPage.waitForElementAttached(selectors.connectionsPagePO.GUSTO_CONNECTION)
    await io.connectionPage.click(selectors.connectionsPagePO.GUSTO_CONNECTION);
    await io.flowBuilder.loadingTime();
    await io.connectionPage.waitForElementAttached(selectors.integrationPagePO.ADDNEWRESOURCE);
    await io.connectionPage.click(selectors.connectionsPagePO.CREATE_ICLIENT);
    await io.homePage.loadingTime()
    await io.connectionPage.waitForElementAttached(selectors.basePagePO.HTTP_2DOT0);
    await io.connectionPage.clickByIndex(selectors.basePagePO.HTTP_2DOT0, 1);
    const monitorExp = await io.homePage.isVisible("text='Use JWT'");
    await io.assert.expectToBeValue(monitorExp.toString(), 'true', "Value is found");
  });

  test("@Env-All @Env-IAQA @Zephyr-IO-T15071 C113405 Verify the signature field and dropdown values", async ({ io, page }) => {
    await io.connectionPage.navigateTo(io.data.links.CONNECTIONS_PAGE_URL);
    await io.connectionPage.click(selectors.basePagePO.ADD_NEW_RESOURCE);
    await io.connectionPage.waitForElementAttached(selectors.connectionsPagePO.CONNECTION_SEARCH);
    await io.connectionPage.fill(selectors.connectionsPagePO.CONNECTION_SEARCH, 'Gusto');
    await io.connectionPage.waitForElementAttached(selectors.connectionsPagePO.GUSTO_CONNECTION);
    await io.connectionPage.click(selectors.connectionsPagePO.GUSTO_CONNECTION);
    await io.flowBuilder.loadingTime();
    await io.connectionPage.waitForElementAttached(selectors.integrationPagePO.ADDNEWRESOURCE);
    await io.connectionPage.click(selectors.connectionsPagePO.CREATE_ICLIENT);
    await io.connectionPage.waitForElementAttached(selectors.basePagePO.HTTP_2DOT0);
    await io.connectionPage.clickByIndex(selectors.basePagePO.HTTP_2DOT0, 1);
    await io.connectionPage.click(selectors.connectionsPagePO.JWTENABLE);
    await io.connectionPage.click(selectors.connectionsPagePO.JWTSIGNATURE);
    await io.assert.verifyElementDisplayedByText(
      "ES256", "error if val not found"
    );
    await io.assert.verifyElementDisplayedByText(
      "ES384", "error if val not found"
    );
    await io.assert.verifyElementDisplayedByText(
      "ES512", "error if val not found"
    );
    await io.assert.verifyElementDisplayedByText(
      "HMAC-SHA256", "error if val not found"
    );
    await io.assert.verifyElementDisplayedByText(
      "HMAC-SHA384", "error if val not found"
    );
    await io.assert.verifyElementDisplayedByText(
      "HMAC-SHA512", "error if val not found"
    );
  });

  test("@Env-All @Env-IAQA @Zephyr-IO-T15072 C113406 Verify the fields when user select HMAC signature method", async ({ io, page }) => {
    await io.connectionPage.navigateTo(io.data.links.CONNECTIONS_PAGE_URL);
    await io.connectionPage.click(selectors.basePagePO.ADD_NEW_RESOURCE);
    await io.connectionPage.waitForElementAttached(selectors.connectionsPagePO.CONNECTION_SEARCH);
    await io.connectionPage.fill(selectors.connectionsPagePO.CONNECTION_SEARCH, 'Gusto');
    await io.connectionPage.waitForElementAttached(selectors.connectionsPagePO.GUSTO_CONNECTION);
    await io.connectionPage.click(selectors.connectionsPagePO.GUSTO_CONNECTION);
    await io.flowBuilder.loadingTime();
    await io.connectionPage.waitForElementAttached(selectors.integrationPagePO.ADDNEWRESOURCE);
    await io.connectionPage.click(selectors.connectionsPagePO.CREATE_ICLIENT);

    await io.connectionPage.waitForElementAttached(selectors.basePagePO.HTTP_2DOT0);
    await io.connectionPage.clickByIndex(selectors.basePagePO.HTTP_2DOT0, 1);
    await io.connectionPage.click(selectors.connectionsPagePO.JWTENABLE);
    await io.connectionPage.click(selectors.connectionsPagePO.JWTSIGNATURE);
    await io.connectionPage.selectTextfromDropDown(page, "hmac-sha256");
    const monitorExp = await io.homePage.isVisible("text='Secret'");
    await io.assert.expectToBeValue(monitorExp.toString(), 'true', "Value is found");
    const monitorExp1 = await io.homePage.isVisible("text='Payload'");
    await io.assert.expectToBeValue(monitorExp1.toString(), 'true', "Value is found");
    const monitorExp2 = await io.homePage.isVisible("text='JWT headers'");
    await io.assert.expectToBeValue(monitorExp2.toString(), 'true', "Value is found");
  });

  test("@Env-All @Env-IAQA @Zephyr-IO-T15073 C113407 Verify the fields when user select RS/PS/ES signature method", async ({ io, page }) => {
    await io.connectionPage.navigateTo(io.data.links.CONNECTIONS_PAGE_URL);
    await io.connectionPage.click(selectors.basePagePO.ADD_NEW_RESOURCE);
    await io.connectionPage.waitForElementAttached(selectors.connectionsPagePO.CONNECTION_SEARCH);
    await io.connectionPage.fill(selectors.connectionsPagePO.CONNECTION_SEARCH, 'Gusto');
    await io.connectionPage.waitForElementAttached(selectors.connectionsPagePO.GUSTO_CONNECTION);
    await io.connectionPage.click(selectors.connectionsPagePO.GUSTO_CONNECTION);
    await io.flowBuilder.loadingTime();
    await io.connectionPage.waitForElementAttached(selectors.integrationPagePO.ADDNEWRESOURCE);
    await io.connectionPage.click(selectors.connectionsPagePO.CREATE_ICLIENT);
    await io.connectionPage.waitForElementAttached(selectors.basePagePO.HTTP_2DOT0);
    await io.connectionPage.clickByIndex(selectors.basePagePO.HTTP_2DOT0, 1);
    await io.connectionPage.click(selectors.connectionsPagePO.JWTENABLE);
    await io.connectionPage.click(selectors.connectionsPagePO.JWTSIGNATURE);
    await io.connectionPage.selectTextfromDropDown(page, "es256");
    const monitorExp = await io.homePage.isVisible("text='Private key'");
    await io.assert.expectToBeValue(monitorExp.toString(), 'true', "Value is found");
    const monitorExp1 = await io.homePage.isVisible("text='Payload'");
    await io.assert.expectToBeValue(monitorExp1.toString(), 'true', "Value is found");
    const monitorExp2 = await io.homePage.isVisible("text='JWT headers'");
    await io.assert.expectToBeValue(monitorExp2.toString(), 'true', "Value is found");
  });

  test("@Env-All @Zephyr-IO-T15074 C113408 Verify user able to create iclient through connection>>iclient", async ({ io, page }) => {
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.click(selectors.basePagePO.RESOURCES);
    await io.connectionPage.click(selectors.connectionsPagePO.ICLIENTSTAB);
    await io.connectionPage.click(selectors.basePagePO.ADD_NEW_RESOURCE);
    await io.connectionPage.waitForElementAttached(selectors.basePagePO.INPUT_NAME_SELECTOR);
    await io.connectionPage.fill(selectors.basePagePO.INPUT_NAME_SELECTOR, "ICLIENT_DOCSIGN");
    await io.connectionPage.waitForElementAttached(selectors.connectionsPagePO.OAUTH2_GRANT_TYPE);
    await io.connectionPage.click(selectors.connectionsPagePO.OAUTH2_GRANT_TYPE);
    await io.connectionPage.selectTextfromDropDown(page, "authorizecode");
    await io.connectionPage.click(selectors.connectionsPagePO.JWTENABLE);
    await io.connectionPage.fill(selectors.connectionsPagePO.CLIENTS_ID, C113408.CLIENT_ID);
    await io.connectionPage.click(selectors.connectionsPagePO.JWTSIGNATURE);
    await io.connectionPage.selectTextfromDropDown(page, "rsa-sha256");
    await io.connectionPage.fill(selectors.connectionsPagePO.PRIVATEKEY, C113408.PRIVATE_KEY);
    await page.locator(selectors.connectionsPagePO.PAYLOAD_JWT).nth(0).click({ clickCount: 3 });
    await page.keyboard.press('Backspace');
    await io.connectionPage.enterHugeData(
      selectors.connectionsPagePO.PAYLOAD_JWT,
      '{"sub":"20fee198-5d7f-4f2e-8840-3accab296c5e","iss":"2e4a8e0b-6448-4b02-8c7b-264eb997ab05","aud":"account-d.docusign.com","scope":"signature impersonation"}'
    );
    await io.connectionPage.fill(selectors.connectionsPagePO.AUTHORIZATION_URL, "https://account-d.docusign.com/oauth/auth");
    await io.connectionPage.fill(selectors.connectionsPagePO.ACCESS_TOKEN_URL, "https://account-d.docusign.com/oauth/token");
    await io.connectionPage.fill(selectors.connectionsPagePO.VALID_DOMAIN, "demo.docusign.net");
    await io.connectionPage.click(selectors.connectionsPagePO.ACCESS_TOKEN);
    await io.connectionPage.selectTextfromDropDown(page, "header");
    await io.connectionPage.click(selectors.connectionsPagePO.OAUTH_SCHEMES);
    await io.connectionPage.selectTextfromDropDown(page, "Bearer");
    await io.connectionPage.click(selectors.basePagePO.SAVE_AND_CLOSE);
  });

  test("@Env-All @Zephyr-IO-T15075 C113411 Verify user is able to create connection using JWT", async ({ io, page }) => {
    await io.connectionPage.navigateTo(io.data.links.CONNECTIONS_PAGE_URL);
    await io.connectionPage.click(selectors.basePagePO.ADD_NEW_RESOURCE);
    await io.connectionPage.waitForElementAttached(selectors.connectionsPagePO.CONNECTION_SEARCH);
    await io.connectionPage.fill(selectors.connectionsPagePO.CONNECTION_SEARCH, 'http');
    await io.connectionPage.waitForElementAttached(selectors.basePagePO.HTTP_2DOT0)
    await io.connectionPage.click(selectors.basePagePO.HTTP_2DOT0);
    await io.flowBuilder.loadingTime();
    await io.connectionPage.click(selectors.connectionsPagePO.SLACK_AUTH_TYPE);
    await io.connectionPage.selectTextfromDropDown(page, "oauth");
    await io.connectionPage.click(selectors.connectionsPagePO.ICLIENT_ID);
    await io.connectionPage.selectTextfromDropDown(page, "ICLIENT_DOCSIGN_DND");
  });


  test("@Env-All @Env-IAQA @Zephyr-IO-T15076 C113412 Verify user is able to see JWT in edit case", async ({ io, page }) => {
    await io.connectionPage.navigateTo(io.data.links.CONNECTIONS_PAGE_URL);
    await io.connectionPage.click(selectors.basePagePO.ADD_NEW_RESOURCE);
    await io.connectionPage.waitForElementAttached(selectors.connectionsPagePO.CONNECTION_SEARCH);
    await io.connectionPage.fill(selectors.connectionsPagePO.CONNECTION_SEARCH, 'http');
    await io.connectionPage.waitForElementAttached(selectors.basePagePO.HTTP_2DOT0)
    await io.connectionPage.click(selectors.basePagePO.HTTP_2DOT0);
    await io.flowBuilder.loadingTime();
    await io.connectionPage.click(selectors.connectionsPagePO.SLACK_AUTH_TYPE);
    await io.connectionPage.selectTextfromDropDown(page, "oauth");
    await io.connectionPage.click(selectors.connectionsPagePO.ICLIENT_ID);
    await io.homePage.waitForElementAttached(selectors.connectionsPagePO.ICLIENT_LIST);
    let iclients = await io.api.getCall("v1/iclients");
    let id = null;
    if (iclients != null && iclients != undefined) {
      for (const iclient of iclients) {
        try {
          id = iclient._id;
          const name = iclient.name;
          if (name == "3PL ICLIENT") {
            break;
          }

        } catch (error) {
          console.log(error);
        }
      }
    }
    await io.connectionPage.selectTextfromDropDown(page, id);
    await io.connectionPage.click(selectors.connectionsPagePO.EDIT_RESOURCE);
    const monitorExp2 = await io.homePage.isVisible("text='Use JWT'");
    await io.assert.expectToBeValue(monitorExp2.toString(), 'true', "Value is found");
  });

  test("@Env-All @Zephyr-IO-T15079 C113420 Verify all the send token via dropdown values", async ({ io, page }) => {
    await io.connectionPage.navigateTo(io.data.links.CONNECTIONS_PAGE_URL);
    await io.connectionPage.click(selectors.basePagePO.ADD_NEW_RESOURCE);
    await io.connectionPage.waitForElementAttached(selectors.connectionsPagePO.CONNECTION_SEARCH);
    await io.connectionPage.fill(selectors.connectionsPagePO.CONNECTION_SEARCH, 'http');
    await io.connectionPage.waitForElementAttached(selectors.basePagePO.HTTP_2DOT0)
    await io.connectionPage.click(selectors.basePagePO.HTTP_2DOT0);
    await io.flowBuilder.loadingTime();
    await io.connectionPage.click(selectors.connectionsPagePO.SLACK_AUTH_TYPE);
    await io.connectionPage.selectTextfromDropDown(page, "oauth");
    await io.connectionPage.waitForElementAttached(selectors.connectionsPagePO.CREATE_CONNECTION)
    await io.connectionPage.clickByIndex(selectors.connectionsPagePO.CREATE_CONNECTION, 1);
    await io.connectionPage.click(selectors.connectionsPagePO.OAUTH2_GRANT_TYPE);
    await io.connectionPage.selectTextfromDropDown(page, "authorizecode");
    await io.connectionPage.click(selectors.connectionsPagePO.ENABLEJWT);
    await io.connectionPage.click(selectors.connectionsPagePO.ACCESS_TOKEN);
    const monitorExp12 = await io.homePage.isVisible("text='HTTP body'");
    await io.assert.expectToBeValue(monitorExp12.toString(), 'true', "Value is found");
    const monitorExp13 = await io.homePage.isVisible("text='HTTP header'");
    await io.assert.expectToBeValue(monitorExp13.toString(), 'true', "Value is found");
    const monitorExp14 = await io.homePage.isVisible("text='URL parameter'");
    await io.assert.expectToBeValue(monitorExp14.toString(), 'true', "Value is found");
  });
  test("@Env-All @Zephyr-IO-T15080 C113421 Verify the UI when user toggle between three Grant types", async ({ io, page }) => {
    await io.connectionPage.navigateTo(io.data.links.CONNECTIONS_PAGE_URL);
    await io.connectionPage.click(selectors.basePagePO.ADD_NEW_RESOURCE);
    await io.connectionPage.waitForElementAttached(selectors.connectionsPagePO.CONNECTION_SEARCH);
    await io.connectionPage.fill(selectors.connectionsPagePO.CONNECTION_SEARCH, 'http');
    await io.connectionPage.waitForElementAttached(selectors.basePagePO.HTTP_2DOT0)
    await io.connectionPage.click(selectors.basePagePO.HTTP_2DOT0);
    await io.flowBuilder.loadingTime();
    await io.connectionPage.click(selectors.connectionsPagePO.SLACK_AUTH_TYPE);
    await io.connectionPage.selectTextfromDropDown(page, "oauth");
    await io.connectionPage.waitForElementAttached(selectors.connectionsPagePO.CREATE_CONNECTION);
    await io.connectionPage.clickByIndex(selectors.connectionsPagePO.CREATE_CONNECTION, 1);
    await io.connectionPage.click(selectors.connectionsPagePO.OAUTH2_GRANT_TYPE);
    const monitorExp12 = await io.homePage.isVisible("text='Authorization code'");
    await io.assert.expectToBeValue(monitorExp12.toString(), 'true', "Value is found");
  });
});