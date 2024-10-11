import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("@Author_MaheshNivruttiSutar @Zephyr-IO-T38529'", () => {
    test.beforeEach(async ({ io }) => {
        await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
        await io.flowBuilder.loadingTime();
    });
    test("@Epic-IO-80246 @Priority-P2 @Env-QA @Zephyr-IO-T38529'", async ({ io, page, context }) => {
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
            let ele = await rows[0].textContent();
            await io.flowBuilder.fill(selectors.settingsPagePO.APP_NAME_INPUT, ele);
            await io.flowBuilder.loadingTime();
            const element = page.getByText(ele).nth(0);
            await expect(element).toBeVisible();
            const element1 = page.getByText(ele).nth(1);
            await expect(element1).toBeVisible();
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
        let rows = await page.$$(selectors.dashboardPagePO.RECENTLY_USED);
        let ele = await rows[0].textContent();
        await io.flowBuilder.fill(selectors.settingsPagePO.APP_NAME_INPUT, ele);
        await io.flowBuilder.loadingTime();
        const element = page.getByText(ele).nth(0);
        await expect(element).toBeVisible();
        const element1 = page.getByText(ele).nth(1);
        await expect(element1).toBeVisible();
        await io.homePage.loadingTime();
        await io.flowBuilder.loadingTime();
        await io.homePage.click(selectors.importPagePO.IMPORT_CLOSE_DRAWER);
        await io.homePage.loadingTime();
        await io.flowBuilder.click(selectors.flowBuilderPagePO.ADD_DESTINATION_OR_LOOKUP);
        await io.flowBuilder.loadingTime();
        let rows1 = await page.$$(selectors.dashboardPagePO.RECENTLY_USED);
        let ele1 = await rows1[0].textContent();
        await io.flowBuilder.fill(selectors.settingsPagePO.APP_NAME_INPUT, ele1);
        await io.flowBuilder.loadingTime();
        const element2 = page.getByText(ele1).nth(0);
        await expect(element2).toBeVisible();
        const element3 = page.getByText(ele1).nth(1);
        await expect(element3).toBeVisible();
        await io.homePage.loadingTime();
        await io.homePage.click(selectors.importPagePO.IMPORT_CLOSE_DRAWER);
        await io.flowBuilder.loadingTime();
    });
});