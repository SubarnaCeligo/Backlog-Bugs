import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("TC_C20808_Verify for, Safari browser: EM 2.0: Error drawer: Search box: Entered text should visible clearly without getting cut out at button UI_Backlog", () => {
    test.beforeEach(async ({ io }) => {
        await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
    });
    test("C20808_Verify for, Safari browser: EM 2.0: Error drawer: Search box: Entered text should visible clearly without getting cut out at button UI_Backlog", async ({ io, page }) => {
        await io.homePage.navigateTo(process.env["IO_Integration_URL"]);
        await io.flowBuilder.loadingTime();
        await io.flowBuilder.clickByText("TC_C20808_Flow_DND");
        await io.flowBuilder.click(selectors.basePagePO.RUNFLOW);
        await io.flowBuilder.loadingTime();
        await io.flowBuilder.reloadPage()
        await io.flowBuilder.loadingTime();
        await io.homePage.click(selectors.flowBuilderPagePO.ERROR_BUBBLE);
        await io.flowBuilder.loadingTime();
        await io.flowBuilder.fill(selectors.integrationPagePO.HOME_SEARCH,'s3')
        // Validating error message and details are visible
        await io.assert.verifyElementContainsText(selectors.integrationPagePO.ERRORDETAILSPAGE, 'The specified bucket does not exist')
    });
});