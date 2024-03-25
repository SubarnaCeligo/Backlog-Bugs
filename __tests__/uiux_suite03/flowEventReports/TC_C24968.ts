import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("C24968_Tile monitor- Verify when clicked on view report details option under the actions drop down of a completed report, the Report details drawer is loaded", () => {
    test("C24968_Tile monitor- Verify when clicked on view report details option under the actions drop down of a completed report, the Report details drawer is loaded UI_Backlog", async ({ io, page }) => {
        await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
        await io.homePage.waitForElementAttached(selectors.basePagePO.RESOURCES);
        await io.homePage.goToMenu("Tools", "Reports");
        await io.homePage.click(selectors.basePagePO.ADD_NEW_RESOURCE);
        await io.homePage.clickByText('Choose integration');
        const intID = await io.api.loadIntegrations();
        await io.flowBuilder.selectTextfromDropDown(page, intID.get('Automation Flows'))
        await io.homePage.fill(selectors.dashboardPagePO.REPORT_FLOWS, 'TC_C12034_DND')
        await page.getByText('TC_C12034_DND').click()
        await io.homePage.clickByText('Done');
        await io.homePage.clickByText("Choose date range");
        await io.homePage.clickByText("Last minute");
        await io.homePage.clickByText("Apply");
        await io.homePage.click(selectors.basePagePO.SAVE);
        await io.homePage.loadingTime()
        await io.homePage.click(selectors.integrationPagePO.OPENACTIONSMENU)
        await io.homePage.clickByText("View report details");
        // Validating Report Details drawer should be opened
        await io.assert.verifyElementDisplayedByText("Date range:", "Date is not present ");
    });
});
