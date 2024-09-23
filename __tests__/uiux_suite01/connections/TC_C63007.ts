import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe(`C63007 Verify connection dropdown list`, () => {
  test(`@Env-All @Zephyr-IO-T21798 C63007 Verify connection dropdown list`, async ({ io, page }) => {
    await io.flowBuilder.navigateTo(process.env["IO_UI_CONNECTOR_URL"] + "home");
    await io.homePage.goToMenu("Tools", "Flow builder");
    await io.flowBuilder.click(selectors.flowBuilderPagePO.ADD_SOURCE);
    await io.connectionPage.waitForElementAttached(selectors.settingsPagePO.APP_NAME_INPUT);
    await io.connectionPage.fill(selectors.settingsPagePO.APP_NAME_INPUT, 'Loop Returns');
    await io.connectionPage.waitForElementAttached(selectors.connectionsPagePO.LOOP_RETURN_CONNECTION);
    await io.connectionPage.click(selectors.connectionsPagePO.LOOP_RETURN_CONNECTION);
    await io.flowBuilder.click(selectors.basePagePO.CREATE_FROM_SCRATCH)
    await io.flowBuilder.waitForElementAttached(selectors.connectionsPagePO.CONNECTIONS_DROPDOWN)
    await io.flowBuilder.click(selectors.exportsPagePO.CONNECTIONS_DROPDOWN);
    await io.flowBuilder.fill(selectors.connectionsPagePO.CONNECTIONS_DROPDOWN, 'Loop Returns NoVer');
    const connectionText = await page
      .locator(`${selectors.connectionsPagePO.CONNECTIONS_DROPDOWN_LIST} li`)
      .filter({ hasText: "Loop Returns NoVer" })
      .first()
      .textContent();
    await io.assert.expectToContainValue(
      "Loop Returns NoVer",
      connectionText,
      "Connection name not found"
    );
    expect(connectionText).not.toContain("API version");
    await io.flowBuilder.addStep("Verified 'API version' is not displayed");
    expect(connectionText).not.toContain("API type");
    await io.flowBuilder.addStep("Verified 'API type' is not displayed");
  });
});
