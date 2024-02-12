import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
test.describe("TC_C120047", () => {
  test("C120047  Related fields should show when Media type is Plain text and override media type for error responses is JSON or XML", async ({ io, page }) => {
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.waitForElementAttached(selectors.basePagePO.TOOLS);
    await io.homePage.goToMenu("Resources", "Connections");
    await io.flowBuilder.click(selectors.connectionsPagePO.CREATE_CONNECTION);
    await io.flowBuilder.fill(selectors.settingsPagePO.APP_NAME_INPUT, 'Http');
    await io.flowBuilder.click(selectors.connectionsPagePO.HTTP_CNNECTOR);
    await io.flowBuilder.click(selectors.flowBuilderPagePO.MEDIA_TYPE);
    await io.flowBuilder.clickByText("Plain text");
    await io.flowBuilder.click(selectors.flowBuilderPagePO.OVERRIDE_MEDIA_ERROR_RESPONSE);
    await io.connectionPage.clickByText("JSON");
    await io.flowBuilder.waitForElementAttached(selectors.exportsPagePO.NON_STANDARD_API_TAB);
    await io.connectionPage.click(selectors.exportsPagePO.NON_STANDARD_API_TAB);
    await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.NONSTANDARD);
    await io.flowBuilder.click(selectors.flowBuilderPagePO.NONSTANDARD);
    await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.HOWTOTESTCONN);
    await io.connectionPage.click(selectors.flowBuilderPagePO.HOWTOTESTCONN);
    const failPath = await io.homePage.isVisible(selectors.flowBuilderPagePO.FAILPATHHTTP)
    const errorPath = await io.homePage.isVisible(selectors.flowBuilderPagePO.PINGERRORPATH)
    const authFailPath = await io.homePage.isVisible(selectors.flowBuilderPagePO.FAILPATH)
    const limitFailpath = await io.homePage.isVisible(selectors.connectionsPagePO.NON_STANDARD_API_RATE_FAIL_PATH)
    await io.assert.expectToBeValue(limitFailpath.toString(), "true", "Field is not present")
    await io.assert.expectToBeValue(failPath.toString(), "true", "Field failPath is not present")
    await io.assert.expectToBeValue(errorPath.toString(), "true", "Field errorPath is not present")
    await io.assert.expectToBeValue(authFailPath.toString(), "true", "Field authFailPath is not present")
  });
});