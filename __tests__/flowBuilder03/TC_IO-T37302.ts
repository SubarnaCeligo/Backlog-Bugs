import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("@Author_MaheshNivruttiSutar @Zephyr-IO-T38302 @Zephyr-IO-T38883'", () => {
    test.beforeEach(async ({ io }) => {
        await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
        await io.flowBuilder.loadingTime();
    });
    test("@Epic-IO-80246 @Priority-P2 @Env-QA @Zephyr-IO-T38302'", async ({ io, page, context }) => {
        await io.flowBuilder.loadingTime();
        await io.homePage.goToMenu("Tools", "Flow builder");
        await io.flowBuilder.loadingTime();
        await io.flowBuilder.click(selectors.flowBuilderPagePO.ADD_SOURCE);
        await io.flowBuilder.loadingTime();
        await io.flowBuilder.waitForElementAttached(selectors.connectionsPagePO.APP_NAME_INPUT);
        await io.flowBuilder.fill(selectors.connectionsPagePO.APP_NAME_INPUT, 'Random');
        await io.flowBuilder.loadingTime();
        const isRecenlyUsedDisplayeds = await io.flowBuilder.isVisible('text="Recently used"');
        await io.assert.expectToBeFalse(isRecenlyUsedDisplayeds, "Recently used is displayed");
        await io.homePage.click(selectors.importPagePO.IMPORT_CLOSE_DRAWER);
        await io.homePage.loadingTime();
        await io.flowBuilder.click(selectors.flowBuilderPagePO.ADD_DESTINATION_OR_LOOKUP);
        await io.flowBuilder.loadingTime();
        await io.flowBuilder.fill(selectors.connectionsPagePO.APP_NAME_INPUT, 'Random');
        await io.flowBuilder.loadingTime();
        const isRecenlyUsedDisplayed = await io.flowBuilder.isVisible('text="Recently used"');
        await io.assert.expectToBeFalse(isRecenlyUsedDisplayed, "Recently used is displayed");
        await io.homePage.click(selectors.importPagePO.IMPORT_CLOSE_DRAWER);
        await io.flowBuilder.loadingTime();
    });
    test("@Epic-IO-35839 @Env-QA @Priority-P3 @Zephyr-IO-T38883", async ({ io, page }) => {
        await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
        await io.flowBuilder.loadingTime();
        await io.homePage.click(selectors.basePagePO.DASHBOARD);
        await io.flowBuilder.loadingTime();

        //Completed flows
        await io.homePage.click(selectors.dashboardPagePO.COMPLETED_FLOWS);
        await io.flowBuilder.click(selectors.dashboardPagePO.APP_FILTER);
        const appList = await io.connectionPage.getText(selectors.dashboardPagePO.APPLICATION_LIST);
        // Remove the first element 'All applications'
        const remainingApplications = appList.slice(1);
        // Create a sorted version of the remaining list
        const sortedList = [...remainingApplications].sort((a, b) => a.localeCompare(b));
        // Verify if the remaining list is in alphabetical order
        expect(remainingApplications).toEqual(sortedList);
    });
});