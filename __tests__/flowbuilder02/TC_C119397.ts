import { test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("@Author_MaheshNivruttiSutar C119397 Verify changed filter text message", () => {
    test("@Epic-IO-35839 @Env-QA @Priority-P2 @Zephyr-IO-T26211", async ({ io, page }) => {
        //Home page: Dashboard
        await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
        await io.homePage.addStep("*** Navigated to home page ***");
        await io.flowBuilder.loadingTime();
        await io.homePage.click(selectors.basePagePO.DASHBOARD);
        await io.flowBuilder.loadingTime();
        //Running  flows
        await io.flowBuilder.click(selectors.dashboardPagePO.APP_FILTER);
        await io.homePage.clickByText("DynamoDB");
        await io.homePage.clickByText("Apply");
        await io.flowBuilder.loadingTime();
        const text = await io.homePage.isVisible("text='No running flows match your filter criteria.'")
        await io.assert.expectToBeValue(text.toString(), 'true', "Text is not found")
        //Completed flows
        await io.homePage.click(selectors.dashboardPagePO.COMPLETED_FLOWS);
        await io.flowBuilder.loadingTime();
        await io.flowBuilder.click(selectors.dashboardPagePO.APP_FILTER);
        await io.homePage.clickByText("DynamoDB");
        await io.homePage.clickByText("Apply");
        await io.flowBuilder.loadingTime();
        const text1 = await io.homePage.isVisible("text='No completed flows match your filter criteria.'")
        await io.assert.expectToBeValue(text1.toString(), 'true', "Text is not found")

        //Integration page: Dashboard
        await io.homePage.navigateTo(process.env["IO_Integration_URL"]);
        await io.flowBuilder.loadingTime();
        await io.homePage.click(selectors.flowBuilderPagePO.DASHBOARD);
        await io.flowBuilder.loadingTime();
        //Running  flows
        await io.flowBuilder.click(selectors.dashboardPagePO.APP_FILTER);
        await io.homePage.clickByText("DynamoDB");
        await io.homePage.clickByText("Apply");
        await io.flowBuilder.loadingTime();
        const text2 = await io.homePage.isVisible("text='No running flows match your filter criteria.'")
        await io.assert.expectToBeValue(text2.toString(), 'true', "Text is not found")
        //Completed flows
        await io.homePage.click(selectors.dashboardPagePO.COMPLETED_FLOWS);
        await io.flowBuilder.loadingTime();
        await io.flowBuilder.click(selectors.dashboardPagePO.APP_FILTER);
        await io.homePage.clickByText("DynamoDB");
        await io.homePage.clickByText("Apply");
        await io.flowBuilder.loadingTime();
        const text3 = await io.homePage.isVisible("text='No completed flows match your filter criteria.'")
        await io.assert.expectToBeValue(text3.toString(), 'true', "Value is not found")
    });
});