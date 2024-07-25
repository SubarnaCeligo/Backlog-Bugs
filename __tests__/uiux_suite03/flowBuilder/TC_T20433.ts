import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import T20433 from "@testData/FlowBuilder/T20433.json";
import bodyOffline from "@testData/Connections/IO_T4387_offline.json"


test.describe("@Zephyr-IO-T20433 C66282 Verify flow cancel information with flow having multiple exports and make connection offline", () => {
    let flowId;
    let actualJson;
    test.beforeEach(async ({ io, page }) => {
      await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
      await io.connections.deleteConnection(bodyOffline.name);  
      actualJson = await io.connections.createConnectionViaAPI(bodyOffline);
      await io.connectionPage.navigateTo(io.data.links.CONNECTIONS_PAGE_URL);
      await io.connectionPage.fill(selectors.connectionsPagePO.CONNECTION_PAGE_SEARCH_BAR, bodyOffline.name);
      await io.assert.expectToBeTrue(await io.homePage.isVisible(`text=${bodyOffline.name}`), "Connection is not created");
      await io.connectionPage.click(selectors.integrationPagePO.OPENACTIONSMENU);
      await io.connectionPage.clickByText("Edit connection");
      await io.connectionPage.loadingTime();
      await io.connectionPage.click(selectors.flowBuilderPagePO.CLOSE);

      await page.getByText('Offline', { exact: true }).waitFor({ state: 'visible', timeout: 60000 });
    });
    test("@Env-All @Zephyr-IO-T20433 C66282 Verify flow cancel information with flow having multiple exports and make connection offline", async ({ io, page }) => {
    
    flowId = await io.createResourceFromAPI(T20433, "FLOWS");
    await io.flowBuilder.click(selectors.flowBuilderPagePO.RUN_FLOW);
    await io.homePage.addStep("Running the flow");
    await io.flowBuilder.clickByIndex(selectors.flowBuilderPagePO.TRANSFER,0);
    await io.flowBuilder.fill(selectors.basePagePO.CONNECTION_DROPDOWN, 'Create_Connection_FTP_test_offline_case');
    await io.flowBuilder.waitForElementAttached(selectors.connectionsPagePO.CONNECTIONS_DROPDOWN_LIST);
    await io.exportsPage.waitForElementAttached(selectors.connectionsPagePO.CONNECTIONDROP0);
    await io.exportsPage.click(selectors.connectionsPagePO.CONNECTIONDROP0);
    await io.flowBuilder.click(selectors.basePagePO.SAVE_AND_CLOSE);
    await io.homePage.click(selectors.flowBuilderPagePO.REPLACE);
    await io.flowBuilder.loadingTime();
    await page.locator(selectors.basePagePO.TOOLTIP).first().click();
    const text = (await io.flowBuilder.getText(
        selectors.myAccountPagePO.DATARETENTIONTOOLTIP
      )) as string;
  
      await io.assert.expectToContainValue(
        `Canceled by system`,
        text,
        "error"
      );
    });

});