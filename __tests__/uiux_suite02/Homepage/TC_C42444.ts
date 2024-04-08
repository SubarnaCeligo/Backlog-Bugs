import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("C42444_Verify Request upgrade button changes for Integrator type license", () => {
    test("C42444_Verify Request upgrade button changes for Integrator type license UI_Backlog", async ({ io, page }) => {
        await io.myAccountPage.navigateTo(io.data.links.MY_ACCOUNT_PAGE_URL);
        await io.myAccountPage.click(selectors.myAccountPagePO.SUBSCRIPTION);
        await io.myAccountPage.loadingTime()
        await io.homePage.click(selectors.homePagePO.UPGRADE_BUTTON);
        await io.homePage.clickByText("Submit request");
        await io.myAccountPage.loadingTime()
        // Validating text showing correctly 
        await io.assert.verifyElementDisplayedByText('You have already submitted an upgrade request. We will be in touch soon.', 'Message not showing')
    });
});
