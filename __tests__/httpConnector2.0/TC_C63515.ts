
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import TC_C63515 from "@testData/HTTPConnector2.0/TC_C63515.json";

test.describe("TC_C63515", () => {
  let flowId: string;
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Beginning of Test Suite ***", async ()=>{});
    await io.goToFlowsPage();
  });
  test.afterEach(async ({io,page}, testInfo) => {
    const flowDoc = await io.api.getCall("v1/flows/" + [flowId]);
    const pgExportId = flowDoc?.pageGenerators?.[0]?._exportId;
    const ppImportId = flowDoc?.pageProcessors?.[0]?._importId;

    test.step("*** Deleting flow and its resources ***", async ()=>{});
    await io.api.deleteFlowViaAPI(flowId);
    await io.api.deleteCall("v1/exports/" + pgExportId);
    await io.api.deleteCall("v1/imports/" + ppImportId);
    await io.homePage.loadingTime();
  });
  test("@Zephyr-IO-T22253 @Env-All TC_C63515 Verify UI is showing connection name", async ({io,page}, testInfo) => {
    flowId = await io.createResourceFromAPI(TC_C63515, "FLOWS");
    await test.step("Created Flow " + TC_C63515.name + " With ID " + flowId, async () => {});
    test.step("*** Navigating to the created flow ***", async ()=>{});
    await io.flowBuilder.navigateToTheFlow(flowId);
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    test.step("*** Opening the flow export ***", async ()=>{});
    await io.homePage.click(selectors.flowBuilderPagePO.EXPORT);
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    const connectionName1 = await page.locator(selectors.connectionsPagePO.CONNECTIONS_DROPDOWN).inputValue();
    expect(connectionName1).toContain("LOOP RETURNS NO VERSION");
    await test.step(
      "Verified if Connection name is showing in export form",
      async ()=>{}
    );
    await io.homePage.click(selectors.basePagePO.CLOSE);
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    test.step("*** Opening the flow import ***", async ()=>{});
    await io.homePage.click(selectors.flowBuilderPagePO.IMPORT);
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    const connectionName2 = await page.locator(selectors.connectionsPagePO.CONNECTIONS_DROPDOWN).inputValue();
    expect(connectionName2).toContain("3PL CENTRAL CONNECTION");
    await test.step(
      "Verified if Connection name is showing in import form",
      async ()=>{}
    );
    await io.homePage.click(selectors.basePagePO.CLOSE);
    test.step("*** Navigating to Home Page ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
});
