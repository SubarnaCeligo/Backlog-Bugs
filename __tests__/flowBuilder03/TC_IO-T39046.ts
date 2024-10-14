import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import * as TC from "@testData/Connections/C120189.json";

test.describe(`@Author_MaheshNivruttiSutar Verify Newly created Connection showing in Recently Used Application Drawer without Refresh page`, () => {
    test.afterEach(async ({ io }) => {
        await io.connections.deleteConnection("3PL CONNECTION DON't USE");
        await io.myAccountPage.navigateTo(io.data.links.CONNECTIONS_PAGE_URL);
        await io.flowBuilder.loadingTime();
    });
    test(`@Bug-IO-98359 @Priority-P2 @Env-QA @Zephyr-IO-T39046`, async ({ io, page }) => {
        await io.connectionPage.navigateTo(io.data.links.CONNECTIONS_PAGE_URL);
        await io.flowBuilder.loadingTime();
        await io.connectionPage.click(selectors.connectionsPagePO.CREATE_CONNECTION);
        await io.flowBuilder.loadingTime();
        await io.connectionPage.click(selectors.connectionsPagePO.THREEPL_CONNECTION);
        await io.flowBuilder.loadingTime();
        await io.flowBuilder.doubleClick(selectors.basePagePO.NAME);
        await io.flowBuilder.fill(selectors.basePagePO.NAME, "3PL CONNECTION DON't USE");
        //Create iClient
        await io.connectionPage.clickButtonByIndex(selectors.basePagePO.ADD_NEW_RESOURCE, 1);
        await io.connectionPage.clickButtonByIndex(selectors.basePagePO.ADD_NAME, 1);
        await io.connectionPage.keyboard('3');
        await io.connectionPage.keyboard('P');
        await io.connectionPage.keyboard('L');
        await io.flowBuilder.enterHugeData(selectors.connectionsPagePO.OAUTH2_CLIENT_ID, TC.ClientId);
        await io.flowBuilder.enterHugeData(selectors.connectionsPagePO.OAUTH2_CLIENT_SECRET, TC.ClientSecret);
        await io.connectionPage.click(selectors.basePagePO.SAVE_AND_CLOSE);
        await io.flowBuilder.loadingTime();
        await io.flowBuilder.enterHugeData(selectors.connectionsPagePO.USER_LOGIN_ID, TC.GUID);
        await io.flowBuilder.clickByText("Please select");
        await io.connectionPage.clickButtonByIndex(selectors.basePagePO.MENU_ITEM, 1);
        await io.connectionPage.click(selectors.basePagePO.SAVE);
        await io.flowBuilder.loadingTime();
        await io.flowBuilder.loadingTime();
        await io.homePage.goToMenu("Tools", "Flow builder");
        await io.flowBuilder.loadingTime();
        await io.flowBuilder.click(selectors.flowBuilderPagePO.ADD_SOURCE);
        await io.flowBuilder.loadingTime();
        let rows = await page.$$(selectors.dashboardPagePO.RECENTLY_USED);
        let ele = await rows[0].textContent();
        expect(ele).toBe("3PL Central");
        await io.flowBuilder.loadingTime();
        await io.homePage.click(selectors.importPagePO.IMPORT_CLOSE_DRAWER);
        await io.homePage.loadingTime();
        await io.connectionPage.navigateTo(io.data.links.CONNECTIONS_PAGE_URL);
        await io.flowBuilder.loadingTime();
        await io.flowBuilder.fill(selectors.integrationPagePO.HOME_SEARCH, "3PL CONNECTION DON't USE");
        await io.flowBuilder.loadingTime();

        await io.flowBuilder.click(selectors.integrationPagePO.OPENACTIONSMENU);
        await io.flowBuilder.click(selectors.integrationPagePO.DELETE_FLOW);
        await io.flowBuilder.click(selectors.basePagePO.DELETE_BUTTON);
        await io.flowBuilder.loadingTime();

        await io.flowBuilder.loadingTime();
        await io.homePage.goToMenu("Tools", "Flow builder");
        await io.flowBuilder.loadingTime();
        await io.flowBuilder.click(selectors.flowBuilderPagePO.ADD_SOURCE);
        await io.flowBuilder.loadingTime();
        let rows1 = await page.$$(selectors.dashboardPagePO.RECENTLY_USED);
        let ele1 = await rows1[0].textContent();
        expect(ele).not.toBe(ele1);

    });
});