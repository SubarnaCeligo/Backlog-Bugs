import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("@Author_MaheshNivruttiSutar Verify all users are displaying on select user filter'", () => {
    test.beforeEach(async ({ io }) => {
        await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
        await io.flowBuilder.loadingTime();
    });
    test("@Bug-IO-97335 @Bug-IO-98334 @Priority-P2 @Env-QA @Zephyr-IO-T37299 @Zephyr-IO-T38694'", async ({ io, page, context }) => {
        await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
        await io.flowBuilder.loadingTime();
        await io.homePage.click(selectors.basePagePO.ACCOUNT_BUTTON);
        await io.homePage.click(selectors.myAccountPagePO.AUDIT_LOG);
        await io.homePage.loadingTime();
        await page.getByText("Audit log").nth(0).waitFor({ state: "visible", timeout: 150000 });
        await io.homePage.clickByText(
            'Select user'
        );
        await io.homePage.loadingTime();
        await io.homePage.clickButtonByIndex(selectors.dashboardPagePO.SELECT_USER,1);
        await io.homePage.loadingTime();
        await io.homePage.click(selectors.dashboardPagePO.SELECT_USER_FILTER);
        await io.homePage.loadingTime();
        const ele = await page.$$(selectors.dashboardPagePO.SELECT_USER);
        const eleLe = await ele.length
        expect(eleLe).toBeGreaterThan(1);
        await io.homePage.clickButtonByIndex(selectors.dashboardPagePO.SELECT_USER,1);
        await io.homePage.loadingTime();

        //IO-T37299 Verify The "HELP" text should be bolded to align with the design guidelines and improve clarity.
        await io.homePage.click(selectors.homePagePO.HELP_CENTER);
        await io.homePage.loadingTime();

        const element = await page.locator("//p[contains(text(),'Help')]").first();
        const fontWeight = await element.evaluate(el => {
            return window.getComputedStyle(el).getPropertyValue('font-weight');
        });
        await io.assert.expectToBeValue("700", fontWeight, "Help button not showing in bold");
    });
});