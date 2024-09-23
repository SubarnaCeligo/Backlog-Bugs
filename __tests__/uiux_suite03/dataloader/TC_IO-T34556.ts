import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("@Author_MaheshNivruttiSutar Verify For Dataloader, the handlebars are not clickable.'", () => {
    test.beforeEach(async ({ io }) => {
        await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
        await io.flowBuilder.loadingTime();
    });
    test("@Bug-IO-86965 @Priority-P2 @Env-All @Zephyr-IO-T34556 Verify For Dataloader, the handlebars are not clickable.'", async ({ io, page, context }) => {
        await io.homePage.goToMenu("Tools", "Data loader");
        await io.flowBuilder.loadingTime();
        //Add Source
        await io.flowBuilder.clickButtonByIndex(selectors.basePagePO.DATA_LOADER,1);
        await io.flowBuilder.loadingTime();
        await io.flowBuilder.click(selectors.exportsPagePO.FILE_TYPE);
        await io.flowBuilder.clickByText("XLSX");
        await io.flowBuilder.clickByText("File has header");
        const fileChooserPromise = page.waitForEvent("filechooser");
        await io.homePage.clickByText("Choose file");
        const fileChooser = await fileChooserPromise;
        await fileChooser.setFiles("testData/dataloader/C69768.xlsx");
        await io.homePage.addStep("Uploaded xlsx file");
        await io.flowBuilder.click(selectors.mappings.MAPPER2DOT0PO.ADVANCED);
        await io.flowBuilder.loadingTime();
        //Data URI template handlebar
        await io.assert.checkElementState(selectors.importPagePO.DATAURIHANDLEBAR, "isEditable");
        //Override trace key template handlebar
        await io.assert.checkElementState(selectors.flowBuilderPagePO.TRACEKAY_HANDLEBAR, "isEditable");
        await io.assert.verifyElementToBeClickable(selectors.importPagePO.DATAURIHANDLEBAR);
        await io.assert.verifyElementToBeClickable(selectors.flowBuilderPagePO.TRACEKAY_HANDLEBAR);

    });
});