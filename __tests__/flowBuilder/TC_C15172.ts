import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import TC from "@testData/FlowBuilder/TC_C15172.json";

test.describe("@Env-All @Zephyr-IO-T2948", () => {
  let flowId;
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Navigate to Home Page ***", async ()=>{});
    await io.goToFlowsPage();
    await io.homePage.loadingTime();
  });

  test.afterEach(async ({io}) => {
    await io.api.deleteFlowsWithId([flowId]);
  });

  test("@Env-All @Zephyr-IO-T2948", async ({ io, page }) => {
    await io.connections.createConnectionViaAPI(TC);
    await io.homePage.loadingTime();
    await io.homePage.goToMenu("Tools", "Flow builder");
    await io.homePage.loadingTime();
    test.step("*** Clicking on Flow ***", async () => { });
    await io.homePage.loadingTime();
    await io.homePage.click(
      selectors.flowBuilderPagePO.ADD_DESTINATION_OR_LOOKUP
    );
    await io.flowBuilder.waitForElementAttached(selectors.connectionsPagePO.APP_NAME_INPUT);
    await io.flowBuilder.fill(selectors.connectionsPagePO.APP_NAME_INPUT, "SALESFORCE");
    await io.flowBuilder.click(selectors.flowBuilderPagePO.SF);
    await io.homePage.click(
      selectors.connectionsPagePO.IMPORT_RECORDS
    );
    await io.homePage.click(selectors.basePagePO.CREATE_FROM_SCRATCH);
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.fill(selectors.connectionsPagePO.NAME_INPUT, 'T15172 import');
    await io.flowBuilder.fill(selectors.connectionsPagePO.CONNECTIONS_DROPDOWN, 'SALESFORCE OFFLINE CONNECTION');
    await io.flowBuilder.clickByIndex(selectors.connectionsPagePO.CONNECTIONS_DROPDOWN_LIST, 0);
    await test.step(
      "***Navigated to the flow and click on Import flow***"
      , async () => { });
    await io.homePage.loadingTime();
    expect(await page.getByText("The connection associated with this resource is currently offline and configuration is limited.Fix your connectionto bring it back online.").isVisible()).toBeTruthy();
    await io.homePage.loadingTime();
    await test.step(
      "***Connection Offline Error Message Is showed***"
      , async () => { });
    await io.homePage.loadingTime();
    await io.connectionPage.click(selectors.connectionsPagePO.FIX_CONNECTION);
    await io.homePage.loadingTime();
    await page.getByText("This connection is currently offline. Re-enter your credentials to bring it back online.");
  });

});
