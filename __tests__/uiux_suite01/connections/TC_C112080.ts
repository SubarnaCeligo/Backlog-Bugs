import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import * as C112080 from "@testData/Connections/TC_C112080.json";


test.describe("C112080_C112081_C112082_C2112083_C112089", () => {
  test.beforeEach(async ({ io }) => {
    await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);

  });
  test("@Env-All @Zephyr-IO-T14663 C112080 Verify user able to give all the secret key,payload,header values", async ({ io, page }) => {
    await io.connectionPage.navigateTo(io.data.links.CONNECTIONS_PAGE_URL);
    await io.connectionPage.click(selectors.basePagePO.ADD_NEW_RESOURCE);
    await io.connectionPage.fill(selectors.connectionsPagePO.CONNECTION_SEARCH, 'http');
    await io.connectionPage.waitForElementAttached(selectors.basePagePO.HTTP_2DOT0)
    await io.connectionPage.click(selectors.basePagePO.HTTP_2DOT0);
    await io.flowBuilder.loadingTime();
    await io.connectionPage.click(selectors.connectionsPagePO.GENERAL);
    await io.connectionPage.click(selectors.connectionsPagePO.APPLICATION_DETAILS);
    await io.connectionPage.click(selectors.connectionsPagePO.SLACK_AUTH_TYPE);
    await io.connectionPage.selectTextfromDropDown(page, "jwtbearer");
    await io.flowBuilder.loadingTime();
    await io.connectionPage.click(selectors.connectionsPagePO.SIGNATURE_METHOD);
    await io.connectionPage.selectTextfromDropDown(page, "hmac-sha256");
    await io.flowBuilder.loadingTime();


    //Fill secret key
    await io.connectionPage.fill(selectors.connectionsPagePO.JWT_SECRET, 'SecretKey');
    await io.flowBuilder.loadingTime();
    // Locate the textarea
    const textarea = await page.$(selectors.connectionsPagePO.JWT_PAYLOAD);

    if (textarea) {
      // Click the textarea to focus on it
      await textarea.click();

      // Select all text and delete it
      await io.homePage.loadingTime();
      await page.keyboard.press('Control+A');
      await page.keyboard.press('Meta+A');
      await page.keyboard.press('Backspace');
    }
    //Add new FDR
    await io.homePage.loadingTime();
    await io.exportsPage.fill(selectors.connectionsPagePO.JWT_PAYLOAD + ' textarea', JSON.stringify({ "key": "PayloadValue" }));

    // Locate the textarea
    const textarea2 = await page.$(selectors.connectionsPagePO.JWT_HEADERS);

    if (textarea2) {
      // Click the textarea to focus on it
      await textarea2.click();

      // Select all text and delete it
      await io.homePage.loadingTime();
      await page.keyboard.press('Control+A');
      await page.keyboard.press('Meta+A');
      await page.keyboard.press('Backspace');
    }
    //Add new FDR
    await io.homePage.loadingTime();
    await io.exportsPage.fill(selectors.connectionsPagePO.JWT_HEADERS + ' textarea', JSON.stringify({ "key": "HeaderValue" }));
    await io.assert.verifyElementAttribute(selectors.connectionsPagePO.JWT_SECRET, 'value', 'SecretKey');
    let filledData = (await io.connectionPage.getText(selectors.importPagePO.STUB_CONTENTS_CSS)).toString();
    let filledDataArray: string[] = filledData.split(',');
    await io.assert.expectToBeValueInArray(filledDataArray, '{"key":"PayloadValue"}', 'Payload is not filled');
    await io.assert.expectToBeValueInArray(filledDataArray, '{"key":"HeaderValue"}', 'Header is not filled');

  });
  test("@Env-All @Zephyr-IO-T14664 C112081 Verify the payload and Header field values", async ({io, page}) => {
    await io.connectionPage.navigateTo(io.data.links.CONNECTIONS_PAGE_URL);
    await io.connectionPage.click(selectors.basePagePO.ADD_NEW_RESOURCE);
    await io.connectionPage.fill(selectors.connectionsPagePO.CONNECTION_SEARCH, 'http');
    await io.connectionPage.waitForElementAttached(selectors.basePagePO.HTTP_2DOT0)
    await io.connectionPage.click(selectors.basePagePO.HTTP_2DOT0);
    await io.flowBuilder.loadingTime();
    await io.connectionPage.click(selectors.connectionsPagePO.GENERAL);
    await io.connectionPage.click(selectors.connectionsPagePO.APPLICATION_DETAILS);
    await io.connectionPage.click(selectors.connectionsPagePO.SLACK_AUTH_TYPE);
    await io.connectionPage.selectTextfromDropDown(page, "jwtbearer");
    await io.connectionPage.click(selectors.connectionsPagePO.SIGNATURE_METHOD);
    await io.connectionPage.selectTextfromDropDown(page, "hmac-sha256");
    await io.flowBuilder.loadingTime();
    let payload = (await io.connectionPage.getText(selectors.connectionsPagePO.JWT_PAYLOAD)).toString();
    await io.assert.expectToContainValue('{"exp":"expiration-as-integer","sub":"{sub}","iss":"{iss}","aud":"{aud}"}',payload, 'Payload is not displayed');
  });
  test("@Env-All @Zephyr-IO-T14665 C112082 Verify secret key as masked while user entering", async ({io, page}) => {
    await io.connectionPage.navigateTo(io.data.links.CONNECTIONS_PAGE_URL);
    await io.connectionPage.click(selectors.basePagePO.ADD_NEW_RESOURCE);
    await io.connectionPage.fill(selectors.connectionsPagePO.CONNECTION_SEARCH, 'http');
    await io.connectionPage.waitForElementAttached(selectors.basePagePO.HTTP_2DOT0)
    await io.connectionPage.click(selectors.basePagePO.HTTP_2DOT0);
    await io.flowBuilder.loadingTime();
    await io.connectionPage.click(selectors.connectionsPagePO.GENERAL);
    await io.connectionPage.click(selectors.connectionsPagePO.APPLICATION_DETAILS);
    await io.connectionPage.click(selectors.connectionsPagePO.SLACK_AUTH_TYPE);
    await io.connectionPage.selectTextfromDropDown(page, "jwtbearer");
    await io.connectionPage.click(selectors.connectionsPagePO.SIGNATURE_METHOD);
    await io.connectionPage.selectTextfromDropDown(page, "hmac-sha256");
    await io.connectionPage.fill(selectors.connectionsPagePO.JWT_SECRET,"345");
    await io.flowBuilder.loadingTime();
    await io.homePage.waitForElementAttached(selectors.connectionsPagePO.JWT_SECRET);
    // await io.assert.checkSnapshot(selectors.importPagePO.PASSWORD,"C112082.png"); -- Screenshot comparision fails most of the times due to 2-3 pixel difference
    await io.assert.verifyElementAttribute(selectors.connectionsPagePO.SECRET_KEY_INPUT , 'type', 'password');
  });
  test("@Env-All @Zephyr-IO-T14666 C112083 Verify user able to create connection using JWT bearer HTTP connection", async ({io, page}) => {
    await io.connectionPage.navigateTo(io.data.links.CONNECTIONS_PAGE_URL);
    await io.connectionPage.click(selectors.basePagePO.ADD_NEW_RESOURCE);
    await io.connectionPage.fill(selectors.connectionsPagePO.CONNECTION_SEARCH, 'http');
    await io.connectionPage.waitForElementAttached(selectors.basePagePO.HTTP_2DOT0)
    await io.connectionPage.click(selectors.basePagePO.HTTP_2DOT0);
    await io.flowBuilder.loadingTime();
    await io.connectionPage.fill(selectors.connectionsPagePO.CONNECTION_NAME,"GITHUB TEST");
    await io.connectionPage.fill(
        selectors.connectionsPagePO.BASE_URI,
         C112080.BASE_URI
      );
    await io.connectionPage.fill (selectors.connectionsPagePO.APPLICATION_NAME0,C112080.NAME0);
    await io.connectionPage.fill(selectors.connectionsPagePO.APPLICATION_VALUE0,C112080.VALUEO);
    await io.connectionPage.fill (selectors.connectionsPagePO.APPLICATION_NAME1,C112080.NAME1);
    await io.connectionPage.fill(selectors.connectionsPagePO.APPLICATION_VALUE1,C112080.VALUE1);
    await io.connectionPage.fill (selectors.connectionsPagePO.APPLICATION_NAME2,C112080.NAME2);
   await io.connectionPage.fill(selectors.connectionsPagePO.APPLICATION_VALUE2,"495629"
   );
    await io.connectionPage.click(selectors.connectionsPagePO.GENERAL);
    await io.connectionPage.click(selectors.connectionsPagePO.APPLICATION_DETAILS);
    await io.connectionPage.click(selectors.connectionsPagePO.SLACK_AUTH_TYPE);
    await io.connectionPage.selectTextfromDropDown(page, "jwtbearer");
    await io.connectionPage.click(selectors.connectionsPagePO.SIGNATURE_METHOD);
    await io.connectionPage.selectTextfromDropDown(page, "rsa-sha256");
    await io.connectionPage.fill(
        selectors.connectionsPagePO.JWT_PRIVATEKEY,
        C112080.PRIVATE_KEY
      );
    await page.locator(selectors.connectionsPagePO.JWT_PAYLOAD).nth(0).click({clickCount: 3});
        await page.keyboard.press('Backspace');
      await io.connectionPage.fill(
        selectors.connectionsPagePO.JWT_PAYLOAD_INPUT,
        '{"iss":"495629"}'
      );
    await io.connectionPage.click(selectors.connectionsPagePO.LOCATION);
    await io.connectionPage.selectTextfromDropDown(page, "header");
    await io.connectionPage.click(selectors.connectionsPagePO.AUTH_SCHEME);
    await io.connectionPage.selectTextfromDropDown(page, "Bearer");
    await io.connectionPage.click(selectors.connectionsPagePO.CONFIGURE_JWT);
    await io.connectionPage.click(selectors.connectionsPagePO.HOW_TO_TESTCONNECTION);
    await io.flowBuilder.loadingTime();
    await io.connectionPage.click(selectors.connectionsPagePO.PING_METHOD);
    await io.connectionPage.selectTextfromDropDown(page, "GET");
    await io.connectionPage.fill(selectors.connectionsPagePO.RELATIVEURI,'/app');
    // await page.pause();
    await io.connectionPage.click(selectors.basePagePO.TEST_CONNECTION);
    await io.flowBuilder.waitForElementAttached('#notification');
    await io.assert.verifyElementDisplayedByText(
      "Your connection is working great! Nice Job!",
      "Connection creation error"
    );
  }); 
  test("@Zephyr-IO-T14670 C112089 Verify the handlebar at payload & JWT headers", async ({io, page}) => {
    await io.homePage.navigateTo(io.data.links.CONNECTIONS_PAGE_URL)
    await io.homePage.loadingTime()
    await io.homePage.fill(selectors.connectionsPagePO.CONNECTION_PAGE_SEARCH_BAR, 'GITHUB DND');
    await io.homePage.loadingTime()
    await io.homePage.clickByText("GITHUB DND")
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.click(selectors.importPagePO.HTTP_IMPORT);
    await io.flowBuilder.loadingTime();
    await io.connectionPage.click(selectors.connectionsPagePO.GENERAL);
    await io.connectionPage.click(selectors.connectionsPagePO.APPLICATION_DETAILS);
    await io.connectionPage.click(selectors.connectionsPagePO.CONFIGURE_AUTHENTICATION);
    await io.homePage.loadingTime()
    await io.flowBuilder.click(selectors.basePagePO.CUSTOM_SETTING);
    await io.connectionPage.fill(selectors.connectionsPagePO.SETTINGS_INLINE,'{"iss":"495629","aud":"test","exp":"7764","typ":"test","alg":"rsa256"}');
    await io.connectionPage.click(selectors.connectionsPagePO.CONFIGURE_AUTHENTICATION);
    await io.connectionPage.click(selectors.connectionsPagePO.PAYLOAD);
    await io.flowBuilder.loadingTime();
    await io.homePage.waitForElementAttached(selectors.connectionsPagePO.DATA_PANEL);
    let dataPanel = (await io.homePage.getText(selectors.connectionsPagePO.DATA_PANEL)).toString();
    await io.assert.expectToContainValue(
      '{  "connection": {    "name": "GITHUB DND",    "http": {      "unencrypted": {        "field": "value"      },      "encrypted": "********"    }  },  "settings": {    "connection": {      "iss": "495629",      "aud": "test",      "exp": "7764",      "typ": "test",      "alg": "rsa256"    }  }}',
      dataPanel,
      'Data Panel is not displayed'
    );
    // await io.assert.checkSnapshot(selectors.connectionsPagePO.DATA_PANEL,"C112089.png");
  });
});