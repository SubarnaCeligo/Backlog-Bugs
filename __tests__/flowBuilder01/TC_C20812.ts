import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("TC_C20812_Verify, EM 2.0: Error message: If long text is present, more empty space is appeared with scroll bar enabled", () => {
    test.beforeEach(async ({ io }) => {
        await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
    });
    test("C20812_Verify, EM 2.0: Error message: If long text is present, more empty space is appeared with scroll bar enabled UI_Backlog @Env-All @Priority-P2 @Zephyr-IO-T7390", async ({ io, page }) => {
        await io.homePage.navigateTo(process.env["IO_Integration_URL"]);
        await io.flowBuilder.loadingTime();
        await io.flowBuilder.clickByText("TC_C51620_Flow_DND");
        await io.flowBuilder.click(selectors.basePagePO.RUNFLOW);
        await io.flowBuilder.loadingTime();
        await io.homePage.click(selectors.flowBuilderPagePO.ERROR_BUBBLE);
        await io.flowBuilder.loadingTime();
        await io.flowBuilder.loadingTime();
        await io.flowBuilder.loadingTime();
        await io.flowBuilder.loadingTime();
        await io.flowBuilder.reloadPage();
        await io.flowBuilder.loadingTime();
        // Validating error message and details
        await io.assert.verifyElementContainsText(selectors.integrationPagePO.ERRORDETAILSPAGE, 'The specified bucket does not exist')
    });
});