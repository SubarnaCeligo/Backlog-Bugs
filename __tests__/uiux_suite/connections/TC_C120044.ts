import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
test.describe("TC_C120044", () => {
  test("C120044 Media type field should have Plain text option", async ({ io, page }) => {
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.waitForElementAttached(selectors.basePagePO.TOOLS);
    await io.homePage.goToMenu("Resources", "Connections");
    await io.flowBuilder.click(selectors.connectionsPagePO.CREATE_CONNECTION);
    await io.flowBuilder.fill(selectors.settingsPagePO.APP_NAME_INPUT, 'Http');
    await io.flowBuilder.click(selectors.connectionsPagePO.HTTP_CNNECTOR);
    await io.flowBuilder.click(selectors.flowBuilderPagePO.MEDIA_TYPE);
    await io.assert.verifyElementContainsText(selectors.connectionsPagePO.PLAINTEXT, 'Plain text');
  });
});