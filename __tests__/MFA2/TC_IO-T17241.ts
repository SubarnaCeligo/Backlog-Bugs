import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt } from "@celigo/aut-utilities";

test.describe("Verify if the message prompt is shown when the user clicks on 'Need Help?.", () => {
    test("@Env-All @Zephyr-IO-T17241 Verify if the message prompt is shown when the user clicks on 'Need Help?", async ({ io, page }) => {
        await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
        await io.homePage.clickByText('Need help?');
        expect(await page.getByText('Contact an admin or owner of')).toBeVisible();
    });
});