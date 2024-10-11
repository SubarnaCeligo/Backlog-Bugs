import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("@Author_MaheshNivruttiSutar Verify in the 'Recently used application' drawer average 3/5 application are showing'", () => {
    test.beforeEach(async ({ io }) => {
        await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
        await io.flowBuilder.loadingTime();
    });
    test("@Epic-IO-80246 @Priority-P2 @Env-QA @Zephyr-IO-T38528'", async ({ io, page, context }) => {
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
            let rows = await page.$$(selectors.dashboardPagePO.RECENTLY_USED);
            let sele = await rows.length;
            expect(sele).toBeLessThanOrEqual(25);
            await io.homePage.loadingTime();
            await io.homePage.click(selectors.importPagePO.IMPORT_CLOSE_DRAWER);
            await io.homePage.loadingTime();
        }

        //Create destination/lookup in Flow Builder
        await io.flowBuilder.loadingTime();
        await io.homePage.goToMenu("Tools", "Flow builder");
        await io.flowBuilder.loadingTime();
        await page.getByText("Loading...").waitFor({ state: "hidden", timeout: 360000 });
        await io.flowBuilder.click(selectors.flowBuilderPagePO.ADD_SOURCE);
        await io.flowBuilder.loadingTime();
        let rows3 = await page.$$(selectors.dashboardPagePO.RECENTLY_USED);
        let selele = await rows3.length;
        expect(selele).toBeLessThanOrEqual(25);
        await io.flowBuilder.loadingTime();
        await io.homePage.click(selectors.importPagePO.IMPORT_CLOSE_DRAWER);
        await io.homePage.loadingTime();
        await io.flowBuilder.click(selectors.flowBuilderPagePO.ADD_DESTINATION_OR_LOOKUP);
        await io.flowBuilder.loadingTime();
        let rows4 = await page.$$(selectors.dashboardPagePO.RECENTLY_USED);
        let seleles = await rows4.length;
        expect(seleles).toBeLessThanOrEqual(25);
        await io.homePage.click(selectors.importPagePO.IMPORT_CLOSE_DRAWER);
        await io.homePage.loadingTime();

        // Create import in Data Loader
        await io.flowBuilder.loadingTime();
        await io.homePage.goToMenu("Tools", "Data loader");
        await io.homePage.loadingTime();
        await page.getByText("You can add a destination application once you complete the configuration of your data loader.").waitFor({ state: "visible" });
        await io.flowBuilder.clickButtonByIndex(selectors.basePagePO.DATA_LOADER,1);
        await io.homePage.loadingTime();
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
        let rows5 = await page.$$(selectors.dashboardPagePO.RECENTLY_USED);
        let seles = await rows5.length;
        expect(seles).toBeLessThanOrEqual(25);
    });
});