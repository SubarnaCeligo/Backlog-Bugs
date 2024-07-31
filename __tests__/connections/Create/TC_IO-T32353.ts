import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("@Author_MaheshNivruttiSutar Verify all connections are displayed when user creates a new connection after selecting connection for HTTP connectors while creating new flow step'", () => {
    test.beforeEach(async ({ io }) => {
        await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
        await io.flowBuilder.loadingTime();
        await io.homePage.click(selectors.homePagePO.PRODUCTION_BUTTON);
    });
    test.afterEach(async ({ io }) => {
        await io.connections.deleteConnection('META INSTAGRAM ADS CONNECTION PLEASE DELETE');
      });
    test("@Epic-IO-76152 @Priority-P2 @Env-All @Zephyr-IO-T32353 Verify all connections are displayed when user creates a new connection after selecting connection for HTTP connectors while creating new flow step'", async ({ io, page, context }) => {
        await io.homePage.goToMenu("Tools", "Flow builder");
        await io.flowBuilder.loadingTime();
        //Add Source
        await io.flowBuilder.click(selectors.basePagePO.ADD_SOURCE_BUTTON);
        await io.flowBuilder.fill(selectors.flowBuilderPagePO.APP_NAME_INPUT, "META");
        await io.flowBuilder.click(selectors.connectionsPagePO.META);
         await io.flowBuilder.click(selectors.basePagePO.CREATE_FROM_SCRATCH);
        await io.flowBuilder.loadingTime();
        await io.flowBuilder.click(selectors.exportsPagePO.CONNECTIONS_DROPDOWN);
        await io.flowBuilder.clickByText("Facebook Ads");
        await io.flowBuilder.loadingTime();
        await io.flowBuilder.click(selectors.basePagePO.ADD_NEW_RESOURCE);
        await io.homePage.fillByIndex(selectors.basePagePO.NAME, 'META INSTAGRAM ADS CONNECTION PLEASE DELETE', 1);
        await io.connectionPage.click(selectors.connectionsPagePO.INSTAGRAM_ADS);
        await io.flowBuilder.click(selectors.connectionsPagePO.ICLIENT_ID);
        await io.flowBuilder.clickByText("INSTAGRAM ADS ICLIENT");
        await io.flowBuilder.click(selectors.connectionsPagePO.CONFISCOPE);
        await io.flowBuilder.click(selectors.connectionsPagePO.MOVE_ALL_RIGHT);
        await io.flowBuilder.clickButtonByIndex(selectors.connectionsPagePO.SAVE_SCOPE,0);
        await io.flowBuilder.clickButtonByIndex(selectors.basePagePO.SAVE,1);
        await io.flowBuilder.loadingTime();
        await io.flowBuilder.click(selectors.exportsPagePO.CONNECTIONS_DROPDOWN);
        await io.flowBuilder.loadingTime();
        expect((await page.$$(selectors.connectionsPagePO.CONNECTION_DROPDOWN)).length).toBeGreaterThanOrEqual(2);

    });
});