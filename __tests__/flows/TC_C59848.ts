import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("C59848 To verify that the Integrations will load properly", () => {
    test("C59848 To verify that the Integrations will load properly", async ({io, page}) => {
        await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
        await io.homePage.clickByText('Automation Flows');
        const isDeleteIntegrationVisible = await io.homePage.isVisible(selectors.integrationPagePO.DELETE_INTEGRATION);
        const isCloneIntegrationVisible = await io.homePage.isVisible(selectors.integrationPagePO.CLONE_INTEGRATION);
        const isFlowsTabVisible = await io.homePage.isVisible("[data-test=Flows]");
        const isDashboardTabVisible = await io.homePage.isVisible("[data-test=Dashboard]");
        const isNotificationsTabVisible = await io.homePage.isVisible("[data-test=Notifications]");
        const pageTitle = page.getByRole('heading', {name : 'Automation Flows', exact: true});
        await expect(pageTitle).toHaveText('Automation Flows');
        expect(isDeleteIntegrationVisible).toBe(true);
        expect(isCloneIntegrationVisible).toBe(true);
        expect(isFlowsTabVisible).toBe(true);
        expect(isDashboardTabVisible).toBe(true);
        expect(isNotificationsTabVisible).toBe(true);
    });
})