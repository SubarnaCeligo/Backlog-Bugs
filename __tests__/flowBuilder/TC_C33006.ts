import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("TC_C33006 | TC_C33007", () => {

  let intId;
  const integrationData1 = {
    qa__api_tdata: [
      {
        createIntegrations: {
          name: "C33006_integration",
        },
      },
    ],
  };

  test("@Env-All @Zephyr-IO-T3037| To verify sort order hierarchy for errors column", async ({ io, page }) => {
    intId = await io.api.createIntegrationThruAPI(integrationData1);
    await io.integrationPage.navigateToIntegrationById(intId);
    await io.homePage.loadingTime();
    await io.homePage.clickByText('Create flow');
    await io.homePage.click(selectors.basePagePO.ADD_SOURCE_BUTTON);
    await io.homePage.fill(selectors.connectionsPagePO.APP_NAME_INPUT, 'HTTP');
    await io.homePage.click(selectors.connectionsPagePO.HTTP_CNNECTOR);
    await io.homePage.click(selectors.basePagePO.CREATE_FROM_SCRATCH);
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.fill(selectors.connectionsPagePO.NAME_INPUT, 'export');
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
    await io.flowBuilder.fill(selectors.importPagePO.NAME, 'import');
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
    await io.flowBuilder.loadingTime();
    await lastRun.waitFor({state: 'visible', timeout: 180000});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.loadingTime();
    await io.flowBuilder.fill(selectors.integrationPagePO.HOME_SEARCH,'33006_integration');
    await io.homePage.loadingTime();
    await io.flowBuilder.clickByText('C33006_integration');
    await io.homePage.loadingTime();
    await io.homePage.clickByText('Create flow');
    await io.homePage.click(selectors.basePagePO.ADD_SOURCE_BUTTON);
    await io.homePage.fill(selectors.connectionsPagePO.APP_NAME_INPUT, 'HTTP');
    await io.homePage.click(selectors.connectionsPagePO.HTTP_CNNECTOR);
    await io.homePage.click(selectors.basePagePO.CREATE_FROM_SCRATCH);
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.fill(selectors.connectionsPagePO.NAME_INPUT, 'export');
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
    await io.flowBuilder.fill(selectors.importPagePO.NAME, 'import');
    await io.flowBuilder.click(selectors.exportsPagePO.LOOKUP.HTTP_METHOD);
    await io.flowBuilder.click(selectors.exportsPagePO.HTTP_METHOD_GET);
    await io.flowBuilder.fill(selectors.exportsPagePO.LOOKUP.HTTP_RELATIVE_URI, "/test");
    await io.flowBuilder.click(selectors.basePagePO.SAVE_AND_CLOSE);
    await io.homePage.loadingTime();
    await io.flowBuilder.click(selectors.flowBuilderPagePO.FLOW_ON_OFF);
    await io.homePage.loadingTime();
    await io.flowBuilder.click(selectors.flowBuilderPagePO.FLOW_ENABLE);
    await io.homePage.loadingTime();
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.loadingTime();
    await io.flowBuilder.fill(selectors.integrationPagePO.HOME_SEARCH,'33006_integration');
    await io.homePage.loadingTime();
    await io.flowBuilder.clickByText('C33006_integration');
    await io.homePage.loadingTime();
    test.step("Sorting the list by Last open error column", async () => { });
    await io.homePage.click('thead > tr > th:nth-child(3)');
    const box1 = await page.locator("table > tbody > tr:nth-child(1) > td:nth-child(3)").textContent();
    expect(box1).toContain("1 error");
    const box2 = await page.locator("table > tbody > tr:nth-child(2) > td:nth-child(3)").textContent();
    expect(box2).toContain("Success");

    await io.homePage.loadingTime();
    await io.flowBuilder.clickByIndex(selectors.basePagePO.OFF_ON,0);
    await io.flowBuilder.click(selectors.myAccountPagePO.CONFIRMDISABLE)
    await io.homePage.loadingTime();
    await io.flowBuilder.clickByIndex(selectors.integrationPagePO.OPENACTIONSMENU,1);
    await io.flowBuilder.click(selectors.integrationPagePO.DELETE_FLOW);
    await io.homePage.loadingTime();
    await io.flowBuilder.click(selectors.basePagePO.DELETE_BUTTON);
    await io.homePage.loadingTime();

    await io.flowBuilder.clickByIndex(selectors.basePagePO.OFF_ON,0);
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

  test("@Env-All @Zephyr-IO-T3038| To verify sort order hierarchy for status column", async ({io,page}) => {
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.loadingTime();
    await io.flowBuilder.fill(selectors.integrationPagePO.HOME_SEARCH,'IA_DND');
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.homePagePO.LIST_VIEW);
    await io.homePage.loadingTime();
    await io.homePage.clickByText('Type');
    await io.homePage.loadingTime();

    const box1 = await page.locator("table > tbody > tr:nth-child(1) > td:nth-child(5)").textContent();
    expect(box1).toContain("Custom 0 Flows");
    const box2 = await page.locator("table > tbody > tr:nth-child(2) > td:nth-child(5)").textContent();
    expect(box2).toContain('Integration app');


  });
});
