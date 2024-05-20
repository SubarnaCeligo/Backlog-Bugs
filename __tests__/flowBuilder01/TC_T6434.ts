import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("C29041_Account Dashboard - Completed flows - Completed date range's Custom time frame cannot be less than 1 hour'}}'/'}}}' ", () => {
    test.beforeEach(async ({ io }) => {
        await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
    });
    test("@Env-All @Zephyr-IO-T6434 C29041 Account Dashboard - Completed flows - Completed date range's Custom time frame cannot be less than 1 hour", async ({ io, page }) => {
        await io.homePage.navigateTo(process.env["IO_Integration_URL"]);
        await io.homePage.isVisible(selectors.integrationPagePO.DASHBOARD_TAB);
        await io.homePage.click(selectors.integrationPagePO.DASHBOARD_TAB);
        await io.homePage.click(selectors.flowBuilderPagePO.COMPLETED_FLOWS);
        await io.homePage.waitForElementAttached(selectors.myAccountPagePO.DATEFILTER);
        await io.homePage.click(selectors.myAccountPagePO.DATEFILTER);
        let buttons = (await io.homePage.getText(selectors.dashboardPagePO.DATE_FILTER_POPUP)).toString();
        //Verify values of buttons
        await io.assert.expectToBeValue('Today,Last 24 hours,Last 36 hours,Last 7 days,Last 15 days,Last 30 days,Custom', buttons, 'Date filters are not displayed');
    });
});