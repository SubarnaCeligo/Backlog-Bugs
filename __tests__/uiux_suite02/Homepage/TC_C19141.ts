import {test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("C19141_Profile Page Issues while linking and unlinking to Google.", () => {
    test("@Env-All @Zephyr-IO-T1405 C19141_Profile Page Issues while linking and unlinking to Google. UI_Backlog", async ({ io, page }) => {
        await io.myAccountPage.navigateTo(io.data.links.MY_ACCOUNT_PAGE_URL);
        await io.myAccountPage.loadingTime()
         // Validating linked with google
        await io.assert.verifyElementDisplayedByText('12/31/1900', "It's not available");
        await io.assert.verifyElementDisplayedByText('2:34:25 pm', "It's not available");
        await io.assert.verifyElementDisplayedByText('Link to:', "It's not available");
    });
});
