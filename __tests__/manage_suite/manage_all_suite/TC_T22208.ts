import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("T22208_Verify with Manage/Monitor role user is able to see following options in account sub menu", () => {
    test("@Env-All @Zephyr-IO-T22208 Verify with Manage/Monitor role user is able to see following options in account sub menu", async ({ io, page }) => {
        await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
        await io.homePage.click(selectors.homePagePO.PROFILE_MENU);
        expect(await page.locator('#account-list a').count()).toEqual(3);
        await io.assert.verifyElementDisplayedByText('Profile', 'Profile Link available');
        await io.assert.verifyElementDisplayedByText('Send feedback', 'Send feedback Link available');
        await io.assert.verifyElementDisplayedByText('Security', 'Security Link available');
        await page.pause();
    });
});