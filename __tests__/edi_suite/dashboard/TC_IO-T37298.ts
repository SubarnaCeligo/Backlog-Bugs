import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("@Author_MaheshNivruttiSutar @Zephyr-IO-T37298 @Zephyr-IO-T37300 @Zephyr-IO-T37301", () => {
    test.beforeEach(async ({ io }) => {
        await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
        await io.homePage.loadingTime();
    });
    test("@Epic-IO-80246 @Priority-P2 @Env-QA @Zephyr-IO-T37298 @Zephyr-IO-T37300 @Zephyr-IO-T37301", async ({ io, page }) => {
        //Go to Dashboard
        await io.myAccountPage.navigateTo(process.env["IO_UI_CONNECTOR_URL"] + "dashboard");
        await io.homePage.loadingTime();
        await io.homePage.waitForElementAttached(selectors.dashboardPagePO.EDI_ACTIVITY_TAB);
        //Click on EDI Activity
        await io.homePage.click(selectors.dashboardPagePO.EDI_ACTIVITY_TAB);
        await io.homePage.loadingTime();
        await io.homePage.waitForElementAttached(selectors.dashboardPagePO.DOCUMENTS_AUTO_SELECTED);

        //IO-T37298 Verify "Select application" filter box is added on the EDI dashboard.
        //Open flows dashboard
        await io.homePage.clickByTextByIndex('Documents', 0);
        await io.homePage.waitForElementAttached(selectors.dashboardPagePO.FLOWS);
        await io.homePage.click(selectors.dashboardPagePO.FLOWS);
        await io.homePage.loadingTime();
        await io.homePage.waitForElementAttached(selectors.dashboardPagePO.FILTER_BUTTON);
        await io.assert.verifyElementIsDisplayed(selectors.dashboardPagePO.APP_FILTER, "'Select application' filter box is not displayed");


        //IO-T37300 Verify if user select only one application then that application only shown on dropdown for EDI dashboard.
        await io.flowBuilder.click(selectors.dashboardPagePO.APP_FILTER);
        await io.flowBuilder.loadingTime();
        await io.homePage.clickByText("HTTP");
        await io.homePage.clickByText("Apply");
        await io.flowBuilder.loadingTime();
        await io.assert.verifyElementText(selectors.dashboardPagePO.APP_FILTER, 'HTTP');


        //IO-T37301 Verify if user select multiple application then it will shown  ""[No] of application selected"" on dropdown for EDI dashboard.
        await io.flowBuilder.click(selectors.dashboardPagePO.APP_FILTER);
        await io.homePage.clickByText("FTP");
        await io.homePage.clickByText("Apply");
        await io.flowBuilder.loadingTime();
        await io.assert.verifyElementText(selectors.dashboardPagePO.APP_FILTER, '2 applications selected');

        //Verify if user select all application then it will shown "Select application" on dropdown.
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
    });
});