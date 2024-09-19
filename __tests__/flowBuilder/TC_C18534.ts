import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import TC_C18534 from "@testData/FlowBuilder/TC_C18534.json";

test.describe("TC_C18534", () => {
  let flowId;
  test.beforeEach(async ({io}) => {
    test.step("*** Navigate to Flow Page ***", async ()=>{});
    await io.goToFlowsPage();
    await io.homePage.loadingTime();
  });
  test.afterEach(async ({io}) => {
    await io.api.deleteFlowsWithId([flowId]);
    test.step("** Deleted flow **", async ()=>{});
  });
  test("@Env-All @Zephyr-IO-T2953|To verify mapping order is updated when flow contains multiple page processors and changed in the order in flow builder", async ({io,page}) => {
    await io.api.createImpOrExpAndFlowsThruAPI(TC_C18534);
    await io.homePage.loadingTime();
    flowId = await io.api.getFlowId(TC_C18534.name);

    test.step("*** Navigating to Flow Builder ***", async ()=>{});
    await io.goToFlowsPage();
    await io.homePage.loadingTime();
    test.step("Navigating to flows page.", async ()=>{});
    await io.homePage.click(selectors.flowBuilderPagePO.SEARCHBUTTON);
    await io.homePage.loadingTime();
    await io.homePage.fillWebPage(
      selectors.flowBuilderPagePO.SEARCHBUTTON,
      "TC_C18534"
    );
    await io.homePage.loadingTime();
    await io.homePage.click(
      "button[aria-label='Edit mapping']"
    );
    await io.homePage.loadingTime();
    var mappingorder = await page.$$(
      "[data-key='mapping']"
    );
    var str1 = await mappingorder[0].textContent();
    var str2 = await mappingorder[1].textContent();
    console.log([str1, str2]);
    await io.homePage.click(
      selectors.basePagePO.CLOSE_RIGHT_DRAWER
    );
    await io.flowBuilderDashboard.navigateToFlowBuilderInFB(
      flowId
    );
    await io.homePage.loadingTime();
    await io.homePage.loadingTime();
    await io.homePage.clickByIndex(
      selectors.flowBuilderPagePO.REMOVE_PAGE_PROCESSOR,
      0
    );
    await io.homePage.loadingTime();
    await io.homePage.click(
      "[data-test='Remove']"
    );
    await io.homePage.loadingTime();
    await io.homePage.click(
      selectors.flowBuilderPagePO.REMOVE_PAGE_PROCESSOR
    );
    await io.homePage.loadingTime();

    await io.homePage.click(
      "[data-test='Remove']"
    );
    await io.homePage.loadingTime();
    await io.homePage.click(
      selectors.flowBuilderPagePO.ADD_DESTINATION_OR_LOOKUP
    );
    await io.flowBuilder.fill(selectors.settingsPagePO.APP_NAME_INPUT, 'Netsuite');
    await io.homePage.click(selectors.flowBuilderPagePO.NETSUITE);
    test.step("*** Clicking on type of import ***", async ()=>{});
    await io.homePage.click(
      selectors.flowBuilderPagePO.SELECTED_IMPORT_RECORDS
    );
    await io.homePage.click(selectors.exportsPagePO.CREATE_FROM_SCRATCH);
    await io.homePage.loadingTime();
    await io.flowBuilder.click(selectors.connectionsPagePO.CONNECTIONS_DROPDOWN);
    await io.flowBuilder.fill(selectors.connectionsPagePO.CONNECTIONS_DROPDOWN, 'netsuite CONNECTION');
    await io.flowBuilder.clickByText('NETSUITE CONNECTION');
    await io.flowBuilder.fill(selectors.importPagePO.NAME, 'TC18534 import');
    await io.flowBuilder.click(selectors.importPagePO.NETSUITE_RECORD_TYPE);
    await io.flowBuilder.fill(selectors.importPagePO.NETSUITE_RECORD_TYPE, 'Subsidi');
    await io.flowBuilder.clickByText('Subsidiary');
    await io.flowBuilder.click(selectors.flowBuilderPagePO.ADD_RADIO_BUTTON);
    await io.homePage.loadingTime();
    await io.homePage.click(
      selectors.basePagePO.SAVE_AND_CLOSE
    );
    await io.homePage.loadingTime();
    await io.homePage.click(
      selectors.basePagePO.LOOKUP_ADD_BUTTON
    );
    await io.homePage.loadingTime();
    await io.flowBuilder.fill(selectors.settingsPagePO.APP_NAME_INPUT, 'HTTP');
    await io.homePage.click(selectors.connectionsPagePO.HTTP_CNNECTOR);
    await io.homePage.loadingTime();
    test.step("*** Clicking on type of import ***", async ()=>{});
    await io.homePage.click(selectors.flowBuilderPagePO.SELECTED_IMPORT_RECORDS);
    await io.homePage.click(selectors.exportsPagePO.CREATE_FROM_SCRATCH);
    await io.homePage.loadingTime();
    await io.flowBuilder.click(selectors.connectionsPagePO.CONNECTIONS_DROPDOWN);
    await io.flowBuilder.fill(selectors.connectionsPagePO.CONNECTIONS_DROPDOWN, 'HTTP ZENDESK CONNECTION');
    await io.flowBuilder.clickByIndex(selectors.connectionsPagePO.CONNECTIONS_DROPDOWN_LIST, 0);
    await io.flowBuilder.fill(selectors.importPagePO.NAME, 'T18534 import2');
    await io.flowBuilder.click(selectors.importPagePO.SELECTHTTPMETHOD);
    await io.flowBuilder.click(selectors.importPagePO.HTTPPOSTMETHOD);
    await io.flowBuilder.click(selectors.basePagePO.SAVE_AND_CLOSE);
    await io.homePage.loadingTime();
    await io.goToFlowsPage();
    await io.homePage.loadingTime();
    test.step("Navigating to flows page.", async ()=>{});
    await io.homePage.click(selectors.flowBuilderPagePO.SEARCHBUTTON);
    await io.homePage.fillWebPage(
      selectors.flowBuilderPagePO.SEARCHBUTTON,
      "TC_C18534"
    );
    await io.homePage.loadingTime();
    await io.homePage.click(
      "button[aria-label='Add mapping']"
    );
    await io.homePage.loadingTime();
    let mappindorderexpect = await page.$$(
      "[data-key='mapping']"
    );
    var str3 = await mappindorderexpect[0].textContent();
    var str4 = await mappindorderexpect[1].textContent();
    console.log([str3, str4]);
    expect([str1, str2]).not.toBe([str3, str4]);
  });
});
