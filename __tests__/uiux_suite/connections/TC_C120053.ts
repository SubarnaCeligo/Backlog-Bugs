import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
test.describe("TC_C120053", () => {
  test("C120053 When Override media type for error responses field is Plain text then remove related fields", async ({ io, page }) => {
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.waitForElementAttached(selectors.basePagePO.TOOLS);
    await io.homePage.goToMenu("Resources", "Connections");
    await io.flowBuilder.click(selectors.connectionsPagePO.CREATE_CONNECTION);
    await io.flowBuilder.fill(selectors.settingsPagePO.APP_NAME_INPUT, 'Http');
    await io.flowBuilder.click(selectors.connectionsPagePO.HTTP_CNNECTOR);
    await io.flowBuilder.click(selectors.flowBuilderPagePO.OVERRIDE_MEDIA_ERROR_RESPONSE);
    await io.connectionPage.clickByText("Plain text");
    await io.connectionPage.click(selectors.exportsPagePO.NON_STANDARD_API_TAB);
    await io.flowBuilder.click(selectors.flowBuilderPagePO.NONSTANDARD);
    await io.connectionPage.click(selectors.flowBuilderPagePO.HOWTOTESTCONN);
    const failPath = await io.homePage.isVisible(selectors.flowBuilderPagePO.FAILPATHHTTP)
    const errorPath = await io.homePage.isVisible(selectors.flowBuilderPagePO.PINGERRORPATH)
    const authFailPath = await io.homePage.isVisible(selectors.flowBuilderPagePO.FAILPATH)
    await io.assert.expectToBeValue(failPath.toString(), "false", "Field failPath is present in after Plain text is selected in Override media type for error responses field")
    await io.assert.expectToBeValue(errorPath.toString(), "false", "Field errorPath is present in after Plain text is selected in Override media type for error responses field")
    await io.assert.expectToBeValue(authFailPath.toString(), "false", "Field authFailPath is present in after Plain text is selected in Override media type for error responses field")
  });
});