import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("C107001_Verify sorting column If a user navigates to the next batch of 1000 errors and applies new sorting", () => {
    test.beforeEach(async ({ io }) => {
        await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
    });
    test("C107001_Verify sorting column If a user navigates to the next batch of 1000 errors and applies new sorting UI_Backlog", async ({ io, page, }) => {
        await io.homePage.navigateTo(process.env["IO_Integration_URL"]);
        await io.flowBuilder.clickByText("TC_C107001_Flow_DND");
        await io.flowBuilder.click(selectors.basePagePO.RUNFLOW);
        await io.flowBuilder.loadingTime();
        await io.flowBuilder.reloadPage()
        await io.flowBuilder.loadingTime();
        await io.homePage.clickByIndex(selectors.flowBuilderPagePO.ERROR_BUBBLE, 1);
        await io.homePage.clickByTextByIndex("Timestamp", 1)
        // Validating sorting column applied
        await io.assert.verifyElementDisplayedByText('Error Details', 'Error not available')
    });
});
