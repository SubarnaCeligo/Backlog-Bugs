import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("C1517_Verify the status and the expiry date of the free trail", () => {
    test("C1517_Verify the status and the expiry date of the free trail UI_Backlog", async ({ io, page }) => {
        await io.myAccountPage.navigateTo(io.data.links.MY_ACCOUNT_PAGE_URL);
        await io.myAccountPage.click(selectors.myAccountPagePO.SUBSCRIPTION);
        await io.myAccountPage.loadingTime()
         // Validating status and expiry visible
        await io.assert.verifyElementDisplayedByText('Status:Active', 'info not showing')
        await io.assert.verifyElementDisplayedByText('Expires on:', 'info not showing')
    });
});
