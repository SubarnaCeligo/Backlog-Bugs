import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe(`C33161 Verify When changes have been made but not yet saved, show 3 buttons - Save, Save & close, and Close for create lookup page`, () => {
  test(`@Priority-P2 @Zephyr-IO-T2621 @Env-All C33161`, async ({
    io,
    page
  }) => {
    await io.exportsPage.navigateTo(process.env["IO_UI_CONNECTOR_URL"] + "home");
    await io.homePage.goToMenu("Tools", "Flow builder");
    await io.flowBuilder.click(
      selectors.flowBuilderPagePO.ADD_DESTINATION_OR_LOOKUP
    );
    // await io.flowBuilder.clickByText("REST API (HTTP)");
    await io.flowBuilder.fill(selectors.settingsPagePO.APP_NAME_INPUT, "REST API (HTTP)");
    await io.flowBuilder.click(selectors.flowBuilderPagePO.RESTAPIHTTP);
    await io.flowBuilder.clickByText("Look up additional files (per record)");
    await io.flowBuilder.click(selectors.basePagePO.CREATE_FROM_SCRATCH)
    await io.homePage.loadingTime()
    await io.flowBuilder.click(selectors.exportsPagePO.CONNECTIONS_DROPDOWN); await io.flowBuilder.waitForElementAttached(selectors.exportsPagePO.CONNECTIONS_DROPDOWN);
    await io.flowBuilder.fill(selectors.exportsPagePO.CONNECTIONS_DROPDOWN, "3PL CONNECTION");
    await page
      .locator(`${selectors.connectionsPagePO.CONNECTIONS_DROPDOWN_LIST} li`)
      .filter({ hasText: "3PL CONNECTION" })
      .first()
      .click()
    await io.flowBuilder.fill(selectors.exportsPagePO.NAME, "C33161");
    await io.assert.verifyElementIsDisplayed(
      selectors.basePagePO.SAVE,
      "'Save' button is not displayed"
    );
    await io.assert.verifyElementIsDisplayed(
      selectors.basePagePO.SAVE_AND_CLOSE,
      "'Save & close' button is not displayed"
    );
    await io.assert.verifyElementIsDisplayed(
      selectors.basePagePO.CLOSE,
      "'Close' button is not displayed"
    );
  });
});
