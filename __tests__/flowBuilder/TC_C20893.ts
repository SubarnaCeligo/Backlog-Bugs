import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import TC from "@testData/FlowBuilder/TC_C20893.json";

test.describe("TC_C20893", () => {
  let flowId;
  test.beforeEach(async ({ io }) => {
    test.step("*** Beginning of Test Suite ***", async () => { });
    await io.goToFlowsPage();
    await io.homePage.loadingTime();
  });
  test("@Env-All @Zephyr-IO-T2783|To verify pressing Esc does not close the mapping drawer", async ({ io, page }) => {
    //Create Flows
    await io.api.createImpOrExpAndFlowsThruAPI(TC);
    flowId = await io.api.getFlowId(TC.name);
    await io.flowBuilder.navigateToTheFlow(flowId);
    await io.homePage.loadingTime();

    await io.homePage.click(
      selectors.flowBuilderPagePO.IMPORT_MAPPINGS
    );

    test.step("*** clicking on import mapping ***", async () => { });

    await io.homePage.click(
      selectors.mappings.DEFAULT_MAPPING_TYPE.FIELD_MAPPING_GENERATE
    );

    test.step("*** clicking on first mapping ***", async () => { });

    await page.keyboard.press('Escape');
    test.step("*** pressing the escapkey ***", async () => { });
    await io.homePage.loadingTime();
    expect(await page.getByText('Edit mapping:')).toBeTruthy();
    await test.step(
      "*** verifying that the Edit mapping drawer is still open ***"
      , async () => { });
    await io.api.deleteFlowsWithId([flowId]);

  });
});
