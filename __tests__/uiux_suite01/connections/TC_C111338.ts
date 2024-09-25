import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("TC_C111338  Verify old UI should be shown for all the new imports where the connection mode is on premise", () => {
  test.beforeEach(async ({ io }) => {
    await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test("@Env-All @Zephyr-IO-T8861 TC_C111338  Verify old UI should be shown for all the new imports where the connection mode is on premise", async ({ io, page }) => {
    await io.exportsPage.navigateTo(process.env["IO_UI_CONNECTOR_URL"] + "home");
    await io.homePage.goToMenu("Tools", "Flow builder");
    await io.flowBuilder.click(
      selectors.flowBuilderPagePO.ADD_DESTINATION_OR_LOOKUP
    );
    await io.flowBuilder.waitForElementAttached(selectors.connectionsPagePO.CONNECTION_SEARCH);
    await io.homePage.loadingTime()
    await io.flowBuilder.fill(
      selectors.settingsPagePO.APP_NAME_INPUT,
      "PostgreSQL"
    );
    await io.flowBuilder.clickByText("PostgreSQL");
    await io.flowBuilder.click(selectors.connectionsPagePO.IMPORT_RECORDS);
    await io.flowBuilder.click(selectors.basePagePO.CREATE_FROM_SCRATCH)
    await io.flowBuilder.click(selectors.exportsPagePO.CONNECTIONS_DROPDOWN);
    await io.flowBuilder.waitForElementAttached(selectors.importPagePO.IMPORT_CREATE_CONNECTION);
    await io.flowBuilder.clickByText("POSTGRESQL ONPREMISE CONNECTION - Offline");
    await io.flowBuilder.click(selectors.basePagePO.SAVE);
    await io.flowBuilder.waitForElementAttached(selectors.exportsPagePO.NAME);
    await io.flowBuilder.fill(selectors.exportsPagePO.NAME, "offline");
    let isOldUI = false;
    try {
      await io.assert.verifyElementDisplayedByText(
        "Insert",
        "'Insert is not present in Old UI"
      );
      await io.assert.verifyElementDisplayedByText(
        "Update",
        "Update is not present in Old UI"
      );
      await io.assert.verifyElementDisplayedByText(
        "Insert or Update",
        "Insert or Update is not present in Old UI"
      );
      isOldUI = true
    }
    catch (e) {
      expect(isOldUI).toBeTruthy();
    }
    expect(isOldUI).toBeTruthy();
  });
}
)