import { test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("@Author-sagna123 T34958-Test to validate User is able to preview the correct output without saving marketplace existing Import having hooks", () => {
    test.beforeEach(async ({ io }) => {
        await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
    });
    test("@Priority-P2 @Env-QA @Zephyr-IO-T34958 @Bug-IO-82466 Test to validate User is able to preview the correct output without saving marketplace existing Import having hooks", async ({ io, page }) => {
        await io.homePage.loadingTime();
        await io.homePage.loadingTime();
        await io.homePage.goToMenu("Tools", "Flow builder");
        await io.homePage.loadingTime();
        await io.homePage.loadingTime();
        await io.flowBuilder.addStep("Navigated to flowbuilder page"); 
        await io.flowBuilder.click(selectors.flowBuilderPagePO.ADD_DESTINATION_OR_LOOKUP);
        await io.flowBuilder.addStep("Clicked on create import");
        await io.flowBuilder.fill(selectors.flowBuilderPagePO.APP_NAME_INPUT, "Google Sheets");
        await io.flowBuilder.waitForElementAttached(selectors.exportsPagePO.GOOGLE_SHEETS);
        await io.flowBuilder.click(selectors.exportsPagePO.GOOGLE_SHEETS);
        await io.flowBuilder.addStep("Clicked on google sheets connector");

        //Select trasfer files
        await io.flowBuilder.clickByText("Import records into destination application");
        await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.MARKETPLACE_RESOURCES_SHOW_MORE);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.MARKETPLACE_RESOURCES_SHOW_MORE);
        await io.flowBuilder.clickByText("Update existing rows and append new rows");
        //Open advanced section 
        await io.flowBuilder.click(selectors.basePagePO.SAVE);
        await io.flowBuilder.fill(selectors.connectionsPagePO.CONNECTION_INPUT, "Sheet Parser Google Sheet connection");
        await io.homePage.loadingTime();
        await io.homePage.click(selectors.connectionsPagePO.CONNECTIONDROP0);
        await io.homePage.loadingTime();
        await io.flowBuilder.click(selectors.importPagePO.CLICKPREVIEW);
        await io.assert.verifyElementDisplayedByText("You must save the import before any associated scripts can be used in preview calls.", "notification is not shown");
        await io.homePage.loadingTime();
        await io.homePage.loadingTime();
        await io.homePage.loadingTime();
        await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
        await io.flowBuilder.addStep("Naviagted back to Homepage");
    });
});