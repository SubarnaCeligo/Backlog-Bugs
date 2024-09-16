import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import * as data from "../../testData/inputData/FlowBuilder/TC_C32986_offline_con.json";
  

test.describe("@Env-All @Zephyr-IO-T3018 |@Env-All @Zephyr-IO-T3019", () => {
  let intId,intId2;
  const integrationData = {
    qa__api_tdata: [
      {
        createIntegrations: {
          name: "C32986_integration",
        },
      },
    ],
  };
  const integrationData2 = {
    qa__api_tdata: [
      {
        createIntegrations: {
          name: "C32987_integration",
        },
      },
    ],
  };

  test("@Env-All @Zephyr-IO-T3018  To verify connection down count along with connection down label is displayed under status column", async ({io,page}, testInfo) => {
    intId = await io.api.createIntegrationThruAPI(integrationData);
    await io.connections.createConnectionViaAPI(data);
    await io.integrationPage.navigateToIntegrationById(intId);
    await io.homePage.loadingTime();
    await io.homePage.clickByText('Create flow');
    await io.homePage.click(selectors.basePagePO.ADD_SOURCE_BUTTON);
    await io.homePage.fill(selectors.connectionsPagePO.APP_NAME_INPUT, 'HTTP');
    await io.homePage.click(selectors.connectionsPagePO.HTTP_CNNECTOR);
    await io.homePage.click(selectors.basePagePO.CREATE_FROM_SCRATCH);
    await io.flowBuilder.fill(selectors.connectionsPagePO.NAME_INPUT, 'T32986 export');
    await io.flowBuilder.fill(selectors.connectionsPagePO.CONNECTIONS_DROPDOWN, '32896_Offline_connection');
    await io.flowBuilder.clickByIndex(selectors.connectionsPagePO.CONNECTIONS_DROPDOWN_LIST, 0);
    await io.connectionPage.click(selectors.exportsPagePO.HTTP_METHOD);
    await io.connectionPage.clickByText("GET");
    await io.flowBuilder.fill(selectors.exportsPagePO.HTTP_RELATIVE_URI, '/users');
    await io.exportsPage.click(selectors.exportsPagePO.EXPORT_TYPE_DROPDOWN);
    await io.homePage.addStep("*** Clicked on Export Type Dropdown ***");
    await io.exportsPage.clickByText('All - always export all data');
    await io.homePage.addStep("*** Select the All - always export all data ***");
    await io.flowBuilder.click(selectors.basePagePO.SAVE_AND_CLOSE);
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.click(selectors.mappings.ADD_IMPORT);
    await io.flowBuilder.fill(selectors.settingsPagePO.APP_NAME_INPUT, 'HTTP');
    await io.flowBuilder.click(selectors.connectionsPagePO.HTTP_CNNECTOR);
    await io.flowBuilder.click(selectors.flowBuilderPagePO.SELECT_LOOKUP);
    await io.flowBuilder.click(selectors.basePagePO.CREATE_FROM_SCRATCH);;
    await io.flowBuilder.click(selectors.connectionsPagePO.CONNECTIONS_DROPDOWN);
    await io.flowBuilder.fill(selectors.connectionsPagePO.CONNECTIONS_DROPDOWN, 'HTTP ZENDESK CONNECTION');
    await io.flowBuilder.clickByIndex(selectors.connectionsPagePO.CONNECTIONS_DROPDOWN_LIST, 0);
    await io.flowBuilder.fill(selectors.importPagePO.NAME, 'T32986 import');
    await io.flowBuilder.click(selectors.exportsPagePO.LOOKUP.HTTP_METHOD);
    await io.flowBuilder.click(selectors.exportsPagePO.HTTP_METHOD_GET);
    await io.flowBuilder.fill(selectors.exportsPagePO.LOOKUP.HTTP_RELATIVE_URI, "/test");
    await io.flowBuilder.click(selectors.basePagePO.SAVE_AND_CLOSE);
    await io.homePage.loadingTime();
    await io.flowBuilder.click(selectors.flowBuilderPagePO.FLOW_ON_OFF);
    await io.homePage.loadingTime();
    await io.flowBuilder.click(selectors.flowBuilderPagePO.FLOW_ENABLE);
    await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.RUN_FLOW);
    await io.homePage.loadingTime();
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.loadingTime();
    await io.flowBuilder.fill(selectors.integrationPagePO.HOME_SEARCH,'32986_integration');
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.homePagePO.LIST_VIEW);
    await io.homePage.loadingTime();
    const label = await page.$$("tr:nth-child(1) > td:nth-child(3) > div> button");
    const succ = await label[1].textContent();
    console.log(succ);
    expect(succ).toBe('1 connection down');
    await io.flowBuilder.clickByText('C32986_integration');
    await io.homePage.loadingTime();
    await io.flowBuilder.click(selectors.basePagePO.OFF_ON);
    await io.flowBuilder.click(selectors.myAccountPagePO.CONFIRMDISABLE)
    await io.homePage.loadingTime();
    await io.flowBuilder.clickByIndex(selectors.integrationPagePO.OPENACTIONSMENU,1);
    await io.flowBuilder.click(selectors.integrationPagePO.DELETE_FLOW);
    await io.homePage.loadingTime();
    await io.flowBuilder.click(selectors.basePagePO.DELETE_BUTTON);
    await io.homePage.loadingTime();
    await io.flowBuilder.click(selectors.integrationPagePO.DELETE_INTEGRATION);
    await io.homePage.loadingTime();
    await io.flowBuilder.click(selectors.basePagePO.DELETE_BUTTON);
    await io.homePage.loadingTime();
    await page.getByText('My integrations');
  });

  test("@Env-All @Zephyr-IO-T3019 To verify Error timestamp is displayed under Last open error column", async ({io,page}) => {
    intId2 = await io.api.createIntegrationThruAPI(integrationData2);
    await io.integrationPage.navigateToIntegrationById(intId2);
    await io.homePage.loadingTime();
    await io.homePage.clickByText('Create flow');
    await io.homePage.click(selectors.basePagePO.ADD_SOURCE_BUTTON);
    await io.homePage.fill(selectors.connectionsPagePO.APP_NAME_INPUT, 'HTTP');
    await io.homePage.click(selectors.connectionsPagePO.HTTP_CNNECTOR);
    await io.homePage.click(selectors.basePagePO.CREATE_FROM_SCRATCH);
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.fill(selectors.connectionsPagePO.NAME_INPUT, 'T32987 export');
    await io.flowBuilder.fill(selectors.connectionsPagePO.CONNECTIONS_DROPDOWN, 'HTTP ZENDESK CONNECTION');
    await io.flowBuilder.clickByIndex(selectors.connectionsPagePO.CONNECTIONS_DROPDOWN_LIST, 0);
    await io.connectionPage.click(selectors.exportsPagePO.HTTP_METHOD);
    await io.connectionPage.clickByText("GET");
    await io.flowBuilder.fill(selectors.exportsPagePO.HTTP_RELATIVE_URI, '/123');
    await io.exportsPage.click(selectors.exportsPagePO.EXPORT_TYPE_DROPDOWN);
    await io.homePage.addStep("*** Clicked on Export Type Dropdown ***");
    await io.exportsPage.clickByText('All - always export all data');
    await io.homePage.addStep("*** Select the All - always export all data ***");
    await io.flowBuilder.click(selectors.basePagePO.SAVE_AND_CLOSE);
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.click(selectors.mappings.ADD_IMPORT);
    await io.flowBuilder.fill(selectors.settingsPagePO.APP_NAME_INPUT, 'HTTP');
    await io.flowBuilder.click(selectors.connectionsPagePO.HTTP_CNNECTOR);
    await io.flowBuilder.click(selectors.flowBuilderPagePO.SELECT_LOOKUP);
    await io.flowBuilder.click(selectors.basePagePO.CREATE_FROM_SCRATCH);
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.click(selectors.connectionsPagePO.CONNECTIONS_DROPDOWN);
    await io.flowBuilder.fill(selectors.connectionsPagePO.CONNECTIONS_DROPDOWN, 'HTTP ZENDESK CONNECTION');
    await io.flowBuilder.clickByIndex(selectors.connectionsPagePO.CONNECTIONS_DROPDOWN_LIST, 0);
    await io.flowBuilder.fill(selectors.importPagePO.NAME, 'T32987 import');
    await io.flowBuilder.click(selectors.exportsPagePO.LOOKUP.HTTP_METHOD);
    await io.flowBuilder.click(selectors.exportsPagePO.HTTP_METHOD_GET);
    await io.flowBuilder.fill(selectors.exportsPagePO.LOOKUP.HTTP_RELATIVE_URI, "/test");
    await io.flowBuilder.click(selectors.basePagePO.SAVE_AND_CLOSE);
    await io.homePage.loadingTime();
    await io.flowBuilder.click(selectors.flowBuilderPagePO.FLOW_ON_OFF);
    await io.homePage.loadingTime();
    await io.flowBuilder.click(selectors.flowBuilderPagePO.FLOW_ENABLE);
    await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.RUN_FLOW);
    await io.homePage.loadingTime();
    await io.flowBuilder.click(selectors.flowBuilderPagePO.RUN_FLOW);
    const lastRun = await page.getByText('Last run');
    await lastRun.waitFor({state: 'visible', timeout: 180000});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.loadingTime();
    await io.flowBuilder.fill(selectors.integrationPagePO.HOME_SEARCH,'32987_integration');
    await io.homePage.loadingTime();
    await io.flowBuilder.clickByText('C32987_integration');
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.homePagePO.LIST_VIEW);
    await io.homePage.loadingTime();
    const errorElement = await page.getByText('Last open error');
    await errorElement.click();
    const homeTime = await page.locator("tr:nth-child(1) > td:nth-child(4)");
    const timestamp = await homeTime.textContent();

    await expect(timestamp).not.toBe("");
    await io.flowBuilder.clickByText('C32987_integration');
    await io.homePage.loadingTime();
    await io.flowBuilder.click(selectors.basePagePO.OFF_ON);
    await io.flowBuilder.click(selectors.myAccountPagePO.CONFIRMDISABLE)
    await io.homePage.loadingTime();
    await io.flowBuilder.clickByIndex(selectors.integrationPagePO.OPENACTIONSMENU,1);
    await io.flowBuilder.click(selectors.integrationPagePO.DELETE_FLOW);
    await io.homePage.loadingTime();
    await io.flowBuilder.click(selectors.basePagePO.DELETE_BUTTON);
    await io.homePage.loadingTime();
    await io.flowBuilder.click(selectors.integrationPagePO.DELETE_INTEGRATION);
    await io.homePage.loadingTime();
    await io.flowBuilder.click(selectors.basePagePO.DELETE_BUTTON);
    await io.homePage.loadingTime();
    await page.getByText('My integrations');
  });
});