
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";


test.describe("TC_C24756", () => {
  let flowId;
  test.beforeEach(async ({io}) => {
    flowId = await io.api.getFlowId("TC_027_C19786_DND");
    await io.goToFlowsPage();
    test.step("*** Go To Flows Page ***", async ()=>{});
  });

  test("@Env-All @Zephyr-IO-T7315 TC_C24756 | Verify the preview panel in the Export", async ({io, page}) => {
    await io.homePage.isPageReady();
    await io.flowBuilderDashboard.navigateToFlowBuilderInEM2(flowId);
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.flowBuilderPagePO.EXPORT);
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.click(selectors.importPagePO.FETCH_PREVIEW);
    await io.homePage.loadingTime();

    //verifying parsed output
    const parsedOutput = (await io.homePage.getText(selectors.basePagePO.ACE_EDITOR_ID)).toString();
    await io.assert.expectToContainValue('"users":',parsedOutput, "");

    //verifying HTTP Request
    await io.homePage.click(selectors.exportsPagePO.HTTPREQUEST);
    await page.getByText("Headers").nth(2).click();
    const requestHeader = (await io.homePage.getText(selectors.basePagePO.ACE_EDITOR_ID)).toString().toLowerCase().replace(/\s+/g, ' ');
    await io.assert.expectToContainValue(
      '{ \"accept\": \"application/json\"'
    ,requestHeader, "");

    //verifying HTTP Response
    await io.homePage.click(selectors.exportsPagePO.HTTP_RESPONSE);
    const responseBody = (await io.homePage.getText(selectors.basePagePO.ACE_EDITOR_ID)).toString().replace(/\s+/g, ' ');
    await io.assert.expectToContainValue('"users":',responseBody, "");
    await page.getByText("Headers").nth(2).click();
    const responseHeader = (await io.homePage.getText(selectors.basePagePO.ACE_EDITOR_ID)).toString().toLowerCase().replace(/\s+/g, ' ');
    await io.assert.expectToContainValue(
      '{ \"content-type\": \"application/json; charset=utf-8\"}'
    ,responseHeader, "");
    await page.getByText("Other").click();
    const responseOthers = (await io.homePage.getText(selectors.basePagePO.ACE_EDITOR_ID)).toString().toLowerCase().replace(/\s+/g, ' ');
    await io.assert.expectToContainValue('{ \"statuscode\": 200}',responseOthers, "");
    await io.flowbranching.flowBranchingPage.closeDrawer();
    await io.homePage.isPageReady();
  });
});
