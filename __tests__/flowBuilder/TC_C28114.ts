import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import TC from "@testData/FlowBuilder/TC_C28114.json";


test.describe("TC_C28114", () => {
  let flowId;

  test.beforeEach(async ({ io }) => {
    test.step("Navigating to Homepage", async () => { });
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.loadingTime();
  });

  test.afterEach(async ({ io }) => {
    test.step("Deleting the flow", async () => { });
    await io.api.deleteFlowsWithId([flowId]);
  });

  test("@Env-All @Zephyr-IO-T2856| Verify on Edit retry data", async ({ io, page }) => {
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
    await io.homePage.click(selectors.flowBuilderPagePO.ACCOUNT_DASHBOARD_OPEN_ERRORS);
    await io.homePage.loadingTime();
    await io.homePage.loadingTime();
    const editor = await page.locator(
      "[id=\'editRetry\'] .ace_content"
    );
    await editor.dblclick();
    await page.keyboard.type("Meta+A");
    await page.keyboard.type("Delete");
    await page.keyboard.type("{}");
    await io.homePage.loadingTime();

    test.step("Verifying the popup", async () => { });
     expect(await page.locator(selectors.flowBuilderPagePO.EM2DOT0PO.SAVE_AND_NEXT).isVisible()).toBeTruthy();
    
  })

  test("@Env-All @Zephyr-IO-T2856| Verify on Settings and Launch form builder under settings", async ({ io, page }) => {
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
    const editor = await page.locator(
      '[id="data"] .ace_content'
    );
    await editor.dblclick();

    await page.keyboard.press("Meta+A");
    await page.keyboard.press("Delete");
    await io.homePage.loadingTime();
    const save = await page.$$(selectors.basePagePO.SAVE);
    const saveBtn =await save[1];
    const close = await page.$$(selectors.basePagePO.CLOSE);
    const closeBtn =await close[1];
    expect(await page.locator(selectors.basePagePO.SAVE_AND_CLOSE).isVisible()).toBeTruthy();
    await io.homePage.loadingTime();
    expect(saveBtn.isVisible()).toBeTruthy();
    await io.homePage.loadingTime();
    expect(closeBtn.isVisible()).toBeTruthy();
    await io.homePage.click(selectors.exportsPagePO.CLOSE_PARSER_HELPER);
    await io.homePage.loadingTime();
    await io.flowBuilder.click(selectors.basePagePO.DISCARD_CHANGES);
    await io.homePage.loadingTime();

    test.step("Verifying the popup", async () => { });
    test.step("Modifying name on Settings", async () => { });
    await io.homePage.fill(
      selectors.connectionsPagePO.NAME_INPUT,
      "TC_C28114_FLOW"
    );
    expect(await page.locator(selectors.basePagePO.SAVE_AND_CLOSE).isVisible()).toBeTruthy();
    expect(await page.locator(selectors.basePagePO.SAVE).isVisible()).toBeTruthy();
    expect(await page.locator(selectors.basePagePO.CLOSE).isVisible()).toBeTruthy();

  });

  test("@Env-All @Zephyr-IO-T2856| Verify on Flow schedule and Flow schedule override", async ({ io, page }) => {
    await io.api.createImpOrExpAndFlowsThruAPI(TC);
    await io.homePage.loadingTime();
    flowId = await io.api.getFlowId(TC.name);
    await io.flowBuilderDashboard.navigateToFlowBuilderInEM2(flowId);
    await io.homePage.isPageReady();
    await io.homePage.isPageReady();
    test.step("Modifying Flow schedule", async () => { });
    await io.homePage.click(
      selectors.flowBuilderPagePO.SCHEDULEICON
    );
    await io.homePage.click(
      selectors.flowBuilderPagePO.ADVANCED
    );

    test.step("Verifying the popup", async () => { });
    await io.homePage.loadingTime();

    test.step("Verifying the popup", async () => { });
    expect(await page.locator(selectors.basePagePO.SAVE_AND_CLOSE).isVisible()).toBeTruthy();
    expect(await page.locator(selectors.basePagePO.SAVE).isVisible()).toBeTruthy();
    expect(await page.locator(selectors.basePagePO.CLOSE).isVisible()).toBeTruthy();
    await io.homePage.click(selectors.basePagePO.CLOSE_RIGHT_DRAWER);
    await io.flowBuilder.click(selectors.basePagePO.DISCARD_CHANGES);
    await io.homePage.loadingTime();
    test.step("Modifying Flow schedule override", async () => { });
    await io.homePage.clickByIndex(
      selectors.flowBuilderPagePO.ADD_DATA_PROCESSOR, 0
    );
    await io.homePage.loadingTime();
    await io.homePage.click(
      "[data-test='exportSchedule']"
    );
    await io.homePage.click(
      selectors.flowBuilderPagePO.ADVANCED
    );

    test.step("Verifying the popup", async () => { });
    expect(await page.locator(selectors.basePagePO.SAVE_AND_CLOSE).isVisible()).toBeTruthy();
    expect(await page.locator(selectors.basePagePO.SAVE).isVisible()).toBeTruthy();
    expect(await page.locator(selectors.basePagePO.CLOSE).isVisible()).toBeTruthy();
  });

  test("@Env-All @Zephyr-IO-T2856| Verify on Tranformation, Output filter, Hooks and Hook's Scipt editor", async ({ io, page }) => {
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
    await io.homePage.hover(selectors.flowBuilderPagePO.DELETE_MAPPING);
    await io.homePage.clickButtonByIndex(selectors.flowBuilderPagePO.DELETE_MAPPING,0);

    test.step("Verifying the popup", async () => { });
    expect(await page.locator(selectors.basePagePO.SAVE_AND_CLOSE).isVisible()).toBeTruthy();
    expect(await page.locator(selectors.basePagePO.SAVE).isVisible()).toBeTruthy();
    expect(await page.locator(selectors.basePagePO.CLOSE).isVisible()).toBeTruthy();
    await io.homePage.click(selectors.exportsPagePO.CLOSE_PARSER_HELPER);
    await io.flowBuilder.click(selectors.basePagePO.DISCARD_CHANGES);

    test.step("Modifying Output filter", async () => { });
    await io.homePage.loadingTime();
    await io.homePage.click(
      selectors.flowBuilderPagePO.EXPORT_FILTER
    );
    await io.homePage.click(
      "[data-not='group']"
    );

    test.step("Verifying the popup", async () => { });
    expect(await page.locator(selectors.basePagePO.SAVE_AND_CLOSE).isVisible()).toBeTruthy();
    expect(await page.locator(selectors.basePagePO.SAVE).isVisible()).toBeTruthy();
    expect(await page.locator(selectors.basePagePO.CLOSE).isVisible()).toBeTruthy();
    await io.homePage.click(selectors.exportsPagePO.CLOSE_PARSER_HELPER);
    await io.flowBuilder.click(selectors.basePagePO.DISCARD_CHANGES);
    test.step("Opening Hooks", async () => { });
    await io.homePage.loadingTime();
    await io.homePage.click(
      "[data-test='exportHooks']"
    );
    await io.homePage.click(
      '[data-test="stack"]'
    );
    await io.homePage.loadingTime();
    expect(await page.locator(selectors.basePagePO.SAVE_AND_CLOSE).isVisible()).toBeTruthy();
    expect(await page.locator(selectors.basePagePO.SAVE).isVisible()).toBeTruthy();
    expect(await page.locator(selectors.basePagePO.CLOSE).isVisible()).toBeTruthy();
  });

  test("@Env-All @Zephyr-IO-T2856| Verify on Input filter, Mappings, Proceed on failure and Results mappings ", async ({ io, page }) => {
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
    await io.homePage.click(
      "[data-not='group']"
    );

    test.step("Verifying the popup", async () => { });
    expect(await page.locator(selectors.basePagePO.SAVE_AND_CLOSE).isVisible()).toBeTruthy();
    expect(await page.locator(selectors.basePagePO.SAVE).isVisible()).toBeTruthy();
    expect(await page.locator(selectors.basePagePO.CLOSE).isVisible()).toBeTruthy();
    await io.homePage.click(selectors.exportsPagePO.CLOSE_PARSER_HELPER);
    await io.flowBuilder.click(selectors.basePagePO.DISCARD_CHANGES);

    await io.homePage.loadingTime();
    test.step("Opening Input mappings", async () => { });
    await io.homePage.clickByIndex(
      selectors.flowBuilderPagePO.IMPORT_MAPPINGS, 0
    );
    await io.homePage.loadingTime();
    const deleteButtons = await page.$$(
      selectors.mappings.MAPPER2DOT0PO.DELETEBUTTONS
    );
    const addButtons = await page.$$(selectors.mappings.MAPPER2DOT0PO.ADDBUTTONS);

    await addButtons[0].hover();
    await deleteButtons[0].hover();
    await deleteButtons[0].click();

    await io.flowBuilder.loadingTime();


    test.step("Verifying the popup", async () => { });
    expect(await page.locator(selectors.basePagePO.SAVE_AND_CLOSE).isVisible()).toBeTruthy();
    expect(await page.locator(selectors.basePagePO.SAVE).isVisible()).toBeTruthy();
    expect(await page.locator(selectors.basePagePO.CLOSE).isVisible()).toBeTruthy();
    await io.homePage.click(selectors.exportsPagePO.CLOSE_PARSER_HELPER);
    await io.flowBuilder.click(selectors.basePagePO.DISCARD_CHANGES);

    await io.homePage.loadingTime();
    test.step("Modifying Proceed on failure", async () => { });
    await io.homePage.clickByIndex(
      selectors.flowBuilderPagePO.ADD_DATA_PROCESSOR, 1
    )
    await io.homePage.click(
      "[data-test='proceedOnFailure']"
    );
    await io.homePage.click(
      "[data-test='true']"
    );
    expect(await page.locator(selectors.basePagePO.SAVE_AND_CLOSE).isVisible()).toBeTruthy();
    expect(await page.locator(selectors.basePagePO.SAVE).isVisible()).toBeTruthy();
    expect(await page.locator(selectors.basePagePO.CLOSE).isVisible()).toBeTruthy();
    await io.homePage.click('[data-testid="closeModalDialog"]');
    await io.flowBuilder.click(selectors.basePagePO.DISCARD_CHANGES);
    await io.homePage.loadingTime();

    test.step("Modifying Results mapping", async () => { });
    await io.homePage.clickByIndex(
      selectors.flowBuilderPagePO.ADD_DATA_PROCESSOR, 1
    )
    await io.homePage.click(
      selectors.mappings.DEFAULT_MAPPING_TYPE.RESPONSE_MAPPING
    );
    await io.homePage.loadingTime();
    //Source
    await io.homePage.clickByIndex(
      "[data-test='text-extract-0']", 0
    );
    await io.flowBuilder.fillByIndex('[id="extract-0"] input', 'abcd', 0);
    await io.homePage.loadingTime();
    // Destination
    await io.homePage.clickByIndex(
      "[data-test='text-generate-0'] div", 0
    );
    await io.homePage.clickByIndex(
      "[data-test='text-generate-0'] div", 0
    );
    await io.flowBuilder.fillByIndex('[id="generate-0"] input', 'xyz', 0);
    expect(await page.locator(selectors.basePagePO.SAVE_AND_CLOSE).isVisible()).toBeTruthy();
    expect(await page.locator(selectors.basePagePO.SAVE).isVisible()).toBeTruthy();
    expect(await page.locator(selectors.basePagePO.CLOSE).isVisible()).toBeTruthy();
  });

  test("@Env-All @Zephyr-IO-T2856| Verify on Scripts", async ({ io, page }) => {
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
    await io.homePage.fill(
      selectors.connectionsPagePO.NAME_INPUT,
      "testt"
    );

    test.step("Verifying the popup", async () => { });
      await io.homePage.loadingTime();
      const save1 = await page.$$(selectors.basePagePO.SAVE);
      const saveBtn1 =await save1[1];
      const close1 = await page.$$(selectors.basePagePO.CLOSE);
      const closeBtn1 =await close1[1];
      expect(await page.locator(selectors.basePagePO.SAVE_AND_CLOSE).isVisible()).toBeTruthy();
      await io.homePage.loadingTime();
      expect(saveBtn1.isVisible()).toBeTruthy();
      await io.homePage.loadingTime();
      expect(closeBtn1.isVisible()).toBeTruthy();
  });

  test("@Env-All @Zephyr-IO-T2856| Verify Export and Import Form builders", async ({ io, page }) => {
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
    const editor = await page.locator(
      '[id="data"] .ace_content'
    );
    await editor.dblclick();

    await page.keyboard.press("Meta+A");
    await page.keyboard.press("Delete");
    await io.homePage.loadingTime();
    await io.homePage.loadingTime();
      const save = await page.$$(selectors.basePagePO.SAVE);
      const saveBtn =await save[1];
      const close = await page.$$(selectors.basePagePO.CLOSE);
      const closeBtn =await close[1];
      expect(await page.locator(selectors.basePagePO.SAVE_AND_CLOSE).isVisible()).toBeTruthy();
      await io.homePage.loadingTime();
      expect(saveBtn.isVisible()).toBeTruthy();
      await io.homePage.loadingTime();
      expect(closeBtn.isVisible()).toBeTruthy();
      await io.homePage.click(selectors.flowBuilderPagePO.CLOSE_RIGHT_DRAWER);
      await io.homePage.loadingTime();
      await io.flowBuilder.click(selectors.basePagePO.DISCARD_CHANGES);
      await io.homePage.loadingTime();
      await io.homePage.click(selectors.flowBuilderPagePO.CLOSINGDRAWER);
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
    const editor1 = await page.locator(
      '[id="data"] .ace_content'
    );
    await editor1.dblclick();

    await page.keyboard.press("Meta+A");
    await page.keyboard.press("Delete");
    await io.homePage.loadingTime();
    await io.homePage.loadingTime();
      const save1 = await page.$$(selectors.basePagePO.SAVE);
      const saveBtn1 =await save1[1];
      const close1 = await page.$$(selectors.basePagePO.CLOSE);
      const closeBtn1 =await close1[1];
      expect(await page.locator(selectors.basePagePO.SAVE_AND_CLOSE).isVisible()).toBeTruthy();
      await io.homePage.loadingTime();
      expect(saveBtn1.isVisible()).toBeTruthy();
      await io.homePage.loadingTime();
      expect(closeBtn1.isVisible()).toBeTruthy();


  });
});
