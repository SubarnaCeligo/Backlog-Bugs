import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("@Author_MaheshNivruttiSutar @Zephyr-IO-T31358 @Zephyr-IO-T31359 @Zephyr-IO-T31368 @Zephyr-IO-T31369", () => {
    test.beforeEach(async ({ io }) => {
        await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
        await io.myAccountPage.loadingTime();
    });
    test("@Epic-IO-80150 @Priority-P2 @Env-All @Zephyr-IO-T31359 @Zephyr-IO-T31368 @Zephyr-IO-T31369", async ({ io, page }) => {
        await io.homePage.navigateTo(process.env["IO_Integration_URL"]);
        await io.homePage.loadingTime()
        await io.homePage.click(selectors.flowBuilderPagePO.CREATEFLOW);
        await io.homePage.loadingTime();
        await io.flowBuilder.click(selectors.flowBuilderPagePO.ADD_SOURCE);
        await io.flowBuilder.fill(selectors.settingsPagePO.APP_NAME_INPUT, 'HTTP');
        await io.flowBuilder.click(selectors.connectionsPagePO.HTTP_CNNECTOR);
        await io.homePage.loadingTime();
        await io.flowBuilder.clickByText('Create flow step');

        //Click on connection filter dropdown
        await io.flowBuilder.click(selectors.connectionsPagePO.CONNECTIONS_DROPDOWN);
        //@Zephyr-IO-T31359" Type the connection name
        await page.keyboard.type("HTTP ZENDESK CONNECTION");
        await io.flowBuilder.clickByTextByIndex("HTTP ZENDESK CONNECTION",0);

        // IO-T31368 online/offline status should not show after choosing connection
        const status = await io.assert.checkElementState(selectors.flowBuilderPagePO.CONNECTION_STATUS, 'isDisplayed');
        await io.assert.expectToBeFalse(status, 'Status is displyed');

        //IO-T31369 The edit button should not display after hovering over the connection.
        //Click on connection filter dropdown
        await io.flowBuilder.click(selectors.connectionsPagePO.CONNECTIONS_DROPDOWN);
        await io.flowBuilder.loadingTime();
        await io.flowBuilder.hover(selectors.connectionsPagePO.CONNECTION_DROPDOWN, 0, false);
        const editButton = await io.assert.checkElementState(selectors.connectionsPagePO.EDIT_CONN, 'isDisplayed');
        await io.assert.expectToBeFalse(editButton, 'Status is displyed');
        const editButton1 = await io.assert.checkElementState(selectors.connectionsPagePO.EDIT_RESOURCE, 'isDisplayed');
        await io.assert.expectToBeFalse(editButton1, 'Status is displyed');

    });
    test("@Epic-IO-80150 @Priority-P2 @Env-All  @Zephyr-IO-T31358", async ({ io, page }) => {
        await io.homePage.navigateTo(process.env["IO_Integration_URL"]);
        await io.homePage.loadingTime()
        await io.homePage.click(selectors.flowBuilderPagePO.CREATEFLOW);
        await io.homePage.loadingTime();
        await io.flowBuilder.click(selectors.flowBuilderPagePO.ADD_SOURCE);
        await io.flowBuilder.fill(selectors.settingsPagePO.APP_NAME_INPUT, 'HTTP');
        await io.flowBuilder.click(selectors.connectionsPagePO.HTTP_CNNECTOR);
        await io.homePage.loadingTime();
        await io.flowBuilder.clickByText('Create flow step');
        await io.flowBuilder.clickButtonByIndex(selectors.flowBuilderPagePO.HELP_TEXT_ICON,1);
        await io.flowBuilder.clickButtonByIndex(selectors.flowBuilderPagePO.HELP_TEXT_ICON,1);
        await io.homePage.loadingTime();
        await io.flowBuilder.click(selectors.connectionsPagePO.CONNECTIONS_DROPDOWN);
        await io.homePage.loadingTime();
        // IO-T31368 connections of the available resources should be displayed in the filter drop-down
        await io.assert.verifyElementIsDisplayed(
            selectors.connectionsPagePO.CONNECTION_DROPDOWN,
            "Connections is not displayed"
          );


    });
});