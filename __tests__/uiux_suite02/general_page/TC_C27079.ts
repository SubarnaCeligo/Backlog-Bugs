import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";


test.describe("@Author-Sudhanshukumar C27079 Verify data-test attribute to the help Icon", () => {
    test.beforeEach(async ({ io }) => {
        await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
      });
    test("@Env-All C27079 @Epic-IO-52851 @Zephyr-IO-T27079 @Env-QA Verify data-test attribute to the help Icon", async ({ io, page }) => {
        await io.homePage.navigateTo(process.env["IO_Integration_URL"]);
        await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.OPENAI.FLOW_DESCRIPTION_BUTTON);
        await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
        // Imports in Resources 
        await io.homePage.goToMenu("Resources", "Imports");
        await io.flowBuilder.loadingTime();
        await io.assert.verifyElementIsDisplayed(selectors.flowBuilderPagePO.OPENAI.FLOW_DESCRIPTION_BUTTON, "Flow description is not displayed");
        await io.flowBuilder.clickByIndex(selectors.flowBuilderPagePO.CONNECTION_TABLE, 0);
        await io.flowBuilder.loadingTime();
        await io.assert.verifyElementIsDisplayed(selectors.flowBuilderPagePO.HELP_TEXT_ICON, "HELP TEXT ICON is not displayed");
        await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.HELP_TEXT_ICON);
        await io.exportsPage.click(selectors.importPagePO.IMPORT_CLOSE_DRAWER);
        // Exports in Resources
        await io.homePage.goToMenu("Resources", "Exports");
        await io.flowBuilder.loadingTime();
        await io.assert.verifyElementIsDisplayed(selectors.flowBuilderPagePO.OPENAI.FLOW_DESCRIPTION_BUTTON, "Flow description is not displayed");
        await io.flowBuilder.clickByIndex(selectors.flowBuilderPagePO.CONNECTION_TABLE, 0);
        await io.flowBuilder.loadingTime();
        await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.HELP_TEXT_ICON);
        await io.exportsPage.click(selectors.importPagePO.IMPORT_CLOSE_DRAWER);
        // Connections in Resources
        await io.homePage.goToMenu("Resources", "Connections");
        await io.flowBuilder.loadingTime();
        await io.flowBuilder.clickByIndex(selectors.flowBuilderPagePO.CONNECTION_TABLE, 1);
        await io.flowBuilder.loadingTime();
        await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.HELP_TEXT_ICON);
        await io.exportsPage.click(selectors.importPagePO.IMPORT_CLOSE_DRAWER);
    });
});


