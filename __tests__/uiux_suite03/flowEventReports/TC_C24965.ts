import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("C24965_Manage All - Verify when clicked on view report details option under the actions drop down of a completed report, the Report details drawer is loaded", () => {
  test("@Env-All @Zephyr-IO-T4348 C24965_Manage All - Verify when clicked on view report details option under the actions drop down of a completed report, the Report details drawer is loaded UI_Backlog", async ({ io, page }) => {
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.waitForElementAttached(selectors.basePagePO.RESOURCES);
    await io.homePage.goToMenu("Tools", "Reports");
    await io.homePage.clickByText('Flow events');
    await io.homePage.clickByTextByIndex('Flow events', 1);
    // Validating Report Details drawer should be opened
    await io.assert.verifyElementDisplayedByText("Flow events report results", "Drawer not opened");
  });
});