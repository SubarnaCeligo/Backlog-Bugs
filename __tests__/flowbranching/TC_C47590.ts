
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import flowbranch from "@testData/flowbranching/TC_C47590.json";

test.describe("@Author-ParthPatel TC_C47590", () => {
  let flowId;

  test.beforeEach(async ({io,page}, testInfo) => {
    await test.step("*** Go to flows page ***", async ()=>{
      await io.goToFlowsPage();
    });
  });

  test.afterEach(async ({io,page}, testInfo) => {
    await test.step("*** Deleting flow.***", async ()=>{
      await io.flowBuilderDashboard.navigateToEm2Flow(flowId);
      await io.homePage.loadingTime();
      await io.homePage.loadingTime();
      await io.flowbranching.flowBranchingPage.decreaseDrawer();
      await io.api.deleteFlowsWithId([flowId]);
    });
  });

  test("@Env-All @Zephyr-IO-T17669 TC_C47590 | Test to validate is user is able to view data in all the tabs under the request/response tabs of preview  ", async ({io,page}, testInfo) => {
    flowId = await io.flowbranching.createFlowBranchFromAPI( flowbranch);
    await io.flowBuilderDashboard.navigateToEm2Flow(flowId);

    await io.homePage.loadingTime();

    await io.flowbranching.flowBranchingPage.fitScreenViewInFlowBranch();
    await io.homePage.clickButtonByIndex(selectors.flowBuilderPagePO.IMPORT, 1);
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.importPagePO.CLICKPREVIEW);
    await io.homePage.loadingTime();

    const requestBody = (await io.homePage.getText(selectors.importPagePO.PREVIEWDATA)).toString().replace(/\n/g, '').replace(/\\/g, '').replace(/\s{2,}/g, '');
    await io.assert.expectToContainValue('{"organization": {"name": "Auto',requestBody, "");

    await io.homePage.click(selectors.flowBuilderPagePO.PREVIEW_RESPONSE_HEADERS_TAB);
    const requestHeader = (await io.homePage.getText(selectors.importPagePO.PREVIEWDATA)).toString().replace(/\n/g, '').replace(/\\/g, '').replace(/\s{2,}/g, '');
    await io.assert.expectToContainValue(
      '{"content-type": "application/json","accept": "application/json"}'
    ,requestHeader, "");
    await io.homePage.click(selectors.flowBuilderPagePO.PREVIEW_RESPONSE_OTHERS_TAB);
    const requestOthers = (await io.homePage.getText(selectors.importPagePO.PREVIEWDATA)).toString().replace(/\n/g, '').replace(/\\/g, '').replace(/\s{2,}/g, '');
    await io.assert.expectToContainValue('{"method": "POST"}',requestOthers, "");
    await io.homePage.click(selectors.importPagePO.CLICKSENDTOGGLE);
    await io.homePage.click(selectors.importPagePO.CLICKPREVIEW);
    await io.homePage.loadingTime();

    const responseBody = (await io.homePage.getText(selectors.importPagePO.PREVIEWDATA)).toString().replace(/\n/g, '').replace(/\\/g, '').replace(/\s{2,}/g, '');
    await io.assert.expectToContainValue('"organization":',responseBody, "");
    await io.homePage.click(selectors.flowBuilderPagePO.PREVIEW_RESPONSE_HEADERS_TAB);
    const responseHeader = (await io.homePage.getText(selectors.importPagePO.PREVIEWDATA)).toString().replace(/\n/g, '').replace(/\\/g, '').replace(/\s{2,}/g, '');
    await io.assert.expectToContainValue(
      '{"content-type": "application/json; charset=utf-8"}'
    ,responseHeader, "");
    await io.homePage.click(selectors.flowBuilderPagePO.PREVIEW_RESPONSE_OTHERS_TAB);
    const responseOthers = (await io.homePage.getText(selectors.importPagePO.PREVIEWDATA)).toString().replace(/\n/g, '').replace(/\\/g, '').replace(/\s{2,}/g, '');
    await io.assert.expectToContainValue('{"statusCode": 201}',responseOthers, "");

    await io.homePage.click(selectors.exportsPagePO.PARSED_OUTPUT);
    let output = JSON.stringify(
      await io.homePage.getText(selectors.importPagePO.PREVIEWDATA)
    );
    output = JSON.parse(output);
    await io.assert.expectToContainValue("id",output, "");
    await io.flowbranching.flowBranchingPage.closeDrawer();
  });
});
