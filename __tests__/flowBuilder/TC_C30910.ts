import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import TC from "@testData/FlowBuilder/TC_C30910.json";

test.describe("TC_C30910", () => {
  let flowId;
  test.beforeEach(async ({io}) => {
    test.step("*** Beginning of Test Suite ***", async ()=>{});
    await io.goToFlowsPage();
    await io.homePage.loadingTime();
  });

  test.afterEach(async ({io}) => {
    test.step("*** Delete Flow Using UI***", async ()=>{});
    await io.api.deleteFlowsWithId([flowId]);
  });

  test("@Env-All @Zephyr-IO-T2911 | Able to save the static lookup in DB imports even when the values are not mapped. ", async ({io, page}) => {
    await io.api.createImpOrExpAndFlowsThruAPI(TC);
    flowId = await io.api.getFlowId(TC.name);
    await io.homePage.loadingTime();
    await test.step("Created Flow " + TC.name + " With ID " + flowId, async ()=>{});
    await io.api.runBatchFlowViaAPI(TC.name, flowId);
    await io.homePage.loadingTime();
    await io.flowBuilderDashboard.navigateToFlowBuilderInFB(flowId, true);
    await io.homePage.loadingTime();
    await io.homePage.loadingTime();

    await io.homePage.clickByIndex(selectors.flowBuilderPagePO.IMPORT,0);
    await io.homePage.loadingTime();
    test.step("Opening Handlebar editor", async ()=>{});
    await io.homePage.click(
      selectors.flowBuilderPagePO.OPENAI.OPEN_HANDLEBARS_EDITOR
    );
    await io.homePage.loadingTime();
    test.step("Selecting Manage lookups", async ()=>{});
    await io.homePage.click(
      selectors.flowBuilderPagePO.DBLOOKUP
    );
    await io.homePage.loadingTime();
    await io.flowBuilderDashboard.clickByIndex(
      selectors.integrationPagePO.OPENACTIONSMENU,2
    );
    await io.homePage.loadingTime();
    await io.homePage.clickByText(
      "Edit lookup"
    );
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.mappings.STATICLOOKUPEXPORT);
    await io.homePage.click(selectors.flowBuilderPagePO.DELETE_FIELD);
    await io.homePage.loadingTime();
    expect(await page.getByText('A value must be provided').isVisible()).toBeTruthy();
    await io.homePage.loadingTime();
    await io.flowBuilderDashboard.clickByIndex(selectors.basePagePO.CLOSE,2);
    await io.flowBuilder.click(selectors.basePagePO.DISCARD_CHANGES);
    await io.homePage.loadingTime();
    await io.flowBuilderDashboard.clickByIndex(selectors.flowBuilderPagePO.CLOSEXBUTTON,0);
    await io.homePage.loadingTime();
    await io.flowBuilderDashboard.clickByIndex(selectors.basePagePO.CLOSE,1);
    await io.homePage.loadingTime();
    await io.flowBuilderDashboard.click(selectors.basePagePO.CLOSE);
    await io.homePage.loadingTime();
    await io.homePage.clickButtonByIndex(selectors.flowBuilderPagePO.IMPORT_MAPPINGS, 0);
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.mappings.DEFAULT_MAPPING_TYPE.FIELD_MAPPING_SETTING);
    await io.homePage.click(selectors.mappings.MAPPER2DOT0PO.LOOKUP);
    await io.homePage.click(selectors.mappings.MAPPER2DOT0PO.STATICLOOKUP);
    await io.homePage.fill(selectors.mappings.MAPPER2DOT0PO.LOOKUP_NAME,"HTTPLookup");
    await io.flowBuilderDashboard.click(selectors.basePagePO.SAVE_AND_CLOSE);
    let alertText = "You need to map at least one value.";
    expect(await page.getByText(alertText).isVisible()).toBeTruthy();
  });
});
