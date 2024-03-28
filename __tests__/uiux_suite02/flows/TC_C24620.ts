import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("C24620_Verify the behaviour of Retry & Resolve dropdown with >1000 errors on Monitor whole account user", () => {
    test.beforeEach(async ({ io }) => {
        await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
    });
    test("C24620_Verify the behaviour of Retry & Resolve dropdown with >1000 errors on Monitor whole account user UI_Backlog", async ({ io, page, }) => {
        await io.homePage.navigateTo(process.env["IO_Integration_URL"]);
        await io.flowBuilder.clickByText("TC_C24620_Flow_DND");
        await io.flowBuilder.click(selectors.basePagePO.RUNFLOW);
        await io.flowBuilder.loadingTime();
        await io.flowBuilder.reloadPage()
        await io.flowBuilder.loadingTime();
        await io.homePage.clickByIndex(selectors.flowBuilderPagePO.ERROR_BUBBLE, 1);
        await io.homePage.clickByIndex(selectors.flowBuilderPagePO.CHECKBOX, 1);
        await io.flowBuilder.clickByText('Retry & next')
        await io.flowBuilder.clickByText('Resolved errors')
        await io.flowBuilder.clickByText('Retries')
        // Validating Resolved errors and retries added
        await io.assert.verifyElementDisplayedByText('Resolved errors', 'Error not available')
        await io.assert.verifyElementDisplayedByText('Retries', 'Error not available')
    });
});
