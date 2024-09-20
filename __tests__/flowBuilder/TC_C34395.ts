
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt} from "@celigo/aut-utilities";

test.describe("TC_C34395", () => {
  let intId, flowId, clonedFlowId;
  const integrationData = {
    qa__api_tdata: [
      {
        createIntegrations: {
          name: "C34395_integration",
        },
      },
    ],
  };


  test.afterEach(async ({io}) => {
    await io.api.deleteFlowsWithId([flowId, clonedFlowId]);
    await io.homePage.loadingTime();
    await io.api.deleteIntegration(intId);
    test.step("*** Deleted original flow, cloned flow and integration. ***", async ()=>{});
  });

  test("@Env-All @Zephyr-IO-T3068", async ({io, page}) => {

    intId = await io.api.createIntegrationThruAPI(integrationData);
    await io.integrationPage.navigateToIntegrationById(intId);
    await io.homePage.loadingTime();
    await io.homePage.clickByText('Create flow');
    await io.homePage.click(selectors.basePagePO.ADD_SOURCE_BUTTON);
    await io.homePage.fill(selectors.connectionsPagePO.APP_NAME_INPUT, 'HTTP');
    await io.homePage.click(selectors.connectionsPagePO.HTTP_CNNECTOR);
    await io.homePage.click(selectors.basePagePO.CREATE_FROM_SCRATCH);
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.fill(selectors.connectionsPagePO.NAME_INPUT, 'T34395 export');
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
    await io.flowBuilder.fill(selectors.importPagePO.NAME, 'T34395 import');
    await io.flowBuilder.click(selectors.exportsPagePO.LOOKUP.HTTP_METHOD);
    await io.flowBuilder.click(selectors.exportsPagePO.HTTP_METHOD_GET);
    await io.flowBuilder.fill(selectors.exportsPagePO.LOOKUP.HTTP_RELATIVE_URI, "/test");
    await io.flowBuilder.click(selectors.basePagePO.SAVE_AND_CLOSE);
    await io.homePage.loadingTime();
    await io.flowBuilder.click(selectors.flowBuilderPagePO.FLOW_SETTINGS);
    await io.homePage.loadingTime();
    await io.flowBuilder.fill(selectors.flowBuilderPagePO.NAME,'flow395');
    await io.flowBuilder.click(selectors.basePagePO.SAVE_AND_CLOSE);
    await io.homePage.loadingTime();
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.loadingTime();
    await io.flowBuilder.fill(selectors.integrationPagePO.HOME_SEARCH,'34395_integration');
    await io.homePage.loadingTime();
    await io.flowBuilder.clickByText('C34395_integration');
    await io.homePage.loadingTime();
    flowId = await io.api.getFlowId('flow395');
    await io.homePage.loadingTime();
    await io.homePage.clickByIndex(selectors.flowBuilderPagePO.OPEN_ACTIONS_MENU,0);
    await io.homePage.loadingTime();
    await io.flowBuilder.click(selectors.flowBuilderPagePO.OPENAI.CREATE_FLOWGROUP);
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.click(selectors.flowBuilderPagePO.OPENAI.FLOWGROUP_NAME);
    await io.flowBuilder.fill(selectors.flowBuilderPagePO.OPENAI.FLOWGROUP_NAME, 'FlowGroup');
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.clickByIndex(selectors.flowBuilderPagePO.OPENAI.FLOWGROUP_CHECKBOX,4);
    await io.flowBuilder.click(selectors.basePagePO.SAVE_AND_CLOSE);
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.loadingTime();
    await io.homePage.clickByIndex(selectors.flowBuilderPagePO.OPEN_ACTIONS_MENU,1);
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.integrationPagePO.CLONE_FLOW_INTABLE);
    await io.homePage.loadingTime();
    await io.homePage.fill(selectors.flowBuilderPagePO.NAME,'TC_C34395 CLONED FLOW');
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.homePagePO.INTEGRATION);
    await page.keyboard.type('standalone');
    await io.homePage.loadingTime();
    await io.homePage.clickByIndex(selectors.flowBuilderPagePO.MENUITEM,1);
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.flowBuilderPagePO.CLONE_FLOW_BUTTON);
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.templatePagePO.CONFIGURE);
    await io.homePage.loadingTime();
    await io.homePage.fillWebPage(selectors.connectionsPagePO.BASIC_PASSWORD, decrypt(process.env["HTTP_ZENDESK_PASSWORD"]));
    await io.flowBuilder.click(selectors.basePagePO.SAVE_AND_CLOSE);
    await io.flowBuilder.loadingTime();
    clonedFlowId = await io.api.getFlowId('TC_C34395 CLONED FLOW');
    const clonedFLowDetails = await io.api.getFlowById(clonedFlowId);
    await io.homePage.loadingTime();
    await expect(clonedFLowDetails).not.toContain('flowgroupingId');
    test.step("*** Verified _flowGroupingId is not there for the cloned flow. ***", async ()=>{});
  });
});
