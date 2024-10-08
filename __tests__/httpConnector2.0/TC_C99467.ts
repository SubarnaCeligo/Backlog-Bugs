
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import TC_C99467 from "@testData/HTTPConnector2.0/TC_C99467.json";
import TC_C99468 from "@testData/HTTPConnector2.0/TC_C99468.json";

test.describe("TC_C99467_TC_C99468", () => {
  test.beforeEach(async ({ io }) => {
    test.step("*** Navigate to Home Page ***", async () => { });
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
  });
  test("@Zephyr-IO-T25507 @Env-All TC_C99467 Verify the relative URL if it contains the params for which we provided value in edit case", async ({ io, page }) => {
    const flowId = await io.createResourceFromAPI(TC_C99467, "FLOWS");
    await test.step("Created Flow " + TC_C99467.name + " With ID " + flowId, async () => {});
    await io.homePage.loadingTime();
    test.step("*** Navigate to created flow ***", async ()=>{});
    await io.flowBuilder.navigateToTheFlow(flowId);
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.click(selectors.flowBuilderPagePO.EXPORT);
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    const isOldBtn = await page.locator(selectors.basePagePO.HTTP_2DOT0).isVisible();
    if (isOldBtn) {
      await io.homePage.click(selectors.basePagePO.HTTP_2DOT0);
    } else {
      await io.homePage.click(
        selectors.flowBuilderPagePO.HTTP_TOGGLE
      );
    }
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    const relativeURI = await page.locator(selectors.exportsPagePO.HTTP_RELATIVE_URI).inputValue();
    expect(relativeURI).toContain(
      "/users/name/testname/page/{{{export.http.paging.page}}}"
    );
    await io.homePage.click(
      selectors.basePagePO.CLOSE
    );
    await test.step(
      "*** Verified In relative URL it should show only one path param value for which we provided value in edit case ***",
      async () => {}
    );
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    test.step("*** Navigating to Home Page   ***", async () => { });
    const flowDoc = await io.api.getCall("v1/flows/" + [flowId]);
    const pgExportId1 = flowDoc?.pageGenerators?.[0]?._exportId;
    const pgExportId2 = flowDoc?.pageGenerators?.[1]?._exportId;

    test.step("*** Deleting flow and its resources ***", async ()=>{});
    await io.api.deleteFlowViaAPI(flowId);
    await io.api.deleteCall("v1/exports/" + pgExportId1);
    await io.api.deleteCall("v1/exports/" + pgExportId2);
    await io.homePage.loadingTime();
    await io.homePage.loadingTime();
  });
  test("@Zephyr-IO-T25508 @Env-All TC_C99468 Verify the relative URL if it contains the single params for which we provided value in edit case", async ({ io, page }) => {
    const flowId = await io.createResourceFromAPI(TC_C99468, "FLOWS");
    await test.step("Created Flow " + TC_C99468.name + " With ID " + flowId, async () => {});
    await io.homePage.loadingTime();
    test.step("*** Navigate to created flow ***", async ()=>{});
    await io.flowBuilder.navigateToTheFlow(flowId);
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.click(selectors.flowBuilderPagePO.EXPORT);
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    const isOldBtn = await page.locator(selectors.basePagePO.HTTP_2DOT0).isVisible();
    if (isOldBtn) {
      await io.homePage.click(selectors.basePagePO.HTTP_2DOT0);
    } else {
      await io.homePage.click(
        selectors.flowBuilderPagePO.HTTP_TOGGLE
      );
    }
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    const relativeURI = await page.locator(selectors.exportsPagePO.HTTP_RELATIVE_URI).inputValue();
    expect(relativeURI).toContain(
      "/users/name/testname/email/testemail/type/testtype/page/{{{export.http.paging.page}}}"
    );
    await io.homePage.click(
      selectors.basePagePO.CLOSE
    );
    await test.step(
      "*** Verified In relative URL it should show all the path param value for which we provided value in edit case ***",
      async () => {}
    );
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    test.step("*** Navigating to Home Page   ***", async () => { });
    const flowDoc = await io.api.getCall("v1/flows/" + [flowId]);
    const pgExportId1 = flowDoc?.pageGenerators?.[0]?._exportId;
    const pgExportId2 = flowDoc?.pageGenerators?.[1]?._exportId;

    test.step("*** Deleting flow and its resources ***", async ()=>{});
    await io.api.deleteFlowViaAPI(flowId);
    await io.api.deleteCall("v1/exports/" + pgExportId1);
    await io.api.deleteCall("v1/exports/" + pgExportId2);
    await io.homePage.loadingTime();
    await io.homePage.loadingTime();
  });
});
