import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("@Author_MaheshNivruttiSutar Verify application filter with different user roles[ADMIN]", () => {
    test("@Epic-IO-35839 @Env-QA @Priority-P2 @Zephyr-IO-T37306", async ({ io, page }) => {
        //Home page: Dashboard
        await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
        await io.homePage.addStep("*** Navigated to home page ***");
        await io.homePage.click(selectors.basePagePO.DASHBOARD);
        await io.flowBuilder.loadingTime();

        //Running flows
        await io.flowBuilder.click(selectors.dashboardPagePO.APP_FILTER);
        await io.flowBuilder.loadingTime();
        await io.homePage.clickByText("HTTP");
        await io.homePage.clickByText("Apply");
        await io.flowBuilder.loadingTime();
        await io.assert.verifyElementText(selectors.dashboardPagePO.APP_FILTER, 'HTTP');
        await io.flowBuilder.loadingTime();
        await io.flowBuilder.click(selectors.dashboardPagePO.APP_FILTER);
        await io.homePage.clickByText("FTP");
        await io.homePage.clickByText("Apply");
        await io.flowBuilder.loadingTime();
        await io.assert.verifyElementText(selectors.dashboardPagePO.APP_FILTER, '2 applications selected');
        await io.flowBuilder.loadingTime();
        await io.flowBuilder.click(selectors.dashboardPagePO.APP_FILTER);
        //1. The "All applications" should be renamed to "Default (All)"
        const text = await io.homePage.isVisible('text="Default (All)"')
        await io.assert.expectToBeTrue(text, "Text is not found");

        //2. Unselecting all other application should check "Default (All)" option.
        //3. If "Default (All)" option is checked, it should be disabled.
        await io.homePage.clickByText("FTP");
        await io.homePage.clickByText("HTTP");
        let appList = await page.$$(selectors.dashboardPagePO.FILTER_LIST);
        expect(await appList[0].getAttribute('class')).toContain('Mui-disabled');
        await io.homePage.clickByText("Apply");
        await io.assert.verifyElementText(selectors.dashboardPagePO.APP_FILTER, 'Select application');

        //Completed flows
        await io.homePage.click(selectors.dashboardPagePO.COMPLETED_FLOWS);
        await io.flowBuilder.loadingTime();
        await io.flowBuilder.click(selectors.dashboardPagePO.APP_FILTER);
        await io.flowBuilder.loadingTime();
        await io.homePage.clickByText("HTTP");
        await io.homePage.clickByText("Apply");
        await io.assert.verifyElementText(selectors.dashboardPagePO.APP_FILTER, 'HTTP');
        await io.flowBuilder.loadingTime();
        await io.flowBuilder.click(selectors.dashboardPagePO.APP_FILTER);
        await io.homePage.clickByText("FTP");
        await io.homePage.clickByText("Apply");
        await io.assert.verifyElementText(selectors.dashboardPagePO.APP_FILTER, '2 applications selected');
        await io.flowBuilder.loadingTime();
        await io.flowBuilder.click(selectors.dashboardPagePO.APP_FILTER);
        //1. The "All applications" should be renamed to "Default (All)"
        const text1 = await io.homePage.isVisible('text="Default (All)"')
        await io.assert.expectToBeTrue(text1, "Text is not found");
        await io.flowBuilder.loadingTime();
        //2. Unselecting all other application should check "Default (All)" option.
        //3. If "Default (All)" option is checked, it should be disabled.
        await io.homePage.clickByText("FTP");
        await io.homePage.clickByText("HTTP");
        let appList1 = await page.$$(selectors.dashboardPagePO.FILTER_LIST);
        expect(await appList1[0].getAttribute('class')).toContain('Mui-disabled');
        await io.homePage.clickByText("Apply");
        await io.assert.verifyElementText(selectors.dashboardPagePO.APP_FILTER, 'Select application');


        //Integration page: Dashboard
        await io.homePage.navigateTo(process.env["IO_Integration_URL"]);
        await io.homePage.click(selectors.flowBuilderPagePO.DASHBOARD);
        await io.flowBuilder.loadingTime();
        //Running flows
        await io.flowBuilder.click(selectors.dashboardPagePO.APP_FILTER);
        await io.flowBuilder.loadingTime();
        await io.homePage.clickByText("HTTP");
        await io.homePage.clickByText("Apply");
        await io.flowBuilder.loadingTime();
        await io.assert.verifyElementText(selectors.dashboardPagePO.APP_FILTER, 'HTTP');
        await io.flowBuilder.loadingTime();
        await io.flowBuilder.click(selectors.dashboardPagePO.APP_FILTER);
        await io.homePage.clickByText("FTP");
        await io.homePage.clickByText("Apply");
        await io.flowBuilder.loadingTime();
        await io.assert.verifyElementText(selectors.dashboardPagePO.APP_FILTER, '2 applications selected');
        await io.flowBuilder.loadingTime();
        await io.flowBuilder.click(selectors.dashboardPagePO.APP_FILTER);
        //1. The "All applications" should be renamed to "Default (All)"
        const text2 = await io.homePage.isVisible('text="Default (All)"')
        await io.assert.expectToBeTrue(text2, "Text is not found");
        await io.flowBuilder.loadingTime();
        //2. Unselecting all other application should check "Default (All)" option.
        //3. If "Default (All)" option is checked, it should be disabled.
        await io.homePage.clickByText("FTP");
        await io.homePage.clickByText("HTTP");
        let appList2 = await page.$$(selectors.dashboardPagePO.FILTER_LIST);
        expect(await appList2[0].getAttribute('class')).toContain('Mui-disabled');
        await io.homePage.clickByText("Apply");
        await io.assert.verifyElementText(selectors.dashboardPagePO.APP_FILTER, 'Select application');

        //Completed flows
        await io.flowBuilder.loadingTime();
        await io.homePage.click(selectors.dashboardPagePO.COMPLETED_FLOWS);
        await io.flowBuilder.click(selectors.dashboardPagePO.APP_FILTER);
        await io.homePage.clickByText("FTP");
        await io.homePage.clickByText("Apply");
        await io.assert.verifyElementText(selectors.dashboardPagePO.APP_FILTER, 'FTP');

        await io.flowBuilder.loadingTime();
        await io.flowBuilder.click(selectors.dashboardPagePO.APP_FILTER);
        await io.homePage.clickByText("HTTP");
        await io.homePage.clickByText("Apply");
        await io.assert.verifyElementText(selectors.dashboardPagePO.APP_FILTER, '2 applications selected');

        await io.flowBuilder.loadingTime();
        await io.flowBuilder.click(selectors.dashboardPagePO.APP_FILTER);
        //1. The "All applications" should be renamed to "Default (All)"
        const text3 = await io.homePage.isVisible('text="Default (All)"')
        await io.assert.expectToBeTrue(text3, "Text is not found");

        //2. Unselecting all other application should check "Default (All)" option.
        //3. If "Default (All)" option is checked, it should be disabled.
        await io.homePage.clickByText("FTP");
        await io.homePage.clickByText("HTTP");
        let appList3 = await page.$$(selectors.dashboardPagePO.FILTER_LIST);
        expect(await appList3[0].getAttribute('class')).toContain('Mui-disabled');
        await io.homePage.clickByText("Apply");
        await io.assert.verifyElementText(selectors.dashboardPagePO.APP_FILTER, 'Select application');
    });
});