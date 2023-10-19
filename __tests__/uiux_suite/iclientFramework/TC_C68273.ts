import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe(`C68273 verify application field under HTTP iclient is disabled`, () => {
  test(`C68273 verify application field under HTTP iclient is disabled`, async ({
    io,
    page
  }) => {
    await io.homePage.navigateTo(
      process.env["IO_UI_CONNECTOR_URL"] + "connections"
    );
    await io.flowBuilder.click(selectors.integrationPagePO.ADDNEWRESOURCE);
    // todo replace: selectors.connectionsPagePO.GUSTO_CONNECTION
    await io.connectionPage.click('[data-test="Gusto"]');
    await io.flowBuilder.click('[aria-label="Create iClient"]');
    await io.flowBuilder.clickByIndex(selectors.importPagePO.HTTP_IMPORT, 2);
    await expect(
      page.locator(selectors.connectionsPagePO.CONNECTION_SEARCH)
    ).toBeDisabled();
    await io.connectionPage.addStep("Verified application field is disabled");
  });
});
