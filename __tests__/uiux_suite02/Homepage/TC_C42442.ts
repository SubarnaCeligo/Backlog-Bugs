import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("C42442_Verify changes to Contact us to Upgrade &  Add-on buttons on IA tiles", () => {
    test("@Env-All @Zephyr-IO-T919 C42442_Verify changes to Contact us to Upgrade &  Add-ons buttons on IA tiles UI_Backlog", async ({ io, page }) => {
        await io.myAccountPage.navigateTo(io.data.links.MY_ACCOUNT_PAGE_URL);
        await io.myAccountPage.click(selectors.myAccountPagePO.SUBSCRIPTION);
        await io.myAccountPage.loadingTime()
        await io.homePage.click(selectors.homePagePO.UPGRADE_BUTTON);
        await io.homePage.clickByText("Submit request");
        // Validating text showing correctly 
        await io.assert.verifyElementIsDisplayed(selectors.flowBuilderPagePO.EXPORT_NOTIFICATION_ERROR_MESSAGE, 'Message not showing')
    });
});
