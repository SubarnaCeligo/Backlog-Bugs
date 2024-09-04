import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe('Verify we should not allow integration level manage access once ALL integrations are given manage access', () => {
    test.beforeEach(async ({ io }) => {
        await io.myAccountPage.navigateTo(io.data.links.MY_ACCOUNT_PAGE_URL);
    });

    test('@Env-All @Zephyr-IO-T6900 C1568 Verify we should not allow integration level manage access once ALL integrations are given manage access ', async ({ io, page }) => {
        await io.homePage.loadingTime()
        await io.myAccountPage.clickByText("Users");
        await io.myAccountPage.clickByText("Invite user");
        await io.myAccountPage.waitForElementAttached("text='Custom'")
        await io.homePage.loadingTime()
        await io.homePage.loadingTime()
        await io.homePage.clickByText("Custom");
        await io.myAccountPage.click(selectors.myAccountPagePO.CUSTOM_MONITOR_ALL)
        await io.myAccountPage.click(selectors.myAccountPagePO.MONITOR_ALL_BUTTON);
        await io.myAccountPage.clickByText('Automation Flows')
        const checkboxSelector = selectors.myAccountPagePO.MONITOR_ALL_BUTTON;
        const isChecked = await page.isChecked(checkboxSelector);
        expect(isChecked).toBe(false);
    });
})

