import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe(`TC_C1_C2_C6`, () => {
  test(`TC_C2_C3_C6_C7_C8_C9_HTTP_2.0`, async ({ io, page }) => {
    await io.connectionPage.navigateTo(io.data.links.CONNECTIONS_PAGE_URL);
    await io.connectionPage.click(selectors.connectionsPagePO.CREATE_CONNECTION);
    await io.connectionPage.click(selectors.connectionsPagePO.GUSTO_CONNECTION);
    await io.flowBuilder.click(selectors.connectionsPagePO.CREATE_ICLIENT);
    await io.flowBuilder.clickByIndex(selectors.flowBuilderPagePO.HTTP_FORM_SWITCH, 2);

    await io.flowBuilder.click('[data-test="oauth2.grantType"]');
    await expect(page.locator('[data-value="password"]')).toBeVisible();
    await io.assert.verifyElementContainsText('[data-value="password"]', "Password Credentials");

    //TC3
    await io.flowBuilder.click('[data-value="password"]');
    await io.connectionPage.addStep("Selected 'Password Credentials' grant type")

    await expect(page.locator('[id="oauth2.username"]')).toBeVisible();
    await expect(page.locator('[id="oauth2.password"]')).toBeVisible();
    await io.connectionPage.addStep("Verified 'Username' and 'Password' fields are present")

    //TC7
    await io.flowBuilder.click('[id="oauth2.username"] button');
    await io.connectionPage.addStep("Click on help icon for 'Username' field");
    await io.assert.verifyElementContainsText('[id="oauth2.username"] [id="helpBubble"]', "Enter your username. This is typically associated with your account or identity on the authorization server, which is responsible for issuing access tokens. Your username serves to identify you.");

    await io.flowBuilder.click('[id="oauth2.password"] button');
    await io.connectionPage.addStep("Click on help icon for 'Password' field");
    await io.assert.verifyElementContainsText('[id="oauth2.password"] [id="helpBubble"]', "Please provide your password. Your password serves as the secret that confirms your identity and verifies that you are the legitimate owner of the account linked to the provided username. Ensure the accuracy and confidentiality of your password.");
    await io.connectionPage.addStep("Verified help text for 'Username' and 'Password' fields");

    await io.flowBuilder.click(selectors.connectionsPagePO.HELPTEXT_CLOSE);

    //TC6
    await io.flowBuilder.click(selectors.importPagePO.ADVANCED);
    await expect(page.locator('[id="oauth2.encrypted"]')).toBeVisible();
    await expect(page.locator('[id="oauth2.unencrypted"]')).toBeVisible();
    await io.connectionPage.addStep("Verified 'Encrypted' and 'Unencrypted' fields are present");

    //TC8_TC9
    await io.flowBuilder.click('[id="oauth2.encrypted"] button');
    await io.connectionPage.addStep("Click on help icon for 'Encypted' field");
    await io.assert.verifyElementContainsText('[id="oauth2.encrypted"] [id="helpBubble"]', "Field path: iClient.oauth2.encrypted");
    await io.assert.verifyElementContainsText('[id="oauth2.encrypted"] [id="helpBubble"]', "Store all sensitive fields required by your imports and exports to access the app you are connecting to. For example, {'password':'celigorocks'} or {'token':'x7if4nkovhgr63ghp'}. These values are stored with AES-256 encryption and other layers of protection to keep your data safe.");
    await io.connectionPage.addStep("Verified field path and help test for 'Encypted' field");
    await io.flowBuilder.click(selectors.connectionsPagePO.HELPTEXT_CLOSE);

    await io.flowBuilder.click('[id="oauth2.unencrypted"] button');
    await io.connectionPage.addStep("Click on help icon for 'Unencrypted' field");
    await io.assert.verifyElementContainsText('[id="oauth2.unencrypted"] [id="helpBubble"]', "Field path: iClient.oauth2.unencrypted");
    await io.assert.verifyElementContainsText('[id="oauth2.unencrypted"] [id="helpBubble"]', "Store all non-sensitive fields required by your imports and exports to access the app you are connecting to. For example, {'email':'my_email@company.com', 'accountId': '8675301', 'role':'admin'}.");
    await io.connectionPage.addStep("Verified field path and help text for 'Unencrypted' field");
    await io.flowBuilder.click(selectors.connectionsPagePO.HELPTEXT_CLOSE);
  });
  test(`1TC_C2_C3_C6_C7_C8_C9_HTTP`, async ({ io, page }) => {
    await io.connectionPage.navigateTo(io.data.links.CONNECTIONS_PAGE_URL);
    await io.connectionPage.click(selectors.connectionsPagePO.CREATE_CONNECTION);
    await io.connectionPage.click(selectors.importPagePO.HTTP_IMPORT);
    await io.connectionPage.click(selectors.connectionsPagePO.HTTP_AUTH_TYPE_ID);
    await io.connectionPage.click(selectors.connectionsPagePO.OAUTH);
    await io.flowBuilder.click(selectors.connectionsPagePO.CREATE_ICLIENT);

    await io.flowBuilder.click('[data-test="oauth2.grantType"]');
    await expect(page.locator('[data-value="password"]')).toBeVisible();
    await io.assert.verifyElementContainsText('[data-value="password"]', "Password Credentials");

    //TC3
    await io.flowBuilder.click('[data-value="password"]');
    await io.connectionPage.addStep("Selected 'Password Credentials' grant type")

    await expect(page.locator('[id="oauth2.username"]')).toBeVisible();
    await expect(page.locator('[id="oauth2.password"]')).toBeVisible();
    await io.connectionPage.addStep("Verified 'Username' and 'Password' fields are present")

    //TC7
    await io.flowBuilder.click('[id="oauth2.username"] button');
    await io.connectionPage.addStep("Click on help icon for 'Username' field");
    await io.assert.verifyElementContainsText('[id="oauth2.username"] [id="helpBubble"]', "Enter your username. This is typically associated with your account or identity on the authorization server, which is responsible for issuing access tokens. Your username serves to identify you.");

    await io.flowBuilder.click('[id="oauth2.password"] button');
    await io.connectionPage.addStep("Click on help icon for 'Password' field");
    await io.assert.verifyElementContainsText('[id="oauth2.password"] [id="helpBubble"]', "Please provide your password. Your password serves as the secret that confirms your identity and verifies that you are the legitimate owner of the account linked to the provided username. Ensure the accuracy and confidentiality of your password.");
    await io.connectionPage.addStep("Verified help text for 'Username' and 'Password' fields");

    await io.flowBuilder.click(selectors.connectionsPagePO.HELPTEXT_CLOSE);

    //TC6
    await io.flowBuilder.clickByIndex(selectors.importPagePO.ADVANCED, 1);
    await expect(page.locator('[id="oauth2.encrypted"]')).toBeVisible();
    await expect(page.locator('[id="oauth2.unencrypted"]')).toBeVisible();
    await io.connectionPage.addStep("Verified 'Encrypted' and 'Unencrypted' fields are present");

    //TC8_TC9
    await io.flowBuilder.click('[id="oauth2.encrypted"] button');
    await io.connectionPage.addStep("Click on help icon for 'Encypted' field");
    await io.assert.verifyElementContainsText('[id="oauth2.encrypted"] [id="helpBubble"]', "Field path: iClient.oauth2.encrypted");
    await io.assert.verifyElementContainsText('[id="oauth2.encrypted"] [id="helpBubble"]', "Store all sensitive fields required by your imports and exports to access the app you are connecting to. For example, {'password':'celigorocks'} or {'token':'x7if4nkovhgr63ghp'}. These values are stored with AES-256 encryption and other layers of protection to keep your data safe.");
    await io.connectionPage.addStep("Verified field path and help test for 'Encypted' field");
    await io.flowBuilder.click(selectors.connectionsPagePO.HELPTEXT_CLOSE);

    await io.flowBuilder.click('[id="oauth2.unencrypted"] button');
    await io.connectionPage.addStep("Click on help icon for 'Unencrypted' field");
    await io.assert.verifyElementContainsText('[id="oauth2.unencrypted"] [id="helpBubble"]', "Field path: iClient.oauth2.unencrypted");
    await io.assert.verifyElementContainsText('[id="oauth2.unencrypted"] [id="helpBubble"]', "Store all non-sensitive fields required by your imports and exports to access the app you are connecting to. For example, {'email':'my_email@company.com', 'accountId': '8675301', 'role':'admin'}.");
    await io.connectionPage.addStep("Verified field path and help text for 'Unencrypted' field");
    await io.flowBuilder.click(selectors.connectionsPagePO.HELPTEXT_CLOSE);
  });

  test(`1TC_C2_C3_C6_C7_C8_C9_REST_API`, async ({ io, page }) => {
    await io.connectionPage.navigateTo(io.data.links.CONNECTIONS_PAGE_URL);
    await io.connectionPage.click(selectors.connectionsPagePO.CREATE_CONNECTION);
    await io.connectionPage.click('[data-test="REST API (HTTP)"]');
    await io.connectionPage.click(selectors.connectionsPagePO.HTTP_AUTH_TYPE_ID);
    await io.connectionPage.click(selectors.connectionsPagePO.OAUTH);
    await io.flowBuilder.click(selectors.connectionsPagePO.CREATE_ICLIENT);

    await io.flowBuilder.click('[data-test="oauth2.grantType"]');
    await expect(page.locator('[data-value="password"]')).toBeVisible();
    await io.assert.verifyElementContainsText('[data-value="password"]', "Password Credentials");

    //TC3
    await io.flowBuilder.click('[data-value="password"]');
    await io.connectionPage.addStep("Selected 'Password Credentials' grant type")

    await expect(page.locator('[id="oauth2.username"]')).toBeVisible();
    await expect(page.locator('[id="oauth2.password"]')).toBeVisible();
    await io.connectionPage.addStep("Verified 'Username' and 'Password' fields are present")

    //TC7
    await io.flowBuilder.click('[id="oauth2.username"] button');
    await io.connectionPage.addStep("Click on help icon for 'Username' field");
    await io.assert.verifyElementContainsText('[id="oauth2.username"] [id="helpBubble"]', "Enter your username. This is typically associated with your account or identity on the authorization server, which is responsible for issuing access tokens. Your username serves to identify you.");

    await io.flowBuilder.click('[id="oauth2.password"] button');
    await io.connectionPage.addStep("Click on help icon for 'Password' field");
    await io.assert.verifyElementContainsText('[id="oauth2.password"] [id="helpBubble"]', "Please provide your password. Your password serves as the secret that confirms your identity and verifies that you are the legitimate owner of the account linked to the provided username. Ensure the accuracy and confidentiality of your password.");
    await io.connectionPage.addStep("Verified help text for 'Username' and 'Password' fields");

    await io.flowBuilder.click(selectors.connectionsPagePO.HELPTEXT_CLOSE);

    //TC6
    await io.flowBuilder.clickByIndex(selectors.importPagePO.ADVANCED, 1);
    await expect(page.locator('[id="oauth2.encrypted"]')).toBeVisible();
    await expect(page.locator('[id="oauth2.unencrypted"]')).toBeVisible();
    await io.connectionPage.addStep("Verified 'Encrypted' and 'Unencrypted' fields are present");

    //TC8_TC9
    await io.flowBuilder.click('[id="oauth2.encrypted"] button');
    await io.connectionPage.addStep("Click on help icon for 'Encypted' field");
    await io.assert.verifyElementContainsText('[id="oauth2.encrypted"] [id="helpBubble"]', "Field path: iClient.oauth2.encrypted");
    await io.assert.verifyElementContainsText('[id="oauth2.encrypted"] [id="helpBubble"]', "Store all sensitive fields required by your imports and exports to access the app you are connecting to. For example, {'password':'celigorocks'} or {'token':'x7if4nkovhgr63ghp'}. These values are stored with AES-256 encryption and other layers of protection to keep your data safe.");
    await io.connectionPage.addStep("Verified field path and help test for 'Encypted' field");
    await io.flowBuilder.click(selectors.connectionsPagePO.HELPTEXT_CLOSE);

    await io.flowBuilder.click('[id="oauth2.unencrypted"] button');
    await io.connectionPage.addStep("Click on help icon for 'Unencrypted' field");
    await io.assert.verifyElementContainsText('[id="oauth2.unencrypted"] [id="helpBubble"]', "Field path: iClient.oauth2.unencrypted");
    await io.assert.verifyElementContainsText('[id="oauth2.unencrypted"] [id="helpBubble"]', "Store all non-sensitive fields required by your imports and exports to access the app you are connecting to. For example, {'email':'my_email@company.com', 'accountId': '8675301', 'role':'admin'}.");
    await io.connectionPage.addStep("Verified field path and help text for 'Unencrypted' field");
    await io.flowBuilder.click(selectors.connectionsPagePO.HELPTEXT_CLOSE);
  });

  test(`1TC_C2_C3_C6_C7_C8_C9_OAuth2.0`, async ({ io, page }) => {
    await io.connectionPage.navigateTo(io.data.links.CONNECTIONS_PAGE_URL);
    await io.connectionPage.click(selectors.connectionsPagePO.CREATE_CONNECTION);
    await io.connectionPage.click(selectors.connectionsPagePO.GUSTO_CONNECTION);
    await io.flowBuilder.click(selectors.flowBuilderPagePO.HTTP_FORM_SWITCH);
    await io.connectionPage.click(selectors.connectionsPagePO.HTTP_AUTH_TYPE_ID);
    await io.connectionPage.click(selectors.connectionsPagePO.OAUTH);
    await io.flowBuilder.click(selectors.connectionsPagePO.CREATE_ICLIENT);
    await io.flowBuilder.clickByIndex(selectors.flowBuilderPagePO.HTTP_FORM_SWITCH, 2);

    await io.flowBuilder.click('[data-test="oauth2.grantType"]');
    await expect(page.locator('[data-value="password"]')).toBeVisible();
    await io.assert.verifyElementContainsText('[data-value="password"]', "Password Credentials");

    //TC3
    await io.flowBuilder.click('[data-value="password"]');
    await io.connectionPage.addStep("Selected 'Password Credentials' grant type")

    await expect(page.locator('[id="oauth2.username"]')).toBeVisible();
    await expect(page.locator('[id="oauth2.password"]')).toBeVisible();
    await io.connectionPage.addStep("Verified 'Username' and 'Password' fields are present")

    //TC7
    await io.flowBuilder.click('[id="oauth2.username"] button');
    await io.connectionPage.addStep("Click on help icon for 'Username' field");
    await io.assert.verifyElementContainsText('[id="oauth2.username"] [id="helpBubble"]', "Enter your username. This is typically associated with your account or identity on the authorization server, which is responsible for issuing access tokens. Your username serves to identify you.");

    await io.flowBuilder.click('[id="oauth2.password"] button');
    await io.connectionPage.addStep("Click on help icon for 'Password' field");
    await io.assert.verifyElementContainsText('[id="oauth2.password"] [id="helpBubble"]', "Please provide your password. Your password serves as the secret that confirms your identity and verifies that you are the legitimate owner of the account linked to the provided username. Ensure the accuracy and confidentiality of your password.");
    await io.connectionPage.addStep("Verified help text for 'Username' and 'Password' fields");

    await io.flowBuilder.click(selectors.connectionsPagePO.HELPTEXT_CLOSE);

    //TC6
    await io.flowBuilder.clickByIndex(selectors.importPagePO.ADVANCED, 1);
    await expect(page.locator('[id="oauth2.encrypted"]')).toBeVisible();
    await expect(page.locator('[id="oauth2.unencrypted"]')).toBeVisible();
    await io.connectionPage.addStep("Verified 'Encrypted' and 'Unencrypted' fields are present");

    //TC8_TC9
    await io.flowBuilder.click('[id="oauth2.encrypted"] button');
    await io.connectionPage.addStep("Click on help icon for 'Encypted' field");
    await io.assert.verifyElementContainsText('[id="oauth2.encrypted"] [id="helpBubble"]', "Field path: iClient.oauth2.encrypted");
    await io.assert.verifyElementContainsText('[id="oauth2.encrypted"] [id="helpBubble"]', "Store all sensitive fields required by your imports and exports to access the app you are connecting to. For example, {'password':'celigorocks'} or {'token':'x7if4nkovhgr63ghp'}. These values are stored with AES-256 encryption and other layers of protection to keep your data safe.");
    await io.connectionPage.addStep("Verified field path and help test for 'Encypted' field");
    await io.flowBuilder.click(selectors.connectionsPagePO.HELPTEXT_CLOSE);

    await io.flowBuilder.click('[id="oauth2.unencrypted"] button');
    await io.connectionPage.addStep("Click on help icon for 'Unencrypted' field");
    await io.assert.verifyElementContainsText('[id="oauth2.unencrypted"] [id="helpBubble"]', "Field path: iClient.oauth2.unencrypted");
    await io.assert.verifyElementContainsText('[id="oauth2.unencrypted"] [id="helpBubble"]', "Store all non-sensitive fields required by your imports and exports to access the app you are connecting to. For example, {'email':'my_email@company.com', 'accountId': '8675301', 'role':'admin'}.");
    await io.connectionPage.addStep("Verified field path and help text for 'Unencrypted' field");
    await io.flowBuilder.click(selectors.connectionsPagePO.HELPTEXT_CLOSE);
  });

  test(`TC_C2_C3_C6_C7_C8_C9_Iclient`, async ({ io, page }) => {
    await io.homePage.navigateTo(process.env["IO_UI_CONNECTOR_URL"] + "iClients");
    await io.connectionPage.click(selectors.integrationPagePO.ADDNEWRESOURCE);
  

    await io.flowBuilder.click('[data-test="oauth2.grantType"]');
    await expect(page.locator('[data-value="password"]')).toBeVisible();
    await io.assert.verifyElementContainsText('[data-value="password"]', "Password Credentials");

    //TC3
    await io.flowBuilder.click('[data-value="password"]');
    await io.connectionPage.addStep("Selected 'Password Credentials' grant type")

    await expect(page.locator('[id="oauth2.username"]')).toBeVisible();
    await expect(page.locator('[id="oauth2.password"]')).toBeVisible();
    await io.connectionPage.addStep("Verified 'Username' and 'Password' fields are present")

    //TC7
    await io.flowBuilder.click('[id="oauth2.username"] button');
    await io.connectionPage.addStep("Click on help icon for 'Username' field");
    await io.assert.verifyElementContainsText('[id="oauth2.username"] [id="helpBubble"]', "Enter your username. This is typically associated with your account or identity on the authorization server, which is responsible for issuing access tokens. Your username serves to identify you.");

    await io.flowBuilder.click('[id="oauth2.password"] button');
    await io.connectionPage.addStep("Click on help icon for 'Password' field");
    await io.assert.verifyElementContainsText('[id="oauth2.password"] [id="helpBubble"]', "Please provide your password. Your password serves as the secret that confirms your identity and verifies that you are the legitimate owner of the account linked to the provided username. Ensure the accuracy and confidentiality of your password.");
    await io.connectionPage.addStep("Verified help text for 'Username' and 'Password' fields");

    await io.flowBuilder.click(selectors.connectionsPagePO.HELPTEXT_CLOSE);

    //TC6
    await io.flowBuilder.click(selectors.importPagePO.ADVANCED);
    await expect(page.locator('[id="oauth2.encrypted"]')).toBeVisible();
    await expect(page.locator('[id="oauth2.unencrypted"]')).toBeVisible();
    await io.connectionPage.addStep("Verified 'Encrypted' and 'Unencrypted' fields are present");

    //TC8_TC9
    await io.flowBuilder.click('[id="oauth2.encrypted"] button');
    await io.connectionPage.addStep("Click on help icon for 'Encypted' field");
    await io.assert.verifyElementContainsText('[id="oauth2.encrypted"] [id="helpBubble"]', "Field path: iClient.oauth2.encrypted");
    await io.assert.verifyElementContainsText('[id="oauth2.encrypted"] [id="helpBubble"]', "Store all sensitive fields required by your imports and exports to access the app you are connecting to. For example, {'password':'celigorocks'} or {'token':'x7if4nkovhgr63ghp'}. These values are stored with AES-256 encryption and other layers of protection to keep your data safe.");
    await io.connectionPage.addStep("Verified field path and help test for 'Encypted' field");
    await io.flowBuilder.click(selectors.connectionsPagePO.HELPTEXT_CLOSE);

    await io.flowBuilder.click('[id="oauth2.unencrypted"] button');
    await io.connectionPage.addStep("Click on help icon for 'Unencrypted' field");
    await io.assert.verifyElementContainsText('[id="oauth2.unencrypted"] [id="helpBubble"]', "Field path: iClient.oauth2.unencrypted");
    await io.assert.verifyElementContainsText('[id="oauth2.unencrypted"] [id="helpBubble"]', "Store all non-sensitive fields required by your imports and exports to access the app you are connecting to. For example, {'email':'my_email@company.com', 'accountId': '8675301', 'role':'admin'}.");
    await io.connectionPage.addStep("Verified field path and help text for 'Unencrypted' field");
    await io.flowBuilder.click(selectors.connectionsPagePO.HELPTEXT_CLOSE);
  });
});