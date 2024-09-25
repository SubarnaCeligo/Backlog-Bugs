import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe(`C63005 Verify connection dropdown list`, () => {
  test(`@Env-All @Zephyr-IO-T21796 C63005 Verify connection dropdown list`, async ({ io, page }) => {
    await io.flowBuilder.navigateTo(process.env["IO_UI_CONNECTOR_URL"] + "home");
    await io.homePage.goToMenu("Tools", "Flow builder");
    await io.flowBuilder.click(selectors.flowBuilderPagePO.ADD_SOURCE);
    await io.connectionPage.waitForElementAttached(selectors.settingsPagePO.APP_NAME_INPUT);
    await io.connectionPage.fill(selectors.settingsPagePO.APP_NAME_INPUT, 'Happy Returns');
    await io.connectionPage.waitForElementAttached(selectors.connectionsPagePO.HAPPY_RETURNS_CONNECTION);
    await io.connectionPage.click(selectors.connectionsPagePO.HAPPY_RETURNS_CONNECTION);
    await io.flowBuilder.click(selectors.basePagePO.CREATE_FROM_SCRATCH)
    await io.flowBuilder.waitForElementAttached(selectors.connectionsPagePO.CONNECTIONS_DROPDOWN)
    await io.connectionPage.click(selectors.exportsPagePO.CONNECTIONS_DROPDOWN);
    await io.connectionPage.waitForElementAttached(selectors.connectionsPagePO.CONNECTION_OPTION_TEXT);
    await io.connectionPage.waitForElementAttached(selectors.connectionsPagePO.CONNECTIONS_DROPDOWN_LIST);
    const connectionText = (await io.flowBuilder.getText(
      selectors.connectionsPagePO.CONNECTIONS_DROPDOWN_LIST
    )).toString();
    await io.assert.expectToContainValue(
      "HAPPY RETURNS CONNECTION",
      connectionText,
      "Connection name not found"
    );
    await io.assert.expectToContainValue(
      "API version",
      connectionText,
      "API version not found"
    );
    await io.assert.expectNotToContainValue(
      "API type",
      connectionText,
      "Unexpected - API type found"
    );
    await io.flowBuilder.addStep("Verified 'API type' is not displayed");
  });
});
