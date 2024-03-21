import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("C27104_In the Date range window of the Run report drawer, we should not be able to set start time that is older than 30 days from current date and time_UI_Backlog", () => {
    test("C27104_In the Date range window of the Run report drawer, we should not be able to set start time that is older than 30 days from current date and time_UI_Backlog", async ({ io, page }) => {
        await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
        await io.homePage.waitForElementAttached(selectors.basePagePO.RESOURCES);
        await io.homePage.goToMenu("Tools", "Reports");
        await io.homePage.click(selectors.basePagePO.ADD_NEW_RESOURCE);
        await io.homePage.clickByText('Choose integration');
        const intID = await io.api.loadIntegrations();
        await io.flowBuilder.selectTextfromDropDown(page, intID.get('Automation Flows'))
        await io.homePage.fill(selectors.dashboardPagePO.REPORT_FLOWS, 'TC_C12034_DND')
        await page.getByText('TC_C12034_DND').last().click()
        await io.homePage.clickByText('Done');
        await io.homePage.clickByText("Choose date range");
        // Validating not able to select older than 30 days 
        await expect(await page.locator(selectors.dashboardPagePO.REPORT_FLOWS)).not.toHaveCSS("30 days", "Date range");
    });
});
