import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import testData from "@testData/Connections/Narvar.json";

test.describe(`C63062 Verify while editing connection through export/import/lookup,`, () => {
  test(`@Env-All @Zephyr-IO-T21823 C63062 Verify while editing connection through export/import/lookup,`, async ({
    io,
    page
  }) => {
    await io.createResourceFromAPI(testData, "FLOWS");
    try {
      const iframe = page.frameLocator(
        selectors.homePagePO.PENDO_ZENDESK.PENDO_ZENDESK_IFRAME
      );
      await iframe
        .locator(selectors.homePagePO.PENDO_ZENDESK.MINUS_ICON)
        .click({ timeout: 2000 });
      await io.flowBuilder.addStep("Clicked on the minus icon to close chatbot");
    } catch (e) {}
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
