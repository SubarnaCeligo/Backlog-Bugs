import {expect, test} from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("C53288 Verify 'Limit - export a set number of records' for all the adaptors", () => {
  // test.beforeEach(async ({ io }) => {
  //   await io.myAccountPage.navigateTo(io.data.links.MY_ACCOUNT_PAGE_URL);
  //   await io.homePage.loadingTime();
  // });

  test("@Env-All @Zephyr-IO-T14432  C53288 Verify 'Limit - export a set number of records' for all the adaptors", async ({io, page}) => {
    await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.goToMenu("Tools", "Flow builder");
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.click(selectors.flowBuilderPagePO.ADD_SOURCE);
    await io.flowBuilder.fill(selectors.settingsPagePO.APP_NAME_INPUT, 'http');
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.click(selectors.flowBuilderPagePO.HTTP_FORM_SWITCH);
    await io.homePage.click(selectors.basePagePO.CREATE_FROM_SCRATCH);
    await io.exportsPage.fill(selectors.exportsPagePO.NAME, "HTTP_EXPORT_NEW");
    await io.flowBuilder.click(selectors.connectionsPagePO.CONNECTIONS_DROPDOWN);
    await io.flowBuilder.fill(selectors.connectionsPagePO.CONNECTIONS_DROPDOWN,'HTTP ZENDESK CONNECTION');
    await io.flowBuilder.click(selectors.connectionsPagePO.CONNECTION_OPTION_TEXT);
    await io.connectionPage.click(selectors.exportsPagePO.HTTP_METHOD);
    await io.connectionPage.clickByText("GET");
    await io.flowBuilder.fill(selectors.exportsPagePO.LOOKUP.HTTP_RELATIVE_URI, "/users");
    await io.exportsPage.click(selectors.exportsPagePO.EXPORT_TYPE_DROPDOWN);
    await io.homePage.addStep("*** Clicked on Export Type Dropdown ***");
    await io.exportsPage.clickByText('Limit - export a set number of records');
    await io.flowBuilder.click(selectors.basePagePO.SAVE_AND_CLOSE);

    await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.goToMenu("Tools", "Flow builder");
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.click(selectors.flowBuilderPagePO.ADD_SOURCE);
    await io.homePage.addStep("*** Clicked on add export ***");
    await io.flowBuilder.fill(selectors.flowBuilderPagePO.APP_NAME_INPUT, "SALESFORCE");
    await io.homePage.addStep("*** Searched for salesforce application ***");
    await io.flowBuilder.click(selectors.flowBuilderPagePO.SF);
    await io.homePage.addStep("*** Clicked on salesforce application ***");
    await io.flowBuilder.click(selectors.flowBuilderPagePO.SELECTED_EXPORT_RECORDS);
    await io.flowBuilder.click(selectors.basePagePO.CREATE_FROM_SCRATCH);
    await io.flowBuilder.fill(selectors.importPagePO.NAME, 'SFEXP');
    await io.homePage.click(selectors.connectionsPagePO.CONNECTIONS_DROPDOWN);
    await io.flowBuilder.clickByText("SALESFORCE CONNECTION");
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.click(selectors.exportsPagePO.SALESFORCE_API_TYPE_REST_RADIO);
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.fill(selectors.exportsPagePO.SALESFORCE_SOQL_QUERY, 'select Name from Account');
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.click(selectors.exportsPagePO.EXPORT_TYPE_DROPDOWN);
    await io.homePage.addStep("*** Clicked on Export Type Dropdown ***");
    await io.exportsPage.clickByText('Limit - export a set number of records');
    await io.flowBuilder.click(selectors.basePagePO.SAVE_AND_CLOSE);

    await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.goToMenu("Tools", "Flow builder");
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.click(selectors.flowBuilderPagePO.ADD_SOURCE);
    await io.homePage.addStep("*** Clicked on add export ***");
    await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.APP_NAME_INPUT);
    await io.flowBuilder.fill(selectors.flowBuilderPagePO.APP_NAME_INPUT, "Netsuite");
    await io.flowBuilder.click(selectors.flowBuilderPagePO.NETSUITE);
    await io.flowBuilder.click(selectors.flowBuilderPagePO.SELECTED_EXPORT_RECORDS);
    await io.flowBuilder.click(selectors.basePagePO.CREATE_FROM_SCRATCH);
    await io.flowBuilder.fill(selectors.importPagePO.NAME, 'netsuite export');
    await io.homePage.click(selectors.connectionsPagePO.CONNECTIONS_DROPDOWN);
    await io.flowBuilder.clickByText("NETSUITE CONNECTION");
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.click(selectors.exportsPagePO.NETSUITE_RECORD_TYPE);
    await io.flowBuilder.clickByText("-Solution Review Status");
    await io.homePage.click(selectors.exportsPagePO.NETSUITE_SAVED_SEARCH);
    await io.flowBuilder.clickByText("!Bin Search");
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.click(selectors.exportsPagePO.NETSUITE_EXPORT_TYPE);
    await io.exportsPage.clickByText('Limit - export a set number of records');
    await io.flowBuilder.click(selectors.basePagePO.SAVE_AND_CLOSE);
    
  });
});