import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
test.describe("TC_C120057", () => {
  test("@Env-All C120057 If Media type is Plain text then Override media type for error responses field should not have Plain text option", async ({ io, page }) => {
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.waitForElementAttached(selectors.basePagePO.TOOLS);
    await io.homePage.goToMenu("Resources", "Connections");
    await io.flowBuilder.click(selectors.connectionsPagePO.CREATE_CONNECTION);
    await io.flowBuilder.fill(selectors.settingsPagePO.APP_NAME_INPUT, 'Http');
    await io.flowBuilder.click(selectors.connectionsPagePO.HTTP_CNNECTOR);
    await io.flowBuilder.click(selectors.flowBuilderPagePO.MEDIA_TYPE);
    await io.connectionPage.clickByText("Plain text");
    await io.flowBuilder.click(selectors.flowBuilderPagePO.OVERRIDE_MEDIA_ERROR_RESPONSE);
    const textArrayErrorResponse = await io.flowBuilder.getText(selectors.connectionsPagePO.OPTIONLIST);
    await io.assert.expectNotToBeValueInArray(textArrayErrorResponse,"Plain text","Found Plain text in Array");
  });
});