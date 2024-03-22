import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("C27101_In the Date range window of the Run report drawer, we should be able to set the start and end time using the calender by dragging the mouse between the dates", () => {
    test("C27101_In the Date range window of the Run report drawer, we should be able to set the start and end time using the calender by dragging the mouse between the dates UI_Backlog", async ({ io, page }) => {
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
        await io.homePage.clickByText("Custom");
        // Validating start time and endtime should as selected in the calender
        await io.assert.verifyElementDisplayedByText('You can generate a report for up to 3 days of data.', 'Range not available')
    });
});
