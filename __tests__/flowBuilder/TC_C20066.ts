import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import TC from "@testData/FlowBuilder/TC_C20066.json";
import TC2 from "@testData/FlowBuilder/TC_C30589.json";
import TC3 from "@testData/FlowBuilder/TC_C27333.json";
test.describe("TC_C20066", () => {
  let flowId, flowId1;

  test("@Env-All @Zephyr-IO-T2931", async ({ io, page }) => {
    await io.api.createImpOrExpAndFlowsThruAPI(TC);
    await io.homePage.loadingTime();
    flowId = await io.api.getFlowId(TC.name);
    await io.flowBuilderDashboard.navigateToFlowBuilderInFB(flowId);
    await test.step(
      "***Navigated To FlowBuilder For The Created Flow***"
      , async () => { });
    await io.homePage.click(
      selectors.flowBuilderPagePO.EXPORT
    );
    test.step("***Clicked On Export***", async () => { });
    await io.homePage.click(
      selectors.importPagePO.CLICKPREVIEW
    );
    await io.homePage.loadingTime();
    var text = await page.$(
      selectors.mappings.PREVIEW_RESULT
    );
    await io.homePage.loadingTime();
    await test.step(
      "***Preview Is Working Fine And Is Showing The Proper Result***"
      , async () => { });
    expect(await text.isVisible()).toBeTruthy();
  });
  test("@Env-All @Zephyr-IO-T2967", async ({ io, page }) => {
    await io.api.createImpOrExpAndFlowsThruAPI(TC);
    await io.homePage.loadingTime();
    flowId = await io.api.getFlowId(TC.name);
    await io.flowBuilderDashboard.navigateToFlowBuilderInFB(flowId);
    await io.homePage.loadingTime();
    test.step("***Navigated To Flows Page***", async () => { });
    await io.homePage.click(selectors.flowBuilderPagePO.AUDIT_LOGS);
    await io.homePage.clickByText(
      'Select resource type'
    );
    await io.homePage.click(
      "[data-value='import']"
    );
    await io.homePage.loadingTime();
    await io.homePage.clickByText(
      "Select action"
    );
    await io.homePage.loadingTime();
    await io.homePage.click(
      "[data-value='delete']"
    );
    test.step("***Selected Resource Type As Import***", async () => { });
    await io.homePage.loadingTime();
    expect(await page.getByText("You don't have any audit logs.").isVisible()).toBeTruthy();
    await test.step(
      "***You don't have any audit logs. Is Shown When There Are No Audit Logs***"
      , async () => { });
    await io.api.deleteFlowsWithId([flowId]);
  });
  test("@Env-All @Zephyr-IO-T2959", async ({ io }) => {
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.loadingTime();
    await io.homePage.clickCreateIntegrationButton();
    await io.homePage.loadingTime();
    test.step("***Clicked On Create New Integration***", async () => { });
    var result = await io.assert.checkElementState(
      selectors.flowGroupingPagePO.ALERT_MESSAGE
      , "isVisible");
    test.step("***Error Popup Is Not Displayed***", async () => { });
    expect(result).toBeFalsy();
    await io.goToFlowsPage();
    await io.homePage.loadingTime();
    await io.flowBuilder.clickCreateFlowButton();
    await io.homePage.loadingTime();
    test.step("***Clicked On Create New Flow***", async () => { });
    var result1 = await io.assert.checkElementState(
      selectors.flowGroupingPagePO.ALERT_MESSAGE
      , "isVisible");
    test.step("***Error Popup Is Not Displayed***", async () => { });
    expect(result1).toBeFalsy();
  });
  test("@Env-All @Zephyr-IO-T3045", async ({ io }) => {
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    let intId = await io.homePage.clickCreateIntegrationButton();
    await io.homePage.loadingTime();
    await io.homePage.fill(
      selectors.basePagePO.NAME,
      "C33014"
    );
    await io.homePage.click(selectors.basePagePO.SAVE_AND_CLOSE);
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.loadingTime();
    await io.homePage.loadingTime();
    test.step("Clicked on list view.", async () => { });
    await io.homePage.fillWebPage(
      selectors.integrationPagePO.HOME_SEARCH,
      "C33014"
    );
    await io.homePage.loadingTime();
    await io.homePage.click(
      selectors.homePagePO.LIST_VIEW
    );
    await io.homePage.loadingTime();
    test.step("Entered value in search area.", async () => { });
    await io.homePage.click(
      selectors.connectionsPagePO.ACTIONS_MENU_BUTTON
    );
    test.step("Click on Action menu.", async () => { });
    await io.homePage.click(selectors.integrationPagePO.PIN_INTEGRATION);
    test.step("Click on Pin integration.", async () => { });
    await io.homePage.loadingTime();
    await io.homePage.reloadPage();
    await io.homePage.loadingTime();
    var logoPin = await io.homePage.isVisible(
      "table > tbody > tr > th svg"
    );
    await io.assert.expectToBeTrue(logoPin, "");
    await test.step(
      "pinned integrations are displayed by 'Pin' icon test.beforeEach the Name."
      , async () => { });
    await io.homePage.click(
      selectors.connectionsPagePO.ACTIONS_MENU_BUTTON
    );
    await io.homePage.click(
      selectors.integrationPagePO.UNPIN_INTEGRATION
    );
    await io.homePage.loadingTime();
    await io.api.deleteIntegration(intId);
  });

  test("@Env-All @Zephyr-IO-T2891", async ({ io, page }) => {
    await io.api.createImpOrExpAndFlowsThruAPI(TC2);
    flowId1 = await io.api.getFlowId(TC2.name);
    await test.step(
      "Created Flow(mysql Import) " + TC2.name + " With ID " + flowId1
      , async () => { });
    await io.flowBuilderDashboard.navigateToFlowBuilderInFB(flowId1);
    await test.step(
      "***Navigated To FlowBuilder For The Created Flow***"
      , async () => { });
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.flowBuilderPagePO.IMPORT);
    test.step("***Opened mysql Imports Page***", async () => { });
    await io.homePage.loadingTime();
    await io.homePage.click(
      selectors.flowBuilderPagePO.IGNORE_EXISTING
    );
    await io.homePage.loadingTime();
    test.step("***Checked The Existing Records***", async () => { });

    await io.homePage.click(
      selectors.importPagePO.SPECIFIC_FIELD_POPULATED
    );
    await io.homePage.loadingTime();
    await test.step(
      "***Clicked On Records Have A Specific Field Populated ***"
      , async () => { });
    await io.homePage.click(selectors.importPagePO.SOURCE_VALUE);
    await io.homePage.loadingTime();
    await page.getByText("Records have a specific field populated").isVisible();

    await io.homePage.click(
      selectors.importPagePO.SPECIFIC_FIELD_POPULATED
    );
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.importPagePO.DYNAMICLOOKUP);
    await io.homePage.loadingTime();
    await page.getByText("Run a dynamic lookup").isVisible();
    await io.api.deleteFlowsWithId([flowId1]);
  });
  test("@Env-All @Zephyr-IO-T2818", async ({ io, page }) => {
    await io.api.createImpOrExpAndFlowsThruAPI(TC3);
    flowId1 = await io.api.getFlowId(TC3.name);
    await test.step(
      "Created Flow(PG Of Type Listener) " + TC3.name + " With ID " + flowId1
      , async () => { });
    await io.flowBuilderDashboard.navigateToFlowBuilderInFB(flowId1);
    await test.step(
      "***Navigated To FlowBuilder For The Created Flow***"
      , async () => { });
    await io.homePage.click(
      selectors.flowBuilderPagePO.LISTENER
    );
    await test.step(
      "***Navigated To The Netsuite Listener Export Page***"
      , async () => { });
    await io.homePage.click(
      selectors.importPagePO.ADVANCED
    );
    await io.homePage.loadingTime();
    test.step("***Clicked On Advanced Section***", async () => { });
    expect(await page.locator('[name="/traceKeyTemplate"]').isVisible()).toBeTruthy();
    await test.step(
      "***Override Trace Key Template Is Present In The Advanced Section***"
      , async () => { });
    await io.api.deleteFlowsWithId([flowId1]);
  });
  test("@Env-All @Zephyr-IO-T2995", async ({ io, page }) => {
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    test.step("***Navigated To Home Page***", async () => { });
    await io.homePage.isPageReady();
    expect(await page.locator(selectors.homePagePO.TILE_VIEW).isVisible()).toBeTruthy();
    expect(await page.locator(selectors.homePagePO.LIST_VIEW).isVisible()).toBeTruthy();
  });
});
