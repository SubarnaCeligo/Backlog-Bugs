import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("C34112_Verify the date and time formats based on the profile settings", () => {
    test("@Env-All @Zephyr-IO-T2282 C34112_Verify the date and time formats based on the profile settings UI_Backlog", async ({ io, page }) => {
        await io.myAccountPage.navigateTo(io.data.links.MY_ACCOUNT_PAGE_URL);
        await io.myAccountPage.loadingTime()
         // Validating date and time shown in the format
        await io.assert.verifyElementDisplayedByText('12/31/1900', "It's not available");
        await io.assert.verifyElementDisplayedByText('2:34:25 pm', "It's not available");
        await io.homePage.clickByIndex(selectors.flowBuilderPagePO.CHECKBOX, 1);
    });
});
