import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe(`C51579_Verify connection form base URI while cloning`, () => {
    test(`@Env-All @Zephyr-IO-T18907 C51579_Verify connection form base URI while cloning UI_Backlog`, async ({ io }) => {
        await io.homePage.navigateTo(process.env.IO_Integration_URL);
        
        await io.homePage.waitForElementAttached(selectors.integrationPagePO.INTEGRATION_PAGE_SEARCH_BAR)
        await io.homePage.fill(selectors.integrationPagePO.INTEGRATION_PAGE_SEARCH_BAR, "C51579_Flow_DND")
        await io.homePage.clickByText("C51579_Flow_DND");
        await io.homePage.loadingTime();
        await io.homePage.click(selectors.connectionsPagePO.ACTIONS_MENU_BUTTON);
        await io.homePage.loadingTime();
        await io.flowBuilder.clickByText("Clone flow");
        await io.homePage.waitForElementAttached(selectors.basePagePO.ADD_NAME);
        await io.homePage.fill(selectors.connectionsPagePO.NAME_INPUT, 'Clone_C51579_Flow_DND');
        await io.flowBuilder.clickByText("Please select");
        await io.flowBuilder.clickByIndex(selectors.basePagePO.MENU_ITEM, 1);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.CLONE_FLOW_BUTTON);
        await io.flowBuilder.clickByTextByIndex("Configure", 0);
        await io.homePage.fill(selectors.importPagePO.PASSWORD, 'process.env["FTP_password"]');
        // Validating Base URI not displayed
        await io.assert.expectNotToBeValue("Base URI", "base uri", "Base URI available")
        await io.flowBuilder.click(selectors.basePagePO.SAVE_AND_CLOSE);
    });
});
