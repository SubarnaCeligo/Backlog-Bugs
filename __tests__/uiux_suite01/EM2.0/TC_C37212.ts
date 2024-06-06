import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("C37212_Verify connection broken icon must be shown at flow level if there is there is any offline connection is used in the particular flow", () => {
    test.beforeEach(async ({ io }) => {
        await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
    });
    test("@Env-All @Zephyr-IO-T7539 C37212_Verify connection broken icon must be shown at flow level if there is there is any offline connection is used in the particular flow UI_Backlog", async ({ io, page }) => {
        await io.flowBuilder.loadingTime();
        await io.flowBuilder.fill(selectors.integrationPagePO.INTEGRATION_PAGE_SEARCH_BAR, 'Automation Flows');
        await io.homePage.clickByText("Automation Flows");
        await io.flowBuilder.loadingTime();
        await io.integrationPage.waitForElementAttached(selectors.integrationPagePO.INTEGRATION_PAGE_SEARCH_BAR);
        await io.integrationPage.fill(selectors.integrationPagePO.INTEGRATION_PAGE_SEARCH_BAR, 'TC_Broken_Connection_DND');
        await io.integrationPage.clickByText('TC_Broken_Connection_DND')
        await io.integrationPage.click(selectors.flowBuilderPagePO.NOTIFICATION_CONNECTIONS)
        await io.integrationPage.clickByTextByIndex('TC_Broken_Connection_DND', 1)
        await io.flowBuilder.loadingTime();
        await io.assert.verifyElementIsDisplayed(selectors.basePagePO.NOTIFICATION_ID, 'Connection page not opened')
    });
});