import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("C26246_Verify the Resolved graph UI with different browsers", () => {
    test.beforeEach(async ({ io }) => {
        await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
    });
    test("C26246_Verify the Resolved graph UI with different browsers UI_Backlog", async ({ io, page, }) => {
        await io.homePage.navigateTo(process.env.IO_Integration_URL);
        await io.homePage.clickByText("TC_C26246_Flow_DND");
        await io.flowBuilder.click(selectors.flowBuilderPagePO.RUN_FLOW)
        await io.flowBuilder.loadingTime()
        await io.flowBuilder.reloadPage()
        await io.flowBuilder.clickByText('1 error')
        await io.flowBuilder.click(selectors.flowBuilderPagePO.CLOSE_RIGHT_DRAWER)
        await io.flowBuilder.clickByText('1 error')
        await io.flowBuilder.clickByText('Resolve & next')
        await io.flowBuilder.click(selectors.flowBuilderPagePO.CLOSE_RIGHT_DRAWER)
        await io.flowBuilder.click(selectors.flowBuilderPagePO.CHARTS)
        await io.flowBuilder.clickByTextByIndex('Refresh', 1)
        // Validating Flow: Resolved chart showing in graph
        await io.assert.verifyElementDisplayedByText('Flow: Resolved', "Chart not showing properly")
    });
});
