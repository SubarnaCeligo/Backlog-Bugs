import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
test.describe("TC_C119664", () => {
  test("C119664 When Override media type for success responses field is Plain text then remove related fields", async ({ io, page }) => {
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.waitForElementAttached(selectors.basePagePO.TOOLS);
    await io.homePage.goToMenu("Resources", "Connections");
    await io.flowBuilder.click(selectors.connectionsPagePO.CREATE_CONNECTION);
    await io.flowBuilder.fill(selectors.settingsPagePO.APP_NAME_INPUT, 'Http');
    await io.flowBuilder.click(selectors.connectionsPagePO.HTTP_CNNECTOR);
    await io.flowBuilder.click(selectors.flowBuilderPagePO.OVERRIDE_MEDIA_SUCCESS_RESPONSE);
    await io.connectionPage.clickByText("Plain text");
    const successPath = await io.homePage.isVisible(selectors.flowBuilderPagePO.SUCCESSPATH)
    await io.assert.expectToBeValue(successPath.toString(), "false", "Field is present in after Plain text is selected in Override media type for success responses field")
  });
});