import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";


test.describe("@Env-All @Zephyr-IO-T2890", () => {
  test.beforeEach(async ({io}) => {
    await io.goToFlowsPage();
    await io.homePage.loadingTime();
  });
  test("@Env-All @Zephyr-IO-T2890", async ({io,page}) => {
    await io.homePage.click(selectors.flowBuilderPagePO.CREATEFLOW);
    await io.homePage.loadingTime();
    await io.homePage.click(
      selectors.flowBuilderPagePO.ADD_DESTINATION_OR_LOOKUP
    );
    await io.flowBuilder.fill(selectors.settingsPagePO.APP_NAME_INPUT, 'HTTP');
    await io.flowBuilder.click(selectors.connectionsPagePO.HTTP_CNNECTOR);
    await io.flowBuilder.click(selectors.flowBuilderPagePO.SELECTED_IMPORT_RECORDS);
    await io.flowBuilder.click(selectors.basePagePO.CREATE_FROM_SCRATCH);;
    await io.flowBuilder.click(selectors.connectionsPagePO.CONNECTIONS_DROPDOWN);
    await io.flowBuilder.fill(selectors.connectionsPagePO.CONNECTIONS_DROPDOWN, 'HTTP ZENDESK CONNECTION');
    await io.flowBuilder.clickByIndex(selectors.connectionsPagePO.CONNECTIONS_DROPDOWN_LIST, 0);
    await io.flowBuilder.fill(selectors.importPagePO.NAME, 'T32986 import');
    await io.flowBuilder.click(selectors.exportsPagePO.HTTP_METHOD);
    await io.flowBuilder.click(selectors.exportsPagePO.COMPOSITE_METHOD);
    await io.homePage.click(selectors.exportsPagePO.COMPOSITE_DROPDOWN);
    await io.flowBuilder.click(selectors.exportsPagePO.COMPOSITEDROPDOWN_VALUES3);
    await io.flowBuilder.loadingTime();
    await expect(page.getByText('How would you like to identify existing records? *').isVisible()).toBeTruthy();
    await io.flowBuilder.click(selectors.importPagePO.IMPORT_CLOSE_DRAWER);
    await io.flowBuilder.click(selectors.basePagePO.DISCARD_CHANGES); 

    await io.homePage.loadingTime();
    await io.homePage.click(
      selectors.flowBuilderPagePO.ADD_DESTINATION_OR_LOOKUP
    );
    await io.flowBuilder.fill(selectors.settingsPagePO.APP_NAME_INPUT, 'REST');
    await io.flowBuilder.click(selectors.connectionsPagePO.RESTAPI_HTTP);
    await io.flowBuilder.click(selectors.flowBuilderPagePO.SELECTED_IMPORT_RECORDS);
    await io.flowBuilder.click(selectors.basePagePO.CREATE_FROM_SCRATCH);;
    await io.flowBuilder.click(selectors.connectionsPagePO.CONNECTIONS_DROPDOWN);
    await io.flowBuilder.fill(selectors.connectionsPagePO.CONNECTIONS_DROPDOWN, 'HTTP ZENDESK CONNECTION');
    await io.flowBuilder.clickByIndex(selectors.connectionsPagePO.CONNECTIONS_DROPDOWN_LIST, 0);
    await io.flowBuilder.fill(selectors.importPagePO.NAME, 'T32986 import');
    await io.flowBuilder.click(selectors.exportsPagePO.HTTP_METHOD);
    await io.flowBuilder.click(selectors.exportsPagePO.COMPOSITE_METHOD);
    await io.homePage.click(selectors.exportsPagePO.COMPOSITE_DROPDOWN);
    await io.flowBuilder.click(selectors.exportsPagePO.COMPOSITEDROPDOWN_VALUES3);
    await io.flowBuilder.loadingTime();
    await expect(page.getByText('How would you like to identify existing records? *').isVisible()).toBeTruthy();
    await io.flowBuilder.click(selectors.importPagePO.IMPORT_CLOSE_DRAWER);
    await io.flowBuilder.click(selectors.basePagePO.DISCARD_CHANGES); 


    await io.homePage.loadingTime();
    await io.homePage.click(
      selectors.flowBuilderPagePO.ADD_DESTINATION_OR_LOOKUP
    );
    await io.flowBuilder.fill(selectors.settingsPagePO.APP_NAME_INPUT, 'MongoDB');
    await io.flowBuilder.click(selectors.flowBuilderPagePO.MONGODB);
    await io.flowBuilder.click(selectors.flowBuilderPagePO.SELECTED_IMPORT_RECORDS);
    await io.flowBuilder.click(selectors.basePagePO.CREATE_FROM_SCRATCH);;
    await io.flowBuilder.click(selectors.connectionsPagePO.CONNECTIONS_DROPDOWN);
    await io.flowBuilder.fill(selectors.connectionsPagePO.CONNECTIONS_DROPDOWN, 'MONGODB CONNECTION');
    await io.flowBuilder.clickByIndex(selectors.connectionsPagePO.CONNECTIONS_DROPDOWN_LIST, 0);
    await io.flowBuilder.fill(selectors.importPagePO.NAME, 'T32986 import');
    await io.flowBuilder.click(selectors.mappings.MAPPER2DOT0PO.INSERTMANY);
    await io.flowBuilder.click("[data-test='ignoreExisting']");
    await io.flowBuilder.loadingTime();
    await expect(page.getByText('How would you like to identify existing records? *').isVisible()).toBeTruthy();
    await io.flowBuilder.click(selectors.importPagePO.IMPORT_CLOSE_DRAWER);
    await io.flowBuilder.click(selectors.basePagePO.DISCARD_CHANGES); 
  });
});
