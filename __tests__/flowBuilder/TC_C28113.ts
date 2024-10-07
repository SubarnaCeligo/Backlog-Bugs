import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import TC from "@testData/FlowBuilder/TC_C28113.json";
import TC2 from "@testData/FlowBuilder/TC_C29430.json";
import TC3 from "@testData/FlowBuilder/TC_C31307.json";
import TC4 from "@testData/FlowBuilder/TC_C30736.json";
import TC5 from "@testData/FlowBuilder/TC_C30776.json";
import TC6 from "@testData/FlowBuilder/TC_C30888.json";
import TC7 from "@testData/FlowBuilder/TC_C29811.json";
test.describe("TC_C28113", () => {
  let flowId;
  test.beforeEach(async ({ io }) => {
    await io.goToFlowsPage();
    test.step("*** Go to flows page ***", async () => { });
  });

  test("@Env-All @Zephyr-IO-T2855| Verify on Edit retry data", async ({ io, page }) => {
    await io.api.createImpOrExpAndFlowsThruAPI(TC);
    await io.homePage.loadingTime();
    test.step("Navigating to Flow builder", async () => { });
    flowId = await io.api.getFlowId(TC.name);
    await io.flowBuilderDashboard.navigateToFlowBuilderInFB(flowId);
    await io.homePage.loadingTime();
    await io.flowBuilder.click(selectors.flowBuilderPagePO.RUN_FLOW);
    const lastRun = page.getByText('Last run');
    await lastRun.waitFor({ state: 'visible', timeout: 180000 });
    await io.homePage.loadingTime();
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.flowBuilderPagePO.ACCOUNT_DASHBOARD_OPEN_ERRORS);
    await io.homePage.loadingTime();
    test.step("Verifying the popup", async () => { });
    expect(await page.locator(selectors.basePagePO.CLOSE_RIGHT_DRAWER).isVisible()).toBeTruthy();
    await io.api.deleteFlowsWithId([flowId]);
  })

  test("@Env-All @Zephyr-IO-T2855| Verify on Settings and Launch form builder under settings", async ({ io, page }) => {
    await io.api.createImpOrExpAndFlowsThruAPI(TC);
    await io.homePage.loadingTime();
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.click(selectors.basePagePO.ACCOUNT_BUTTON);
    test.step("***Clicked On Profile Options***", async () => { });

    await io.homePage.click(selectors.myAccountPagePO.PROFILE);
    test.step("***Clicked On Profile Menu***", async () => { });

    await io.homePage.loadingTime();
    await io.homePage.isPageReady();

    const checked = await (await io.homePage.getElement(`${selectors.flowBuilderPagePO.DEVELOPER_MODE} input`)).isChecked();

    if (checked == true) {
      test.step("***Checked The Developer Mode***", async () => { });
    } else {
      await io.homePage.click(selectors.flowBuilderPagePO.DEVELOPER_MODE);
      test.step("***Checked The Developer Mode***", async () => { });
      await io.homePage.click(
        selectors.basePagePO.MFA_SAVE
      );
    }

    await io.homePage.loadingTime();

    await io.homePage.loadingTime();
    flowId = await io.api.getFlowId(TC.name);
    await io.flowBuilderDashboard.navigateToFlowBuilderInFB(flowId);
    await io.homePage.loadingTime();
    test.step("Opening Settings", async () => { });
    await io.homePage.click(
      selectors.basePagePO.FLOWSETTING
    );
    await io.homePage.loadingTime();

    await test.step(
      "Opening Launch form builder and modifying data"
      , async () => { });
    await io.homePage.click(
      "[data-test='Custom']"
    );
    await io.homePage.click(
      selectors.basePagePO.LAUNCH_EDITOR
    );
    await io.homePage.loadingTime();
    const close = await page.$$(selectors.basePagePO.CLOSE);
    const closeBtn = await close[1];
    expect(closeBtn.isVisible()).toBeTruthy();
    expect(await page.locator(selectors.exportsPagePO.CLOSE_PARSER_HELPER).isVisible()).toBeTruthy();
    await io.homePage.click(selectors.exportsPagePO.CLOSE_PARSER_HELPER);
    await io.homePage.loadingTime();

    test.step("Verifying the popup", async () => { });
    expect(await page.locator(selectors.basePagePO.CLOSE).isVisible()).toBeTruthy();
    expect(await page.locator(selectors.basePagePO.CLOSE_RIGHT_DRAWER).isVisible()).toBeTruthy();
    await io.api.deleteFlowsWithId([flowId]);
  });

  test("@Env-All @Zephyr-IO-T2855| Verify on Flow schedule and Flow schedule override", async ({ io, page }) => {
    await io.api.createImpOrExpAndFlowsThruAPI(TC);
    await io.homePage.loadingTime();
    flowId = await io.api.getFlowId(TC.name);
    await io.flowBuilderDashboard.navigateToFlowBuilderInEM2(flowId);
    await io.homePage.isPageReady();
    test.step("Modifying Flow schedule", async () => { });
    await io.homePage.click(
      selectors.flowBuilderPagePO.SCHEDULEICON
    );
    test.step("Verifying the popup", async () => { });
    await io.homePage.loadingTime();

    expect(await page.locator(selectors.basePagePO.CLOSE_RIGHT_DRAWER).isVisible()).toBeTruthy();
    expect(await page.locator(selectors.basePagePO.CLOSE).isVisible()).toBeTruthy();
    await io.homePage.click(selectors.basePagePO.CLOSE_RIGHT_DRAWER);
    await io.homePage.loadingTime();
    test.step("Modifying Flow schedule override", async () => { });
    await io.homePage.clickByIndex(
      selectors.flowBuilderPagePO.ADD_DATA_PROCESSOR, 0
    );
    await io.homePage.loadingTime();
    await io.homePage.click(
      "[data-test='exportSchedule']"
    );
    test.step("Verifying the popup", async () => { });
    expect(await page.locator('[data-testid="closeModalDialog"]').isVisible()).toBeTruthy();
    expect(await page.locator(selectors.basePagePO.CLOSE).isVisible()).toBeTruthy();
    await io.homePage.click('[data-testid="closeModalDialog"]');
    await io.api.deleteFlowsWithId([flowId]);
  });

  test("@Env-All @Zephyr-IO-T2841| Verify on Tranformation, Output filter, Hooks and Hook's Scipt editor", async ({ io, page }) => {
    await io.api.createImpOrExpAndFlowsThruAPI(TC);
    await io.homePage.loadingTime();
    flowId = await io.api.getFlowId(TC.name);
    await io.flowBuilderDashboard.navigateToFlowBuilderInEM2(flowId);
    await io.homePage.loadingTime();
    test.step("Modifying Tranformation", async () => { });
    await io.homePage.clickByIndex(
      selectors.flowBuilderPagePO.ADD_DATA_PROCESSOR, 0
    );
    await io.homePage.loadingTime();
    await io.homePage.click(
      selectors.flowBuilderPagePO.EXPORT_TRANSFORMATION
    );
    await io.homePage.loadingTime();

    test.step("Verifying the popup", async () => { });

    expect(await page.locator(selectors.exportsPagePO.CLOSE_PARSER_HELPER).isVisible()).toBeTruthy();
    expect(await page.locator(selectors.basePagePO.CLOSE).isVisible()).toBeTruthy();
    await io.homePage.click(selectors.exportsPagePO.CLOSE_PARSER_HELPER);

    test.step("Modifying Output filter", async () => { });
    await io.homePage.loadingTime();
    await io.homePage.click(
      selectors.flowBuilderPagePO.EXPORT_FILTER
    );
    await io.homePage.loadingTime();
    test.step("Verifying the popup", async () => { });
    expect(await page.locator(selectors.basePagePO.CLOSE).isVisible()).toBeTruthy();
    expect(await page.locator(selectors.basePagePO.CLOSE_RIGHT_DRAWER).isVisible()).toBeTruthy();
    await io.homePage.click(selectors.basePagePO.CLOSE_RIGHT_DRAWER);
    test.step("Opening Hooks", async () => { });
    await io.homePage.loadingTime();
    await io.homePage.click(
      "[data-test='exportHooks']"
    );

    await io.homePage.loadingTime();
    expect(await page.locator(selectors.basePagePO.CLOSE).isVisible()).toBeTruthy();
    expect(await page.locator(selectors.basePagePO.CLOSE_RIGHT_DRAWER).isVisible()).toBeTruthy();
    await io.flowBuilder.click(selectors.basePagePO.CLOSE_RIGHT_DRAWER);
    await io.api.deleteFlowsWithId([flowId]);
  });

  test("@Env-All @Zephyr-IO-T2855| Verify on Input filter, Mappings, Proceed on failure and Results mappings ", async ({ io, page }) => {
    await io.api.createImpOrExpAndFlowsThruAPI(TC);
    await io.homePage.loadingTime();
    flowId = await io.api.getFlowId(TC.name);
    await io.flowBuilderDashboard.navigateToFlowBuilderInEM2(flowId);
    await io.homePage.loadingTime();
    test.step("Opening Input filter", async () => { });
    await io.homePage.clickByIndex(
      selectors.flowBuilderPagePO.ADD_DATA_PROCESSOR, 2
    );
    await io.homePage.loadingTime();
    await io.homePage.clickByIndex(
      "[data-test='inputFilter']", 1
    );
    await io.homePage.loadingTime();
    test.step("Verifying the popup", async () => { });
    expect(await page.locator(selectors.basePagePO.CLOSE).isVisible()).toBeTruthy();
    expect(await page.locator(selectors.exportsPagePO.CLOSE_PARSER_HELPER).isVisible()).toBeTruthy();
    await io.homePage.click(selectors.exportsPagePO.CLOSE_PARSER_HELPER);

    await io.homePage.loadingTime();
    test.step("Opening Input mappings", async () => { });
    await io.homePage.clickByIndex(
      selectors.flowBuilderPagePO.IMPORT_MAPPINGS, 0
    );
    await io.homePage.loadingTime();
    test.step("Verifying the popup", async () => { });
    expect(await page.locator(selectors.basePagePO.CLOSE).isVisible()).toBeTruthy();
    expect(await page.locator(selectors.exportsPagePO.CLOSE_PARSER_HELPER).isVisible()).toBeTruthy();
    await io.homePage.click(selectors.exportsPagePO.CLOSE_PARSER_HELPER);

    await io.homePage.loadingTime();
    test.step("Modifying Proceed on failure", async () => { });
    await io.homePage.clickByIndex(
      selectors.flowBuilderPagePO.ADD_DATA_PROCESSOR, 1
    )
    await io.homePage.click(
      "[data-test='proceedOnFailure']"
    );
    expect(await page.locator(selectors.basePagePO.CLOSE).isVisible()).toBeTruthy();
    expect(await page.locator(selectors.flowBuilderPagePO.CLOSEPOPUP).isVisible()).toBeTruthy();
    await io.flowBuilder.click(selectors.flowBuilderPagePO.CLOSEPOPUP);
    await io.homePage.loadingTime();

    test.step("Modifying Results mapping", async () => { });
    await io.homePage.clickByIndex(
      selectors.flowBuilderPagePO.ADD_DATA_PROCESSOR, 1
    )
    await io.homePage.click(
      selectors.mappings.DEFAULT_MAPPING_TYPE.RESPONSE_MAPPING
    );
    await io.homePage.loadingTime();
    // Destination
    expect(await page.locator(selectors.basePagePO.CLOSE).isVisible()).toBeTruthy();
    expect(await page.locator(selectors.basePagePO.CLOSE_RIGHT_DRAWER).isVisible()).toBeTruthy();
    await io.homePage.click(selectors.basePagePO.CLOSE_RIGHT_DRAWER);
    await io.api.deleteFlowsWithId([flowId]);
  });

  test("@Env-All @Zephyr-IO-T2855| Verify on Scripts", async ({ io, page }) => {
    await io.api.createImpOrExpAndFlowsThruAPI(TC);
    await io.homePage.loadingTime();
    flowId = await io.api.getFlowId(TC.name);
    await io.flowBuilderDashboard.navigateToFlowBuilderInEM2(flowId);
    await io.homePage.loadingTime();
    test.step("Modifying Script", async () => { });
    await io.homePage.clickByIndex(
      selectors.flowBuilderPagePO.ADD_DATA_PROCESSOR, 1
    );
    await io.homePage.click(
      selectors.flowBuilderPagePO.PAGE_PROCESSOR_HOOKS
    );
    await io.homePage.click(
      selectors.flowBuilderPagePO.ADD_SCRIPT
    );
    await io.homePage.loadingTime();
    test.step("Verifying the popup", async () => { });
    const close1 = await page.$$(selectors.basePagePO.CLOSE);
    const closeBtn1 = await close1[1];
    expect(closeBtn1.isVisible()).toBeTruthy();
    expect(await page.locator(selectors.flowBuilderPagePO.CLOSING_IMPORT).isVisible()).toBeTruthy();
    await io.api.deleteFlowsWithId([flowId]);
  });

  test("@Env-All @Zephyr-IO-T2855| Verify Export and Import Form builders", async ({ io, page }) => {
    await io.api.createImpOrExpAndFlowsThruAPI(TC);
    await io.homePage.loadingTime();
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.click(selectors.basePagePO.ACCOUNT_BUTTON);
    test.step("***Clicked On Profile Options***", async () => { });

    await io.homePage.click(selectors.myAccountPagePO.PROFILE);
    test.step("***Clicked On Profile Menu***", async () => { });

    await io.homePage.loadingTime();
    await io.homePage.isPageReady();

    const checked = await (await io.homePage.getElement(`${selectors.flowBuilderPagePO.DEVELOPER_MODE} input`)).isChecked();

    if (checked == true) {
      test.step("***Checked The Developer Mode***", async () => { });
    } else {
      await io.homePage.click(selectors.flowBuilderPagePO.DEVELOPER_MODE);
      test.step("***Checked The Developer Mode***", async () => { });
      await io.homePage.click(
        selectors.basePagePO.MFA_SAVE
      );
    }

    await io.homePage.loadingTime();
    flowId = await io.api.getFlowId(TC.name);
    await io.flowBuilderDashboard.navigateToFlowBuilderInEM2(flowId);
    await io.homePage.loadingTime();
    test.step("Modifying Export Form builder", async () => { });
    await io.homePage.clickByIndex(
      "[data-test='Export']", 0
    );
    await io.homePage.click(
      selectors.basePagePO.CUSTOM_SETTING
    );
    await io.homePage.click(
      selectors.basePagePO.LAUNCH_EDITOR
    );
    await io.homePage.loadingTime();
    const close = await page.$$(selectors.basePagePO.CLOSE);
    const closeBtn = await close[1];
    expect(closeBtn.isVisible()).toBeTruthy();
    expect(await page.locator(selectors.exportsPagePO.CLOSE_PARSER_HELPER).isVisible()).toBeTruthy();
    await io.flowBuilder.click(selectors.exportsPagePO.CLOSE_PARSER_HELPER);
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.flowBuilderPagePO.CLOSING_IMPORT);
    await io.homePage.loadingTime();

    test.step("Modifying Import Form builder", async () => { });
    await io.homePage.clickByIndex(
      selectors.flowBuilderPagePO.IMPORT, 0
    );
    await io.homePage.click(
      selectors.basePagePO.CUSTOM_SETTING
    );
    await io.homePage.loadingTime();
    await io.homePage.click(
      selectors.basePagePO.LAUNCH_EDITOR
    );
    await io.homePage.loadingTime();
    const close1 = await page.$$(selectors.basePagePO.CLOSE);
    const closeBtn1 = await close1[1];
    expect(closeBtn1.isVisible()).toBeTruthy();
    expect(await page.locator(selectors.exportsPagePO.CLOSE_PARSER_HELPER).isVisible()).toBeTruthy();
    await io.flowBuilder.click(selectors.exportsPagePO.CLOSE_PARSER_HELPER);
    await io.api.deleteFlowsWithId([flowId]);

  });


  test("@Env-All @Zephyr-IO-T2879", async ({ io }) => {
    //*Create Flow
    await io.api.createImpOrExpAndFlowsThruAPI(TC2);
    var flowId1 = await io.api.getFlowId(TC2.name);
    await io.flowBuilderDashboard.navigateToFlowBuilderInFB(flowId1);
    test.step("***Navigated To Flow Builder***", async () => { });
    await io.homePage.click(
      selectors.flowBuilderPagePO.EXPORT_TRANSFORMATION
    );
    test.step("***Navigated To Transformations***", async () => { });
    await io.homePage.dragAndDrop('(//*[@id="dragHandle"])[1]', '(//*[@id="dragHandle"])[3]');
    await test.step(
      "***User Is Able To Drag And Drop The Fields In Transformations.***"
      , async () => { });
      await io.api.deleteFlowsWithId([flowId]);
  });


  test("@Env-All @Zephyr-IO-T2912", async ({ io }) => {
    //*Create Flow
    var flows = await io.api.createImpOrExpAndFlowsThruAPI(TC3);
    // await test.step(
    //   "Created Flows " +
    //   flows.get(TC3.name)["flowName"] +
    //   " " +
    //   " With IDs " +
    //   flows.get(TC3.name)["flowId7"], async () => { }
    // );
    var flowId1 = await io.api.getFlowId(TC3.name);
    await io.flowBuilderDashboard.navigateToFlowBuilderInFB(flowId1);
    await test.step(
      "***Navigated To FlowBuilder For The Created Flow***"
      , async () => { });
    await io.homePage.click(
      "[data-test='Export']"
    );
    await io.homePage.loadingTime();
    // await io.homePage.click(
    //   selectors.connectionsPagePO.NAME_INPUT
    // );
    // await io.homePage.clearTextValue(
    //   selectors.connectionsPagePO.NAME_INPUT
    // );
    await io.homePage.fillWebPage(
      selectors.connectionsPagePO.NAME_INPUT,
      "change_name"
    );
    await io.homePage.click(
      selectors.basePagePO.SAVE_AND_CLOSE
    );
    await io.homePage.loadingTime();
    test.step("***Changed Export Name***", async () => { });
    await io.homePage.click("[data-test='auditLogs']");
    await io.homePage.loadingTime();
    test.step("***Navigated To Audit Logs Tab***", async () => { });
    var text = await io.homePage.getText(
      " tr:nth-child(2) > td:nth-child(7)"
    );
    await io.homePage.loadingTime();
    var expected = "file.skipDelete";
    await test.step(
      "***file.skipDelete Is Not Audited In The AuditLogs Of The Flow***"
      , async () => { });
    expect(text).not.toEqual(expected);
    await io.api.deleteFlowsWithId([flowId]);
  });


  test("@Env-All @Zephyr-IO-T2902", async ({ io }) => {
    //*Create Flow
    await io.api.createImpOrExpAndFlowsThruAPI(TC4);
    var flowId1 = await io.api.getFlowId(TC4.name);
    await io.flowBuilderDashboard.navigateToFlowBuilderInFB(flowId1);
    await io.homePage.loadingTime();
    await test.step(
      "***Navigated To FlowBuilder For The Created Flow***"
      , async () => { });
    await io.homePage.loadingTime();
    await io.homePage.click(
      selectors.flowBuilderPagePO.ADD_DATA_PROCESSOR
    );
    await io.homePage.loadingTime();
    await io.homePage.click(
      selectors.flowBuilderPagePO.EXPORT_FILTER
    );
    await io.homePage.loadingTime();
    test.step("***Clicked On Output Filter***", async () => { });
    await io.homePage.hover(
      selectors.flowBuilderPagePO.RULE_FILTER
    );
    await io.homePage.loadingTime();
    await io.homePage.click(
      selectors.flowBuilderPagePO.FILTER_SETTINGS
    );
    await io.homePage.loadingTime();
    await io.homePage.click(
      "[data-test='dataType']"
    );
    await io.homePage.loadingTime();
    await io.homePage.click(
      "[data-value='epochtime']"
    );
    await io.homePage.loadingTime();
    test.step("***Selected Data type As Date Time***", async () => { });
    await io.homePage.click(
      selectors.basePagePO.MFA_SAVE
    );
    await io.homePage.loadingTime();
    test.step("***Saved Data type As Date Time***", async () => { });
    await io.homePage.hover(
      selectors.flowBuilderPagePO.RULE_FILTER
    );
    await io.homePage.loadingTime();
    await io.homePage.click(
      selectors.flowBuilderPagePO.FILTER_SETTINGS
    );
    await io.homePage.loadingTime();
    test.step("***Reopened Operand Settings Page***", async () => { });
    var text = await io.homePage.getText(
      "[data-test='dataType']"
    );
    await io.homePage.loadingTime();
    var expected = "Date Time";
    await test.step(
      "***The Saved DataType as Date and time Is Not Changed To String***"
      , async () => { });
    expect(text).toContain(expected);
    await io.api.deleteFlowsWithId([flowId]);
  });


  test("@Env-All @Zephyr-IO-T2903", async ({ io, page }) => {
    //*Create Flow
    await io.api.createImpOrExpAndFlowsThruAPI(TC5);
    var flowId1 = await io.api.getFlowId(TC5.name);
    await io.flowBuilderDashboard.navigateToFlowBuilderInFB(flowId1);
    await test.step(
      "***Navigated To FlowBuilder For The Created Flow***"
      , async () => { });
    await io.homePage.click(selectors.flowBuilderPagePO.IMPORT);
    test.step("***Opened mysql Imports Page***", async () => { });
    // await page.pause();
    await io.homePage.loadingTime();
    var checked = await (await page.$(selectors.flowBuilderPagePO.IGNORE_EXISTING)).isChecked();
    await io.homePage.loadingTime();
    if (checked == true) {
      test.step("***Checked The Existing Records***", async () => { });
    } else {
      await io.homePage.click(
        selectors.flowBuilderPagePO.IGNORE_EXISTING
      );
      test.step("***Checked The Existing Records***", async () => { });
    }
    await io.homePage.loadingTime();
    await io.homePage.click(
      selectors.importPagePO.SPECIFIC_FIELD_POPULATED
    );
    await io.homePage.loadingTime();
    await io.homePage.click(
      selectors.importPagePO.DYNAMICLOOKUP
    );
    await io.homePage.loadingTime();
    await io.homePage.click(
      selectors.importPagePO.ADD_LOOKUP
    );
    await io.homePage.loadingTime();
    var result = await io.assert.checkElementState(
      selectors.mappings.DYNAMICLOOKUP
      , "isVisible");
    await test.step(
      "***There Are No Options To Select Static/Dynamic Lookups***"
      , async () => { });
    expect(result).toBeFalsy();
    var result1 = await io.assert.checkElementState(
      selectors.mappings.MAPPER2DOT0PO.STATICLOOKUP
      , "isVisible");
    expect(result1).toBeFalsy();
    await io.api.deleteFlowsWithId([flowId]);
  });

});
