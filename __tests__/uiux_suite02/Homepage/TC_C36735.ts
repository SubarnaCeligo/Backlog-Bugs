import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("C36735_The upgrade button on the subscriptions page should be disabled when the user clicks on Upgrade now - X days left", () => {
    test("@Env-All @Zephyr-IO-T1462 C36735_The upgrade button on the subscriptions page should be disabled when the user clicks on Upgrade now - X days left UI_Backlog", async ({ io, page }) => {
        await io.myAccountPage.navigateTo(io.data.links.MY_ACCOUNT_PAGE_URL);
        await io.myAccountPage.click(selectors.myAccountPagePO.SUBSCRIPTION);
        await io.myAccountPage.loadingTime()
         // Validating upgrade button shown 
        await io.assert.verifyElementIsDisplayed(selectors.homePagePO.UPGRADE_BUTTON, "It's not available");
    });
});
