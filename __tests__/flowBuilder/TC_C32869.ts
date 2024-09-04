import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("@Env-All @Zephyr-IO-T2994 To verify Tooltip is shown for 'Delete Flow Group' button while hovering on it", () => {
  let  intId;
  const integrationData = {
    qa__api_tdata: [
      {
        createIntegrations: {
          name: "Integration TC_C32869",
        },
      },
    ],
  };

  test("@Env-All @Zephyr-IO-T2994 To verify Tooltip is shown for 'Delete Flow Group' button while hovering on it", async ({io,page}) => {
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.loadingTime();
    intId = await io.api.createIntegrationThruAPI(integrationData);
    await io.integrationPage.navigateToIntegrationById(intId);
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
    await io.exportsPage.clickByText(' Integration TC_C32869');
    await io.flowBuilder.loadingTime();
    await io.exportsPage.clickByText('More');
    await io.flowBuilder.click(selectors.flowBuilderPagePO.OPENAI.CREATE_FLOWGROUP);
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.click(selectors.flowBuilderPagePO.OPENAI.FLOWGROUP_NAME);
    await io.flowBuilder.fill(selectors.flowBuilderPagePO.OPENAI.FLOWGROUP_NAME, 'FlowGroup');
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.clickByIndex(selectors.flowBuilderPagePO.OPENAI.FLOWGROUP_CHECKBOX, 1);
    await io.flowBuilder.click(selectors.basePagePO.SAVE_AND_CLOSE);
    await io.flowBuilder.loadingTime();
    await io.exportsPage.clickByText('More');
    await io.flowBuilder.click(selectors.flowGroupingPagePO.EDIT_FG);
    await io.flowBuilder.loadingTime();
    await io.homePage.hover(selectors.flowBuilderPagePO.DELETE_FG_TOOLTIP);
    await expect(page.getByText("Only the flow group will be deleted. Its flows will be moved into “Unassigned”.")).toBeVisible();
  });
});
