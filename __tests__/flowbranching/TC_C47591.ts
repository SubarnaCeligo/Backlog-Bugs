
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt ,randomNumber} from "@celigo/aut-utilities";
import flowbranch from "@testData/flowbranching/TC_C47591.json";

function compactString(input) {
  return input
    .replace(/\n/g, '')           // Remove newlines
    .replace(/\\/g, '')          // Remove backslashes
    .replace(/\s{2,}/g, '')      // Replace multiple spaces with a single space
}


test.describe("@Author-ParthPatel C47591", () => {
  let flowId;

  test.beforeEach(async ({io,page}, testInfo) => {
    await test.step("*** Go to flows page ***", async ()=>{
      await io.goToFlowsPage();
    });
  });

  test.afterEach(async ({io,page}, testInfo) => {
    await test.step("*** Deleting flow.***", async ()=>{
      await io.api.deleteFlowsWithId([flowId]);
    });
  });
  
  test("@Env-All @Zephyr-IO-T17670 Test to validate the preview when 2nd PP is empty and 3rd PP is confiugred on the branch  ", async ({io,page}, testInfo) => {
    flowId = await io.flowbranching.createFlowBranchFromAPI( flowbranch);
    await io.flowBuilderDashboard.navigateToEm2Flow(flowId);
    await io.homePage.click(selectors.flowBuilderPagePO.FIT_WINDOW_WITH_BUTTON);
    
    await io.homePage.clickByIndex(selectors.flowBuilderPagePO.IMPORT, 1);
    await io.homePage.isPageReady();

    await io.homePage.click(selectors.importPagePO.CLICKPREVIEW);
    await io.homePage.loadingTime();

    await page.getByRole('tab', { name: 'Body' }).click();
    const requestBody = (await io.homePage.getText(selectors.importPagePO.PREVIEWDATA)).toString();
    await io.assert.expectToContainValue('{"organization": {"name": "Auto',compactString(requestBody), "");

    await page.getByRole('tab', { name: 'Headers' }).click();
    const requestHeader = (await io.homePage.getText(selectors.importPagePO.PREVIEWDATA)).toString();
    await io.assert.expectToContainValue(
      '{"content-type": "application/json","accept": "application/json"}'
    , compactString(requestHeader), "");
    await io.homePage.click(selectors.importPagePO.CLICKSENDTOGGLE);
    await io.homePage.click(selectors.importPagePO.CLICKPREVIEW);
    await io.homePage.loadingTime();

    const responseBody = (await io.homePage.getText(selectors.importPagePO.PREVIEWDATA)).toString();
    await io.assert.expectToContainValue('"organization":', compactString(responseBody), "");
    await page.getByRole('tab', { name: 'Headers' }).click();
    const responseHeader = (await io.homePage.getText(selectors.importPagePO.PREVIEWDATA)).toString();
    await io.assert.expectToContainValue(
      '{"content-type": "application/json; charset=utf-8"}'
    , compactString(responseHeader), "");
    
    await io.homePage.click(selectors.exportsPagePO.PARSED_OUTPUT);
    let output = JSON.stringify(
      await io.homePage.getText(selectors.importPagePO.PREVIEWDATA)
    );
    output = JSON.parse(output);
    await io.assert.expectToContainValue("id",output, "");
    await io.flowbranching.flowBranchingPage.closeDrawer();
  });
});
