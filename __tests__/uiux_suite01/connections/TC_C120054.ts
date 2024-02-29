import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
test.describe("TC_C120054", () => {
  test("C120054 Override media type field should have Plain text option inside Configure refresh token section", async ({ io, page }) => {
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
    await io.assert.verifyElementContainsText(selectors.connectionsPagePO.PLAINTEXT, 'Plain text');
  });
});