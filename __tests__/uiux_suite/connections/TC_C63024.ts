import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe(`C63024 Verify user is able to create connection from already created export/lookup and import`, () => {
  test(`C63024 Verify user is able to create connection from already created export/lookup and import`, async ({
    page,
    io
  }) => {
    await io.homePage.navigateTo(process.env.IO_Integration_URL);
    await io.flowBuilder.clickByText("Narvar_DND");
    await io.flowBuilder.click(
      selectors.flowBuilderPagePO.NOTIFICATION_CONNECTIONS
    );
    await io.flowBuilder.click(
      `td ${selectors.connectionsPagePO.ACTIONS_MENU_BUTTON}`
    );
    await io.flowBuilder.clickByText("Replace connection");
    await io.flowBuilder.click(selectors.exportsPagePO.CONNECTIONS_DROPDOWN);
    await io.flowBuilder.clickByText("Create connection");
    await io.homePage.click(selectors.connectionsPagePO.NARVAR_RMA_CONNECTION);
    await io.homePage.fill(selectors.basePagePO.NAME, "Narvar-RMA-Test");
    await io.homePage.fill(selectors.connectionsPagePO.USERNAME, "narvar");
    await io.homePage.fill(
      selectors.connectionsPagePO.PASSWORD,
      "E59E404A332C1692B4CB1D63103E5520"
    );
    await io.homePage.fill(
      selectors.connectionsPagePO.STORENAME,
      "celigo-test-2"
    );
    await io.homePage.click(selectors.basePagePO.SAVE);
    await io.assert.verifyElementDisplayedByText(
      "Your connection is working great! Nice Job!",
      "Connection creation error"
    );
  });
});
