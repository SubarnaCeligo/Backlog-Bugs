import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import * as TC from "@testData/Connections/C120189.json";

test.describe(`@Author_MaheshNivruttiSutar Verify newly created Connectors appearing in Recently used Application list`, () => {
    test.afterEach(async ({ io }) => {
        await io.connections.deleteConnection("BENCHING CONNECTION DON'T USE");
        await io.myAccountPage.navigateTo(io.data.links.CONNECTIONS_PAGE_URL);
        await io.flowBuilder.loadingTime();
    });
    test(`@Bug-IO-98820 @Priority-P2 @Env-QA @Zephyr-IO-T39268`, async ({ io, page }) => {
        await io.connectionPage.navigateTo(io.data.links.CONNECTIONS_PAGE_URL);
        await io.flowBuilder.loadingTime();
        await io.connectionPage.click(selectors.connectionsPagePO.CREATE_CONNECTION);
        await io.flowBuilder.loadingTime();
        await io.connectionPage.clickButtonByIndex(selectors.flowBuilderPagePO.BENCHING, 0);
        await io.flowBuilder.loadingTime();
        await io.flowBuilder.doubleClick(selectors.basePagePO.NAME);
        await io.flowBuilder.fill(selectors.basePagePO.NAME, "BENCHING CONNECTION DON'T USE");
        await io.flowBuilder.isPageLoaded();
        //Tenant name
        await io.flowBuilder.enterHugeData(selectors.flowBuilderPagePO.TENANT_NAME, "Celigo");
        //Client ID
        await io.flowBuilder.enterHugeData(selectors.connectionsPagePO.CLIENTID, TC.ClientId);
        //Client secret
        await io.flowBuilder.enterHugeData(selectors.connectionsPagePO.CLIENTSECRET, TC.ClientSecret);
        await io.connectionPage.click(selectors.basePagePO.SAVE_AND_CLOSE);
        await io.connectionPage.click(selectors.connectionsPagePO.CANCEL_TEST_CALL);
        await io.connectionPage.click(selectors.basePagePO.MFA_SAVE);
        await page.getByText("Actions").nth(0).waitFor({ state: "visible", timeout: 360000 });
        await io.homePage.goToMenu("Tools", "Flow builder");
        await io.flowBuilder.loadingTime();
        await io.flowBuilder.click(selectors.flowBuilderPagePO.ADD_SOURCE);
        await io.flowBuilder.loadingTime();
        let rows = await page.$$(selectors.dashboardPagePO.RECENTLY_USED);
        let ele = await rows[0].textContent();
        expect(ele).toBe("Benchling");
        await io.homePage.click(selectors.importPagePO.IMPORT_CLOSE_DRAWER);
        await io.homePage.loadingTime();

        //Home page: Dashboard
        await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
        await io.homePage.addStep("*** Navigated to home page ***");
        await io.homePage.click(selectors.basePagePO.DASHBOARD);
        await io.flowBuilder.loadingTime();

        //Running flows
        await io.flowBuilder.click(selectors.dashboardPagePO.APP_FILTER);
        await io.flowBuilder.isPageReady();
        await io.homePage.clickByText("Benchling");
        await io.homePage.clickByText("Apply");
        await io.assert.verifyElementText(selectors.dashboardPagePO.APP_FILTER, 'Benchling');
        await io.connectionPage.navigateTo(io.data.links.CONNECTIONS_PAGE_URL);
        await io.flowBuilder.isPageReady();
        await io.flowBuilder.fill(selectors.integrationPagePO.HOME_SEARCH, "BENCHING CONNECTION DON'T USE");
        await io.flowBuilder.loadingTime();
        await io.flowBuilder.click(selectors.integrationPagePO.OPENACTIONSMENU);
        await io.flowBuilder.click(selectors.integrationPagePO.DELETE_FLOW);
        await io.flowBuilder.click(selectors.basePagePO.DELETE_BUTTON);
    });
});