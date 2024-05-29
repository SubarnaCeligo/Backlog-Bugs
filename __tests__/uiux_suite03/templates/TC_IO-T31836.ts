import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe(`@Author_MaheshNivruttiSutar IO-T31836 Verify user should be able Create template for NS JDBC application`, () => {
    test.beforeEach(async ({ io }) => {
        await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    });
    test(`@Bug-IO-80253 @Env-QA @Priority-P2 @Zephyr-IO-T31836  Verify user should be able Create template for NS JDBC application`, async ({ io, page }) => {
        await io.homePage.click(selectors.basePagePO.RESOURCES);
        await io.flowBuilder.loadingTime();
        await io.homePage.clickByText("Templates");
        await io.homePage.addStep("Navigated to templates page");
        await io.homePage.clickByText("Create template");
        await io.flowBuilder.loadingTime();
        await io.flowBuilder.fill('input[name="/name"]', "NS JDBC TEMPLATE");
        await io.homePage.addStep("*** Adding template name ***");
        await io.flowBuilder.fill(selectors.templatePagePO.CONTACT_MAIL, process.env["IO_UserName"]);
        await io.homePage.addStep("*** Adding contact email ***");
        await io.flowBuilder.enterHugeData(selectors.templatePagePO.CHOOSE_APPLICATION, 'Netsuite JDBC');
        await io.flowBuilder.click(selectors.templatePagePO.NS_JDBC);
        await io.homePage.click(selectors.basePagePO.SAVE_AND_CLOSE);
        await io.homePage.loadingTime();
        const template = await io.flowBuilder.isVisible("text='NS JDBC TEMPLATE'")
        await io.assert.expectToBeTrue(template, "Template is not created")
        await io.flowBuilder.fill(selectors.connectionsPagePO.CONNECTION_PAGE_SEARCH_BAR, "NS JDBC TEMPLATE");
        await io.homePage.addStep("Searched for template");
        await io.homePage.click(selectors.flowBuilderPagePO.OPEN_ACTIONS_MENU);
        await io.homePage.loadingTime();
        await io.homePage.addStep("Clicked on actions menu");
        await io.flowBuilder.clickByText("Delete template");
        await io.homePage.addStep("Delete template");
        await io.homePage.loadingTime();
        await io.homePage.click(selectors.basePagePO.DELETE_BUTTON);
    });
});