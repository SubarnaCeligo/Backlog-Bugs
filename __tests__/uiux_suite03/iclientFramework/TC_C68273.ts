import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe(`C68273 verify application field under HTTP iclient is disabled`, () => {
  test(`@Env-All @Zephyr-IO-T17599 C68273 verify application field under HTTP iclient is disabled`, async ({
    io,
    page
  }) => {
    await io.homePage.navigateTo(
      process.env["IO_UI_CONNECTOR_URL"] + "connections"
    );
    await io.flowBuilder.click(selectors.integrationPagePO.ADDNEWRESOURCE);
    await io.connectionPage.click(selectors.connectionsPagePO.GUSTO_CONNECTION);
    await io.flowBuilder.click(selectors.connectionsPagePO.CREATE_ICLIENT);
    await io.flowBuilder.click(selectors.importPagePO.HTTP_IMPORT);
    await expect(
      page.locator(selectors.connectionsPagePO.CONNECTION_SEARCH)
    ).toBeDisabled();
    await io.connectionPage.addStep("Verified application field is disabled");
  });
});
