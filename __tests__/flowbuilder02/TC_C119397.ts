import { test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("C119397", () => {
    test.skip("C119397 @Env-All @Priority-P2", async ({ io, page }) => {
        //Home page: Dashboard
        await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
        await io.homePage.addStep("*** Navigated to home page ***");
        await io.homePage.click(selectors.basePagePO.DASHBOARD);

        //Running  flows
        await io.flowBuilder.click(selectors.dashboardPagePO.SELECT_APPLICATION);
        await io.flowBuilder.clickByIndex(selectors.flowBuilderPagePO.FILTER_OPTION, 0);
        await io.homePage.clickByText("Apply");
        const text = await io.homePage.isVisible("text='No running flows match your filter criteria.'")
        await io.assert.expectToBeValue(text.toString(), 'true', "Text is not found")


        //Completed flows
        await io.homePage.click(selectors.dashboardPagePO.COMPLETED_FLOWS);
        await io.flowBuilder.click(selectors.dashboardPagePO.SELECT_APPLICATION);
        await io.flowBuilder.clickByIndex(selectors.flowBuilderPagePO.FILTER_OPTION, 0);
        await io.homePage.clickByText("Apply");
        const text1 = await io.homePage.isVisible("text='No completed flows match your filter criteria.'")
        await io.assert.expectToBeValue(text1.toString(), 'true', "Text is not found")

        //Integration page: Dashboard
        await io.homePage.navigateTo(process.env["IO_Integration_URL"]);
        await io.homePage.click(selectors.flowBuilderPagePO.DASHBOARD);

        //Running  flows
        await io.flowBuilder.click(selectors.dashboardPagePO.SELECT_APPLICATION);
        await io.flowBuilder.clickByIndex(selectors.flowBuilderPagePO.FILTER_OPTION, 0);
        await io.homePage.clickByText("Apply");
        const text2 = await io.homePage.isVisible("text='No running flows match your filter criteria.'")
        await io.assert.expectToBeValue(text2.toString(), 'true', "Text is not found")

        //Completed flows
        await io.homePage.click(selectors.dashboardPagePO.COMPLETED_FLOWS);
        await io.flowBuilder.click(selectors.dashboardPagePO.SELECT_APPLICATION);
        await io.flowBuilder.clickByIndex(selectors.flowBuilderPagePO.FILTER_OPTION, 0);
        await io.homePage.clickByText("Apply");
        const text3 = await io.homePage.isVisible("text='No completed flows match your filter criteria.'")
        await io.assert.expectToBeValue(text3.toString(), 'true', "Value is not found")
    });
});