import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("C60440 To verify that the integration is loading as expected from dashboard page", () => {
    test("C60440 To verify that the integration is loading as expected from dashboard pag", async ({io, page}) => {
        await io.homePage.navigateTo(process.env["IO_UI_CONNECTOR_URL"]+"home");
        await io.homePage.click(selectors.basePagePO.DASHBOARD);
        await io.homePage.click(selectors.dashboardPagePO.COMPLETED_FLOWS);
        await io.homePage.clickByTextByIndex('Automation Flows', 0);
        await io.homePage.waitForElementAttached(selectors.integrationPagePO.DELETE_INTEGRATION);
        const isDeleteIntegrationVisible = await io.homePage.isVisible(selectors.integrationPagePO.DELETE_INTEGRATION);
        const isCloneIntegrationVisible = await io.homePage.isVisible(selectors.integrationPagePO.CLONE_INTEGRATION);
        const pageTitle = page.getByRole('heading', {name : 'Automation Flows', exact: true});
        await expect(pageTitle).toHaveText('Automation Flows');
        await io.assert.expectToBeTrue(isDeleteIntegrationVisible, 'Delete integration not visible');
        await io.assert.expectToBeTrue(isCloneIntegrationVisible, 'Clone integration not visible');
    });
})