import { test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import TC from '../../../testData/inputData/FlowBuilder/C102875.json';

test.describe("C102875_C102876_C102877_C102878_C102879", () => {
    test("C102875_C102876", async ({ io, page }) => {
        await io.createResourceFromAPI(TC, "FLOWS");
        await io.flowBuilder.click(selectors.flowBuilderPagePO.RUN_FLOW);
        const lastRun = page.getByText('Last run');
        await lastRun.waitFor({state: 'visible', timeout: 180000});
        await page.reload();
        //Home page: Dashboard
        await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
        await io.homePage.addStep("*** Navigated to home page ***");
        await io.homePage.click(selectors.basePagePO.DASHBOARD);

        // TC_C102875 "Select application" filter box should be added on dashboard page for Completed flows and Running flows tab.
        // TC_C102876 Verify only application that are used in flows will be appear in the dropdown.
        await io.flowBuilder.waitForElementAttached(selectors.dashboardPagePO.SELECT_APPLICATION);
        await io.assert.verifyElementIsDisplayed(selectors.dashboardPagePO.SELECT_APPLICATION, 'Select application filter box not displaying');

        //Completed flows
        await io.homePage.click(selectors.dashboardPagePO.COMPLETED_FLOWS);
        //Verify application showing in dropdown
        await io.flowBuilder.click(selectors.dashboardPagePO.SELECT_APPLICATION);
        let list1 = await page.$$(selectors.dashboardPagePO.APPLICATION_LIST);
        const elementTexts1 = await Promise.all(list1.map(element => element.textContent()));
        const valueToVerify = 'Http';
        const valueToVerify1 = 'Ftp';
        let status2 = elementTexts1.includes(valueToVerify);
        let status3 = elementTexts1.includes(valueToVerify1);
        await io.assert.expectToBeTrue(status2, 'Application not showing properly');
        await io.assert.expectToBeTrue(status3, 'Application not showing properly');

        //Integration page: Dashboard
        await io.createResourceFromAPI(TC, "FLOWS");
        await io.flowBuilder.click(selectors.flowBuilderPagePO.RUN_FLOW);
        await io.homePage.navigateTo(process.env["IO_Integration_URL"]);
        await io.homePage.click(selectors.basePagePO.DASHBOARD);

        //Completed flows
        await io.homePage.click(selectors.dashboardPagePO.COMPLETED_FLOWS);
        await io.flowBuilder.waitForElementAttached(selectors.dashboardPagePO.SELECT_APPLICATION);
        await io.assert.verifyElementIsDisplayed(selectors.dashboardPagePO.SELECT_APPLICATION, 'Select application filter box not displaying');

        //Verify application showing in dropdown
        await io.flowBuilder.click(selectors.dashboardPagePO.SELECT_APPLICATION);
        let list3 = await page.$$(selectors.dashboardPagePO.APPLICATION_LIST);
        const elementTexts3 = await Promise.all(list3.map(element => element.textContent()));
        let status6 = elementTexts3.includes(valueToVerify);
        let status7 = elementTexts3.includes(valueToVerify1);
        await io.assert.expectToBeTrue(status6, 'Application not showing properly');
        await io.assert.expectToBeTrue(status7, 'Application not showing properly');
    });
    test("C102877_C102878_C102879", async ({ io, page }) => {
        //Home page: Dashboard
        await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
        await io.homePage.addStep("*** Navigated to home page ***");
        await io.homePage.click(selectors.basePagePO.DASHBOARD);

        //TC_C102877 Verify if user select only on application then that application only shown on dropdown.
        await io.homePage.click(selectors.dashboardPagePO.COMPLETED_FLOWS);
        await io.flowBuilder.click(selectors.dashboardPagePO.SELECT_APPLICATION);
        await io.homePage.clickByText("Http");
        await io.homePage.clickByText("Apply");
        await io.assert.verifyElementText(selectors.dashboardPagePO.SELECT_APPLICATION, 'Http');

        //TC_C102878 Verify if user select multiple application then it will shown "[No] of application selected" on dropdown.
        await io.flowBuilder.click(selectors.dashboardPagePO.SELECT_APPLICATION);
        await io.homePage.clickByText("Ftp");
        await io.homePage.clickByText("Apply");
        await io.assert.verifyElementText(selectors.dashboardPagePO.SELECT_APPLICATION, '2 applications selected');

        //TC_C102879 Verify if user select all application then it will shown "All applications" on dropdown.
        await io.flowBuilder.click(selectors.dashboardPagePO.SELECT_APPLICATION);
        await io.homePage.clickByText("All applications");
        await io.homePage.clickByText("Apply");
        await io.assert.verifyElementText(selectors.dashboardPagePO.SELECT_APPLICATION, 'Select application');

        //Integration page: Dashboard
        await io.homePage.navigateTo(process.env["IO_Integration_URL"]);
        await io.homePage.click(selectors.basePagePO.DASHBOARD);
        //TC_C102877 Verify if user select only on application then that application only shown on dropdown.
        await io.homePage.click(selectors.dashboardPagePO.COMPLETED_FLOWS);
        await io.flowBuilder.click(selectors.dashboardPagePO.SELECT_APPLICATION);
        await io.homePage.clickByText("Ftp");
        await io.homePage.clickByText("Apply");
        await io.assert.verifyElementText(selectors.dashboardPagePO.SELECT_APPLICATION, 'Ftp');

        //TC_C102878 Verify if user select multiple application then it will shown "[No] of application selected" on dropdown.
        await io.flowBuilder.click(selectors.dashboardPagePO.SELECT_APPLICATION);
        await io.homePage.clickByText("Http");
        await io.homePage.clickByText("Apply");
        await io.assert.verifyElementText(selectors.dashboardPagePO.SELECT_APPLICATION, '2 applications selected');

        //TC_C102879 Verify if user select all application then it will shown "All applications" on dropdown.
        await io.flowBuilder.click(selectors.dashboardPagePO.SELECT_APPLICATION);
        await io.homePage.clickByText("All applications");
        await io.homePage.clickByText("Apply");
        await io.assert.verifyElementText(selectors.dashboardPagePO.SELECT_APPLICATION, 'Select application');
    });
});