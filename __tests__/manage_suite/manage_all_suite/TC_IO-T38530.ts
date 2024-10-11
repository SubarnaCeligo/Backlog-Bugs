import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("@Author_MaheshNivruttiSutar Verify for different access levels 'Recently used' application showing as per specific to user access.[Manage]'", () => {
    test.beforeEach(async ({ io }) => {
        await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
        await io.flowBuilder.loadingTime();
    });
    test("@Bug-IO-97925 @Priority-P2 @Env-QA @Zephyr-IO-T38530'", async ({ io, page, context }) => {
        await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
        await io.flowBuilder.loadingTime();
        await io.flowBuilder.click(selectors.homePagePO.LIST_VIEW);
        await io.flowBuilder.loadingTime();
        await io.flowBuilder.click(selectors.dashboardPagePO.TILE_FILTER);
        await io.flowBuilder.loadingTime();
        const rows = await page.$$(selectors.flowBuilderPagePO.FILTER_OPTION);
        const rowsLent = await rows.length;
        await io.flowBuilder.click(selectors.dashboardPagePO.TILE_FILTER);
        await io.flowBuilder.click(selectors.homePagePO.TILE_VIEW);
        await io.flowBuilder.loadingTime();

        await io.flowBuilder.loadingTime();
        await io.homePage.goToMenu("Tools", "Flow builder");
        await io.flowBuilder.loadingTime();
        await io.flowBuilder.click(selectors.flowBuilderPagePO.ADD_SOURCE);
        await io.flowBuilder.loadingTime();
        const rows1 = await page.$$(selectors.dashboardPagePO.RECENTLY_USED);
        const rowsLent1 = await rows1.length;
        expect(rowsLent1).toBeLessThanOrEqual(rowsLent-1);
    });
});