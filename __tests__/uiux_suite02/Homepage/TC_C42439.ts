import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("C42439_Verify Upgrade button changes in Home page & Subscription page when IO account is in Free trail", () => {
    test("C42439_Verify Upgrade button changes in Home page & Subscription page when IO account is in Free trail UI_Backlog", async ({ io, page }) => {
        await io.myAccountPage.navigateTo(io.data.links.MY_ACCOUNT_PAGE_URL);
        await io.myAccountPage.click(selectors.myAccountPagePO.SUBSCRIPTION);
        await io.myAccountPage.loadingTime()
        await io.homePage.click(selectors.homePagePO.UPGRADE_BUTTON);
        await io.homePage.clickByText("Cancel");
        await io.homePage.click(selectors.homePagePO.UPGRADE_BUTTON);
        await io.homePage.clickByText("Submit request");
        // Validating text showing correctly 
        await io.assert.verifyElementDisplayedByText('You have already submitted an upgrade request. We will be in touch soon.', 'Message not showing')
    });
});
