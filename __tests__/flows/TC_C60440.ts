import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("C60440 To verify that the integration is loading as expected from dashboard page", () => {
    test("C60440 To verify that the integration is loading as expected from dashboard pag", async ({io, page}) => {
        await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
        await io.homePage.click(selectors.basePagePO.DASHBOARD);
        await io.homePage.click(selectors.dashboardPagePO.COMPLETED_FLOWS);
        await io.homePage.clickByText('Automation Flows');
        const deleteIntegration = await io.homePage.isVisible(selectors.integrationPagePO.DELETE_INTEGRATION);
        const cloneIntegration = await io.homePage.isVisible(selectors.integrationPagePO.CLONE_INTEGRATION);
        const pageTitle = page.getByRole('heading', {name : 'Automation Flows', exact: true});
        await expect(pageTitle).toHaveText('Automation Flows');
        expect(deleteIntegration).toBe(true);
        expect(cloneIntegration).toBe(true);
    });
})