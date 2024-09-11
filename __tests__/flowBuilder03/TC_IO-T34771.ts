import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("@Author_MaheshNivruttiSutar Verify new changes related to connection filter", () => {
    test.describe.configure({ retries: 1 })
    test("@Bug-IO-83170 @Env-All @Priority-P2 @Zephyr-IO-T34771", async ({ io, page }) => {
        await io.homePage.navigateTo(process.env["IO_Integration_URL"]);
        await io.homePage.loadingTime()
        await io.homePage.click(selectors.flowBuilderPagePO.CREATEFLOW);
        await io.homePage.loadingTime();
        await io.flowBuilder.click(selectors.flowBuilderPagePO.ADD_SOURCE);
        await io.flowBuilder.fill(selectors.settingsPagePO.APP_NAME_INPUT, 'HTTP');
        await io.flowBuilder.click(selectors.connectionsPagePO.HTTP_CNNECTOR);
        await io.homePage.loadingTime();
        //Caret down icon (down arrow) should not be displayed.
        const caretIcon = await page.$(selectors.exportsPagePO.CREATE_SELECT_CONNECTION);
        expect(await caretIcon.screenshot()).toMatchSnapshot("caretIcon.png",  {maxDiffPixelRatio: 0.8 });

        //and if the user has typed in something, the search icon will be replaced by the Close icon.
        //Click on connection filter dropdown
        await io.flowBuilder.click(selectors.connectionsPagePO.CONNECTIONS_DROPDOWN);
        await page.keyboard.type("HTTP ZENDESK CONNECTION");
        await io.flowBuilder.loadingTime();
        const closeIc = await page.$(selectors.flowBuilderPagePO.CLOSE_ICON);
        expect(await closeIc.screenshot()).toMatchSnapshot("closeIc.png",  {maxDiffPixelRatio: 0.8 });

        //Clicking on the close icon should clear the selected connection.
        await io.flowBuilder.clickByTextByIndex("HTTP ZENDESK CONNECTION",0);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.CLOSE_ICON);
        await io.flowBuilder.loadingTime();
        const text = (await io.flowBuilder.getText(selectors.connectionsPagePO.CONNECTIONS_DROPDOWN)).toString();
        await io.assert.expectToBeValue("", text, 'Connection name is not cleared');

        //Also, can we clear the connection name by pressing just 1 backspace key as we are doing it on the application field.
        await page.keyboard.type("HTTP ZENDESK CONNECTION");
        await io.flowBuilder.clickByTextByIndex("HTTP ZENDESK CONNECTION",0);
        await io.flowBuilder.loadingTime();
        await io.flowBuilder.click(selectors.connectionsPagePO.CONNECTIONS_DROPDOWN);
        await page.keyboard.press('Delete');
        const text1 = (await io.flowBuilder.getText(selectors.connectionsPagePO.CONNECTIONS_DROPDOWN)).toString();
        await io.assert.expectToBeValue("", text1, 'Connection name is not cleared');
    });
});