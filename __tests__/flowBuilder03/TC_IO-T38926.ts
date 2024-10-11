import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("@Author_MaheshNivruttiSutar Verify changes on application filter'", () => {
    test.beforeEach(async ({ io }) => {
        await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
        await io.flowBuilder.loadingTime();
    });
    test("@Bug-IO-97925 @Priority-P2 @Env-QA @Zephyr-IO-T38926'", async ({ io, page, context }) => {
        await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
        await io.flowBuilder.loadingTime();
        await io.flowBuilder.click(selectors.homePagePO.LIST_VIEW);
        await io.flowBuilder.loadingTime();
        await io.flowBuilder.click(selectors.dashboardPagePO.TILE_FILTER);
        await io.flowBuilder.loadingTime();
        await io.homePage.clickButtonByIndex(selectors.flowBuilderPagePO.FILTER_OPTION,1);
        await io.homePage.clickButtonByIndex(selectors.flowBuilderPagePO.FILTER_OPTION,2);
        await io.flowBuilder.loadingTime();
        await io.homePage.clickByText("Apply");
        await io.flowBuilder.loadingTime();
        await io.flowBuilder.click(selectors.dashboardPagePO.TILE_FILTER);
        await io.flowBuilder.loadingTime();
        //1. The "All applications" should be renamed to "Default (All)"
        const text3 = await io.homePage.isVisible('text="Default (All)"')
        await io.assert.expectToBeTrue(text3, "Text is not found");
        //2. Unselecting all other application should check "Default (All)" option.
        //3. If "Default (All)" option is checked, it should be disabled.
        await io.homePage.clickButtonByIndex(selectors.flowBuilderPagePO.FILTER_OPTION,1);
        await io.homePage.clickButtonByIndex(selectors.flowBuilderPagePO.FILTER_OPTION,2);
        await io.flowBuilder.loadingTime();
        let appList3 = await page.$$(selectors.dashboardPagePO.FILTER_LIST);
        expect(await appList3[0].getAttribute('class')).toContain('Mui-disabled');
        await io.homePage.clickByText("Apply");
        await io.flowBuilder.loadingTime();
        await io.flowBuilder.click(selectors.homePagePO.TILE_VIEW);
        await io.flowBuilder.loadingTime();
    });
});