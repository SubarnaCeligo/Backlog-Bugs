import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe(`C63008 Verify connection dropdown list`, () => {
  test(`@Env-All @Zephyr-IO-T21799 C63008 Verify connection dropdown list`, async ({ io, page }) => {
    await io.flowBuilder.navigateTo(process.env["IO_UI_CONNECTOR_URL"] + "home");
    await io.homePage.goToMenu("Tools", "Flow builder");
    await io.flowBuilder.click(selectors.flowBuilderPagePO.ADD_SOURCE);
    await io.connectionPage.waitForElementAttached(selectors.settingsPagePO.APP_NAME_INPUT);
    await io.connectionPage.fill(selectors.settingsPagePO.APP_NAME_INPUT, 'Narvar');
    await io.connectionPage.waitForElementAttached(selectors.connectionsPagePO.NARVAR_CONNECTION);
    await io.connectionPage.click(selectors.connectionsPagePO.NARVAR_CONNECTION);
    await io.flowBuilder.click(selectors.basePagePO.CREATE_FROM_SCRATCH)
    await io.flowBuilder.waitForElementAttached(selectors.connectionsPagePO.CONNECTIONS_DROPDOWN)
    await io.flowBuilder.click(selectors.exportsPagePO.CONNECTIONS_DROPDOWN);
    await io.connectionPage.waitForElementAttached(selectors.connectionsPagePO.CONNECTION_OPTION_TEXT);
    await io.flowBuilder.waitForElementAttached(selectors.connectionsPagePO.CONNECTION_NAME_DROPDOWN);
    const connectionText = (await io.flowBuilder.getText(
      selectors.connectionsPagePO.CONNECTION_NAME_DROPDOWN
    )).toString();
    await io.flowBuilder.waitForElementAttached(selectors.connectionsPagePO.API_VERSION_NAME_DROPDOWN);
    const apiVersion = (await io.flowBuilder.getText(
      selectors.connectionsPagePO.API_VERSION_NAME_DROPDOWN
    )).toString();
    await page.getByText("API version").first().waitFor({ state: "visible" });
    await io.assert.expectToContainValue(
      "Narvar",
      connectionText,
      "Connection name not found"
    );
    await io.assert.expectToContainValue(
      "API version",
      apiVersion,
      "API version not found"
    );
    await io.assert.expectToContainValue(
      "API type",
      apiVersion,
      "API type not found"
    );
  });
});
