import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
test.describe("TC_C120055", () => {
  test("C120055 Related fields should be removed if Override media type is Plain text", async ({ io, page }) => {
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.waitForElementAttached(selectors.basePagePO.TOOLS);
    await io.homePage.goToMenu("Resources", "Connections");
    await io.flowBuilder.click(selectors.connectionsPagePO.CREATE_CONNECTION);
    await io.flowBuilder.fill(selectors.settingsPagePO.APP_NAME_INPUT, 'Http');
    await io.flowBuilder.click(selectors.connectionsPagePO.HTTP_CNNECTOR);
    await io.connectionPage.click(selectors.connectionsPagePO.AUTH_TYPE);
    await io.connectionPage.clickByText("Custom");
    await io.connectionPage.click(selectors.connectionsPagePO.REFRESH_TOKEN_CUSTOM);
    await io.connectionPage.click(selectors.connectionsPagePO.REFRESH_MEDIATYPE);
    await io.connectionPage.clickByText("Plain text");
    await io.flowBuilder.waitForElementAttached(selectors.exportsPagePO.NON_STANDARD_API_TAB);
    await io.connectionPage.click(selectors.exportsPagePO.NON_STANDARD_API_TAB);
    await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.NONSTANDARD);
    await io.flowBuilder.click(selectors.flowBuilderPagePO.NONSTANDARD);
    await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.HOWTOTESTCONN);
    await io.connectionPage.click(selectors.flowBuilderPagePO.HOWTOTESTCONN);
    const refreshTokenLocation = await io.homePage.isVisible(selectors.connectionsPagePO.REFRESH_TOKEN_LOCATION);
    const refreshTokenPath = await io.homePage.isVisible(selectors.flowBuilderPagePO.PATH_TO_TOKEN);
    await io.assert.expectToBeValue(refreshTokenLocation.toString(), "false", "Field refreshTokenLocation is present in after Plain text is selected in Override media type")
    await io.assert.expectToBeValue(refreshTokenPath.toString(), "false", "Field refreshTokenPath is present in after Plain text is selected in Override media type")
  });
});