import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("C27109 Run Report drawer - ‘Child integrations’ cannot be a required field", () => {
  test("C27109 Run Report drawer - ‘Child integrations’ cannot be a required field", async ({ io, page }) => {
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.waitForElementAttached(selectors.basePagePO.RESOURCES);
    await io.homePage.goToMenu("Tools", "Reports");
    await io.homePage.click(selectors.basePagePO.ADD_NEW_RESOURCE);
    await io.homePage.clickByText('Choose integration');
    await io.homePage.clickByTextByIndex('Standalone flows', 1);
    await io.homePage.fill(selectors.dashboardPagePO.REPORT_FLOWS, 'TC_C12034_DND')
    await io.homePage.clickByText('Done');
    await io.homePage.clickByText("Choose date range");
    await io.homePage.clickByText("Last minute");
    await io.homePage.clickByText("Apply");
    // Validating child integration not available and without chlid able to run
    await io.assert.verifyElementIsDisplayed(selectors.basePagePO.SAVE,'Run report not clickable')
  });
});