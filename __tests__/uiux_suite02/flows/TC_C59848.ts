import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("C59848 To verify that the Integrations will load properly", () => {
    test("@Env-All C59848 To verify that the Integrations will load properly", async ({io, page}) => {
        await io.homePage.navigateTo(process.env["IO_UI_CONNECTOR_URL"]+"home");
        await io.homePage.clickByText('Automation Flows');
        await io.homePage.waitForElementAttached(selectors.integrationPagePO.DELETE_INTEGRATION);
        const isDeleteIntegrationVisible = await io.homePage.isVisible(selectors.integrationPagePO.DELETE_INTEGRATION);
        const isCloneIntegrationVisible = await io.homePage.isVisible(selectors.integrationPagePO.CLONE_INTEGRATION);
        const isFlowsTabVisible = await io.homePage.isVisible(selectors.integrationPagePO.FLOWS_TAB);
        const isDashboardTabVisible = await io.homePage.isVisible(selectors.integrationPagePO.DASHBOARD_TAB);
        const isNotificationsTabVisible = await io.homePage.isVisible(selectors.integrationPagePO.NOTIFICATIONS_TAB);
        const pageTitle = page.getByRole('heading', {name : 'Automation Flows', exact: true});
        await expect(pageTitle).toHaveText('Automation Flows');
        await io.assert.expectToBeTrue(isDeleteIntegrationVisible, 'Delete integration not visible');
        await io.assert.expectToBeTrue(isCloneIntegrationVisible, 'Clone integration not visible');
        await io.assert.expectToBeTrue(isFlowsTabVisible, 'Flow tab not visible');
        await io.assert.expectToBeTrue(isDashboardTabVisible, 'Dashboard not visible');
        await io.assert.expectToBeTrue(isNotificationsTabVisible, 'Notification tab not visible');
    });
})