import {expect, test} from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { Mappings2dot0Page } from "@celigo/ui-core-automation/dist/src/pageFactory/pages/Mappings2dot0Page";
import { Mappings } from "@celigo/aut-selectors/dist/src/selectors/Mappings";

test.describe("C112075_C112076_C112077_C112078_C112079", () => {
  test.beforeEach(async ({ io }) => {
    await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
  
  });
  test("@Env-All @Zephyr-IO-T14658 C112075 Verify the 3 fields when we select HAMAC signature method from Dropdown", async ({io, page}) => {
      await io.connectionPage.navigateTo(io.data.links.CONNECTIONS_PAGE_URL);
      await io.connectionPage.click(selectors.basePagePO.ADD_NEW_RESOURCE);
      await io.connectionPage.waitForElementAttached(selectors.connectionsPagePO.CONNECTION_SEARCH);
      await io.connectionPage.fill(selectors.connectionsPagePO.CONNECTION_SEARCH, 'http');
      await io.connectionPage.waitForElementAttached(selectors.basePagePO.HTTP_2DOT0)
      await io.connectionPage.click(selectors.basePagePO.HTTP_2DOT0);
      await io.flowBuilder.loadingTime();
      await io.connectionPage.click(selectors.connectionsPagePO.SLACK_AUTH_TYPE);
      await io.connectionPage.selectTextfromDropDown(page, "jwtbearer");
      await io.connectionPage.click(selectors.connectionsPagePO.SIGNATURE_METHOD);
      await io.connectionPage.selectTextfromDropDown(page, "hmac-sha256");
      const monitorExp = await io.homePage.isVisible("text='Secret'");
      await io.assert.expectToBeValue(monitorExp.toString(), 'true', "Value is found");
      const monitorExp1 = await io.homePage.isVisible("text='Payload'");
      await io.assert.expectToBeValue(monitorExp1.toString(), 'true', "Value is found");
      const monitorExp2 = await io.homePage.isVisible("text='JWT headers'");
      await io.assert.expectToBeValue(monitorExp2.toString(), 'true', "Value is found");
  });
  test("@Env-All @Zephyr-IO-T14659 C112076 Verify the Help texts for 3 fields 1)Secret Key 2)Payload 3)Header", async ({io, page}) => {
    await io.connectionPage.navigateTo(io.data.links.CONNECTIONS_PAGE_URL);
    await io.connectionPage.click(selectors.basePagePO.ADD_NEW_RESOURCE);
    await io.connectionPage.waitForElementAttached(selectors.connectionsPagePO.CONNECTION_SEARCH);
    await io.connectionPage.fill(selectors.connectionsPagePO.CONNECTION_SEARCH, 'http');
    await io.connectionPage.waitForElementAttached(selectors.basePagePO.HTTP_2DOT0)
    await io.connectionPage.click(selectors.basePagePO.HTTP_2DOT0);
    await io.flowBuilder.loadingTime();
    await io.connectionPage.click(selectors.connectionsPagePO.SLACK_AUTH_TYPE);
    await io.connectionPage.selectTextfromDropDown(page, "jwtbearer");
    await io.connectionPage.click(selectors.connectionsPagePO.SIGNATURE_METHOD);
    await io.connectionPage.selectTextfromDropDown(page, "hmac-sha256");
    await io.connectionPage.click(selectors.connectionsPagePO.SECRET_BUTTON);
    await io.connectionPage.waitForElementAttached(selectors.connectionsPagePO.HELP_BUBBLE);
    const secretText = (await io.flowBuilder.getText(
    selectors.connectionsPagePO.HELP_BUBBLE
      )) as string;

      await io.assert.expectToContainValue(
        "Use this key as a secret password that generates the JWT signature",
        secretText,
        "secrettext name not found"
      );

  });
  test("@Env-All @Zephyr-IO-T14660 C112077 Verify Handle bars are working fine at Payload and Header ", async ({io, page}) => {
    await io.connectionPage.navigateTo(io.data.links.CONNECTIONS_PAGE_URL);
    await io.connectionPage.click(selectors.basePagePO.ADD_NEW_RESOURCE);
    await io.connectionPage.waitForElementAttached(selectors.connectionsPagePO.CONNECTION_SEARCH);
    await io.connectionPage.fill(selectors.connectionsPagePO.CONNECTION_SEARCH, 'http');
    await io.connectionPage.waitForElementAttached(selectors.basePagePO.HTTP_2DOT0)
    await io.connectionPage.click(selectors.basePagePO.HTTP_2DOT0);
    await io.flowBuilder.loadingTime();
    await io.connectionPage.click(selectors.connectionsPagePO.SLACK_AUTH_TYPE);
    await io.connectionPage.selectTextfromDropDown(page, "jwtbearer");
    await io.connectionPage.click(selectors.connectionsPagePO.SIGNATURE_METHOD);
    await io.connectionPage.selectTextfromDropDown(page, "hmac-sha384");
    await io.connectionPage.clickByIndex(selectors.connectionsPagePO.PAYLOAD_BUTTON,1);
    await io.flowBuilder.loadingTime();
    await page.locator(selectors.mappings.MAPPER2DOT0PO.ENTERHANDLEBAREXPRESSION).nth(0).click({clickCount: 3});
    await page.keyboard.press('Backspace');
    await io.connectionPage.fill(selectors.connectionsPagePO.RULE_TEXTAERA,"test");
    await io.connectionPage.clickByIndex(selectors.basePagePO.SAVE_AND_CLOSE,1);
    await io.flowBuilder.loadingTime();
    await io.connectionPage.clickByIndex(selectors.connectionsPagePO.HEADERS_BUTTON,1);
    await io.flowBuilder.loadingTime();
    await page.locator(selectors.mappings.MAPPER2DOT0PO.ENTERHANDLEBAREXPRESSION).nth(0).click({clickCount: 3});
    await page.keyboard.press('Backspace');
    await io.homePage.fill(selectors.connectionsPagePO.RULE_TEXTAERA, "test");
    await io.connectionPage.clickByIndex(selectors.basePagePO.SAVE_AND_CLOSE,1);
  });
  test("@Env-All @Zephyr-IO-T14661 C112078 Verify the 3 fields when we select RS/PS/ES signature method from Dropdown", async ({io, page}) => {
      await io.connectionPage.navigateTo(io.data.links.CONNECTIONS_PAGE_URL);
      await io.connectionPage.click(selectors.basePagePO.ADD_NEW_RESOURCE);
      await io.connectionPage.waitForElementAttached(selectors.connectionsPagePO.CONNECTION_SEARCH);
      await io.connectionPage.fill(selectors.connectionsPagePO.CONNECTION_SEARCH, 'http');
      await io.connectionPage.waitForElementAttached(selectors.basePagePO.HTTP_2DOT0)
      await io.connectionPage.click(selectors.basePagePO.HTTP_2DOT0);
      await io.flowBuilder.loadingTime();
      await io.connectionPage.click(selectors.connectionsPagePO.SLACK_AUTH_TYPE);
      await io.connectionPage.selectTextfromDropDown(page, "jwtbearer");
      await io.connectionPage.click(selectors.connectionsPagePO.SIGNATURE_METHOD);
      await io.connectionPage.selectTextfromDropDown(page, "es256");
      const monitorExp = await io.homePage.isVisible("text='Private key'");
      await io.assert.expectToBeValue(monitorExp.toString(), 'true', "Value is found");
      const monitorExp1 = await io.homePage.isVisible("text='Payload'");
      await io.assert.expectToBeValue(monitorExp1.toString(), 'true', "Value is found");
      const monitorExp2 = await io.homePage.isVisible("text='JWT headers'");
      await io.assert.expectToBeValue(monitorExp2.toString(), 'true', "Value is found");
  });
  test("@Env-All @Zephyr-IO-T14662 C112079 Verify the Help Text of Private Key", async ({io, page}) => {
    await io.connectionPage.navigateTo(io.data.links.CONNECTIONS_PAGE_URL);
    await io.connectionPage.click(selectors.basePagePO.ADD_NEW_RESOURCE);
    await io.connectionPage.waitForElementAttached(selectors.connectionsPagePO.CONNECTION_SEARCH);
    await io.connectionPage.fill(selectors.connectionsPagePO.CONNECTION_SEARCH, 'http');
    await io.connectionPage.waitForElementAttached(selectors.basePagePO.HTTP_2DOT0)
    await io.connectionPage.click(selectors.basePagePO.HTTP_2DOT0);
    await io.flowBuilder.loadingTime();
    await io.connectionPage.click(selectors.connectionsPagePO.SLACK_AUTH_TYPE);
    await io.connectionPage.selectTextfromDropDown(page, "jwtbearer");
    await io.connectionPage.click(selectors.connectionsPagePO.SIGNATURE_METHOD);
    await io.connectionPage.selectTextfromDropDown(page, "ps256");
    await io.connectionPage.click(selectors.connectionsPagePO.PRIVATE_BUTTON);
    await io.connectionPage.waitForElementAttached(selectors.connectionsPagePO.HELP_BUBBLE);
    const secretText = (await io.flowBuilder.getText(
    selectors.connectionsPagePO.HELP_BUBBLE
      )) as string;

      await io.assert.expectToContainValue(
        "Private keyCopy the private key from the portal you want to use to authenticate the connection. Before you add it to integrator.io, you must replace all newline characters (\\\\n) throughout the private key. The private key must be in PEM format. You can convert PFX certificates or convert from a PPK file.1. Paste the private key into a text editor.2. Find \\\\n.3. Delete the \\\\n characters and press Enter or Return. Repeat this for each instance of \\\\n.4. Ensure -----BEGIN PRIVATE KEY----- appears before the key, and -----END PRIVATE KEY----- appears after the key.5. Copy and paste the reformatted private key (including the begin and end declarations) into integrator.io.Was this helpful?Field path: connection.http.auth.jwt.privateKey",
        secretText,
        "secrettext name not found"
      );
      await io.connectionPage.click(selectors.connectionsPagePO.HELPTEXT_CLOSE);

      await io.homePage.selectTextfromDropDown
  });
});