import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("@Author_MaheshNivruttiSutar Verify Inconsistent Capitalization of `Online` status on Register connection page.", () => {
    test.beforeEach(async ({ io }) => {
        await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
        await io.myAccountPage.loadingTime();
    });
    test("@Bug-IO-87902 @Priority-P2 @Env-All @Zephyr-IO-T35642", async ({ io, page }) => {
        await io.homePage.navigateTo(process.env["IO_Integration_URL"]);
        await io.homePage.loadingTime();
        await io.homePage.click(selectors.basePagePO.CONNECTIONS);
        await io.homePage.loadingTime();
        await io.homePage.clickByText('Register connections');
        await io.homePage.loadingTime();
        const msg = await io.flowBuilder.isVisible("text='Online'")
        await io.assert.expectToBeTrue(msg, "Label is not Updated");
    });
});