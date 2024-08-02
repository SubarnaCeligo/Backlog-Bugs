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
        await io.flowBuilder.fill(selectors.connectionsPagePO.NAME_INPUT, 'FTP EXPORT');
        await io.exportsPage.click(selectors.exportsPagePO.FILE_TYPE);
        await io.flowBuilder.clickByText('JSON');
        await io.flowBuilder.fill(selectors.exportsPagePO.FTP_DIRECTORY_PATH, 'test');
        const fileChooserPromise = page.waitForEvent("filechooser");
        await io.homePage.clickByText("Choose file");
        const fileChooser = await fileChooserPromise;
        await fileChooser.setFiles("testData/dataloader/C113465.json");
        await io.homePage.addStep("Uploaded xlsx file");
        await io.flowBuilder.loadingTime();
        await io.flowBuilder.click(selectors.connectionsPagePO.CONNECTIONS_DROPDOWN);
        await io.flowBuilder.fill(selectors.connectionsPagePO.CONNECTIONS_DROPDOWN, 'FTP CONNECTION');
        await io.flowBuilder.clickByText('FTP CONNECTION');
        await io.flowBuilder.loadingTime();
        await io.flowBuilder.click(selectors.basePagePO.SAVE_AND_CLOSE);
        await io.flowBuilder.loadingTime();
        await io.assert.verifyElementDisplayedByText("DESTINATIONS & LOOKUPS", "Page not re-directing properly")
    });
});