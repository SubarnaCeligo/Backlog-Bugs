import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import HTTP from "@testData/STANDALONE/TC_C50831.json";

test.describe("TC_C50831", () => {
  let flowId: string;

  test.afterEach(async ({io,page}, testInfo) => {
    test.step("*** Deleting resources ***", async ()=>{});

    const flowDoc = await io.api.getCall("v1/flows/" + flowId);
    const pgExportId = flowDoc?.pageGenerators?.[0]?._exportId;

    // Delete the flow
    await io.api.deleteFlowViaAPI(flowId)
    await io.api.deleteCall("v1/exports/" + pgExportId);
    await io.homePage.loadingTime();
  });

  test("@Zephyr-IO-T22276 @Env-All TC_C50831", async ({io,page}, testInfo) => {
    // *Create flow
    test.step("*** Creating flow ***", async ()=>{});
    flowId = await io.createResourceFromAPI(HTTP, "FLOWS");
    await io.homePage.loadingTime();

    test.step("*** Clicking on PageGenerator ***", async ()=>{});
    await io.homePage.click(selectors.flowBuilderPagePO.EXPORT);
    await io.homePage.loadingTime();

    test.step("*** Clicking on group records dropdown ***", async ()=>{});
    await io.homePage.click(selectors.flowBuilderPagePO.WOULD_YOU_LIKE_TO_GROUP_RECORD);
    test.step("*** Validating the group records field is present for http xml connection ***", async ()=>{});
    var data = await io.homePage.isVisible(selectors.flowBuilderPagePO.GROUP_RECORD_FIELD_INPUT);
    await io.assert.expectToBeTrue(data, "");

    test.step("*** save and close the export ***", async ()=>{});
    await io.homePage.click(selectors.flowBuilderPagePO.CLOSING_IMPORT);

    test.step("*** Navigating to homepage ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
});
