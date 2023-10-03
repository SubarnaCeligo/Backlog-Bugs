import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import testData from "@testData/Connections/Narvar.json";

test.describe(`C63062 Verify while editing connection through export/import/lookup,`, () => {
  test(`C63062 Verify while editing connection through export/import/lookup,`, async ({
    io,
    page
  }) => {
    await io.fillFormUI(testData, "FLOWS");
    await io.flowBuilder.click(
      selectors.flowBuilderPagePO.NOTIFICATION_CONNECTIONS
    );
    await io.flowBuilder.click(
      `td ${selectors.connectionsPagePO.ACTIONS_MENU_BUTTON}`
    );
    await io.flowBuilder.clickByText("Edit connection");
    await io.assert.verifyElementIsDisplayed(
      selectors.connectionsPagePO.USERNAME,
      "Username field not found"
    );
    await io.assert.verifyElementIsDisplayed(
      selectors.connectionsPagePO.PASSWORD,
      "Password field not found"
    );
    await io.flowBuilder.click(selectors.connectionsPagePO.NARVAR_RMA_CONNECTION);
    await io.assert.verifyElementIsDisplayed(
      selectors.connectionsPagePO.USERNAME,
      "Username field not found"
    );
    await io.assert.verifyElementIsDisplayed(
      selectors.connectionsPagePO.PASSWORD,
      "Password field not found"
    );
    await io.assert.verifyElementIsDisplayed(
      selectors.connectionsPagePO.STORENAME,
      "Storename field not found"
    );
  });
});
