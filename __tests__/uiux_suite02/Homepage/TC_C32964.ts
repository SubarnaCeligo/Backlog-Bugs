import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe('C32964_To verify io persists the user preference on the integration view', () => {
    test('@Env-All @Zephyr-IO-T2996 C32964_To verify io persists the user preference on the integration view UI_Backlog', async ({ page, io }) => {
        await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
        await io.homePage.loadingTime()
        await io.homePage.click(selectors.homePagePO.LIST_VIEW);
        await io.homePage.waitForElementAttached(`${selectors.flowBuilderPagePO.COLUMNS} ${selectors.connectionsPagePO.ACTIONS_MENU_BUTTON}`)
        await io.homePage.goToMenu("Tools", "Reports");
        await io.homePage.click(selectors.basePagePO.HOME);
        await io.homePage.loadingTime()
        // Validating list view showing constant
        await io.assert.verifyElementDisplayedByText('Last open error', "View changed showing grid")
    });
});
