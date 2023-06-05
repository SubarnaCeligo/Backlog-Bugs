import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import * as C752 from "@testData/MyAccount/C752.json";

test.describe("SAMPLE TEST CASE", () => {
    test.beforeEach(async ({ io }) => {
        //Navigate to Respective Page
        await io.myAccountPage.navigateTo(io.data.links.MY_ACCOUNT_PAGE_URL);
    });
    test("SAMPLE TEST WITH TAG - @smoke", async ({
        io
    }) => {
        //Perform UI Actions
        await io.myAccountPage.changePassword(C752);
        let msg = await io.myAccountPage.getText(
            selectors.myAccountPagePO.SNACK_BAR_MESSAGE
        );
        //Verify Results With Assertions
        await expect(msg).toContain(
            "Current password failed to authenticate.  Please try again."
        );
    });
});
