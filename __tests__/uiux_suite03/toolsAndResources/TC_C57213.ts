import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe(`@Epic-IO-21377  @Priority-P2  @Zephyr-IO-T16900 @Env-All Verify OAuth fields are moving to iclients page in existing connections as well`, () => {
  test(`@Epic-IO-21377  @Priority-P2  @Zephyr-IO-T16900 @Env-All Verify OAuth fields are moving to iclients page in existing connections as well`, async ({
    io,
    page
  }) => {
    await io.connectionPage.navigateTo(io.data.links.CONNECTIONS_PAGE_URL);
    await io.importsPage.fill(selectors.connectionsPagePO.CONNECTION_PAGE_SEARCH_BAR, "HTTP ACUMATICA CONNECTION");
    await io.flowBuilder.loadingTime();
    await io.connectionPage.clickByText("HTTP ACUMATICA CONNECTION");
    await io.connectionPage.click(selectors.connectionsPagePO.AUTH_TYPE);
    await io.connectionPage.clickByText("OAuth 2.0");
    await io.flowBuilder.click(selectors.connectionsPagePO.CREATE_ICLIENT);
    await io.assert.verifyElementIsDisplayed(
      selectors.connectionsPagePO.OAUTH2_CLIENT_ID,
      "'Client ID' field not displayed"
    );
    await io.assert.verifyElementIsDisplayed(
      selectors.connectionsPagePO.OAUTH2_CLIENT_SECRET,
      "'Client Secret' field not displayed"
    );
    await io.assert.verifyElementIsDisplayed(
      selectors.connectionsPagePO.ACCESS_TOKEN_URL,
      "'Access token URL' field not displayed"
    );
  });
});
