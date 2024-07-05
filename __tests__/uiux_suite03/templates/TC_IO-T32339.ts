import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe(`@Author_MaheshNivruttiSutar Verify User is able to create template for Graphql & van applicataion`, () => {
    test.beforeEach(async ({ io }) => {
        await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
        await io.flowBuilder.loadingTime();
    });
    test(`@Bug-IO-81699 @Env-All @Priority-P2 @Zephyr-IO-T32339  Verify User is able to create template for Graphql & van applicataion`, async ({ io, page }) => {
        await io.homePage.click(selectors.basePagePO.RESOURCES);
        await io.flowBuilder.loadingTime();
        await io.homePage.clickByText("Templates");
        await io.homePage.addStep("Navigated to templates page");
        await io.homePage.clickByText("Create template");
        await io.flowBuilder.loadingTime();
        await io.flowBuilder.fill(selectors.basePagePO.INPUT_NAME_SELECTOR, "GRAPHQL & VAN TEMPLATE");
        await io.homePage.addStep("*** Adding template name ***");
        await io.flowBuilder.fill(selectors.templatePagePO.CONTACT_MAIL, process.env["IO_UserName"]);
        await io.homePage.addStep("*** Adding contact email ***");
        await io.flowBuilder.enterHugeData(selectors.templatePagePO.CHOOSE_APPLICATION, 'GRAPHQL');
        await io.flowBuilder.click(selectors.templatePagePO.GRAPHQL);
        await io.flowBuilder.enterHugeData(selectors.templatePagePO.CHOOSE_APPLICATION, 'VAN (Value-added network)');
        await io.flowBuilder.click(selectors.templatePagePO.VAN);
        await io.homePage.click(selectors.basePagePO.SAVE_AND_CLOSE);
        await io.homePage.loadingTime();
        const template = await io.flowBuilder.isVisible("text='GRAPHQL & VAN TEMPLATE'")
        await io.assert.expectToBeTrue(template, "Template is not created")
        await io.flowBuilder.fill(selectors.connectionsPagePO.CONNECTION_PAGE_SEARCH_BAR, "GRAPHQL & VAN TEMPLATE");
        await io.homePage.loadingTime();
        await io.homePage.addStep("Searched for template");
        await io.homePage.clickButtonByIndex(selectors.flowBuilderPagePO.OPEN_ACTIONS_MENU,0);
        await io.homePage.loadingTime();
        await io.homePage.addStep("Clicked on actions menu");
        await io.flowBuilder.clickByText("Delete template");
        await io.homePage.addStep("Delete template");
        await io.homePage.loadingTime();
        await io.homePage.click(selectors.basePagePO.DELETE_BUTTON);
    });
});