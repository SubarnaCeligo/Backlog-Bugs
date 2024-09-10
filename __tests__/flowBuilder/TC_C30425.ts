import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import TC from "@testData/FlowBuilder/TC_C30425.json";

test.describe("@Env-All @Zephyr-IO-T3086 |@Env-All @Zephyr-IO-T2986|@Env-All @Zephyr-IO-T2969", () => {
    let flows;
  test("@Env-All @Zephyr-IO-T3086 | Verify that User should be able to delete and add the nodes in transform rules", async ({io,page}, testInfo) => {
    flows = await io.api.createImpOrExpAndFlowsThruAPI(TC);
    test.step("*** Navigating to Flow Builder ***", async ()=>{});
    await io.flowBuilderDashboard.navigateToFlowBuilderInEM2(
      flows.get(TC.name)["flowId"]
    );
    await io.homePage.loadingTime();
    await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.ADD_DATA_PROCESSOR);
    await io.flowBuilder.click(selectors.flowBuilderPagePO.ADD_DATA_PROCESSOR);
    test.step("*** Opening Transformation pannel ***", async ()=>{});
    await io.homePage.click(
      selectors.flowBuilderPagePO.EXPORT_TRANSFORMATION
    );

    test.step("*** Deleting first field ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.click(
      selectors.mappings.DELETEFIRST
    );
    test.step("*** Adding a field ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.mappings.MAPPER2DOT0PO.EXTRACTFIRST);
    await io.homePage.clickByText("shipcity");
    await io.homePage.click(selectors.flowBuilderPagePO.TRANSFORMGENERATE);
    await page.keyboard.type('shipcity');
    test.step("*** Clicking on Preview ***", async ()=>{});
    await io.homePage.click(
      selectors.flowBuilderPagePO.PREVIEW
    );
    await io.homePage.loadingTime();
    await io.homePage.click(
      selectors.basePagePO.SAVE_AND_CLOSE
    );
  });

  test("@Env-All @Zephyr-IO-T2986 | Verify if the destination lookup option contains 2 words as 'Look up'", async ({io}) => {
    await io.myAccountPage.navigateTo(io.data.links.MY_ACCOUNT_PAGE_URL);
    await io.homePage.goToMenu("Tools", "Flow builder");
    test.step("*** Opening Import ***", async ()=>{});
    await io.homePage.click(
      selectors.flowBuilderPagePO.ADD_DESTINATION_OR_LOOKUP
    );

    test.step("*** Selecting application ***", async ()=>{});
    await io.homePage.click(selectors.flowBuilderPagePO.HTTP_FORM_SWITCH);
    test.step("*** Selected HTTP as the adaptor ***", async ()=>{});

await test.step(
      "*** Clicking on 'What would you like to do?' field ***"
, async ()=>{});

    const field1 = await io.homePage.getText(
      selectors.flowBuilderPagePO.SELECT_LOOKUP
    );
    const field2 = await io.homePage.getText(
      selectors.mappings.LOOKUP_RECORD
    );
    await io.homePage.click(
      selectors.mappings.LOOKUP_RECORD
    );
    await io.homePage.click(selectors.basePagePO.CLOSE);

    test.step("*** Verifying Lookup options ***", async ()=>{});
    expect(field1).toContain("Look up");
    expect(field2).toContain("Look up");
  });

  test.describe("@Env-All @Zephyr-IO-T2969|Verify if the tooltip text is visible clearly and readable.", () => {
    let flowId;
    test("@Env-All @Zephyr-IO-T2969| Verify if the tooltip text is visible clearly and readable", async ({io,page}, testInfo) => {
      await io.api.createImpOrExpAndFlowsThruAPI(TC);
      flowId = await io.api.getFlowId(TC.name);
      await io.flowBuilderDashboard.navigateToFlowBuilderInFB(flowId);
      await io.homePage.loadingTime();
  await test.step(
        "*** Clicking on the Add(+) icon on export ***"
  , async ()=>{});
      await io.homePage.click(
        selectors.flowBuilderPagePO.ADD_DATA_PROCESSOR
      );
      const exportTransformation = await page.locator(
        selectors.flowBuilderPagePO.EXPORT_TRANSFORMATION
      );
      await exportTransformation.hover();
      var flowText = await io.homePage.getText(
          selectors.mappings.TOOLTIP
        );
      expect(flowText).toBeTruthy;
      expect(flowText).toContain("Define a ‘transformation’ here to rename fields, remove fields, and/or structurally optimize records returned by the export before the records are passed along to downstream applications.");
  
      const exportFilter = await page.locator(
          selectors.flowBuilderPagePO.EXPORT_FILTER
        );
        await exportFilter.hover();
        var flowText2 = await io.homePage.getText(
          selectors.mappings.TOOLTIP
          );
        expect(flowText2).toBeTruthy;
        expect(flowText2).toContain("Define an ‘output filter’ here to specify which records returned by the export should get passed along to downstream applications. i.e. Records that evaluate to true are passed along. Records that evaluate to false are discarded.");
  
        const exportHook = await page.locator(
          selectors.exportsPagePO.EXPORT_HOOKS
        );
        await exportHook.hover();
        var flowText3 = await io.homePage.getText(
          selectors.mappings.TOOLTIP
          );
        expect(flowText3).toBeTruthy;
        expect(flowText3).toContain("Define a ‘hook’ here to use custom code to process records returned by the export before the records are passed along to downstream applications.");
    });
  });
});
