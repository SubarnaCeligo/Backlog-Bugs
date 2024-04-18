import {expect, test} from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("C57331 Verify if the shared user has not setup the MFA to his account he should be navigated to the MFA setup page on login", () => {
    test("C57331 Verify if the shared user has not setup the MFA to his account he should be navigated to the MFA setup page on login", async ({io, page}) => {
        await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
        await io.homePage.loadingTime();
        await io.assert.verifyElementIsDisplayed(selectors.basePagePO.NOTIFICATION_ARIA_LABEL, "Notifications is not displayed");
    });
});