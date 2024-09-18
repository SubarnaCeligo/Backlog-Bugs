
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import TC_C63268 from "@testData/HTTPConnector2.0/TC_C63268.json";
import confluence from "@testData/HTTPConnector2.0/TC_C63266.json";

test.describe("TC_C63268", () => {
  let flowId: string;
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Beginning of Test Suite ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
  });
  test.afterEach(async ({io,page}, testInfo) => {
    const flowDoc = await io.api.getCall("v1/flows/" + [flowId]);
    const pgExportId = flowDoc?.pageGenerators?.[0]?._exportId;

    test.step("*** Deleting flow and its resources ***", async ()=>{});
    await io.api.deleteFlowViaAPI(flowId);
    await io.api.deleteCall("v1/exports/" + pgExportId);
    await io.homePage.loadingTime();
  });
  test("@Zephyr-IO-T21735 @Env-All TC_C63268 Validate connection api values in integration and flow connections tabs", async ({io,page}, testInfo) => {
    flowId = await io.createResourceFromAPI(TC_C63268, "FLOWS");
    await test.step("Created Flow " + TC_C63268.name + " With ID " + flowId, async () => {});
    test.step("*** Navigate to the Automation Flows integration ***", async ()=>{});
    await io.homePage.navigateTo(process.env["IO_Integration_URL"]);
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    test.step("*** Click on the Connections tab ***", async ()=>{});
    await io.homePage.click(selectors.basePagePO.CONNECTIONS);
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    const apiValueValidation = await io.homePage.getTextFromElement(
      selectors.basePagePO.TABLE_ROWS,
      confluence.confluence_api
    );
    expect(apiValueValidation).toBeTruthy();
    await test.step(
      "*** Validated connection api value in the connections list of integrations > connections tab ***",
      async ()=>{}
    );
    test.step("*** Navigate to the created flow ***", async ()=>{});
    await io.flowBuilder.navigateToTheFlow(flowId);
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    test.step("*** Click on the Connections tab ***", async ()=>{});
    await io.homePage.click(
      selectors.flowBuilderPagePO.NOTIFICATION_CONNECTIONS
    );
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    const apiValueValidation2 = await io.homePage.getTextFromElement(
      selectors.basePagePO.TABLE_ROWS,
      confluence.confluence_api
    );
    expect(apiValueValidation2).toBeTruthy();
    await test.step(
      "*** Validated connection api value in the integration > flows > connections tab ***",
      async ()=>{}
    );
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.loadingTime();
  });
});
