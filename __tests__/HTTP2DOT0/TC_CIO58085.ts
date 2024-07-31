import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("TC_CIO58085", () => {
  test("@Env-All @Zephyr-IO-TIO58085 framework2.0 changes for plaintext epic", async ({
    io,
    page
  }) => {
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.waitForElementAttached(selectors.basePagePO.TOOLS);
    await io.homePage.goToMenu("Resources", "Connections");
    await io.flowBuilder.loadingTime();
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
    await io.assert.verifyElementContainsText(
      selectors.connectionsPagePO.PLAINTEXT,
      "Plain text"
    );
  });
  test("@Env-All @Zephyr-IO-TIO58085  Related fields should removed when Media type is Plain text", async ({
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
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.click(selectors.connectionsPagePO.ORDERFUL);
    await io.flowBuilder.waitForElementAttached(selectors.connectionsPagePO.HTTP_CNNECTOR);
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.click(selectors.connectionsPagePO.HTTP_CNNECTOR);
    await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.MEDIA_TYPE);
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.click(selectors.flowBuilderPagePO.MEDIA_TYPE);
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.waitForElementAttached(selectors.connectionsPagePO.PLAINTEXT);
    await io.flowBuilder.click(selectors.connectionsPagePO.PLAINTEXT);
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.MEDIATYPESUCCESSRESP);
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.click(selectors.flowBuilderPagePO.MEDIATYPESUCCESSRESP);
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.waitForElementAttached(selectors.connectionsPagePO.DONOTOVERRIDE);
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.click(selectors.connectionsPagePO.DONOTOVERRIDE);
    await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.MEDIATYPEERRORRESP);
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.click(selectors.flowBuilderPagePO.MEDIATYPEERRORRESP);
    await io.flowBuilder.waitForElementAttached(selectors.connectionsPagePO.DONOTOVERRIDE);
    await io.flowBuilder.click(selectors.connectionsPagePO.DONOTOVERRIDE);
    await io.flowBuilder.waitForElementAttached(
      selectors.exportsPagePO.NON_STANDARD_API_TAB
    );
    await io.connectionPage.click(selectors.exportsPagePO.NON_STANDARD_API_TAB);
    await io.flowBuilder.waitForElementAttached(
      selectors.flowBuilderPagePO.NONSTANDARD
    );
    await io.flowBuilder.click(selectors.flowBuilderPagePO.NONSTANDARD);
    await io.flowBuilder.waitForElementAttached(
      selectors.flowBuilderPagePO.HOWTOTESTCONN
    );
    await io.connectionPage.click(selectors.flowBuilderPagePO.HOWTOTESTCONN);
    const failPath = await io.homePage.isVisible(
      selectors.flowBuilderPagePO.FAILPATHHTTP
    );
    const errorPath = await io.homePage.isVisible(
      selectors.flowBuilderPagePO.PINGERRORPATH
    );
    const authFailPath = await io.homePage.isVisible(
      selectors.flowBuilderPagePO.FAILPATH
    );
    const successPath = await io.homePage.isVisible(
      selectors.flowBuilderPagePO.SUCCESSPATH
    );
    const limitFailpath = await io.homePage.isVisible(
      selectors.connectionsPagePO.NON_STANDARD_API_RATE_FAIL_PATH
    );
    await io.assert.expectToBeValue(
      successPath.toString(),
      "false",
      "Field is present in after Plain text is selected in Override media type for success responses field"
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
    await io.assert.expectToBeValue(
      limitFailpath.toString(),
      "false",
      "Field limitFailpath is present in after Plain text is selected in Override media type for error responses field"
    );
  });
  test("@Env-All @Zephyr-IO-TIO58085  Related fields should present when Media type is Plain text and override media types are JSON or XML", async ({
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
    await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.JSON);
    await io.flowBuilder.loadingTime();
    await io.connectionPage.click(selectors.flowBuilderPagePO.JSON);
    await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.OVERRIDE_MEDIA_SUCCESS_RESPONSE);
    await io.flowBuilder.click(
      selectors.flowBuilderPagePO.OVERRIDE_MEDIA_SUCCESS_RESPONSE
    );
    await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.XMLVALUE);
    await io.connectionPage.click(selectors.flowBuilderPagePO.XMLVALUE);
    await io.flowBuilder.waitForElementAttached(
      selectors.exportsPagePO.NON_STANDARD_API_TAB
    );
    await io.connectionPage.click(selectors.exportsPagePO.NON_STANDARD_API_TAB);
    await io.flowBuilder.waitForElementAttached(
      selectors.flowBuilderPagePO.NONSTANDARD
    );
    await io.flowBuilder.click(selectors.flowBuilderPagePO.NONSTANDARD);
    await io.flowBuilder.waitForElementAttached(
      selectors.flowBuilderPagePO.HOWTOTESTCONN
    );
    await io.connectionPage.click(selectors.flowBuilderPagePO.HOWTOTESTCONN);
    const failPath = await io.homePage.isVisible(
      selectors.flowBuilderPagePO.FAILPATHHTTP
    );
    const errorPath = await io.homePage.isVisible(
      selectors.flowBuilderPagePO.PINGERRORPATH
    );
    const authFailPath = await io.homePage.isVisible(
      selectors.flowBuilderPagePO.FAILPATH
    );
    const successPath = await io.homePage.isVisible(
      selectors.flowBuilderPagePO.SUCCESSPATH
    );
    const limitFailpath = await io.homePage.isVisible(
      selectors.connectionsPagePO.NON_STANDARD_API_RATE_FAIL_PATH
    );
    await io.assert.expectToBeValue(
      limitFailpath.toString(),
      "true",
      "Field is not present"
    );
    await io.assert.expectToBeValue(
      successPath.toString(),
      "true",
      "Field is not present"
    );
    await io.assert.expectToBeValue(
      failPath.toString(),
      "true",
      "Field failPath is not present"
    );
    await io.assert.expectToBeValue(
      errorPath.toString(),
      "true",
      "Field errorPath is not present"
    );
    await io.assert.expectToBeValue(
      authFailPath.toString(),
      "true",
      "Field authFailPath is not present"
    );
  });
  test("@Env-All @Zephyr-IO-TIO58085  Related fields should show when Media type is Plain text and override media type for error responses is JSON or XML", async ({
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
    await io.flowBuilder.click(selectors.flowBuilderPagePO.MEDIA_TYPE);
    await io.flowBuilder.waitForElementAttached(selectors.connectionsPagePO.PLAINTEXT);
    await io.flowBuilder.click(selectors.connectionsPagePO.PLAINTEXT);
    await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.OVERRIDE_MEDIA_ERROR_RESPONSE);
    await io.flowBuilder.click(
      selectors.flowBuilderPagePO.OVERRIDE_MEDIA_ERROR_RESPONSE
    );
    await io.flowBuilder.waitForElementAttached(selectors.exportsPagePO.NON_STANDARD_API_TAB);
    await io.connectionPage.click(selectors.flowBuilderPagePO.JSON);
    await io.flowBuilder.waitForElementAttached(
      selectors.exportsPagePO.NON_STANDARD_API_TAB
    );
    await io.connectionPage.click(selectors.exportsPagePO.NON_STANDARD_API_TAB);
    await io.flowBuilder.waitForElementAttached(
      selectors.flowBuilderPagePO.NONSTANDARD
    );
    await io.flowBuilder.click(selectors.flowBuilderPagePO.NONSTANDARD);
    await io.flowBuilder.waitForElementAttached(
      selectors.flowBuilderPagePO.HOWTOTESTCONN
    );
    await io.connectionPage.click(selectors.flowBuilderPagePO.HOWTOTESTCONN);
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
      "true",
      "Field is not present"
    );
    await io.assert.expectToBeValue(
      failPath.toString(),
      "true",
      "Field failPath is not present"
    );
    await io.assert.expectToBeValue(
      errorPath.toString(),
      "true",
      "Field errorPath is not present"
    );
    await io.assert.expectToBeValue(
      authFailPath.toString(),
      "true",
      "Field authFailPath is not present"
    );
  });
  test("@Env-All @Zephyr-IO-TIO58085  Related fields should show when Media type is Plain text and override media type for success responses is JSON or XML", async ({
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
    await io.flowBuilder.click(
      selectors.flowBuilderPagePO.OVERRIDE_MEDIA_SUCCESS_RESPONSE
    );
    await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.JSON);
    await io.connectionPage.click(selectors.flowBuilderPagePO.JSON);
    await io.flowBuilder.waitForElementAttached(
      selectors.exportsPagePO.NON_STANDARD_API_TAB
    );
    await io.connectionPage.click(selectors.exportsPagePO.NON_STANDARD_API_TAB);
    await io.flowBuilder.waitForElementAttached(
      selectors.flowBuilderPagePO.NONSTANDARD
    );
    await io.flowBuilder.click(selectors.flowBuilderPagePO.NONSTANDARD);
    await io.flowBuilder.waitForElementAttached(
      selectors.flowBuilderPagePO.HOWTOTESTCONN
    );
    await io.connectionPage.click(selectors.flowBuilderPagePO.HOWTOTESTCONN);
    const successPath = await io.homePage.isVisible(
      selectors.flowBuilderPagePO.SUCCESSPATH
    );
    await io.assert.expectToBeValue(
      successPath.toString(),
      "true",
      "Field is not present in after JSON is selected in Override media type for success responses field"
    );
  });
  test("@Env-All @Zephyr-IO-TIO58085 Override media type for success responses field should have Plain text option", async ({
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
    await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.OVERRIDE_MEDIA_SUCCESS_RESPONSE);
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.click(
      selectors.flowBuilderPagePO.OVERRIDE_MEDIA_SUCCESS_RESPONSE
    );
    await io.flowBuilder.waitForElementAttached(selectors.connectionsPagePO.PLAINTEXT);
    await io.assert.verifyElementContainsText(
      selectors.connectionsPagePO.PLAINTEXT,
      "Plain text"
    );
  });
  test("@Env-All @Zephyr-IO-TIO58085 When Override media type for success responses field is Plain text then remove related fields", async ({
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
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.waitForElementAttached(selectors.connectionsPagePO.ORDERFUL);
    await io.flowBuilder.click(selectors.connectionsPagePO.ORDERFUL);
    await io.flowBuilder.waitForElementAttached(selectors.connectionsPagePO.HTTP_CNNECTOR);
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.click(selectors.connectionsPagePO.HTTP_CNNECTOR);
    await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.OVERRIDE_MEDIA_SUCCESS_RESPONSE);
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.click(
      selectors.flowBuilderPagePO.OVERRIDE_MEDIA_SUCCESS_RESPONSE
    );
    await io.flowBuilder.waitForElementAttached(selectors.connectionsPagePO.PLAINTEXT);
    await io.flowBuilderDashboard.loadingTime();
    await io.flowBuilder.click(selectors.connectionsPagePO.PLAINTEXT);
    const successPath = await io.homePage.isVisible(
      selectors.flowBuilderPagePO.SUCCESSPATH
    );
    await io.assert.expectToBeValue(
      successPath.toString(),
      "false",
      "Field is present in after Plain text is selected in Override media type for success responses field"
    );
  });
});
