import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("C27042 Run Report drawer - ‘Child integrations’ cannot be a required field", () => {
  test("C27042 Run Report drawer - ‘Child integrations’ cannot be a required field", async ({ io, page }) => {
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.waitForElementAttached(selectors.basePagePO.RESOURCES);
    await io.homePage.goToMenu("Tools", "Reports");
    await io.homePage.click(selectors.basePagePO.ADD_NEW_RESOURCE);
    await io.homePage.clickByText('Choose integration');
    await page.getByText('Standalone flows').last().click();
    await io.homePage.fill(selectors.dashboardPagePO.REPORT_FLOWS, 'TC_C12034_DND')
    await page.getByText('TC_C12034_DND').last().click()
    await io.homePage.clickByText('Done');
    await io.homePage.clickByText("Choose date range");
    await io.homePage.clickByText("Last minute");
    await io.homePage.clickByText("Apply");
    await io.homePage.click(selectors.basePagePO.SAVE);
    await io.homePage.loadingTime()
    await io.homePage.click(selectors.integrationPagePO.OPENACTIONSMENU)
    // Validating date format visible
    await io.homePage.clickByText("View report details");
    await io.assert.verifyElementDisplayedByText("Date range:", "Date is not present ");
  });
});