import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("TC_CIO58085two", () => {
  test("@Env-All @Zephyr-IO-TIO58085 Override media type for error responses field should have Plain text option", async ({
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
      "Orderful"
    );
    await io.flowBuilder.waitForElementAttached(selectors.connectionsPagePO.ORDERFUL);
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.click(selectors.connectionsPagePO.ORDERFUL);
    await io.flowBuilder.waitForElementAttached(selectors.connectionsPagePO.HTTP_CNNECTOR);
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.click(selectors.connectionsPagePO.HTTP_CNNECTOR);
    await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.OVERRIDE_MEDIA_ERROR_RESPONSE);
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.click(
      selectors.flowBuilderPagePO.OVERRIDE_MEDIA_ERROR_RESPONSE
    );
    await io.flowBuilder.waitForElementAttached(selectors.connectionsPagePO.PLAINTEXT);
    await io.assert.verifyElementContainsText(
      selectors.connectionsPagePO.PLAINTEXT,
      "Plain text"
    );
  });
  test("@Env-All @Zephyr-IO-TIO58085 When Override media type for error responses field is Plain text then remove related fields", async ({
    io,
    page
  }) => {
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.waitForElementAttached(selectors.basePagePO.TOOLS);
    await io.homePage.goToMenu("Resources", "Connections");
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.waitForElementAttached(selectors.connectionsPagePO.CREATE_CONNECTION);
    await io.flowBuilder.click(selectors.connectionsPagePO.CREATE_CONNECTION);
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.waitForElementAttached(selectors.settingsPagePO.APP_NAME_INPUT);
    await io.flowBuilder.fill(
      selectors.settingsPagePO.APP_NAME_INPUT,
      "Orderful"
    );
    await io.flowBuilder.waitForElementAttached(selectors.connectionsPagePO.ORDERFUL);
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.click(selectors.connectionsPagePO.ORDERFUL);
    await io.flowBuilder.waitForElementAttached(selectors.connectionsPagePO.HTTP_CNNECTOR);
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.click(selectors.connectionsPagePO.HTTP_CNNECTOR);
    await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.OVERRIDE_MEDIA_ERROR_RESPONSE);
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.click(
      selectors.flowBuilderPagePO.OVERRIDE_MEDIA_ERROR_RESPONSE
    );
    await io.flowBuilder.waitForElementAttached(selectors.connectionsPagePO.PLAINTEXT);
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.click(selectors.connectionsPagePO.PLAINTEXT);
    await io.flowBuilder.waitForElementAttached(
      selectors.exportsPagePO.NON_STANDARD_API_TAB
    );
    await io.flowBuilder.loadingTime();
    await io.connectionPage.click(selectors.exportsPagePO.NON_STANDARD_API_TAB);
    await io.flowBuilder.waitForElementAttached(
      selectors.flowBuilderPagePO.NONSTANDARD
    );
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.click(selectors.flowBuilderPagePO.NONSTANDARD);
    await io.flowBuilder.waitForElementAttached(
      selectors.flowBuilderPagePO.HOWTOTESTCONN
    );
    await io.flowBuilder.loadingTime();
    await io.connectionPage.click(selectors.flowBuilderPagePO.HOWTOTESTCONN);
    await io.flowBuilder.loadingTime();
    const failPath = await io.homePage.isVisible(
      selectors.flowBuilderPagePO.FAILPATHHTTP
    );
    const errorPath = await io.homePage.isVisible(
      selectors.flowBuilderPagePO.PINGERRORPATH
    );
    const authFailPath = await io.homePage.isVisible(
      selectors.flowBuilderPagePO.FAILPATH
    );
    const limitFailpath = await io.homePage.isVisible(
      selectors.connectionsPagePO.NON_STANDARD_API_RATE_FAIL_PATH
    );
    await io.assert.expectToBeValue(
      limitFailpath.toString(),
      "false",
      "Field limitFailpath is present in after Plain text is selected in Override media type for error responses field"
    );
    await io.assert.expectToBeValue(
      failPath.toString(),
      "false",
      "Field failPath is present in after Plain text is selected in Override media type for error responses field"
    );
    await io.assert.expectToBeValue(
      errorPath.toString(),
      "false",
      "Field errorPath is present in after Plain text is selected in Override media type for error responses field"
    );
    await io.assert.expectToBeValue(
      authFailPath.toString(),
      "false",
      "Field authFailPath is present in after Plain text is selected in Override media type for error responses field"
    );
  });
  test("@Env-All @Zephyr-IO-TIO58085 Override media type field should have Plain text option inside Configure refresh token section", async ({
    io,
    page
  }) => {
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.waitForElementAttached(selectors.basePagePO.TOOLS);
    await io.homePage.goToMenu("Resources", "Connections");
    await io.flowBuilder.waitForElementAttached(selectors.connectionsPagePO.CREATE_CONNECTION);
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.click(selectors.connectionsPagePO.CREATE_CONNECTION);
    await io.flowBuilder.waitForElementAttached(selectors.settingsPagePO.APP_NAME_INPUT);
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.fill(
      selectors.settingsPagePO.APP_NAME_INPUT,
      "Orderful"
    );
    await io.flowBuilder.waitForElementAttached(selectors.connectionsPagePO.ORDERFUL);
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.click(selectors.connectionsPagePO.ORDERFUL);
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.waitForElementAttached(selectors.connectionsPagePO.HTTP_CNNECTOR);
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.click(selectors.connectionsPagePO.HTTP_CNNECTOR);
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.waitForElementAttached(selectors.connectionsPagePO.AUTH_TYPE);
    await io.flowBuilder.loadingTime();
    await io.connectionPage.click(selectors.connectionsPagePO.AUTH_TYPE);
    await io.flowBuilder.waitForElementAttached(selectors.connectionsPagePO.CUSTOM);
    await io.flowBuilder.loadingTime();
    await io.connectionPage.click(selectors.connectionsPagePO.CUSTOM);
    await io.flowBuilder.waitForElementAttached(selectors.connectionsPagePO.REFRESH_TOKEN_CUSTOM);
    await io.flowBuilder.loadingTime();
    await io.connectionPage.click(
      selectors.connectionsPagePO.REFRESH_TOKEN_CUSTOM
    );
    await io.flowBuilder.waitForElementAttached(selectors.connectionsPagePO.REFRESH_MEDIATYPE);
    await io.flowBuilder.loadingTime();
    await io.connectionPage.click(selectors.connectionsPagePO.REFRESH_MEDIATYPE);
    await io.flowBuilder.waitForElementAttached(selectors.connectionsPagePO.PLAINTEXT);
    await io.assert.verifyElementContainsText(
      selectors.connectionsPagePO.PLAINTEXT,
      "Plain text"
    );
  });
  test("@Env-All @Zephyr-IO-TIO58085 Related fields should be removed if Override media type is Plain text", async ({
    io,
    page
  }) => {
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.waitForElementAttached(selectors.basePagePO.TOOLS);
    await io.homePage.goToMenu("Resources", "Connections");
    await io.flowBuilder.waitForElementAttached(selectors.connectionsPagePO.CREATE_CONNECTION);
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.click(selectors.connectionsPagePO.CREATE_CONNECTION);
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.fill(
      selectors.settingsPagePO.APP_NAME_INPUT,
      "Orderful"
    );
    await io.flowBuilder.waitForElementAttached(selectors.connectionsPagePO.ORDERFUL);
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.click(selectors.connectionsPagePO.ORDERFUL);
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.waitForElementAttached(selectors.connectionsPagePO.HTTP_CNNECTOR);
    await io.flowBuilder.click(selectors.connectionsPagePO.HTTP_CNNECTOR);
    await io.flowBuilder.waitForElementAttached(selectors.connectionsPagePO.AUTH_TYPE);
    await io.flowBuilder.loadingTime();
    await io.connectionPage.click(selectors.connectionsPagePO.AUTH_TYPE);
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.waitForElementAttached(selectors.connectionsPagePO.CUSTOM);
    await io.flowBuilder.loadingTime();
    await io.connectionPage.click(selectors.connectionsPagePO.CUSTOM);
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.waitForElementAttached(selectors.connectionsPagePO.REFRESH_TOKEN_CUSTOM);
    await io.flowBuilder.loadingTime();
    await io.connectionPage.click(
      selectors.connectionsPagePO.REFRESH_TOKEN_CUSTOM
    );
    await io.flowBuilder.waitForElementAttached(selectors.connectionsPagePO.REFRESH_MEDIATYPE);
    await io.flowBuilder.loadingTime();
    await io.connectionPage.click(selectors.connectionsPagePO.REFRESH_MEDIATYPE);
    await io.flowBuilder.waitForElementAttached(selectors.connectionsPagePO.PLAINTEXT);
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.click(selectors.connectionsPagePO.PLAINTEXT);
    await io.flowBuilder.waitForElementAttached(
      selectors.exportsPagePO.NON_STANDARD_API_TAB
    );
    await io.flowBuilder.loadingTime();
    await io.connectionPage.click(selectors.exportsPagePO.NON_STANDARD_API_TAB);
    await io.flowBuilder.waitForElementAttached(
      selectors.flowBuilderPagePO.NONSTANDARD
    );
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.click(selectors.flowBuilderPagePO.NONSTANDARD);
    await io.flowBuilder.waitForElementAttached(
      selectors.flowBuilderPagePO.HOWTOTESTCONN
    );
    await io.flowBuilder.loadingTime();
    await io.connectionPage.click(selectors.flowBuilderPagePO.HOWTOTESTCONN);
    await io.flowBuilder.loadingTime();
    const refreshTokenLocation = await io.homePage.isVisible(
      selectors.connectionsPagePO.REFRESH_TOKEN_LOCATION
    );
    const refreshTokenPath = await io.homePage.isVisible(
      selectors.flowBuilderPagePO.PATH_TO_TOKEN
    );
    await io.assert.expectToBeValue(
      refreshTokenLocation.toString(),
      "false",
      "Field refreshTokenLocation is present in after Plain text is selected in Override media type"
    );
    await io.assert.expectToBeValue(
      refreshTokenPath.toString(),
      "false",
      "Field refreshTokenPath is present in after Plain text is selected in Override media type"
    );
  });
  test("@Env-All @Zephyr-IO-TIO58085 If Media type is Plain text then Override media type for error responses field should not have Plain text option", async ({
    io,
    page
  }) => {
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.waitForElementAttached(selectors.basePagePO.TOOLS);
    await io.homePage.goToMenu("Resources", "Connections");
    await io.flowBuilder.waitForElementAttached(selectors.connectionsPagePO.CREATE_CONNECTION);
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.click(selectors.connectionsPagePO.CREATE_CONNECTION);
    await io.flowBuilder.waitForElementAttached(selectors.settingsPagePO.APP_NAME_INPUT);
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.fill(
      selectors.settingsPagePO.APP_NAME_INPUT,
      "Orderful"
    );
    await io.flowBuilder.waitForElementAttached(selectors.connectionsPagePO.ORDERFUL);
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.click(selectors.connectionsPagePO.ORDERFUL);
    await io.flowBuilder.waitForElementAttached(selectors.connectionsPagePO.HTTP_CNNECTOR);
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.click(selectors.connectionsPagePO.HTTP_CNNECTOR);
    await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.MEDIA_TYPE);
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.click(selectors.flowBuilderPagePO.MEDIA_TYPE);
    await io.flowBuilder.waitForElementAttached(selectors.connectionsPagePO.PLAINTEXT);
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.click(selectors.connectionsPagePO.PLAINTEXT);
    await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.OVERRIDE_MEDIA_ERROR_RESPONSE);
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.click(
      selectors.flowBuilderPagePO.OVERRIDE_MEDIA_ERROR_RESPONSE
    );
    const textArrayErrorResponse = await io.flowBuilder.getText(
      selectors.connectionsPagePO.OPTIONLIST
    );
    await io.assert.expectNotToBeValueInArray(
      textArrayErrorResponse,
      "Plain text",
      "Found Plain text in Array"
    );
  });
  test("@Env-All @Zephyr-IO-TIO58085 If Media type is Plain text then Override media type for success responses field should not have Plain text option", async ({
    io,
    page
  }) => {
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.waitForElementAttached(selectors.basePagePO.TOOLS);
    await io.homePage.goToMenu("Resources", "Connections");
    await io.flowBuilder.waitForElementAttached(selectors.connectionsPagePO.CREATE_CONNECTION);
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.click(selectors.connectionsPagePO.CREATE_CONNECTION);
    await io.flowBuilder.waitForElementAttached(selectors.settingsPagePO.APP_NAME_INPUT);
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.fill(
      selectors.settingsPagePO.APP_NAME_INPUT,
      "Orderful"
    );
    await io.flowBuilder.waitForElementAttached(selectors.connectionsPagePO.ORDERFUL);
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.click(selectors.connectionsPagePO.ORDERFUL);
    await io.flowBuilder.waitForElementAttached(selectors.connectionsPagePO.HTTP_CNNECTOR);
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.click(selectors.connectionsPagePO.HTTP_CNNECTOR);
    await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.MEDIA_TYPE);
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.click(selectors.flowBuilderPagePO.MEDIA_TYPE);
    await io.flowBuilder.waitForElementAttached(selectors.connectionsPagePO.PLAINTEXT);
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.click(selectors.connectionsPagePO.PLAINTEXT);
    await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.OVERRIDE_MEDIA_SUCCESS_RESPONSE);
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.click(
      selectors.flowBuilderPagePO.OVERRIDE_MEDIA_SUCCESS_RESPONSE
    );
    const textArraySuccessResponse = await io.flowBuilder.getText(
      selectors.connectionsPagePO.OPTIONLIST
    );
    await io.assert.expectNotToBeValueInArray(
      textArraySuccessResponse,
      "Plain text",
      "Found Plain text in Array"
    );
  });
  test("@Env-All @Zephyr-IO-TIO58085  Path to rate-limit error field removed when Media type is Plain text", async ({
    io,
    page
  }) => {
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.waitForElementAttached(selectors.basePagePO.TOOLS);
    await io.homePage.goToMenu("Resources", "Connections");
    await io.flowBuilder.waitForElementAttached(selectors.connectionsPagePO.CREATE_CONNECTION);
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.click(selectors.connectionsPagePO.CREATE_CONNECTION);
    await io.flowBuilder.waitForElementAttached(selectors.settingsPagePO.APP_NAME_INPUT);
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.fill(
      selectors.settingsPagePO.APP_NAME_INPUT,
      "Orderful"
    );
    await io.flowBuilder.waitForElementAttached(selectors.connectionsPagePO.ORDERFUL);
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.click(selectors.connectionsPagePO.ORDERFUL);
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.waitForElementAttached(selectors.connectionsPagePO.HTTP_CNNECTOR);
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.click(selectors.connectionsPagePO.HTTP_CNNECTOR);
    await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.MEDIATYPEERRORRESP);
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.click(selectors.flowBuilderPagePO.MEDIATYPEERRORRESP);
    await io.flowBuilder.waitForElementAttached(selectors.connectionsPagePO.PLAINTEXT);
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.click(selectors.connectionsPagePO.PLAINTEXT);
    await io.flowBuilder.waitForElementAttached(
      selectors.flowBuilderPagePO.NONSTANDARD
    );
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.click(selectors.flowBuilderPagePO.NONSTANDARD);
    const pathtoratelimiterror1 = await io.homePage.isVisible(
      selectors.connectionsPagePO.NON_STANDARD_API_RATE_FAIL_PATH
    );
    await io.flowBuilder.loadingTime();
    await io.assert.expectToBeValue(
      pathtoratelimiterror1.toString(),
      "false",
      "Field pathtoratelimit error is present in after Plain text is selected in Override media type for error responses field"
    );
    await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.NONSTANDARD);
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.click(selectors.flowBuilderPagePO.NONSTANDARD);
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.MEDIA_TYPE);
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.click(selectors.flowBuilderPagePO.MEDIA_TYPE);
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.waitForElementAttached(selectors.connectionsPagePO.PLAINTEXT);
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.click(selectors.connectionsPagePO.PLAINTEXT);
    await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.MEDIATYPEERRORRESP);
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.click(selectors.flowBuilderPagePO.MEDIATYPEERRORRESP);
    await io.flowBuilder.waitForElementAttached(selectors.connectionsPagePO.DONOTOVERRIDE);
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.click(selectors.connectionsPagePO.DONOTOVERRIDE);
    await io.flowBuilder.waitForElementAttached(
      selectors.flowBuilderPagePO.NONSTANDARD
    );
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.click(selectors.flowBuilderPagePO.NONSTANDARD);
    const pathtoratelimiterror = await io.homePage.isVisible(
      selectors.connectionsPagePO.NON_STANDARD_API_RATE_FAIL_PATH
    );
    await io.assert.expectToBeValue(
      pathtoratelimiterror.toString(),
      "false",
      "Field pathtoratelimit error is present in after Plain text is selected in media type and in Override media type for error responses is do not override"
    );
  });
  test("@Env-All @Zephyr-IO-TIO58085  Path to rate-limit error field removed when Media type is Plain text in http connection form", async ({
    io,
    page
  }) => {
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.waitForElementAttached(selectors.basePagePO.TOOLS);
    await io.homePage.goToMenu("Resources", "Connections");
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.waitForElementAttached(selectors.connectionsPagePO.CREATE_CONNECTION);
    await io.flowBuilder.click(selectors.connectionsPagePO.CREATE_CONNECTION);
    await io.flowBuilder.waitForElementAttached(selectors.settingsPagePO.APP_NAME_INPUT);
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.fill(selectors.settingsPagePO.APP_NAME_INPUT, "Http");
    await io.flowBuilder.waitForElementAttached(selectors.connectionsPagePO.HTTP_CNNECTOR);
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.click(selectors.connectionsPagePO.HTTP_CNNECTOR);
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.MEDIATYPEERRORRESP);
    await io.flowBuilder.click(selectors.flowBuilderPagePO.MEDIATYPEERRORRESP);
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.waitForElementAttached(selectors.connectionsPagePO.PLAINTEXT);
    await io.flowBuilder.click(selectors.connectionsPagePO.PLAINTEXT);
    await io.flowBuilder.waitForElementAttached(
      selectors.flowBuilderPagePO.NONSTANDARD
    );
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.click(selectors.flowBuilderPagePO.NONSTANDARD);
    const pathtoratelimiterror1 = await io.homePage.isVisible(
      "[data-test='http.rateLimit.failPath']"
    );
    await io.assert.expectToBeValue(
      pathtoratelimiterror1.toString(),
      "false",
      "Field pathtoratelimit error is present in after Plain text is selected in Override media type for error responses field"
    );
    await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.NONSTANDARD);
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.click(selectors.flowBuilderPagePO.NONSTANDARD);
    await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.MEDIA_TYPE);
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.click(selectors.flowBuilderPagePO.MEDIA_TYPE);
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.waitForElementAttached(selectors.connectionsPagePO.PLAINTEXT);
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.click(selectors.connectionsPagePO.PLAINTEXT);
    await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.MEDIATYPEERRORRESP);
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.click(selectors.flowBuilderPagePO.MEDIATYPEERRORRESP);
    await io.flowBuilder.waitForElementAttached(selectors.connectionsPagePO.DONOTOVERRIDE);
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.click(selectors.connectionsPagePO.DONOTOVERRIDE);
    await io.flowBuilder.waitForElementAttached(
      selectors.flowBuilderPagePO.NONSTANDARD
    );
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.click(selectors.flowBuilderPagePO.NONSTANDARD);
    const pathtoratelimiterror = await io.homePage.isVisible(
      selectors.connectionsPagePO.NON_STANDARD_API_RATE_FAIL_PATH
    );
    await io.assert.expectToBeValue(
      pathtoratelimiterror.toString(),
      "false",
      "Field pathtoratelimit error is present in after Plain text is selected in media type and in Override media type for error responses is do not override"
    );
  });
});
