import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import TC from "@testData/FlowBuilder/TC_C34398.json";


test.describe("TC_C34398", () => {
  let flows, integration1Id, flowId1, flowId2;
  const integration1Data = {
    qa__api_tdata: [
      {
        createIntegrations: {
          name: "TC_C34398",
        },
      },
    ],
  };

  test.beforeEach(async ({ io }) => {
    test.step("Beginning of Test Suite", async () => { });
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.loadingTime();
  });
  test("@Env-All @Zephyr-IO-T3069 | To verify /tiles and /tiles/_integrationId route is not considering disabled flows to return numFlows and LastErrorAt values", async ({ io, page }) => {
    const integration1Name = integration1Data.qa__api_tdata[0].createIntegrations.name;
    integration1Id = await io.api.createIntegrationThruAPI(integration1Data);
    test.step("Created Integrations :" + integration1Name, async () => { });

    TC.qa__api_tdata[0].createFlow["_integrationId"] = integration1Id;
    TC.qa__api_tdata[1].createFlow["_integrationId"] = integration1Id;
    flows = await io.api.createImpOrExpAndFlowsThruAPI(TC, true);

    flowId1 = await io.api.getFlowId(TC.flowname1);
    flowId2 = await io.api.getFlowId(TC.flowname2);
    await io.homePage.loadingTime();
    await io.api.runBatchFlowViaAPI(
      TC.flowname1,
      flowId1,
    );
    await io.homePage.loadingTime();
    await io.api.runBatchFlowViaAPI(
      TC.flowname2,
      flowId2,
    );

    await io.ilm.navigateToIntegrationById(integration1Id);
    await io.homePage.clickByText('TC_C34398_FLOW_1');
    await io.homePage.loadingTime();
    const lastRun = page.getByText('Last run');
    await lastRun.waitFor({ state: 'visible', timeout: 360000 });
    await io.homePage.loadingTime();
    const err1 =  await page.locator(selectors.flowBuilderPagePO.ACCOUNT_DASHBOARD_OPEN_ERRORS).textContent();
    expect(err1).toContain('1 error');

    await io.ilm.navigateToIntegrationById(integration1Id);
    await io.homePage.clickByText('TC_C34398_FLOW_2');
    await io.homePage.loadingTime();
    const lastRun2 = page.getByText('Last run');
    await lastRun2.waitFor({ state: 'visible', timeout: 360000 });
    await io.homePage.loadingTime();
   const err2 =  await page.locator(selectors.flowBuilderPagePO.ACCOUNT_DASHBOARD_OPEN_ERRORS).textContent();
   expect(err2).toContain('1 error');

    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.loadingTime();
    await io.flowBuilder.fill(selectors.integrationPagePO.HOME_SEARCH, '34398');
    await io.homePage.loadingTime();
    expect(await page.getByText('2 errors').isVisible()).toBeTruthy();
    await io.flowBuilder.clickByText('TC_C34398');
    await io.homePage.loadingTime();
    await io.homePage.click(
      selectors.basePagePO.OFF_ON
    );
    await io.homePage.click(
      selectors.flowBuilderPagePO.FLOW_DISABLE
    );
    await io.homePage.loadingTime();
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.loadingTime();
    await io.flowBuilder.fill(selectors.integrationPagePO.HOME_SEARCH, '34398');
    await io.homePage.loadingTime();
    expect(await page.getByText('1 error').isVisible()).toBeTruthy();
    await io.api.deleteFlowsWithId([
      flowId1, flowId2
    ]);
    await io.homePage.loadingTime();

    test.step("Deleting integrations", async () => { });
    await io.api.deleteIntegration(integration1Id);
  });
});
