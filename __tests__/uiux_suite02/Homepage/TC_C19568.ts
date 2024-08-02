import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("C19568_Profile should never be in read only mode for Account users", () => {
    test.beforeEach(async ({ io }) => {
        await io.myAccountPage.navigateTo(io.data.links.MY_ACCOUNT_PAGE_URL);
    });
    test("@Env-All @Zephyr-IO-T2243 C19568_Profile should never be in read only mode for Account users UI_Backlog", async ({ io }) => {
        await io.myAccountPage.click(selectors.myAccountPagePO.USERS);
        await io.myAccountPage.clickByText("Invite user")
        // Validating profile should never be in read only mode
        await io.myAccountPage.clickButtonByIndex(selectors.basePagePO.ADMIN, 0)
        await io.myAccountPage.clickButtonByIndex(selectors.basePagePO.ADMIN, 1)
        await io.myAccountPage.clickButtonByIndex(selectors.basePagePO.ADMIN, 2)
        await io.myAccountPage.clickButtonByIndex(selectors.basePagePO.ADMIN, 3)
    });
});
