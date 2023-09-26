import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe(`C33161 Verify When changes have been made but not yet saved, show 3 buttons - Save, Save & close, and Close for create lookup page`, () => {
  test(`C33161 Verify When changes have been made but not yet saved, show 3 buttons - Save, Save & close, and Close for create lookup page`, async ({
    io,
    page
  }) => {
    await io.exportsPage.navigateTo(process.env["IO_UI_CONNECTOR_URL"] + "home");
    await io.homePage.goToMenu("Tools", "Flow builder");
    await io.flowBuilder.click(
      selectors.flowBuilderPagePO.ADD_DESTINATION_OR_LOOKUP
    );
    await io.flowBuilder.clickByText("REST API (HTTP)");
    await io.flowBuilder.clickByText("Look up additional files (per record)");
    await io.flowBuilder.click(selectors.exportsPagePO.CONNECTIONS_DROPDOWN);
    await io.flowBuilder.clickByText("3PL CONNECTION");
    await io.flowBuilder.click(selectors.basePagePO.SAVE);
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
