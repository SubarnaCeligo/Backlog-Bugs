import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import TC from "@testData/Mapper2.0/TC_51517.json";

test.describe("TC_51517 Verfiy For objectarray mapping, have 2 sources and for each tabbed source add 1 child each but without the source", () => {
  test.beforeEach(async ({ io, page }, testInfo) => {
    test.step("*** Beginning of Test Suite ***", async () => {});
    await io.goToFlowsPage();
  });

  test("@Env-All @Zephyr-IO-T22427  Verfiy For objectarray mapping, have 2 sources and for each tabbed source add 1 child each but without the source", async ({
    io
  }) => {
    test.step("*** Creating the flow ***", async () => {});
    var flows = await io.api.createImpOrExpAndFlowsThruAPI(TC);
    await test.step(
      "Created Flow " +
        flows.get(TC.name)["flowName"] +
        " With ID " +
        flows.get(TC.name)["flowId"],
      async () => {}
    );
    const flowId = flows.get(TC.name)["flowId"];
    test.step("*** Navigating to the flowpage ***", async () => {});
    await io.flowBuilder.navigateToTheFlow(flowId);
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    test.step("*** Clicking on import mapping ***", async () => {});
    await io.homePage.click(selectors.flowBuilderPagePO.IMPORT_MAPPINGS);
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    test.step("*** Obtaining the flowJson ***", async () => {});
    const flowJson = await io.api.getFlowById(flowId);
    test.step("*** Obtaining importId from flowJson ***", async () => {});
    const importId = flowJson.pageProcessors[0]._importId;
    await test.step("*** Obtaining the importJson using importId***", async () => {});
    const importJson = await io.api.getImportById(importId);
    test.step("*** Obtaining the parentMapping status ***", async () => {});
    const parentMappingStatus = importJson.mappings[0].status;
    await test.step("*** Obtaining the first sourcetab Mapping status ***", async () => {});
    const firstSourceTabStatus =
      importJson.mappings[0].buildArrayHelper[0].mappings[0].status;
    await test.step("*** Obtaining the second sourcetab Mapping status ***", async () => {});
    const secondSourceTabStatus =
      importJson.mappings[0].buildArrayHelper[1].mappings[0].status;
    await test.step("*** verifying that parent mapping status and first sourcetab status is 'Active'  ***", async () => {});
    expect(parentMappingStatus).toEqual("Draft");
    expect(firstSourceTabStatus).toEqual("Draft");
    await test.step("*** Verifying that incomplete mapping status is 'Draft' ***", async () => {});
    expect(secondSourceTabStatus).toEqual("Draft");
  });
});
