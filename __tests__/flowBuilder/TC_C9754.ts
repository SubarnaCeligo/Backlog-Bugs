import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import TC from "@testData/FlowBuilder/TC_C9754.json";

test.describe("@Env-All @Zephyr-IO-T2753 | @Env-All @Zephyr-IO-T2822 ", () => {
  let flowId;
  test.beforeEach(async ({ io }) => {
    await io.goToFlowsPage();
    test.step("*** Go to flows page ***", async () => { });
    await io.homePage.loadingTime();
  });


    test("@Env-All @Zephyr-IO-T2753| Flow Builder - Response mapping field is not showing in import lookup preview.", async ({io,page}, testInfo) => {
      var flows = await io.api.createImpOrExpAndFlowsThruAPI(TC);
      flowId = await flows.get(TC.name)["flowId"];
  await test.step(
        "Created Flow " + TC.name + " With ID " + flowId
  , async ()=>{});
      await io.flowBuilderDashboard.navigateToFlowBuilderInFB(
        flows.get(TC.name)["flowId"]
      );
      await io.homePage.loadingTime();

      test.step("Opened Flowbuilder of flow. ", async ()=>{});

      await io.homePage.clickButtonByIndex(
        selectors.flowBuilderPagePO.IMPORT,
        1
      );
      await io.homePage.loadingTime();
      test.step("Opened NS Import of flow. ", async ()=>{});
      await io.homePage.click(
        selectors.flowBuilderPagePO.FILTER_UPDATE
      );
      await io.homePage.click(
        selectors.flowBuilderPagePO.FILTER_TYPE
      );
      let items = await io.homePage.getText(
        selectors.flowBuilderPagePO.FILTER_TYPE
      );
      items = JSON.stringify(items).replace(/[\n\s+]/g, "");
      await io.assert.expectToContainValue("status_code",items, "");
      await io.assert.expectToContainValue("ID",items, "");
      await io.api.deleteFlowsWithId([flowId]);
  await test.step(
        "Verified Response Mapping Fields Are Shown In Import Lookup Preivew. "
  , async ()=>{});
    });

  test("@Env-All @Zephyr-IO-T2822 | Verify original trackey is used when not given any value to the Override trace key template  ", async ({ io, page }, testInfo) => {
    var flows = await io.api.createImpOrExpAndFlowsThruAPI(TC);
    flowId = await flows.get(TC.name)["flowId"];
    await io.flowBuilderDashboard.navigateToFlowBuilderInFB(flowId);
    test.step("Opened Flowbuilder of flow. ", async () => { });

    await io.homePage.loadingTime();
    await io.homePage.click(
      selectors.flowBuilderPagePO.EXPORT
    );
    await io.homePage.click(
      selectors.mappings.MAPPER2DOT0PO.ADVANCED
    );
    await io.homePage.loadingTime();
    await io.homePage.click(
      selectors.importPagePO.IMPORT_CLOSE_DRAWER
    );
    await io.homePage.loadingTime();

    await io.homePage.clickButtonByIndex(
      selectors.flowBuilderPagePO.IMPORT,
      0
    );
    await io.homePage.loadingTime();
    await io.homePage.click(
      selectors.importPagePO.CLICKPREVIEW
    );
    test.step("Click on the Preview button", async () => { });
    await io.homePage.loadingTime();
    let data = (await io.homePage.getText(selectors.flowBuilderPagePO.PARSED_OP_VALUE)).toString();

    const idVal = data.split(',')[0];

    const id = idVal.replace(/"/g, '');
    console.log(id);
    await io.homePage.click(
      selectors.importPagePO.IMPORT_CLOSE_DRAWER
    );

    await io.homePage.click(selectors.basePagePO.RUNFLOW);
    await io.homePage.loadingTime();
    const lastRun = page.getByText('Last run');
    await lastRun.waitFor({ state: 'visible', timeout: 360000 });
    await io.homePage.clickByTextByIndex('1 error', 0);
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.flowBuilderPagePO.PANELICON);
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.flowBuilderPagePO.LIST_VIEW_ERRORS);
    await io.homePage.loadingTime();
    await io.homePage.clickByIndex(selectors.integrationPagePO.OPENACTIONSMENU, 3);
    await io.homePage.loadingTime();
    await io.homePage.click(
      selectors.flowBuilderPagePO.VIEWERROR
    );
    await io.homePage.loadingTime();
    const recentData = (await io.homePage.getText(selectors.basePagePO.ACE_EDITOR_ID + " .ace_layer.ace_text-layer")).toString();
    const recentTraceKey = recentData
      .match(/(?<=Trace\s*key\s*:).*/g)?.[0]
      ?.trim();
    await io.homePage.loadingTime();
    expect(recentTraceKey).toEqual(id);
    await io.api.deleteFlowsWithId([flowId]);
  });
});
