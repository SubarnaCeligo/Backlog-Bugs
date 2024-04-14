import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("@Bug-IO-27016  @Priority-P2  @Zephyr-T5136 @Env-All Use this account for SSO dropdown in security tab should show Account names not the owner names", () => {
    test("@Bug-IO-27016  @Priority-P2  @Zephyr-T5136 @Env-All Use this account for SSO dropdown in security tab should show Account names not the owner names", async ({ io, page }) => {
        await io.myAccountPage.navigateTo(io.data.links.MY_ACCOUNT_PAGE_URL);
        await io.myAccountPage.loadingTime();
        var expectedName = await page.locator(selectors.loginPagePO.COMPANY).getAttribute('value')
        await io.myAccountPage.click(selectors.myAccountPagePO.SECURITY);
        await io.myAccountPage.clickByText("Please select");
        var actualNameValue = await page.locator(`${selectors.basePagePO.MENU_ITEM} span .MuiBox-root`).last().textContent()
        await io.myAccountPage.loadingTime();
        await io.assert.expectToBeValue(actualNameValue, expectedName, "Name is invalid");
    });
});




