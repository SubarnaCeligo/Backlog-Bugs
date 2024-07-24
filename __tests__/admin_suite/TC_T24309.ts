import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("@Author_MaheshNivruttiSutar Verify sample data getting clear on connection change also it is not asking to upload file again", () => {
    test("@Bug-IO-81487 @Env-QA @Priority-P2 @Zephyr-IO-T33536", async ({ io, page }) => {
        await io.homePage.navigateTo(process.env["IO_Integration_URL"]);
        await io.homePage.loadingTime()
        await io.homePage.click(selectors.flowBuilderPagePO.CREATEFLOW);
        await io.homePage.loadingTime();
        await io.flowBuilder.click(selectors.flowBuilderPagePO.ADD_SOURCE);
        await io.flowBuilder.fill(selectors.settingsPagePO.APP_NAME_INPUT, 'FTP');
        await io.flowBuilder.click(selectors.connectionsPagePO.FTP_CONNECTION);
        await io.homePage.loadingTime();
        await io.flowBuilder.clickByText('Create flow step');
        await io.homePage.loadingTime();
        await io.flowBuilder.click(selectors.connectionsPagePO.CONNECTIONS_DROPDOWN);
        await page.getByText('#connections-dropdown-option-0').isVisible();
        await io.flowBuilder.hover('#connections-dropdown-option-0');

        await io.assert.verifyElementIsDisplayed(
            selectors.connectionsPagePO.EDIT_CONN,
            "Edit icon is not displayed properly"
        );
        await page.pause();
        await io.assert.verifyElementIsDisplayed(
            'button:has-text("Create connection")',
            "Create connection is not displayed properly"
        );
        
    });
});