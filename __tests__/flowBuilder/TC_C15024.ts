import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import TC from "@testData/FlowBuilder/TC_C15024.json";

test.describe("TC_C15024", () => {
  let flowId;
  test.beforeEach(async ({ io }) => {
    test.step("*** Navigate to Home Page ***", async () => { });
    await io.goToFlowsPage();
    await io.homePage.loadingTime();
  });

  test.afterEach(async ({io}) => {
    await io.api.deleteFlowsWithId([flowId]);
    test.step("** Deleted flow **", async ()=>{});
  });

  test("@Env-All @Zephyr-IO-T2945| To verify the title is sentence case for all the editors", async ({ io, page }) => {
    //Create Flows
    await io.api.createImpOrExpAndFlowsThruAPI(TC);
    flowId = await io.api.getFlowId(TC.name);
    await io.flowBuilderDashboard.navigateToFlowBuilderInFB(flowId);

    await io.homePage.loadingTime();
    //Click on respose mapping icon
    await io.homePage.click(
      selectors.mappings.DEFAULT_MAPPING_TYPE.RESPONSE_MAPPING
    );
    await io.homePage.loadingTime();
    test.step("*** Go to response mappings ***", async () => { });
    expect(await page.getByText('Edit response mapping').isVisible()).toBeTruthy();
    await io.homePage.click(
      selectors.basePagePO.CLOSE_RIGHT_DRAWER
    );
    await io.homePage.loadingTime();
    await io.homePage.click(
      selectors.flowBuilderPagePO.IMPORT_MAPPINGS
    );
    await test.step("*** Checked the condition of first Upper case in Response mapping ***", async () => { });

    await io.homePage.loadingTime();
    test.step("*** Go to import mappings ***", async () => { });
    await test.step("*** Checked the condition of first Upper case in Import mapping ***", async () => { });
    const drawerHeader = await page.locator(selectors.flowBranchingPO.AFE_HEADINGS).nth(1);
    const result2 = await drawerHeader.textContent();
    await io.assert.expectToContainValue("Edit mapping:",result2, "");

    await io.homePage.clickByIndex(
      selectors.basePagePO.CLOSE_RIGHT_DRAWER,
      1
    );
    await io.homePage.click(
      selectors.flowBuilderPagePO.INPUT_FILTER
    );
    await io.homePage.loadingTime();
    test.step("*** Go to input filter ***", async () => { });
    expect(await page.getByText('Define input filter').isVisible()).toBeTruthy();
    await test.step("*** Checked the condition of first Upper case in Input Filter ***", async () => { });

    await io.homePage.click(
      selectors.basePagePO.CLOSE_RIGHT_DRAWER
    );
    await io.homePage.clickByIndex(
      selectors.basePagePO.ADD_DATA_PROCESSOR, 0
    );
    await io.homePage.click(
      selectors.flowBuilderPagePO.EXPORT_FILTER
    );
    await io.homePage.loadingTime();
    test.step("*** Go to output filter ***", async () => { });
    expect(await page.getByText('Define output filter').isVisible()).toBeTruthy();
    await test.step("*** Checked the condition of first Upper case in OutPut Filter ***", async () => { });
    await io.homePage.click(
      selectors.basePagePO.CLOSE_RIGHT_DRAWER
    );
    await io.homePage.clickByIndex(
      selectors.basePagePO.ADD_DATA_PROCESSOR, 0
    );
    await io.homePage.click(
      selectors.flowBuilderPagePO.EXPORT_HOOK
    );
    await io.homePage.loadingTime();
    test.step("*** Go to Hooks ***", async () => { });
    const header = await page.locator(selectors.flowBranchingPO.AFE_HEADINGS);
    expect(header).toContainText("Hooks");
    await test.step("*** Checked the condition of first Upper case in Hooks ***", async () => { });
  });
});
