import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe(`C107921  On create connection page For OAuth2.0 authentication auth change "User scope" label to "User scopes"`, () => {
  test(`@Env-All @Zephyr-IO-T25656 C107921  On create connection page For OAuth2.0 authentication auth change "User scope" label to "User scopes"`, async ({
    page,
    io
  }) => {
    await io.homePage.navigateTo(process.env.IO_UI_CONNECTOR_URL + "connections");
    await io.connectionPage.click(selectors.connectionsPagePO.CREATE_CONNECTION);
    io.flowBuilder.waitForElementAttached(selectors.connectionsPagePO.SLACK_CONNECTION);
    await io.connectionPage.click(selectors.connectionsPagePO.SLACK_CONNECTION);
    await io.connectionPage.click(
      selectors.connectionsPagePO.SLACK_AUTH_TYPE
    );
    await io.connectionPage.clickByText("OAuth 2.0");
    await io.assert.verifyElementText('[for="http.unencrypted.userScopes"]', 'User scopes');
  });
});
