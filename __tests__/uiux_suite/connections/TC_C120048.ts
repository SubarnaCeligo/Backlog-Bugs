import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
test.describe("TC_C120048", () => {
  test("C120048  Related fields should show when Media type is Plain text and override media type for success responses is JSON or XML", async ({ io, page }) => {
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.waitForElementAttached(selectors.basePagePO.TOOLS);
    await io.homePage.goToMenu("Resources", "Connections");
    await io.flowBuilder.click(selectors.connectionsPagePO.CREATE_CONNECTION);
    await io.flowBuilder.fill(selectors.settingsPagePO.APP_NAME_INPUT, 'Http');
    await io.flowBuilder.click(selectors.connectionsPagePO.HTTP_CNNECTOR);
    await io.flowBuilder.click(selectors.flowBuilderPagePO.MEDIA_TYPE);
    await io.flowBuilder.clickByText("Plain text");
    await io.flowBuilder.click(selectors.flowBuilderPagePO.OVERRIDE_MEDIA_SUCCESS_RESPONSE);
    await io.connectionPage.clickByText("JSON");
    await io.connectionPage.click(selectors.exportsPagePO.NON_STANDARD_API_TAB);
    await io.flowBuilder.click(selectors.flowBuilderPagePO.NONSTANDARD);
    await io.connectionPage.click(selectors.flowBuilderPagePO.HOWTOTESTCONN);
    const successPath = await io.homePage.isVisible(selectors.flowBuilderPagePO.SUCCESSPATH)
    await io.assert.expectToBeValue(successPath.toString(), "true", "Field is not present in after JSON is selected in Override media type for success responses field")
  });
});