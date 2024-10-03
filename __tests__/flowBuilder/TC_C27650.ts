import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import TC from "@testData/FlowBuilder/TC_C27650.json";

test.describe("TC_C27650 | TC_C29683", () => {
  let flowId;
  test.beforeEach(async ({io}) => {
    test.step("*** Beginning of Test Suite ***", async ()=>{});
    await io.goToFlowsPage();
    await io.homePage.loadingTime();
  });
  test.afterEach(async ({io}) => {
    await io.api.deleteFlowViaAPI(flowId);
    test.step("**** Deleted flow. ***", async ()=>{});
  });

  test("@Env-All @Zephyr-IO-T2844| Verify if able to close the flow builder at once when opened from dev playground", async ({io,page}, testInfo) => {
    await io.api.createImpOrExpAndFlowsThruAPI(TC);
    flowId = await io.api.getFlowId(TC.name);
    test.step("*** Navigating to Homepage ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.loadingTime();
    await io.homePage.goToMenu("Tools","Playground");
    test.step("Clicked on Dev playground button", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.loadingTime();
    await io.homePage.clickByText("Get started by selecting an editor example on the left.");
    await io.homePage.loadingTime();
    await io.homePage.clickByText("Automation Flows");
    await io.homePage.loadingTime();
    await io.homePage.clickByTextByIndex("TC_C27650",0);
    await io.homePage.loadingTime();
    await io.homePage.clickByText("Open in Flow Builder");
    await io.homePage.loadingTime();
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.flowBuilderPagePO.CLOSE_FLOW_BUILDER);
    await io.homePage.loadingTime();
    var templateVerification = await io.homePage.getCurrentUrl();
    await expect(templateVerification).toContain("/playground")
    await io.api.deleteFlowsWithId([flowId]);
  });

  test("@Env-All @Zephyr-IO-T2883|Verify if the user is able to preview the data test.beforeEach saving the existing export to the flow", async ({io,page}, testInfo) => {
    await io.api.createImpOrExpAndFlowsThruAPI(TC);
    flowId = await io.api.getFlowId(TC.name);
    test.step("*** Navigating to Flow Builder ***", async ()=>{});
    await io.flowBuilderDashboard.navigateToFlowBuilderInFB(flowId);
    await io.homePage.loadingTime();
    test.step("*** Opening Export preview panel ***", async ()=>{});
    await io.homePage.click(selectors.flowBuilderPagePO.EXPORT);
    await io.homePage.loadingTime();

    await io.homePage.click(selectors.exportsPagePO.EXPORT_TYPE_DROPDOWN);
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.exportsPagePO.EXPORT_TYPE_INCREMENTAL);
    await io.homePage.loadingTime();
    test.step("*** Clicking on Preview ***", async ()=>{});
    await io.homePage.click(selectors.importPagePO.FETCH_PREVIEW);
    await io.homePage.loadingTime();
    const previewData = (await io.homePage.getText(selectors.flowBuilderPagePO.CONTENT)).toString();
    expect(previewData).toContain("page_of_records");
    await io.api.deleteFlowsWithId([flowId]);
  });
});
