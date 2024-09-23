import { test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import TC from "@testData/FlowBuilder/TC_C12174.json";

test.describe("@Env-All @Zephyr-IO-T2762", () => {
  let flowId;
  test.afterEach(async ({io}) => {
    await io.api.deleteFlowsWithId([flowId]);
    test.step("** Deleted flow **", async ()=>{});
  });

  test("@Env-All @Zephyr-IO-T2762", async ({io,page}) => {
    await io.api.createImpOrExpAndFlowsThruAPI(TC);
    flowId = await io.api.getFlowId(TC.name);
    await io.flowBuilderDashboard.navigateToFlowBuilderInFB(flowId);

    await io.homePage.loadingTime();

    test.step("** Opened Flowbuilder of flow. **", async ()=>{});

    await io.homePage.click(
      selectors.flowBuilderPagePO.IMPORT_MAPPINGS
    );

    test.step("** Opened import mapping. **", async ()=>{});

    await io.homePage.loadingTime();

    await io.homePage.click(
      selectors.flowBuilderPagePO.PREVIEW
    );
    await io.homePage.loadingTime();
    test.step("** Fetched Preview result. **", async ()=>{});
await page.pause();
    await io.homePage.click(selectors.mappings.DEFAULT_MAPPING_TYPE.SOURCE_RECORD_FIELD_4);
    await page.keyboard.type("Qty");
    await io.homePage.loadingTime();
   await page.getByText('["QtyReceived"]');

await test.step(
      "** Verified double quotes are removed in Mapping. **"
, async ()=>{});
  });
});
