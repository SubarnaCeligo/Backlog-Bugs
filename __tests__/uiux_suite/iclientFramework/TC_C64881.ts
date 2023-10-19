import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe(`C64881 Verify Iclient under HTTP`, () => {
  test(`C64881 Verify Iclient under HTTP`, async ({ io, page }) => {
    await io.connectionPage.navigateTo(io.data.links.CONNECTIONS_PAGE_URL);
    await io.connectionPage.click(selectors.connectionsPagePO.CREATE_CONNECTION);
    // todo replace: selectors.connectionsPagePO.GUSTO_CONNECTION
    await io.connectionPage.click('[data-test="Gusto"]');
    await io.flowBuilder.click('[aria-label="Create iClient"]');
    await io.flowBuilder.clickByIndex(selectors.importPagePO.HTTP_IMPORT, 2);
    await expect(
      // todo replace: selectors.connectionsPagePO.AUTHORIZATION_URL
      page.locator('[data-test="oauth2.auth.uri"] input')
    ).not.toHaveValue("");
    await io.connectionPage.addStep(
      "Verified 'Authorization URL' is pre-configured"
    );
    await expect(
      // todo replace: selectors.connectionsPagePO.ACCESS_TOKEN_URL
      page.locator('[data-test="oauth2.token.uri"] input')
    ).not.toHaveValue("");
    await io.connectionPage.addStep(
      "Verified 'Access token URL' is pre-configured"
    );
  });
});
