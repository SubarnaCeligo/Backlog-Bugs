import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("C36435_Verify date and time shown in the format of user preference set in his profile across the application", () => {
    test("@Env-All @Zephyr-IO-T1460 C36435_Verify date and time shown in the format of user preference set in his profile across the application UI_Backlog", async ({ io, page }) => {
        await io.myAccountPage.navigateTo(io.data.links.MY_ACCOUNT_PAGE_URL);
        await io.myAccountPage.loadingTime()
         // Validating date and time shown in the format
        await io.assert.verifyElementDisplayedByText('12/31/1900', "It's not available");
        await io.assert.verifyElementDisplayedByText('2:34:25 pm', "It's not available");
        await io.homePage.clickByIndex(selectors.flowBuilderPagePO.CHECKBOX, 1);
    });
});
