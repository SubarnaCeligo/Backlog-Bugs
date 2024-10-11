import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import TC from '../../testData/inputData/FlowBuilder/C102875.json';

test.describe("@Author_MaheshNivruttiSutar C102875_C102876_C102877_C102878_C102879", () => {
    test("@Epic-IO-35839 @Env-QA @Priority-P2 @Zephyr-IO-T26207 @Zephyr-IO-T26208", async ({ io, page }) => {
        //Home page: Dashboard
        await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
        await io.homePage.addStep("*** Navigated to home page ***");
        await io.homePage.click(selectors.basePagePO.DASHBOARD);
        // TC_C102875 [IO-T26207] "Select application" filter box should be added on dashboard page for Completed flows and Running flows tab.
        // TC_C102876 [IO-T26208] Verify all the connections(applications) in the account will be appear in the dropdown.
        //Running flows
        await io.flowBuilder.waitForElementAttached(selectors.dashboardPagePO.APP_FILTER);
        await io.assert.verifyElementIsDisplayed(selectors.dashboardPagePO.APP_FILTER, 'Select application filter box not displaying');
        //Verify application showing in dropdown
        await io.flowBuilder.click(selectors.dashboardPagePO.APP_FILTER);
        const valueToVerify = 'Http';
        const valueToVerify1 = 'Ftp';
        let elementTexts = await io.connectionPage.getText(selectors.dashboardPagePO.APPLICATION_LIST);
        await io.assert.expectToBeValueInArray(elementTexts, valueToVerify, 'Application not showing properly');
        await io.assert.expectToBeValueInArray(elementTexts, valueToVerify1, 'Application not showing properly');
        //Application count
        let appLists = await page.$$(selectors.dashboardPagePO.FILTER_LIST);
        let appListLens = await appLists.length;
        expect(appListLens).toBeGreaterThan(20);
        //Completed flows
        await io.homePage.click(selectors.dashboardPagePO.COMPLETED_FLOWS);
        await page.getByText("Completed date range").waitFor({ state: "visible", timeout: 360000 });
        await io.flowBuilder.waitForElementAttached(selectors.dashboardPagePO.APP_FILTER);
        await io.assert.verifyElementIsDisplayed(selectors.dashboardPagePO.APP_FILTER, 'Select application filter box not displaying');
        //Verify application showing in dropdown
        await io.flowBuilder.click(selectors.dashboardPagePO.APP_FILTER);
        let elementTexts1 = await io.connectionPage.getText(selectors.dashboardPagePO.APPLICATION_LIST);
        await io.assert.expectToBeValueInArray(elementTexts1, valueToVerify, 'Application not showing properly');
        await io.assert.expectToBeValueInArray(elementTexts1, valueToVerify1, 'Application not showing properly');
        //Application count
        let appList = await page.$$(selectors.dashboardPagePO.FILTER_LIST);
        let appListLen = await appList.length;
        expect(appListLen).toBeGreaterThan(20);


        //Integration page: Dashboard
        await io.homePage.navigateTo(process.env["IO_Integration_URL"]);
        await io.homePage.click(selectors.flowBuilderPagePO.DASHBOARD);
        //Running flows
        await io.flowBuilder.waitForElementAttached(selectors.dashboardPagePO.APP_FILTER);
        await io.assert.verifyElementIsDisplayed(selectors.dashboardPagePO.APP_FILTER, 'Select application filter box not displaying');
        //Verify application showing in dropdown
        await io.flowBuilder.click(selectors.dashboardPagePO.APP_FILTER);
        let elementTexts11 = await io.connectionPage.getText(selectors.dashboardPagePO.APPLICATION_LIST);
        await io.assert.expectToBeValueInArray(elementTexts11, valueToVerify, 'Application not showing properly');
        await io.assert.expectToBeValueInArray(elementTexts11, valueToVerify1, 'Application not showing properly');
        //Application count
        let appLists1 = await page.$$(selectors.dashboardPagePO.FILTER_LIST);
        let appListLens1 = await appLists1.length;
        expect(appListLens1).toBeGreaterThan(20);

        //Completed flows
        await io.homePage.click(selectors.dashboardPagePO.COMPLETED_FLOWS);
        await page.getByText("Completed date range").waitFor({ state: "visible", timeout: 360000 });
        await io.flowBuilder.waitForElementAttached(selectors.dashboardPagePO.APP_FILTER);
        await io.assert.verifyElementIsDisplayed(selectors.dashboardPagePO.APP_FILTER, 'Select application filter box not displaying');
        //Verify application showing in dropdown
        await io.flowBuilder.click(selectors.dashboardPagePO.APP_FILTER);
        let elementTexts3 = await io.connectionPage.getText(selectors.dashboardPagePO.APPLICATION_LIST);
        await io.assert.expectToBeValueInArray(elementTexts3, valueToVerify, 'Application not showing properly');
        await io.assert.expectToBeValueInArray(elementTexts3, valueToVerify1, 'Application not showing properly');
        //Application count
        let appList1 = await page.$$(selectors.dashboardPagePO.FILTER_LIST);
        let appListLen1 = await appList1.length;
        expect(appListLen1).toBeGreaterThan(20);
    });
    test("@Epic-IO-35839 @Env-QA @Priority-P2 @Zephyr-IO-T26205 @Zephyr-IO-T26209 @Zephyr-IO-T26210", async ({ io, page }) => {
        //Home page: Dashboard
        await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
        await io.homePage.addStep("*** Navigated to home page ***");
        await io.homePage.click(selectors.basePagePO.DASHBOARD);
        await io.flowBuilder.loadingTime();

        //Running flows
        //TC_C102877 [IO-T26209] Verify if user select only on application then that application only shown on dropdown.
        await io.flowBuilder.click(selectors.dashboardPagePO.APP_FILTER);
        await io.flowBuilder.loadingTime();
        await io.homePage.clickByText("HTTP");
        await io.homePage.clickByText("Apply");
        await io.flowBuilder.loadingTime();
        await io.assert.verifyElementText(selectors.dashboardPagePO.APP_FILTER, 'HTTP');
        //TC_C102878 [IO-T26210]  Verify if user select multiple application then it will shown "[No] of application selected" on dropdown.
        await io.flowBuilder.click(selectors.dashboardPagePO.APP_FILTER);
        await io.homePage.clickByText("FTP");
        await io.homePage.clickByText("Apply");
        await io.flowBuilder.loadingTime();
        await io.assert.verifyElementText(selectors.dashboardPagePO.APP_FILTER, '2 applications selected');
        //TC_C102879 [IO-T26205] Verify if user select all application then it will shown "Select application" on dropdown.
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


        //TC_C102877 [IO-T26209] Verify if user select only on application then that application only shown on dropdown.
        //Completed flows
        await io.homePage.click(selectors.dashboardPagePO.COMPLETED_FLOWS);
        await io.flowBuilder.loadingTime();
        await io.flowBuilder.click(selectors.dashboardPagePO.APP_FILTER);
        await io.flowBuilder.loadingTime();
        await io.homePage.clickByText("HTTP");
        await io.homePage.clickByText("Apply");
        await io.assert.verifyElementText(selectors.dashboardPagePO.APP_FILTER, 'HTTP');

        //TC_C102878 [IO-T26210]  Verify if user select multiple application then it will shown "[No] of application selected" on dropdown.
        await io.flowBuilder.click(selectors.dashboardPagePO.APP_FILTER);
        await io.homePage.clickByText("FTP");
        await io.homePage.clickByText("Apply");
        await io.assert.verifyElementText(selectors.dashboardPagePO.APP_FILTER, '2 applications selected');

        //TC_C102879 [IO-T26205] Verify new changes for Select application filter
        await io.flowBuilder.click(selectors.dashboardPagePO.APP_FILTER);
        //1. The "All applications" should be renamed to "Default (All)"
        const text1 = await io.homePage.isVisible('text="Default (All)"')
        await io.assert.expectToBeTrue(text1, "Text is not found");

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
        //TC_C102877 [IO-T26209] Verify if user select only on application then that application only shown on dropdown.
        await io.flowBuilder.click(selectors.dashboardPagePO.APP_FILTER);
        await io.flowBuilder.loadingTime();
        await io.homePage.clickByText("HTTP");
        await io.homePage.clickByText("Apply");
        await io.flowBuilder.loadingTime();
        await io.assert.verifyElementText(selectors.dashboardPagePO.APP_FILTER, 'HTTP');
        //TC_C102878 [IO-T26210] Verify if user select multiple application then it will shown "[No] of application selected" on dropdown.
        await io.flowBuilder.click(selectors.dashboardPagePO.APP_FILTER);
        await io.homePage.clickByText("FTP");
        await io.homePage.clickByText("Apply");
        await io.flowBuilder.loadingTime();
        await io.assert.verifyElementText(selectors.dashboardPagePO.APP_FILTER, '2 applications selected');
        //TC_C102879 [IO-T26205] Verify if user select all application then it will shown "Select application" on dropdown.
        await io.flowBuilder.click(selectors.dashboardPagePO.APP_FILTER);
        //1. The "All applications" should be renamed to "Default (All)"
        const text2 = await io.homePage.isVisible('text="Default (All)"')
        await io.assert.expectToBeTrue(text2, "Text is not found");

        //2. Unselecting all other application should check "Default (All)" option.
        //3. If "Default (All)" option is checked, it should be disabled.
        await io.homePage.clickByText("FTP");
        await io.homePage.clickByText("HTTP");
        let appList2 = await page.$$(selectors.dashboardPagePO.FILTER_LIST);
        expect(await appList2[0].getAttribute('class')).toContain('Mui-disabled');
        await io.homePage.clickByText("Apply");
        await io.assert.verifyElementText(selectors.dashboardPagePO.APP_FILTER, 'Select application');

        //Completed flows
        //TC_C102877 [IO-T26209] Verify if user select only on application then that application only shown on dropdown.
        await io.homePage.click(selectors.dashboardPagePO.COMPLETED_FLOWS);
        await io.flowBuilder.click(selectors.dashboardPagePO.APP_FILTER);
        await io.homePage.clickByText("FTP");
        await io.homePage.clickByText("Apply");
        await io.assert.verifyElementText(selectors.dashboardPagePO.APP_FILTER, 'FTP');

        //TC_C102878 [IO-T26210] Verify if user select multiple application then it will shown "[No] of application selected" on dropdown.
        await io.flowBuilder.click(selectors.dashboardPagePO.APP_FILTER);
        await io.homePage.clickByText("HTTP");
        await io.homePage.clickByText("Apply");
        await io.assert.verifyElementText(selectors.dashboardPagePO.APP_FILTER, '2 applications selected');

        //TC_C102879 [IO-T26205] Verify new changes for Select application filter.
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