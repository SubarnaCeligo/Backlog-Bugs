import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("@Author_MaheshNivruttiSutar Verify for new account 'Recently used' application drawer is not showing'", () => {
    test.beforeEach(async ({ io }) => {
        await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
        await io.flowBuilder.loadingTime();
    });
    test("@Epic-IO-80246 @Priority-P2 @Env-QA @Zephyr-IO-T38531 @Zephyr-IO-T38526'", async ({ io, page, context }) => {
        await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
        await io.flowBuilder.loadingTime();
        await io.homePage.goToMenu("Tools", "Flow builder");

        //Resource drawer:
        const sections = ["Connections", "Imports", "Exports"];
        for (const section of sections) {
            await io.homePage.loadingTime();
            await io.homePage.goToMenu("Resources", section);
            await io.homePage.loadingTime();
            await io.flowBuilder.click(selectors.exportsPagePO.ADD_NEW_RESOURCE);
            await io.flowBuilder.loadingTime();
            const isRecenlyUsedDisplayed = await io.flowBuilder.isVisible('text="Recently used"');
            await io.assert.expectToBeFalse(isRecenlyUsedDisplayed, "Recently used is displayed");
            await io.homePage.loadingTime();
            await io.homePage.click(selectors.importPagePO.IMPORT_CLOSE_DRAWER);
            await io.homePage.loadingTime();
        }

        //Create destination/lookup in Flow Builder
        await io.flowBuilder.loadingTime();
        await io.homePage.goToMenu("Tools", "Flow builder");
        await io.flowBuilder.loadingTime();
        await io.flowBuilder.click(selectors.flowBuilderPagePO.ADD_SOURCE);
        await io.flowBuilder.loadingTime();
        const isRecenlyUsedDisplayeds11 = await io.flowBuilder.isVisible('text="Recently used"');
        await io.assert.expectToBeFalse(isRecenlyUsedDisplayeds11, "Recently used is displayed");
        const isRecenlyUsedDisplayeds = await io.flowBuilder.isVisible('text="Databases"');
        await io.assert.expectToBeTrue(isRecenlyUsedDisplayeds, "Recently used is displayed");
        await io.flowBuilder.loadingTime();
        await io.homePage.click(selectors.importPagePO.IMPORT_CLOSE_DRAWER);
        await io.homePage.loadingTime();
        await io.flowBuilder.click(selectors.flowBuilderPagePO.ADD_DESTINATION_OR_LOOKUP);
        await io.flowBuilder.loadingTime();
        const isRecenlyUsedDisplayeds1 = await io.flowBuilder.isVisible('text="Recently used"');
        await io.assert.expectToBeFalse(isRecenlyUsedDisplayeds1, "Recently used is displayed");
        await io.homePage.click(selectors.importPagePO.IMPORT_CLOSE_DRAWER);
        await io.flowBuilder.loadingTime();
        // Create import in Data Loader
        await io.flowBuilder.loadingTime();
        await io.homePage.goToMenu("Tools", "Data loader");
        await io.homePage.loadingTime();
        await page.getByText("You can add a destination application once you complete the configuration of your data loader.").waitFor({ state: "visible" });
        await io.flowBuilder.clickButtonByIndex(selectors.basePagePO.DATA_LOADER,1);
        await io.flowBuilder.click(selectors.exportsPagePO.FILE_TYPE);
        await io.flowBuilder.clickByText("XLSX");
        await io.flowBuilder.clickByText("File has header");
        const fileChooserPromise = page.waitForEvent("filechooser");
        await io.homePage.clickByText("Choose file");
        const fileChooser = await fileChooserPromise;
        await fileChooser.setFiles("testData/dataloader/C69768.xlsx");
        await io.homePage.addStep("Uploaded xlsx file");
        await io.flowBuilder.click(selectors.basePagePO.SAVE_AND_CLOSE);
        await io.homePage.loadingTime();
        await io.flowBuilder.loadingTime();
        //Create import
        await io.flowBuilder.click(selectors.dashboardPagePO.DATALOADER_IMPORT);
        await io.flowBuilder.loadingTime();
        const isRecenlyUsedDisplayed1 = await io.flowBuilder.isVisible('text="Recently used"');
        await io.assert.expectToBeFalse(isRecenlyUsedDisplayed1, "Recently used is displayed");
    });
});