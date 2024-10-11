import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("@Author_MaheshNivruttiSutar Verify In the Sandbox, when a user hovers over the Select application filter, the color of the filter should not changes.", () => {
    test.beforeEach(async ({ io }) => {
        await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
        await io.homePage.loadingTime();
    });
    test("@Epic-IO-99088 @Priority-P2 @Env-QA @Zephyr-IO-T39037", async ({ io, page }) => {
        await io.homePage.loadingTime();
        await io.flowBuilder.click(selectors.homePagePO.SANDBOX_BUTTON);
        await io.homePage.loadingTime();
        await io.flowBuilder.click(selectors.basePagePO.DASHBOARD);
        await io.homePage.loadingTime();
        await io.homePage.waitForElementAttached(selectors.dashboardPagePO.EDI_ACTIVITY_TAB);
        //Application filters in Account dashboard
        //Running flows
        await io.flowBuilder.hover(selectors.dashboardPagePO.APP_FILTER);
        await io.homePage.loadingTime();
        const ediTextElement = page.locator(selectors.dashboardPagePO.APP_FILTER);
        const ediTextColor = await ediTextElement.evaluate(el => {
            return window.getComputedStyle(el).color;
        });
        expect(ediTextColor).toBe("rgb(51, 61, 71)");
        await io.flowBuilder.loadingTime();
        //Completed flows
        await io.flowBuilder.click(selectors.dashboardPagePO.COMPLETED_FLOWS);
        await io.homePage.loadingTime();
        await io.flowBuilder.hover(selectors.dashboardPagePO.APP_FILTER);
        await io.homePage.loadingTime();
        const ediTextElement1 = page.locator(selectors.dashboardPagePO.APP_FILTER);
        const ediTextColor1 = await ediTextElement1.evaluate(el => {
            return window.getComputedStyle(el).color;
        });
        expect(ediTextColor1).toBe("rgb(51, 61, 71)");
        await io.flowBuilder.loadingTime();


        //Click on EDI Activity
        await io.homePage.click(selectors.dashboardPagePO.EDI_ACTIVITY_TAB);
        await io.homePage.loadingTime();
        await io.homePage.waitForElementAttached(selectors.dashboardPagePO.DOCTYPE_FILTER);
        await io.homePage.loadingTime();
        await io.flowBuilder.hover(selectors.dashboardPagePO.DOCTYPE_FILTER);
        await io.homePage.loadingTime();
        const ediTextElement2 = page.locator(selectors.dashboardPagePO.DOCTYPE_FILTER);
        const ediTextColor2 = await ediTextElement2.evaluate(el => {
            return window.getComputedStyle(el).color;
        });
        expect(ediTextColor2).toBe("rgb(51, 61, 71)");
        await io.flowBuilder.loadingTime();
        await io.homePage.click(selectors.homePagePO.PRODUCTION_BUTTON);
        await io.flowBuilder.loadingTime();
    });
});