import { test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import TC from "@testData/FlowBuilder/TC_C28110.json";

test.describe("TC_C28110 | Verify if 'Save and Close' button is getting hidden after clicking on 'Save'", () => {
  let flowId;
  test.beforeEach(async ({ io }) => {
    test.step("Navigating to Homepage", async () => { });
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });

  test.afterEach(async ({ io }) => {
    test.step("Navigating to Homepage", async () => { });
    await io.api.deleteFlowsWithId([flowId]);
  });


 test("@Env-All @Zephyr-IO-T2852| Verify on Settings and Launch form builder under settings", async ({ io, page }) => {
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
    await page.locator(selectors.basePagePO.SAVE).nth(1).click();
    // await io.homePage.click(save);
    await io.homePage.loadingTime();
    // const save = await page.locator(selectors.basePagePO.SAVE_AND_CLOSE);
    await io.assert.verifyElementNotBeFound(selectors.basePagePO.SAVE_AND_CLOSE);
    await io.homePage.click(selectors.exportsPagePO.CLOSE_PARSER_HELPER);
    await io.homePage.loadingTime();

    test.step("Verifying the popup", async () => { });
    test.step("Modifying name on Settings", async () => { });
    await io.homePage.fill(
      selectors.connectionsPagePO.NAME_INPUT,
      "TC_C28123_FLOW"
    );
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.basePagePO.SAVE);
    await io.homePage.loadingTime();
    await io.assert.verifyElementNotBeFound(selectors.basePagePO.SAVE_AND_CLOSE);
    await io.api.deleteFlowsWithId([flowId]);
  });


  test("@Env-All @Zephyr-IO-T2852| Verify on Flow schedule and Flow schedule override", async ({ io, page }) => {
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
    await io.homePage.click(selectors.basePagePO.SAVE);
    await io.homePage.loadingTime();
    await io.assert.verifyElementNotBeFound(selectors.basePagePO.SAVE_AND_CLOSE);
    await io.homePage.click(selectors.basePagePO.CLOSE);
    await io.homePage.loadingTime();
    test.step("Modifying Flow schedule override", async () => { });
    await io.homePage.clickByIndex(
      selectors.flowBuilderPagePO.ADD_DATA_PROCESSOR, 0
    );
    await io.homePage.loadingTime();
    await io.homePage.click(
      "[data-test='exportSchedule']"
    );
    await io.homePage.loadingTime();
    await io.homePage.click(
      '[id="preset"]'
    );

    test.step("Verifying the popup", async () => { });
  await io.homePage.click(selectors.basePagePO.SAVE);
    await io.homePage.loadingTime();
    await io.assert.verifyElementNotBeFound(selectors.basePagePO.SAVE_AND_CLOSE);
    await io.homePage.click(selectors.basePagePO.CLOSE);
    await io.api.deleteFlowsWithId([flowId]);
  });

  test("@Env-All @Zephyr-IO-T2852| Verify on Tranformation, Output filter, Hooks and Hook's Scipt editor", async ({ io, page }) => {
    await io.api.createImpOrExpAndFlowsThruAPI(TC);
    await io.homePage.loadingTime();
    flowId = await io.api.getFlowId(TC.name);
    console.log("flowId", flowId);
    await io.homePage.loadingTime();
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
    await io.homePage.clickButtonByIndex(selectors.flowBuilderPagePO.DELETE_MAPPING, 0);

    test.step("Verifying the popup", async () => { });
   await io.homePage.click(selectors.basePagePO.SAVE);
    await io.homePage.loadingTime();
    await io.assert.verifyElementNotBeFound(selectors.basePagePO.SAVE_AND_CLOSE);
    await io.homePage.click(selectors.basePagePO.CLOSE);
    await io.homePage.loadingTime();

    test.step("Modifying Output filter", async () => { });
    await io.homePage.loadingTime();
    await io.homePage.click(
      selectors.flowBuilderPagePO.EXPORT_FILTER
    );
    await io.homePage.click(
      "[data-not='group']"
    );

    test.step("Verifying the popup", async () => { });
   await io.homePage.click(selectors.basePagePO.SAVE);
    await io.homePage.loadingTime();
    await io.assert.verifyElementNotBeFound(selectors.basePagePO.SAVE_AND_CLOSE);
    await io.homePage.click(selectors.basePagePO.CLOSE);
    test.step("Opening Hooks", async () => { });
    await io.homePage.loadingTime();
    await io.homePage.click(
      "[data-test='exportHooks']"
    );
    await io.homePage.click(
      '[data-test="stack"]'
    );
    await io.homePage.loadingTime();
  await io.homePage.click(selectors.basePagePO.SAVE);
    await io.homePage.loadingTime();
    await io.assert.verifyElementNotBeFound(selectors.basePagePO.SAVE_AND_CLOSE);
    await io.homePage.click(selectors.basePagePO.CLOSE);
    await io.api.deleteFlowsWithId([flowId]);

  });

  
  test("@Env-All @Zephyr-IO-T2852| Verify on Input filter, Mappings, Proceed on failure and Results mappings ", async ({ io, page }) => {
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
    await io.homePage.loadingTime();
  await io.homePage.click(selectors.basePagePO.SAVE);
    await io.homePage.loadingTime();
    await io.assert.verifyElementNotBeFound(selectors.basePagePO.SAVE_AND_CLOSE);
    await io.homePage.click(selectors.basePagePO.CLOSE);

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
    await io.homePage.loadingTime();
  await io.homePage.click(selectors.basePagePO.SAVE);
    await io.homePage.loadingTime();
    await io.assert.verifyElementNotBeFound(selectors.basePagePO.SAVE_AND_CLOSE);
    await io.homePage.click(selectors.basePagePO.CLOSE);

    await io.homePage.loadingTime();
    test.step("Modifying Proceed on failure", async () => { });
    await io.homePage.clickByIndex(
      selectors.flowBuilderPagePO.ADD_DATA_PROCESSOR, 1
    )
    await io.homePage.click(
      "[data-test='proceedOnFailure']"
    );
    await io.homePage.loadingTime();
    await io.homePage.click(
      "[data-test='true']"
    );
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.basePagePO.SAVE);
    await io.homePage.loadingTime();
    await io.assert.verifyElementNotBeFound(selectors.basePagePO.SAVE_AND_CLOSE);
    await io.homePage.click(selectors.basePagePO.CLOSE);
    await io.homePage.loadingTime();
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

    await io.homePage.click(selectors.basePagePO.SAVE);
    await io.homePage.loadingTime();
    await io.assert.verifyElementNotBeFound(selectors.basePagePO.SAVE_AND_CLOSE);
    await io.homePage.click(selectors.basePagePO.CLOSE);
    await io.api.deleteFlowsWithId([flowId]);
  });

  test("@Env-All @Zephyr-IO-T2852| Verify on Scripts", async ({ io, page }) => {
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
    await page.locator(selectors.basePagePO.SAVE).nth(1).click();
    // await io.homePage.click(save);
    await io.homePage.loadingTime();
    await io.homePage.loadingTime();
    // const save = await page.locator(selectors.basePagePO.SAVE_AND_CLOSE);
    await io.assert.verifyElementNotBeFound(selectors.basePagePO.SAVE_AND_CLOSE);
    
    await io.api.deleteFlowsWithId([flowId]);
    // await io.homePage.click(selectors.exportsPagePO.CLOSE_PARSER_HELPER);
    // await io.homePage.loadingTime();
  });

  test("@Env-All @Zephyr-IO-T2852| Verify Export and Import Form builders", async ({ io, page }) => {
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
    await page.locator(selectors.basePagePO.SAVE).nth(1).click();
    // await io.homePage.click(save);
    await io.homePage.loadingTime();
    await io.homePage.loadingTime();
    // const save = await page.locator(selectors.basePagePO.SAVE_AND_CLOSE);
    await io.assert.verifyElementNotBeFound(selectors.basePagePO.SAVE_AND_CLOSE);
    await io.homePage.click(selectors.exportsPagePO.CLOSE_PARSER_HELPER);
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
    const editor1 = await page.locator(
      '[id="data"] .ace_content'
    );
    await editor1.dblclick();

    await page.keyboard.press("Meta+A");
    await page.keyboard.press("Delete");
    await io.homePage.loadingTime();
    await page.locator(selectors.basePagePO.SAVE).nth(1).click();
    // await io.homePage.click(save);
    await io.homePage.loadingTime();
    // const save = await page.locator(selectors.basePagePO.SAVE_AND_CLOSE);
    await io.assert.verifyElementNotBeFound(selectors.basePagePO.SAVE_AND_CLOSE);
    await io.api.deleteFlowsWithId([flowId]);
    // await io.homePage.click(selectors.exportsPagePO.CLOSE_PARSER_HELPER);

  });

});