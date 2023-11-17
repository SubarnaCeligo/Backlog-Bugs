import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe(`C64881 Verify Iclient under HTTP`, () => {
  test(`C64881 Verify Iclient under HTTP`, async ({ io, page }) => {
    await io.connectionPage.navigateTo(io.data.links.CONNECTIONS_PAGE_URL);
    await io.connectionPage.click(selectors.connectionsPagePO.CREATE_CONNECTION);
    await io.connectionPage.click(selectors.connectionsPagePO.GUSTO_CONNECTION);
    await io.flowBuilder.click(selectors.connectionsPagePO.CREATE_ICLIENT);
    await io.flowBuilder.clickByIndex(selectors.importPagePO.HTTP_IMPORT, 2);
    await expect(
      page.locator(selectors.connectionsPagePO.AUTHORIZATION_URL)
    ).not.toHaveValue("");
    await io.connectionPage.addStep(
      "Verified 'Authorization URL' is pre-configured"
    );
    await expect(
      page.locator(selectors.connectionsPagePO.ACCESS_TOKEN_URL)
    ).not.toHaveValue("");
    await io.connectionPage.addStep(
      "Verified 'Access token URL' is pre-configured"
    );
  });
});
