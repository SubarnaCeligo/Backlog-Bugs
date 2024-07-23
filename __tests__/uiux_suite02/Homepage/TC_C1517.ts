import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("C1517_Verify the status and the expiry date of the free trail", () => {
    test("@Env-All @Zephyr-IO-T939 C1517_Verify the status and the expiry date of the free trail UI_Backlog", async ({ io, page }) => {
        await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL)
        await io.myAccountPage.loadingTime()
        await io.homePage.goToMenu("profileMenu","Subscription")
        await io.myAccountPage.loadingTime()
         // Validating status and expiry visible
        await io.assert.verifyElementDisplayedByText('Status:Active', 'info not showing')
        await io.assert.verifyElementDisplayedByText('Expires on:', 'info not showing')
    });
});
