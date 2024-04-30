import {expect, test} from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("C112070_C112071_C112072_C112073_C112074", () => {
  test.beforeEach(async ({ io }) => {
    await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
  
  });
  test("@Env-All @Zephyr-IO-T14653 C112070 Verify the Dropdown values of Signature Method", async ({io, page}) => {
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
      await io.assert.verifyElementDisplayedByText(
        "ES256","error if val not found"
      );
      await io.assert.verifyElementDisplayedByText(
        "ES384","error if val not found"
      );
      await io.assert.verifyElementDisplayedByText(
        "ES512","error if val not found"
      );
      await io.assert.verifyElementDisplayedByText(
        "HMAC-SHA256","error if val not found"
      );
      await io.assert.verifyElementDisplayedByText(
        "HMAC-SHA384","error if val not found"
      );
      await io.assert.verifyElementDisplayedByText(
        "HMAC-SHA512","error if val not found"
      );
         const elementSelector1 = (selectors.connectionsPagePO.PS256);
      const element1 = await page.locator(elementSelector1);
      await element1.scrollIntoViewIfNeeded();
      await io.assert.verifyElementDisplayedByText(
        "PS256","error if val not found"
      );
      await io.assert.verifyElementDisplayedByText(
        "PS384","error if val not found"
      );
      await io.assert.verifyElementDisplayedByText(
        "PS512","error if val not found"
      );
      await io.assert.verifyElementDisplayedByText(
        "RSA-SHA256","error if val not found"
      );
      await io.assert.verifyElementDisplayedByText(
        "RSA-SHA384","error if val not found"
      );
      await io.assert.verifyElementDisplayedByText(
        "RSA-SHA512","error if val not found"
      );
  });
  
  test("@Env-All C112071 Verify send token via field dropdown values", async ({io, page}) => {
    await io.connectionPage.navigateTo(io.data.links.CONNECTIONS_PAGE_URL);
    await io.connectionPage.click(selectors.basePagePO.ADD_NEW_RESOURCE);
    await io.connectionPage.fill(selectors.connectionsPagePO.CONNECTION_SEARCH, 'http');
    await io.connectionPage.waitForElementAttached(selectors.basePagePO.HTTP_2DOT0)
    await io.connectionPage.click(selectors.basePagePO.HTTP_2DOT0);
    await io.flowBuilder.loadingTime();
    await io.connectionPage.click(selectors.connectionsPagePO.SLACK_AUTH_TYPE);
    await io.connectionPage.selectTextfromDropDown(page, "jwtbearer");
    await io.connectionPage.click(selectors.connectionsPagePO.LOCATION);
    const monitorExp12 = await io.homePage.isVisible("text='HTTP body'");
    await io.assert.expectToBeValue(monitorExp12.toString(), 'true', "Value is found");
    const monitorExp13 = await io.homePage.isVisible("text='HTTP header'");
    await io.assert.expectToBeValue(monitorExp13.toString(), 'true', "Value is found");
    const monitorExp14 = await io.homePage.isVisible("text='URL parameter'");
    await io.assert.expectToBeValue(monitorExp14.toString(), 'true', "Value is found");
  });
  test("@Env-All C112072 Verify HTTP header related fields", async ({io, page}) => {
    await io.connectionPage.navigateTo(io.data.links.CONNECTIONS_PAGE_URL);
    await io.connectionPage.click(selectors.basePagePO.ADD_NEW_RESOURCE);
    await io.connectionPage.fill(selectors.connectionsPagePO.CONNECTION_SEARCH, 'http');
    await io.connectionPage.waitForElementAttached(selectors.basePagePO.HTTP_2DOT0)
    await io.connectionPage.click(selectors.basePagePO.HTTP_2DOT0);
    await io.flowBuilder.loadingTime();
    await io.connectionPage.click(selectors.connectionsPagePO.SLACK_AUTH_TYPE);
    await io.connectionPage.selectTextfromDropDown(page, "jwtbearer");
    await io.connectionPage.click(selectors.connectionsPagePO.LOCATION);
    await io.connectionPage.selectTextfromDropDown(page, "header");
    const monitorExp15 = await io.homePage.isVisible("text='Header name'");
    await io.assert.expectToBeValue(monitorExp15.toString(), 'true', "Value is found");
    const monitorExp16 = await io.homePage.isVisible("text='Header scheme'");
    await io.assert.expectToBeValue(monitorExp16.toString(), 'true', "Value is found");
  });
  test("@Env-All C112073 Verify Header scheme related fields", async ({io, page}) => {
    await io.connectionPage.navigateTo(io.data.links.CONNECTIONS_PAGE_URL);
    await io.connectionPage.click(selectors.basePagePO.ADD_NEW_RESOURCE);
    await io.connectionPage.fill(selectors.connectionsPagePO.CONNECTION_SEARCH, 'http');
    await io.connectionPage.waitForElementAttached(selectors.basePagePO.HTTP_2DOT0)
    await io.connectionPage.click(selectors.basePagePO.HTTP_2DOT0);
    await io.flowBuilder.loadingTime();
    await io.connectionPage.click(selectors.connectionsPagePO.SLACK_AUTH_TYPE);
    await io.connectionPage.selectTextfromDropDown(page, "jwtbearer");
    await io.connectionPage.click(selectors.connectionsPagePO.LOCATION);
    await io.connectionPage.selectTextfromDropDown(page, "header");
    await io.connectionPage.click(selectors.connectionsPagePO.AUTH_SCHEME);
    const monitorExp17 = await io.homePage.isVisible("text='Bearer'");
    await io.assert.expectToBeValue(monitorExp17.toString(), 'true', "Value is found");
    const monitorExp18 = await io.homePage.isVisible("text='Custom'");
    await io.assert.expectToBeValue(monitorExp18.toString(), 'true', "Value is found");
    const monitorExp19 = await io.homePage.isVisible("text='MAC'");
    await io.assert.expectToBeValue(monitorExp19.toString(), 'true', "Value is found");
    const monitorExp20 = await io.homePage.isVisible("text='None'");
    await io.assert.expectToBeValue(monitorExp20.toString(), 'true', "Value is found");
  });
  test("@Env-All C112074 Verify URL parameter related fields ", async ({io, page}) => {
    await io.connectionPage.navigateTo(io.data.links.CONNECTIONS_PAGE_URL);
    await io.connectionPage.click(selectors.basePagePO.ADD_NEW_RESOURCE);
    await io.connectionPage.fill(selectors.connectionsPagePO.CONNECTION_SEARCH, 'http');
    await io.connectionPage.waitForElementAttached(selectors.basePagePO.HTTP_2DOT0)
    await io.connectionPage.click(selectors.basePagePO.HTTP_2DOT0);
    await io.flowBuilder.loadingTime();
    await io.connectionPage.click(selectors.connectionsPagePO.SLACK_AUTH_TYPE);
    await io.connectionPage.selectTextfromDropDown(page, "jwtbearer");
    await io.connectionPage.click(selectors.connectionsPagePO.LOCATION);
    await io.connectionPage.selectTextfromDropDown(page, "url");
    const monitorExp21 = await io.homePage.isVisible("text='Parameter name'");
    await io.assert.expectToBeValue(monitorExp21.toString(), 'true', "Value is found");
  });
  
});