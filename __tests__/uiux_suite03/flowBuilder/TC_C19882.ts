import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("C19882_verify user can able to view number of resolved errors submitted", () => {
    test.beforeEach(async ({ io }) => {
        await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
    });
    test("C19882_verify user can able to view number of resolved errors submitted", async ({ io, page, }) => {
        await io.homePage.navigateTo(process.env.IO_Integration_URL);
        await io.homePage.clickByText("TC_C26246_Flow_DND");
        await io.flowBuilder.click(selectors.flowBuilderPagePO.RUN_FLOW)
        await io.flowBuilder.loadingTime()
        await io.flowBuilder.reloadPage()
        await io.flowBuilder.clickByText('1 error')
        await io.flowBuilder.click(selectors.flowBuilderPagePO.CLOSE_RIGHT_DRAWER)
        await io.flowBuilder.clickByText('1 error')
        await io.flowBuilder.click(selectors.flowBuilderPagePO.CLOSE_RIGHT_DRAWER)
        await io.flowBuilder.clickByText('1 error')
        await io.flowBuilder.clickByText('Resolve & next')
        // Validating resolved count added
        await io.assert.verifyElementContainsText(selectors.flowBuilderPagePO.RESOLVE_TEXTCOUNT, '| Resolves: 1')
    });
});
