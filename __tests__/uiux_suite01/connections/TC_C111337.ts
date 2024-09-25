import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("TC_C111337 Verify new UI should be shown for all the new imports where the connection mode is cloud", () => {
  test.beforeEach(async ({ io }) => {
    await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test("@Env-All @Zephyr-IO-T8860 Verify new UI should be shown for all the new imports where the connection mode is cloud", async ({ io, page }) => {
    await io.exportsPage.navigateTo(process.env["IO_UI_CONNECTOR_URL"] + "home");
    await io.homePage.goToMenu("Tools", "Flow builder");
    await io.flowBuilder.click(
      selectors.flowBuilderPagePO.ADD_DESTINATION_OR_LOOKUP
    );
    await io.flowBuilder.loadingTime()
    await io.flowBuilder.fill(
      selectors.settingsPagePO.APP_NAME_INPUT,
      "PostgreSQL"
    );
    await io.flowBuilder.clickByText("PostgreSQL");
    await io.flowBuilder.click(selectors.connectionsPagePO.IMPORT_RECORDS);
    await io.flowBuilder.click(selectors.basePagePO.CREATE_FROM_SCRATCH)
    await io.flowBuilder.click(selectors.exportsPagePO.CONNECTIONS_DROPDOWN);
    await io.flowBuilder.clickByText("POSTGRE OFFLINE CONNECTION - Offline");
    await io.flowBuilder.click(selectors.basePagePO.SAVE);
    await io.flowBuilder.waitForElementAttached(selectors.exportsPagePO.NAME);
    await io.flowBuilder.fill(selectors.exportsPagePO.NAME, "offline");
    let isNewUI = false;
    try {
      await io.assert.verifyElementDisplayedByText(
        "Use bulk insert SQL query (recommended)",
        "'Insert is not present in New UI"
      );
      await io.assert.verifyElementDisplayedByText(
        "Use SQL query once per record",
        "Use SQL query once per record is not present in New UI"
      );
      await io.assert.verifyElementDisplayedByText(
        "Use SQL query once per page of records",
        "Use SQL query once per page of records is not present in New UI"
      );
      await io.assert.verifyElementDisplayedByText(
        "Use SQL query on first page only",
        "Use SQL query on first page only is not present in New UI"
      );

      isNewUI = true
    }
    catch (e) {
      expect(isNewUI).toBeTruthy();
    }
    expect(isNewUI).toBeTruthy();
  });
}
)
