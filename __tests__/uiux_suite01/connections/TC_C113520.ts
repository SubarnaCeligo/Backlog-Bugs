import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe(`C113520_C113521_C113522_C113523_C113524_C113525_C113526`, () => {

  test(`@Env-All @Env-IAQA  @Zephyr-IO-T7777 @Zephyr-IO-T7778 @Zephyr-IO-T7779 @Zephyr-IO-T7780 @Zephyr-IO-T7781 Normal HTTP 2.0 framework connectors`, async ({ io, page }) => {
    await io.connectionPage.navigateTo(io.data.links.CONNECTIONS_PAGE_URL);
    await io.connectionPage.click(selectors.connectionsPagePO.CREATE_CONNECTION);
    //Wait for the page to load
    await io.connectionPage.waitForElementAttached(selectors.connectionsPagePO.APP_NAME_INPUT);
    //Enter a search keyword
    await io.connectionPage.fill(selectors.connectionsPagePO.APP_NAME_INPUT, "Gusto");
    await io.connectionPage.waitForElementAttached(selectors.connectionsPagePO.GUSTO_CONNECTION);
    await io.connectionPage.click(selectors.connectionsPagePO.GUSTO_CONNECTION);
    await io.flowBuilder.click(selectors.connectionsPagePO.CREATE_ICLIENT);
    await io.flowBuilder.clickButtonByIndex(selectors.flowBuilderPagePO.HTTP_FORM_SWITCH, 1);

    //TC_C113520 - Verify Password credentials  new field is added in Grant type dropdown
    await io.flowBuilder.click(selectors.connectionsPagePO.OAUTH2_GRANT_TYPE);
    await expect(page.locator(selectors.connectionsPagePO.GRANT_TYPE_PASSWORD)).toBeVisible();
    await io.assert.verifyElementContainsText(selectors.connectionsPagePO.GRANT_TYPE_PASSWORD, "Password credentials");
    await io.connectionPage.addStep("Verified 'Password credentials' grant type is present");

    //TC_C113521 - Verify username and password fields is added after Grant type field
    await io.flowBuilder.click(selectors.connectionsPagePO.GRANT_TYPE_PASSWORD);
    await io.connectionPage.addStep("Selected 'Password credentials' grant type")

    await expect(page.locator(selectors.connectionsPagePO.OAUTH2_USERNAME)).toBeVisible();
    await expect(page.locator(selectors.connectionsPagePO.OAUTH2_PASSWORD)).toBeVisible();
    await io.connectionPage.addStep("Verified 'Username' and 'Password' fields are present")

    //TC_C113524 - Verify help text is added for username and password fields
    await io.flowBuilder.click(selectors.connectionsPagePO.OAUTH2_USERNAME_HELP_BUTTON);
    await io.connectionPage.addStep("Click on help icon for 'Username' field");
    await io.connectionPage.waitForElementAttached(selectors.myAccountPagePO.HELP_BUBBLE);
    let helptext = (await io.connectionPage.getText(selectors.flowBuilderPagePO.PAGE_INFO_TEXT)).toString();
    await io.assert.expectToContainValue('Enter your username. This identifier is typically provided for your account on the authorization server that issues access tokens.', helptext, 'help text is not visible for user name field');
    await io.flowBuilder.click(selectors.connectionsPagePO.HELPTEXT_CLOSE);

    await io.flowBuilder.click(selectors.connectionsPagePO.OAUTH2_PASSWORD_HELP_BUTTON);
    await io.connectionPage.addStep("Click on help icon for 'Password' field");
    await io.connectionPage.waitForElementAttached(selectors.myAccountPagePO.HELP_BUBBLE);
    helptext = (await io.connectionPage.getText(selectors.flowBuilderPagePO.PAGE_INFO_TEXT)).toString();
    await io.assert.expectToContainValue('Enter your password. Your password serves as the secret that confirms your identity and verifies that you are the legitimate owner of the account linked to the provided username. Ensure the accuracy and confidentiality of your password.', helptext, 'Passowrh help text1 is not visible');
    await io.assert.expectToContainValue('Multiple layers of protection, including AES 256 encryption, are in place to keep your password safe. When editing this connection, you must re-enter this value each time; it is stored only when the connection is saved and never displayed as text.', helptext, 'Passowrh help text2 is not visible');
    await io.connectionPage.addStep("Verified help text for 'Username' and 'Password' fields");
    await io.flowBuilder.click(selectors.connectionsPagePO.HELPTEXT_CLOSE);

    //TC_C113522 - Verify {username} && {password} are added in AFE handlebar for revoke token url ,access token url
    await io.flowBuilder.fill(selectors.connectionsPagePO.OAUTH2_USERNAME_INPUT, "test");
    await io.flowBuilder.click(selectors.connectionsPagePO.ACCESS_TOKEN_URI_HANDLEBAR);
    await io.connectionPage.addStep("Opening Access token URI handlebar");
    await io.assert.verifyElementContainsText(selectors.flowBuilderPagePO.SCRIPT_DATA_CONTENT, "username");
    await io.assert.verifyElementContainsText(selectors.flowBuilderPagePO.SCRIPT_DATA_CONTENT, "password");
    await io.connectionPage.addStep("Verified 'Username' and 'Password' fields are present in Input data");
    await io.flowBuilder.click(selectors.flowBuilderPagePO.CLOSE_RIGHT_DRAWER);
    await io.connectionPage.addStep("Closing Access token URI handlebar");

    await io.flowBuilder.click(selectors.connectionsPagePO.REVOKE_TOKEN_URI_HANDLEBAR);
    await io.connectionPage.addStep("Opening Revoke token URI handlebar");
    await io.assert.verifyElementContainsText(selectors.flowBuilderPagePO.SCRIPT_DATA_CONTENT, "username");
    await io.assert.verifyElementContainsText(selectors.flowBuilderPagePO.SCRIPT_DATA_CONTENT, "password");
    await io.connectionPage.addStep("Verified 'Username' and 'Password' fields are present in Input data");
    await io.flowBuilder.click(selectors.flowBuilderPagePO.CLOSE_RIGHT_DRAWER);
    await io.connectionPage.addStep("Closing Revoke token URI handlebar");

    //TC_C113523 - Verify Encrypted and Unencrypted fields are added in Advanced section
    await io.flowBuilder.click(selectors.importPagePO.ADVANCED);
    await expect(page.locator(selectors.connectionsPagePO.OAUTH2_ENCRYPED)).toBeVisible();
    await expect(page.locator(selectors.connectionsPagePO.OAUTH2_UNENCRYPED)).toBeVisible();
    await io.connectionPage.addStep("Verified 'Encrypted' and 'Unencrypted' fields are present");

    //TC_C113525 - Verify field path is correct for Encrypted and Unencrypted fields
    //TC_C113526 -  Verify help text is correct for Encrypted and Unencrypted fields
    await io.flowBuilder.click(selectors.connectionsPagePO.OAUTH2_ENCRYPED_HELP_BUTTON);
    await io.connectionPage.addStep("Click on help icon for 'Encypted' field");
    await io.connectionPage.waitForElementAttached(selectors.myAccountPagePO.HELP_BUBBLE);
    helptext = (await io.connectionPage.getText(selectors.flowBuilderPagePO.PAGE_INFO_TEXT)).toString();
    // await io.assert.expectToContainValue('Field path: iClient.oauth2.encrypted', helptext, 'Help text for Encypted field is not visible');
    await io.assert.expectToContainValue("Store all sensitive fields required by your imports and exports to access the app you are connecting to. For example, {'password':'celigorocks'} or {'token':'x7if4nkovhgr63ghp'}. These values are stored with AES-256 encryption and other layers of protection to keep your data safe.", helptext, 'Help text for Encypted field is not visible');
    await io.connectionPage.addStep("Verified field path and help test for 'Encypted' field");
    await io.flowBuilder.click(selectors.connectionsPagePO.HELPTEXT_CLOSE);

    await io.flowBuilder.click(selectors.connectionsPagePO.OAUTH2_UNENCRYPED_HELP_BUTTON);
    await io.connectionPage.addStep("Click on help icon for 'Unencrypted' field");
    await io.connectionPage.waitForElementAttached(selectors.myAccountPagePO.HELP_BUBBLE);
    helptext = (await io.connectionPage.getText(selectors.flowBuilderPagePO.PAGE_INFO_TEXT)).toString();
    // await io.assert.expectToContainValue("Field path: iClient.oauth2.unencrypted", helptext, "Help text for Unencypted field is not visible");
    await io.assert.expectToContainValue("Store all non-sensitive fields required by your imports and exports to access the app you are connecting to. For example, {'email':'my_email@company.com', 'accountId': '8675301', 'role':'admin'}.", helptext, "Help text for Unencypted field is not visible");
    await io.connectionPage.addStep("Verified field path and help text for 'Unencrypted' field");
    await io.flowBuilder.click(selectors.connectionsPagePO.HELPTEXT_CLOSE);
  });

  test(`@Env-All  @Zephyr-IO-T7777 @Zephyr-IO-T7778 @Zephyr-IO-T7779 @Zephyr-IO-T7780 @Zephyr-IO-T7781 HTTP connection iClient page`, async ({ io, page }) => {
    await io.connectionPage.navigateTo(io.data.links.CONNECTIONS_PAGE_URL);
    await io.connectionPage.click(selectors.connectionsPagePO.CREATE_CONNECTION);
    await io.connectionPage.click(selectors.importPagePO.HTTP_IMPORT);
    await io.connectionPage.click(selectors.connectionsPagePO.HTTP_AUTH_TYPE_ID);
    await io.connectionPage.click(selectors.connectionsPagePO.OAUTH);
    await io.flowBuilder.click(selectors.connectionsPagePO.CREATE_ICLIENT);

    //TC_C113520 - Verify Password credentials  new field is added in Grant type dropdown
    await io.flowBuilder.click(selectors.connectionsPagePO.OAUTH2_GRANT_TYPE);
    await expect(page.locator(selectors.connectionsPagePO.GRANT_TYPE_PASSWORD)).toBeVisible();
    await io.assert.verifyElementContainsText(selectors.connectionsPagePO.GRANT_TYPE_PASSWORD, "Password credentials");
    await io.connectionPage.addStep("Verified 'Password credentials' grant type is present");

    //TC_C113521 - Verify username and password fields is added after Grant type field
    await io.flowBuilder.click(selectors.connectionsPagePO.GRANT_TYPE_PASSWORD);
    await io.connectionPage.addStep("Selected 'Password credentials' grant type")

    await expect(page.locator(selectors.connectionsPagePO.OAUTH2_USERNAME)).toBeVisible();
    await expect(page.locator(selectors.connectionsPagePO.OAUTH2_PASSWORD)).toBeVisible();
    await io.connectionPage.addStep("Verified 'Username' and 'Password' fields are present")

    //TC_C113524 - Verify help text is added for username and password fields
    await io.flowBuilder.click(selectors.connectionsPagePO.OAUTH2_USERNAME_HELP_BUTTON);
    await io.connectionPage.addStep("Click on help icon for 'Username' field");
    await io.connectionPage.waitForElementAttached(selectors.myAccountPagePO.HELP_BUBBLE);
    let helptext = (await io.connectionPage.getText(selectors.flowBuilderPagePO.PAGE_INFO_TEXT)).toString();
    await io.assert.expectToContainValue("Enter your username. This identifier is typically provided for your account on the authorization server that issues access tokens.", helptext, "Username help text is not visible");
    // await io.assert.verifyElementContainsText(selectors.connectionsPagePO.OAUTH2_USERNAME_HELP_TEXT, "Enter your username. This identifier is typically provided for your account on the authorization server that issues access tokens.");
    await io.flowBuilder.click(selectors.connectionsPagePO.HELPTEXT_CLOSE);

    await io.flowBuilder.click(selectors.connectionsPagePO.OAUTH2_PASSWORD_HELP_BUTTON);
    await io.connectionPage.addStep("Click on help icon for 'Password' field");
    helptext = (await io.connectionPage.getText(selectors.flowBuilderPagePO.PAGE_INFO_TEXT)).toString();
    await io.assert.expectToContainValue('Enter your password. Your password serves as the secret that confirms your identity and verifies that you are the legitimate owner of the account linked to the provided username. Ensure the accuracy and confidentiality of your password.', helptext, 'Passowrh help text1 is not visible');
    await io.assert.expectToContainValue('Multiple layers of protection, including AES 256 encryption, are in place to keep your password safe. When editing this connection, you must re-enter this value each time; it is stored only when the connection is saved and never displayed as text.', helptext, 'Passowrh help text2 is not visible');
    await io.connectionPage.addStep("Verified help text for 'Username' and 'Password' fields");

    await io.flowBuilder.click(selectors.connectionsPagePO.HELPTEXT_CLOSE);

    //TC_C113522 - Verify {username} && {password} are added in AFE handlebar for revoke token url ,access token url
    await io.flowBuilder.fill(selectors.connectionsPagePO.OAUTH2_USERNAME_INPUT, "test");
    await io.flowBuilder.click(selectors.connectionsPagePO.ACCESS_TOKEN_URI_HANDLEBAR);
    await io.connectionPage.addStep("Opening Access token URI handlebar");
    await io.assert.verifyElementContainsText(selectors.flowBuilderPagePO.SCRIPT_DATA_CONTENT, "username");
    await io.assert.verifyElementContainsText(selectors.flowBuilderPagePO.SCRIPT_DATA_CONTENT, "password");
    await io.connectionPage.addStep("Verified 'Username' and 'Password' fields are present in Input data");
    await io.flowBuilder.click(selectors.flowBuilderPagePO.CLOSE_RIGHT_DRAWER);
    await io.connectionPage.addStep("Closing Access token URI handlebar");

    await io.flowBuilder.click(selectors.connectionsPagePO.REVOKE_TOKEN_URI_HANDLEBAR);
    await io.connectionPage.addStep("Opening Revoke token URI handlebar");
    await io.assert.verifyElementContainsText(selectors.flowBuilderPagePO.SCRIPT_DATA_CONTENT, "username");
    await io.assert.verifyElementContainsText(selectors.flowBuilderPagePO.SCRIPT_DATA_CONTENT, "password");
    await io.connectionPage.addStep("Verified 'Username' and 'Password' fields are present in Input data");
    await io.flowBuilder.click(selectors.flowBuilderPagePO.CLOSE_RIGHT_DRAWER);
    await io.connectionPage.addStep("Closing Revoke token URI handlebar");

    //TC_C113523 - Verify Encrypted and Unencrypted fields are added in Advanced section
    await io.flowBuilder.clickByIndex(selectors.importPagePO.ADVANCED, 1);
    await expect(page.locator(selectors.connectionsPagePO.OAUTH2_ENCRYPED)).toBeVisible();
    await expect(page.locator(selectors.connectionsPagePO.OAUTH2_UNENCRYPED)).toBeVisible();
    await io.connectionPage.addStep("Verified 'Encrypted' and 'Unencrypted' fields are present");

    //TC_C113525 - Verify field path is correct for Encrypted and Unencrypted fields
    //TC_C113526 -  Verify help text is correct for Encrypted and Unencrypted fields
    await io.flowBuilder.click(selectors.connectionsPagePO.OAUTH2_ENCRYPED_HELP_BUTTON);
    await io.connectionPage.addStep("Click on help icon for 'Encypted' field");
    await io.connectionPage.waitForElementAttached(selectors.myAccountPagePO.HELP_BUBBLE);
    helptext = (await io.connectionPage.getText(selectors.flowBuilderPagePO.PAGE_INFO_TEXT)).toString();
   // await io.assert.expectToContainValue('Field path: iClient.oauth2.encrypted', helptext, 'Help text for Encypted field is not visible');
    await io.assert.expectToContainValue("Store all sensitive fields required by your imports and exports to access the app you are connecting to. For example, {'password':'celigorocks'} or {'token':'x7if4nkovhgr63ghp'}. These values are stored with AES-256 encryption and other layers of protection to keep your data safe.", helptext, 'Help text for Encypted field is not visible');
    await io.connectionPage.addStep("Verified field path and help test for 'Encypted' field");
    await io.flowBuilder.click(selectors.connectionsPagePO.HELPTEXT_CLOSE);

    await io.flowBuilder.click(selectors.connectionsPagePO.OAUTH2_UNENCRYPED_HELP_BUTTON);
    await io.connectionPage.addStep("Click on help icon for 'Unencrypted' field");
    await io.connectionPage.waitForElementAttached(selectors.myAccountPagePO.HELP_BUBBLE);
    helptext = (await io.connectionPage.getText(selectors.flowBuilderPagePO.PAGE_INFO_TEXT)).toString();
    //await io.assert.expectToContainValue("Field path: iClient.oauth2.unencrypted", helptext, "Help text for Unencypted field is not visible");
    await io.assert.expectToContainValue("Store all non-sensitive fields required by your imports and exports to access the app you are connecting to. For example, {'email':'my_email@company.com', 'accountId': '8675301', 'role':'admin'}.", helptext, "Help text for Unencypted field is not visible");
    await io.connectionPage.addStep("Verified field path and help text for 'Unencrypted' field");
    await io.flowBuilder.click(selectors.connectionsPagePO.HELPTEXT_CLOSE);
  });

  test(`@Env-All  @Zephyr-IO-T7777 @Zephyr-IO-T7778 @Zephyr-IO-T7779 @Zephyr-IO-T7780 @Zephyr-IO-T7781 REST connection iClient page`, async ({ io, page }) => {
    await io.connectionPage.navigateTo(io.data.links.CONNECTIONS_PAGE_URL);
    await io.connectionPage.click(selectors.connectionsPagePO.CREATE_CONNECTION);
    await io.connectionPage.waitForElementAttached(selectors.settingsPagePO.APP_NAME_INPUT);
    await io.connectionPage.fill(selectors.settingsPagePO.APP_NAME_INPUT, 'REST API (HTTP)');
    await io.connectionPage.waitForElementAttached(selectors.connectionsPagePO.RESTAPI_HTTP);
    await io.connectionPage.click(selectors.connectionsPagePO.RESTAPI_HTTP);
    await io.connectionPage.click(selectors.connectionsPagePO.HTTP_AUTH_TYPE_ID);
    await io.connectionPage.click(selectors.connectionsPagePO.OAUTH);
    await io.flowBuilder.click(selectors.connectionsPagePO.CREATE_ICLIENT);

    //TC_C113520 - Verify Password credentials  new field is added in Grant type dropdown
    await io.flowBuilder.click(selectors.connectionsPagePO.OAUTH2_GRANT_TYPE);
    await expect(page.locator(selectors.connectionsPagePO.GRANT_TYPE_PASSWORD)).toBeVisible();
    await io.assert.verifyElementContainsText(selectors.connectionsPagePO.GRANT_TYPE_PASSWORD, "Password credentials");
    await io.connectionPage.addStep("Verified 'Password credentials' grant type is present");

    //TC_C113521 - Verify username and password fields is added after Grant type field
    await io.flowBuilder.click(selectors.connectionsPagePO.GRANT_TYPE_PASSWORD);
    await io.connectionPage.addStep("Selected 'Password credentials' grant type")

    await expect(page.locator(selectors.connectionsPagePO.OAUTH2_USERNAME)).toBeVisible();
    await expect(page.locator(selectors.connectionsPagePO.OAUTH2_PASSWORD)).toBeVisible();
    await io.connectionPage.addStep("Verified 'Username' and 'Password' fields are present")

    //TC_C113524 - Verify help text is added for username and password fields
    await io.flowBuilder.click(selectors.connectionsPagePO.OAUTH2_USERNAME_HELP_BUTTON);
    await io.connectionPage.addStep("Click on help icon for 'Username' field");
    await io.connectionPage.waitForElementAttached(selectors.myAccountPagePO.HELP_BUBBLE);
    let helptext = (await io.connectionPage.getText(selectors.flowBuilderPagePO.PAGE_INFO_TEXT)).toString();
    await io.assert.expectToContainValue("Enter your username. This identifier is typically provided for your account on the authorization server that issues access tokens.", helptext, "Username help text is not visible");
    await io.flowBuilder.click(selectors.connectionsPagePO.HELPTEXT_CLOSE);

    await io.flowBuilder.click(selectors.connectionsPagePO.OAUTH2_PASSWORD_HELP_BUTTON);
    await io.connectionPage.addStep("Click on help icon for 'Password' field");
    await io.connectionPage.waitForElementAttached(selectors.myAccountPagePO.HELP_BUBBLE);
    helptext = (await io.connectionPage.getText(selectors.flowBuilderPagePO.PAGE_INFO_TEXT)).toString();
    await io.assert.expectToContainValue('Enter your password. Your password serves as the secret that confirms your identity and verifies that you are the legitimate owner of the account linked to the provided username. Ensure the accuracy and confidentiality of your password.', helptext, 'Passowrh help text1 is not visible');
    await io.assert.expectToContainValue('Multiple layers of protection, including AES 256 encryption, are in place to keep your password safe. When editing this connection, you must re-enter this value each time; it is stored only when the connection is saved and never displayed as text.', helptext, 'Passowrh help text2 is not visible');
    await io.connectionPage.addStep("Verified help text for 'Username' and 'Password' fields");
    await io.flowBuilder.click(selectors.connectionsPagePO.HELPTEXT_CLOSE);

    //TC_C113522 - Verify {username} && {password} are added in AFE handlebar for revoke token url ,access token url
    await io.flowBuilder.fill(selectors.connectionsPagePO.OAUTH2_USERNAME_INPUT, "test");
    await io.flowBuilder.click(selectors.connectionsPagePO.ACCESS_TOKEN_URI_HANDLEBAR);
    await io.connectionPage.addStep("Opening Access token URI handlebar");
    await io.assert.verifyElementContainsText(selectors.flowBuilderPagePO.SCRIPT_DATA_CONTENT, "username");
    await io.assert.verifyElementContainsText(selectors.flowBuilderPagePO.SCRIPT_DATA_CONTENT, "password");
    await io.connectionPage.addStep("Verified 'Username' and 'Password' fields are present in Input data");
    await io.flowBuilder.click(selectors.flowBuilderPagePO.CLOSE_RIGHT_DRAWER);
    await io.connectionPage.addStep("Closing Access token URI handlebar");

    await io.flowBuilder.click(selectors.connectionsPagePO.REVOKE_TOKEN_URI_HANDLEBAR);
    await io.connectionPage.addStep("Opening Revoke token URI handlebar");
    await io.assert.verifyElementContainsText(selectors.flowBuilderPagePO.SCRIPT_DATA_CONTENT, "username");
    await io.assert.verifyElementContainsText(selectors.flowBuilderPagePO.SCRIPT_DATA_CONTENT, "password");
    await io.connectionPage.addStep("Verified 'Username' and 'Password' fields are present in Input data");
    await io.flowBuilder.click(selectors.flowBuilderPagePO.CLOSE_RIGHT_DRAWER);
    await io.connectionPage.addStep("Closing Revoke token URI handlebar");

    //TC_C113523 - Verify Encrypted and Unencrypted fields are added in Advanced section
    await io.flowBuilder.clickByIndex(selectors.importPagePO.ADVANCED, 1);
    await expect(page.locator(selectors.connectionsPagePO.OAUTH2_ENCRYPED)).toBeVisible();
    await expect(page.locator(selectors.connectionsPagePO.OAUTH2_UNENCRYPED)).toBeVisible();
    await io.connectionPage.addStep("Verified 'Encrypted' and 'Unencrypted' fields are present");

    //TC_C113525 - Verify field path is correct for Encrypted and Unencrypted fields
    //TC_C113526 -  Verify help text is correct for Encrypted and Unencrypted fields
    await io.flowBuilder.click(selectors.connectionsPagePO.OAUTH2_ENCRYPED_HELP_BUTTON);
    await io.connectionPage.addStep("Click on help icon for 'Encypted' field");
    await io.connectionPage.waitForElementAttached(selectors.myAccountPagePO.HELP_BUBBLE);
    helptext = (await io.connectionPage.getText(selectors.flowBuilderPagePO.PAGE_INFO_TEXT)).toString();
    //await io.assert.expectToContainValue('Field path: iClient.oauth2.encrypted', helptext, 'Help text for Encypted field is not visible');
    await io.assert.expectToContainValue("Store all sensitive fields required by your imports and exports to access the app you are connecting to. For example, {'password':'celigorocks'} or {'token':'x7if4nkovhgr63ghp'}. These values are stored with AES-256 encryption and other layers of protection to keep your data safe.", helptext, 'Help text for Encypted field is not visible');
    await io.connectionPage.addStep("Verified field path and help test for 'Encypted' field");
    await io.flowBuilder.click(selectors.connectionsPagePO.HELPTEXT_CLOSE);

    await io.flowBuilder.click(selectors.connectionsPagePO.OAUTH2_UNENCRYPED_HELP_BUTTON);
    await io.connectionPage.addStep("Click on help icon for 'Unencrypted' field");
    await io.connectionPage.waitForElementAttached(selectors.myAccountPagePO.HELP_BUBBLE);
    helptext = (await io.connectionPage.getText(selectors.flowBuilderPagePO.PAGE_INFO_TEXT)).toString();
    //await io.assert.expectToContainValue("Field path: iClient.oauth2.unencrypted", helptext, "Help text for Unencypted field is not visible");
    await io.assert.expectToContainValue("Store all non-sensitive fields required by your imports and exports to access the app you are connecting to. For example, {'email':'my_email@company.com', 'accountId': '8675301', 'role':'admin'}.", helptext, "Help text for Unencypted field is not visible");
    await io.connectionPage.addStep("Verified field path and help text for 'Unencrypted' field");
    await io.flowBuilder.click(selectors.connectionsPagePO.HELPTEXT_CLOSE);
  });

  test(`@Env-All  @Env-IAQA  @Zephyr-IO-T7777 @Zephyr-IO-T7778 @Zephyr-IO-T7779 @Zephyr-IO-T7780 @Zephyr-IO-T7781 Auth2.0 supported connector iClient page`, async ({ io, page }) => {
    //Skipping the test case - HTTP form is not available for GUSTO connection
    await io.connectionPage.navigateTo(io.data.links.CONNECTIONS_PAGE_URL);
    await io.connectionPage.click(selectors.connectionsPagePO.CREATE_CONNECTION);
    await io.connectionPage.click(selectors.connectionsPagePO.GUSTO_CONNECTION);
    await io.flowBuilder.click(selectors.flowBuilderPagePO.HTTP_FORM_SWITCH);
    await io.connectionPage.loadingTime()
    await io.flowBuilder.click(selectors.flowBuilderPagePO.SIMPLE_FORM_SWITCH);
    await io.flowBuilder.click(selectors.flowBuilderPagePO.HTTP_FORM_SWITCH);
    await io.connectionPage.click(selectors.connectionsPagePO.HTTP_AUTH_TYPE_ID);
    await io.connectionPage.click(selectors.connectionsPagePO.OAUTH);
    await io.flowBuilder.click(selectors.connectionsPagePO.CREATE_ICLIENT);
    await io.flowBuilder.clickButtonByIndex(selectors.flowBuilderPagePO.HTTP_FORM_SWITCH, 1);

    //TC_C113520 - Verify Password credentials  new field is added in Grant type dropdown
    await io.flowBuilder.click(selectors.connectionsPagePO.OAUTH2_GRANT_TYPE);
    await expect(page.locator(selectors.connectionsPagePO.GRANT_TYPE_PASSWORD)).toBeVisible();
    await io.assert.verifyElementContainsText(selectors.connectionsPagePO.GRANT_TYPE_PASSWORD, "Password credentials");
    await io.connectionPage.addStep("Verified 'Password credentials' grant type is present");

    //TC_C113521 - Verify username and password fields is added after Grant type field
    await io.flowBuilder.click(selectors.connectionsPagePO.GRANT_TYPE_PASSWORD);
    await io.connectionPage.addStep("Selected 'Password credentials' grant type")

    await expect(page.locator(selectors.connectionsPagePO.OAUTH2_USERNAME)).toBeVisible();
    await expect(page.locator(selectors.connectionsPagePO.OAUTH2_PASSWORD)).toBeVisible();
    await io.connectionPage.addStep("Verified 'Username' and 'Password' fields are present")

    //TC_C113524 - Verify help text is added for username and password fields
    await io.flowBuilder.click(selectors.connectionsPagePO.OAUTH2_USERNAME_HELP_BUTTON);
    await io.connectionPage.addStep("Click on help icon for 'Username' field");
    await io.connectionPage.waitForElementAttached(selectors.myAccountPagePO.HELP_BUBBLE);
    let helptext = (await io.connectionPage.getText(selectors.flowBuilderPagePO.PAGE_INFO_TEXT)).toString();
    await io.assert.expectToContainValue("Enter your username. This identifier is typically provided for your account on the authorization server that issues access tokens.", helptext, "Username help text is not visible");

    await io.flowBuilder.click(selectors.connectionsPagePO.OAUTH2_PASSWORD_HELP_BUTTON);
    await io.connectionPage.addStep("Click on help icon for 'Password' field");
    await io.connectionPage.waitForElementAttached(selectors.myAccountPagePO.HELP_BUBBLE);
    helptext = (await io.connectionPage.getText(selectors.flowBuilderPagePO.PAGE_INFO_TEXT)).toString();
    await io.assert.expectToContainValue('Enter your password. Your password serves as the secret that confirms your identity and verifies that you are the legitimate owner of the account linked to the provided username. Ensure the accuracy and confidentiality of your password.', helptext, 'Passowrh help text1 is not visible');
    await io.assert.expectToContainValue('Multiple layers of protection, including AES 256 encryption, are in place to keep your password safe. When editing this connection, you must re-enter this value each time; it is stored only when the connection is saved and never displayed as text.', helptext, 'Passowrh help text2 is not visible');
    await io.connectionPage.addStep("Verified help text for 'Username' and 'Password' fields");
    await io.flowBuilder.waitForElementAttached(selectors.connectionsPagePO.HELPTEXT_CLOSE)
    await io.flowBuilder.click(selectors.connectionsPagePO.HELPTEXT_CLOSE);

    //TC_C113522 - Verify {username} && {password} are added in AFE handlebar for revoke token url ,access token url
    await io.flowBuilder.fill(selectors.connectionsPagePO.OAUTH2_USERNAME_INPUT, "test");
    await io.flowBuilder.click(selectors.connectionsPagePO.ACCESS_TOKEN_URI_HANDLEBAR);
    await io.connectionPage.addStep("Opening Access token URI handlebar");
    await io.assert.verifyElementContainsText(selectors.flowBuilderPagePO.SCRIPT_DATA_CONTENT, "username");
    await io.assert.verifyElementContainsText(selectors.flowBuilderPagePO.SCRIPT_DATA_CONTENT, "password");
    await io.connectionPage.addStep("Verified 'Username' and 'Password' fields are present in Input data");
    await io.flowBuilder.click(selectors.flowBuilderPagePO.CLOSE_RIGHT_DRAWER);
    await io.connectionPage.addStep("Closing Access token URI handlebar");

    await io.flowBuilder.click(selectors.connectionsPagePO.REVOKE_TOKEN_URI_HANDLEBAR);
    await io.connectionPage.addStep("Opening Revoke token URI handlebar");
    await io.assert.verifyElementContainsText(selectors.flowBuilderPagePO.SCRIPT_DATA_CONTENT, "username");
    await io.assert.verifyElementContainsText(selectors.flowBuilderPagePO.SCRIPT_DATA_CONTENT, "password");
    await io.connectionPage.addStep("Verified 'Username' and 'Password' fields are present in Input data");
    await io.flowBuilder.click(selectors.flowBuilderPagePO.CLOSE_RIGHT_DRAWER);
    await io.connectionPage.addStep("Closing Revoke token URI handlebar");

    //TC_C113523 - Verify Encrypted and Unencrypted fields are added in Advanced section
    await io.flowBuilder.clickByIndex(selectors.importPagePO.ADVANCED, 1);
    await expect(page.locator(selectors.connectionsPagePO.OAUTH2_ENCRYPED)).toBeVisible();
    await expect(page.locator(selectors.connectionsPagePO.OAUTH2_UNENCRYPED)).toBeVisible();
    await io.connectionPage.addStep("Verified 'Encrypted' and 'Unencrypted' fields are present");

    //TC_C113525 - Verify field path is correct for Encrypted and Unencrypted fields
    //TC_C113526 -  Verify help text is correct for Encrypted and Unencrypted fields
    await io.flowBuilder.click(selectors.connectionsPagePO.OAUTH2_ENCRYPED_HELP_BUTTON);
    await io.connectionPage.addStep("Click on help icon for 'Encypted' field");
    await io.connectionPage.waitForElementAttached(selectors.myAccountPagePO.HELP_BUBBLE);
    helptext = (await io.connectionPage.getText(selectors.flowBuilderPagePO.PAGE_INFO_TEXT)).toString();
    // await io.assert.expectToContainValue('Field path: iClient.oauth2.encrypted', helptext, 'Help text for Encypted field is not visible');
    await io.assert.expectToContainValue("Store all sensitive fields required by your imports and exports to access the app you are connecting to. For example, {'password':'celigorocks'} or {'token':'x7if4nkovhgr63ghp'}. These values are stored with AES-256 encryption and other layers of protection to keep your data safe.", helptext, 'Help text for Encypted field is not visible');
    await io.connectionPage.addStep("Verified field path and help test for 'Encypted' field");
    await io.flowBuilder.click(selectors.connectionsPagePO.HELPTEXT_CLOSE);

    await io.flowBuilder.click(selectors.connectionsPagePO.OAUTH2_UNENCRYPED_HELP_BUTTON);
    await io.connectionPage.addStep("Click on help icon for 'Unencrypted' field");
    await io.connectionPage.waitForElementAttached(selectors.myAccountPagePO.HELP_BUBBLE);
    helptext = (await io.connectionPage.getText(selectors.flowBuilderPagePO.PAGE_INFO_TEXT)).toString();
    // await io.assert.expectToContainValue("Field path: iClient.oauth2.unencrypted", helptext, "Help text for Unencypted field is not visible");
    await io.assert.expectToContainValue("Store all non-sensitive fields required by your imports and exports to access the app you are connecting to. For example, {'email':'my_email@company.com', 'accountId': '8675301', 'role':'admin'}.", helptext, "Help text for Unencypted field is not visible");
    await io.connectionPage.addStep("Verified field path and help text for 'Unencrypted' field");
    await io.flowBuilder.click(selectors.connectionsPagePO.HELPTEXT_CLOSE);
  });

  test(`@Env-All  @Zephyr-IO-T7777 @Zephyr-IO-T7778 @Zephyr-IO-T7779 @Zephyr-IO-T7780 @Zephyr-IO-T7781 Resource iClient Page`, async ({ io, page }) => {
    await io.homePage.navigateTo(process.env["IO_UI_CONNECTOR_URL"] + "iClients");
    await io.connectionPage.click(selectors.integrationPagePO.ADDNEWRESOURCE);

    //TC_C113520 - Verify Password credentials  new field is added in Grant type dropdown
    await io.flowBuilder.click(selectors.connectionsPagePO.OAUTH2_GRANT_TYPE);
    await expect(page.locator(selectors.connectionsPagePO.GRANT_TYPE_PASSWORD)).toBeVisible();
    await io.assert.verifyElementContainsText(selectors.connectionsPagePO.GRANT_TYPE_PASSWORD, "Password credentials");
    await io.connectionPage.addStep("Verified 'Password credentials' grant type is present");

    //TC_C113521 - Verify username and password fields is added after Grant type field
    await io.flowBuilder.click(selectors.connectionsPagePO.GRANT_TYPE_PASSWORD);
    await io.connectionPage.addStep("Selected 'Password credentials' grant type")

    await expect(page.locator(selectors.connectionsPagePO.OAUTH2_USERNAME)).toBeVisible();
    await expect(page.locator(selectors.connectionsPagePO.OAUTH2_PASSWORD)).toBeVisible();
    await io.connectionPage.addStep("Verified 'Username' and 'Password' fields are present")

    //TC_C113524 - Verify help text is added for username and password fields
    await io.flowBuilder.click(selectors.connectionsPagePO.OAUTH2_USERNAME_HELP_BUTTON);
    await io.connectionPage.addStep("Click on help icon for 'Username' field");
    await io.connectionPage.waitForElementAttached(selectors.myAccountPagePO.HELP_BUBBLE);
    let helptext = (await io.connectionPage.getText(selectors.flowBuilderPagePO.PAGE_INFO_TEXT)).toString();
    await io.assert.expectToContainValue("Enter your username. This identifier is typically provided for your account on the authorization server that issues access tokens.", helptext, "Username help text is not visible");

    await io.flowBuilder.click(selectors.connectionsPagePO.OAUTH2_PASSWORD_HELP_BUTTON);
    await io.connectionPage.addStep("Click on help icon for 'Password' field");
    await io.connectionPage.waitForElementAttached(selectors.myAccountPagePO.HELP_BUBBLE);
    helptext = (await io.connectionPage.getText(selectors.flowBuilderPagePO.PAGE_INFO_TEXT)).toString();
    await io.assert.expectToContainValue('Enter your password. Your password serves as the secret that confirms your identity and verifies that you are the legitimate owner of the account linked to the provided username. Ensure the accuracy and confidentiality of your password.', helptext, 'Passowrh help text1 is not visible');
    await io.assert.expectToContainValue('Multiple layers of protection, including AES 256 encryption, are in place to keep your password safe. When editing this connection, you must re-enter this value each time; it is stored only when the connection is saved and never displayed as text.', helptext, 'Passowrh help text2 is not visible');
    await io.connectionPage.addStep("Verified help text for 'Username' and 'Password' fields");
    await io.flowBuilder.waitForElementAttached(selectors.connectionsPagePO.HELPTEXT_CLOSE)
    await io.flowBuilder.click(selectors.connectionsPagePO.HELPTEXT_CLOSE);

    //TC_C113522 - Verify {username} && {password} are added in AFE handlebar for revoke token url ,access token url
    await io.flowBuilder.fill(selectors.connectionsPagePO.OAUTH2_USERNAME_INPUT, "test");
    await io.flowBuilder.click(selectors.connectionsPagePO.ACCESS_TOKEN_URI_HANDLEBAR);
    await io.connectionPage.addStep("Opening Access token URI handlebar");
    await io.assert.verifyElementContainsText(selectors.flowBuilderPagePO.SCRIPT_DATA_CONTENT, "username");
    await io.assert.verifyElementContainsText(selectors.flowBuilderPagePO.SCRIPT_DATA_CONTENT, "password");
    await io.connectionPage.addStep("Verified 'Username' and 'Password' fields are present in Input data");
    await io.flowBuilder.click(selectors.flowBuilderPagePO.CLOSE_RIGHT_DRAWER);
    await io.connectionPage.addStep("Closing Access token URI handlebar");

    await io.flowBuilder.click(selectors.connectionsPagePO.REVOKE_TOKEN_URI_HANDLEBAR);
    await io.connectionPage.addStep("Opening Revoke token URI handlebar");
    await io.assert.verifyElementContainsText(selectors.flowBuilderPagePO.SCRIPT_DATA_CONTENT, "username");
    await io.assert.verifyElementContainsText(selectors.flowBuilderPagePO.SCRIPT_DATA_CONTENT, "password");
    await io.connectionPage.addStep("Verified 'Username' and 'Password' fields are present in Input data");
    await io.flowBuilder.click(selectors.flowBuilderPagePO.CLOSE_RIGHT_DRAWER);
    await io.connectionPage.addStep("Closing Revoke token URI handlebar");

    //TC_C113523 - Verify Encrypted and Unencrypted fields are added in Advanced section
    await io.flowBuilder.click(selectors.importPagePO.ADVANCED);
    await expect(page.locator(selectors.connectionsPagePO.OAUTH2_ENCRYPED)).toBeVisible();
    await expect(page.locator(selectors.connectionsPagePO.OAUTH2_UNENCRYPED)).toBeVisible();
    await io.connectionPage.addStep("Verified 'Encrypted' and 'Unencrypted' fields are present");

    //TC_C113525 - Verify field path is correct for Encrypted and Unencrypted fields
    //TC_C113526 -  Verify help text is correct for Encrypted and Unencrypted fields
    await io.flowBuilder.click(selectors.connectionsPagePO.OAUTH2_ENCRYPED_HELP_BUTTON);
    await io.connectionPage.addStep("Click on help icon for 'Encypted' field");
    await io.connectionPage.waitForElementAttached(selectors.myAccountPagePO.HELP_BUBBLE);
    helptext = (await io.connectionPage.getText(selectors.flowBuilderPagePO.PAGE_INFO_TEXT)).toString();
    // await io.assert.expectToContainValue('Field path: iClient.oauth2.encrypted', helptext, 'Help text for Encypted field is not visible');
    await io.assert.expectToContainValue("Store all sensitive fields required by your imports and exports to access the app you are connecting to. For example, {'password':'celigorocks'} or {'token':'x7if4nkovhgr63ghp'}. These values are stored with AES-256 encryption and other layers of protection to keep your data safe.", helptext, 'Help text for Encypted field is not visible');
    await io.connectionPage.addStep("Verified field path and help test for 'Encypted' field");
    await io.flowBuilder.click(selectors.connectionsPagePO.HELPTEXT_CLOSE);

    await io.flowBuilder.click(selectors.connectionsPagePO.OAUTH2_UNENCRYPED_HELP_BUTTON);
    await io.connectionPage.addStep("Click on help icon for 'Unencrypted' field");
    await io.connectionPage.waitForElementAttached(selectors.myAccountPagePO.HELP_BUBBLE);
    helptext = (await io.connectionPage.getText(selectors.flowBuilderPagePO.PAGE_INFO_TEXT)).toString();
    //await io.assert.expectToContainValue("Field path: iClient.oauth2.unencrypted", helptext, "Help text for Unencypted field is not visible");
    await io.assert.expectToContainValue("Store all non-sensitive fields required by your imports and exports to access the app you are connecting to. For example, {'email':'my_email@company.com', 'accountId': '8675301', 'role':'admin'}.", helptext, "Help text for Unencypted field is not visible");
    await io.connectionPage.addStep("Verified field path and help text for 'Unencrypted' field");
    await io.flowBuilder.click(selectors.connectionsPagePO.HELPTEXT_CLOSE);
  });
});