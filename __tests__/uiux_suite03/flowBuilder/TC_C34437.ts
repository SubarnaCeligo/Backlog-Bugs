import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("C34437 Verify a new icon indicating auto retry should be displayed in the UI for errors whose classification is equal to intermittent", () => {
    test.beforeEach(async ({ io }) => {
        await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
    });
    test("C34437 Verify a new icon indicating auto retry should be displayed in the UI for errors whose classification is equal to intermittent", async ({ io, page, }) => {
        await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
        await io.homePage.clickByText("Standalone flows");
        await io.homePage.loadingTime();
        await io.homePage.fill(selectors.connectionsPagePO.CONNECTION_PAGE_SEARCH_BAR, "C34437_DND");
        await io.homePage.clickByText("C34437_DND");
        await io.flowBuilder.click(selectors.flowBuilderPagePO.ACCOUNT_DASHBOARD_OPEN_ERRORS);
        await io.flowBuilder.loadingTime();
        const errorElement = await page.$('tr.Mui-selected td:nth-child(5)');
        const errorText = await errorElement?.innerHTML();
        expect(errorText).toContain('Intermittent');

        // C34438 Verify upon hovering the mouse on the auto retry icon present  beside intermittent classifies errors
        const svgElement = await errorElement.$('svg');
        await svgElement?.hover();
        await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.RUNTEST_TOOLTIP);
        await io.assert.verifyElementContainsText(selectors.flowBuilderPagePO.RUNTEST_TOOLTIP, "Next Auto-retry");
    });
});
