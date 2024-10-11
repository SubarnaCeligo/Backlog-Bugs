import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("@Author_MaheshNivruttiSutar Verify vertical lines are removed from each row on application drawer also padding between icon and label is updated.'", () => {
    test.beforeEach(async ({ io }) => {
        await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
        await io.flowBuilder.loadingTime();
    });
    test("@Epic-IO-80246 @Priority-P2 @Env-QA @Zephyr-IO-T38525'", async ({ io, page, context }) => {
        await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
        await io.flowBuilder.loadingTime();
        //Resource drawer
        const sections = ["Connections", "Imports", "Exports"];
        for (const section of sections) {
            await io.homePage.loadingTime();
            await io.homePage.goToMenu("Resources", section);
            await io.homePage.loadingTime();
            await io.flowBuilder.click(selectors.exportsPagePO.ADD_NEW_RESOURCE);
            await io.flowBuilder.loadingTime();
            const element = page.locator('[id*="react-select"][id*="option-0-"] span').nth(2);
            const fontWeight = await element.evaluate(el => {
                return window.getComputedStyle(el).getPropertyValue('border-right');
            });
            await io.assert.expectToBeValue("0px solid rgb(214, 228, 237)", fontWeight, "Help button not showing in bold");
            await io.homePage.click(selectors.importPagePO.IMPORT_CLOSE_DRAWER);
            await io.homePage.loadingTime();
        }

        //Create destination/lookup in Flow Builder
        await io.flowBuilder.loadingTime();
        await io.homePage.goToMenu("Tools", "Flow builder");
        await io.flowBuilder.loadingTime();
        await io.flowBuilder.click(selectors.flowBuilderPagePO.ADD_SOURCE);
        await io.flowBuilder.loadingTime();
        const element1 = page.locator('[id*="react-select"][id*="option-0-"] span').nth(2);
        const fontWeight1 = await element1.evaluate(el => {
            return window.getComputedStyle(el).getPropertyValue('border-right');
        });
        await io.assert.expectToBeValue("0px solid rgb(214, 228, 237)", fontWeight1, "Help button not showing in bold");
        await io.homePage.loadingTime();
        await io.homePage.click(selectors.importPagePO.IMPORT_CLOSE_DRAWER);
        await io.homePage.loadingTime();
        await io.flowBuilder.click(selectors.flowBuilderPagePO.ADD_DESTINATION_OR_LOOKUP);
        await io.flowBuilder.loadingTime();
        await io.flowBuilder.loadingTime();
        const element2 = page.locator('[id*="react-select"][id*="option-0-"] span').nth(2);
        const fontWeight2 = await element2.evaluate(el => {
            return window.getComputedStyle(el).getPropertyValue('border-right');
        });
        await io.assert.expectToBeValue("0px solid rgb(214, 228, 237)", fontWeight2, "Help button not showing in bold");
        await io.homePage.loadingTime();
        await io.homePage.click(selectors.importPagePO.IMPORT_CLOSE_DRAWER);

        // Create import in Data Loader
        await io.flowBuilder.loadingTime();
        await io.homePage.goToMenu("Tools", "Data loader");
        await io.homePage.loadingTime();
        await page.getByText("You can add a destination application once you complete the configuration of your data loader.").waitFor({ state: "visible" });
        await io.flowBuilder.clickButtonByIndex(selectors.basePagePO.DATA_LOADER, 1);
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
        await io.flowBuilder.loadingTime();
        const element3 = page.locator('[id*="react-select"][id*="option-0-"] span').nth(2);
        const fontWeight3 = await element3.evaluate(el => {
            return window.getComputedStyle(el).getPropertyValue('border-right');
        });
        await io.assert.expectToBeValue("0px solid rgb(214, 228, 237)", fontWeight3, "Help button not showing in bold");
        await io.homePage.loadingTime();
    });
});