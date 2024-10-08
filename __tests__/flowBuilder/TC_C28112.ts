import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import TC from "@testData/FlowBuilder/TC_C28112.json";

test.describe("TC_C28112", () => {
  let flowId;
  test.beforeEach(async ({ io }) => {
    await io.goToFlowsPage();
    await io.homePage.loadingTime();
  });
  test.afterEach(async ({ io }) => {
    test.step("Navigating to Homepage", async () => { });
    await io.api.deleteFlowsWithId([flowId]);
  });

  test("@Env-All @Zephyr-IO-T2854| Verify on Settings and Launch form builder under settings", async ({ io, page }) => {
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
    const save = await page.locator(selectors.basePagePO.SAVE).nth(1);
    await expect(save).toBeDisabled();
    await io.homePage.click(selectors.exportsPagePO.CLOSE_PARSER_HELPER);
    await io.homePage.loadingTime();

    test.step("Verifying the popup", async () => { });
    await io.assert.verifyElementNotToBeClickable(selectors.basePagePO.SAVE);
    await io.api.deleteFlowsWithId([flowId]);
  });

  test("@Env-All @Zephyr-IO-T2854| Verify on Flow schedule and Flow schedule override", async ({ io }) => {
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

    await io.assert.verifyElementNotToBeClickable(selectors.basePagePO.SAVE);
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
    await io.assert.verifyElementNotToBeClickable(selectors.basePagePO.SAVE);
    await io.api.deleteFlowsWithId([flowId]);
  });

  test("@Env-All @Zephyr-IO-T2854| Verify on Tranformation, Output filter, Hooks and Hook's Scipt editor", async ({ io, page }) => {
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

     await io.assert.verifyElementNotToBeClickable(selectors.basePagePO.SAVE);
    await io.homePage.click(selectors.exportsPagePO.CLOSE_PARSER_HELPER);

    test.step("Modifying Output filter", async () => { });
    await io.homePage.loadingTime();
    await io.homePage.click(
      selectors.flowBuilderPagePO.EXPORT_FILTER
    );
    await io.homePage.loadingTime();
    test.step("Verifying the popup", async () => { });
     await io.assert.verifyElementNotToBeClickable(selectors.basePagePO.SAVE);
    await io.homePage.click(selectors.basePagePO.CLOSE_RIGHT_DRAWER);
    test.step("Opening Hooks", async () => { });
    await io.homePage.loadingTime();
    await io.homePage.click(
      "[data-test='exportHooks']"
    );

    await io.homePage.loadingTime();
     await io.assert.verifyElementNotToBeClickable(selectors.basePagePO.SAVE);
    await io.flowBuilder.click(selectors.basePagePO.CLOSE_RIGHT_DRAWER);
    await io.api.deleteFlowsWithId([flowId]);
  });

  test("@Env-All @Zephyr-IO-T2854| Verify on Input filter, Mappings, Proceed on failure and Results mappings ", async ({ io, page }) => {
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
     await io.assert.verifyElementNotToBeClickable(selectors.basePagePO.SAVE);
    await io.homePage.click(selectors.exportsPagePO.CLOSE_PARSER_HELPER);

    await io.homePage.loadingTime();
    test.step("Opening Input mappings", async () => { });
    await io.homePage.clickByIndex(
      selectors.flowBuilderPagePO.IMPORT_MAPPINGS, 0
    );
    await io.homePage.loadingTime();
    test.step("Verifying the popup", async () => { });
     await io.assert.verifyElementNotToBeClickable(selectors.basePagePO.SAVE);
    await io.homePage.click(selectors.exportsPagePO.CLOSE_PARSER_HELPER);

    await io.homePage.loadingTime();
    test.step("Modifying Proceed on failure", async () => { });
    await io.homePage.clickByIndex(
      selectors.flowBuilderPagePO.ADD_DATA_PROCESSOR, 1
    )
    await io.homePage.click(
      selectors.flowBuilderPagePO.INPUT_FILTER
    );
     await io.assert.verifyElementNotToBeClickable(selectors.basePagePO.SAVE);
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
     await io.assert.verifyElementNotToBeClickable(selectors.basePagePO.SAVE);
    await io.homePage.click(selectors.basePagePO.CLOSE_RIGHT_DRAWER);
    await io.api.deleteFlowsWithId([flowId]);
  });

  test("@Env-All @Zephyr-IO-T2854| Verify on Scripts", async ({ io, page }) => {
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
  const save = await page.locator(selectors.basePagePO.SAVE).nth(1);
    await expect(save).toBeDisabled();
    await io.api.deleteFlowsWithId([flowId]);
  });

  test("@Env-All @Zephyr-IO-T2854| Verify Export and Import Form builders", async ({ io, page }) => {
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
    await io.flowBuilderDashboard.navigateToFlowBuilderInFB(flowId);
    await io.homePage.loadingTime();
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
    const save1 = await page.locator(selectors.basePagePO.SAVE).nth(1);
    await expect(save1).toBeDisabled();
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
    const save = await page.locator(selectors.basePagePO.SAVE).nth(1);
    await expect(save).toBeDisabled();
    await io.api.deleteFlowsWithId([flowId]);

  });

});

