import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import testData from "@testData/Flows/TC_T38868.json";

function functionName(option) {
  return option.job;
}

test.describe("Support job details in hooks and transformation testcases", () => {
  let id;
  test.afterEach(async ({ io }) => {
    await io.api.deleteFlowViaAPI(id);
  });
  test("@Zephyr-IO-T38868 @Zephyr-IO-T38869 @Zephyr-IO-T38870 @Zephyr-IO-T38871 @Zephyr-IO-T38867 @Zephyr-IO-T38877 @Zephyr-IO-T38873 @Zephyr-IO-T38872 @Zephyr-IO-T38874 @Zephyr-IO-T38875 @Env-QA @Epic-IO-72258 @Priority-P2 - Support job details in hooks and transformation testcases", async ({ io, page }) => {
    id = await io.createResourceFromAPI(testData, "FLOWS");
    await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.TRANSFER);
    await io.flowBuilder.loadingTime();

    //// FOR EXPORT
    await io.homePage.clickByIndex(selectors.basePagePO.ADD_DATA_PROCESSOR, 0);
    await io.homePage.loadingTime();

    // Checking for job details, testMode and preview call in Exports transformation function input in Javascript window
    await io.homePage.click(selectors.exportsPagePO.TRANSFORMATIONS);
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.basePagePO.JAVASCRIPTWINDOW);
    await io.homePage.loadingTime();

    await io.homePage.clickByIndex(selectors.basePagePO.SCRIPT_ID, 0);
    await io.homePage.clickByIndex(selectors.flowBuilderPagePO.DROP_DOWNLIST, 1);
    await io.assert.verifyElementContainsText(selectors.flowBuilderPagePO.SCRIPT_DATA_CONTENT, '"testMode": true');
    await io.assert.verifyElementContainsText(selectors.flowBuilderPagePO.SCRIPT_DATA_CONTENT, '"flowExecutionGroupId"');
    await io.assert.verifyElementContainsText(selectors.flowBuilderPagePO.SCRIPT_DATA_CONTENT, '"startedAt"');
    await io.assert.verifyElementContainsText(selectors.flowBuilderPagePO.SCRIPT_DATA_CONTENT, '"type": "export"');
    await io.flowBuilder.clearTextValue(selectors.flowBuilderPagePO.SCRIPT_STUB);
    await io.flowBuilder.enterHugeData(selectors.flowBuilderPagePO.SCRIPT_STUB, functionName.toString());
    await io.flowBuilder.clearTextValue(selectors.flowBuilderPagePO.FUNCTION_NAME_INPUT);
    await io.flowBuilder.enterHugeData(selectors.flowBuilderPagePO.FUNCTION_NAME_INPUT, 'functionName');
    await io.flowBuilder.click(selectors.flowBuilderPagePO.PREVIEW);
    await io.flowBuilder.loadingTime();
    await io.assert.verifyElementContainsText(selectors.basePagePO.RESULT_PREVIEW_CONTENT, '"flowExecutionGroupId"');
    await io.assert.verifyElementContainsText(selectors.basePagePO.RESULT_PREVIEW_CONTENT, '"startedAt"');
    await io.assert.verifyElementContainsText(selectors.basePagePO.RESULT_PREVIEW_CONTENT, '"type": "export"');
    await io.flowBuilder.clickByIndex(selectors.basePagePO.CLOSE, 0);
    await io.flowBuilder.click(selectors.basePagePO.DISCARD_CHANGES);

    // Checking for job details, testMode and preview call in Exports presave function input in Javascript window
    await io.homePage.clickByIndex(selectors.basePagePO.ADD_DATA_PROCESSOR, 0);
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.exportsPagePO.EXPORT_HOOKS);
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.flowBuilderPagePO.SCRIPT_ID);
    await io.homePage.clickByIndex(selectors.flowBuilderPagePO.DROP_DOWNLIST, 1);
    await io.homePage.clickByIndex(selectors.flowBuilderPagePO.ADD_SCRIPT, 1);

    await io.assert.verifyElementContainsText(selectors.flowBuilderPagePO.SCRIPT_DATA_CONTENT, '"testMode": true');
    await io.assert.verifyElementContainsText(selectors.flowBuilderPagePO.SCRIPT_DATA_CONTENT, '"flowExecutionGroupId"');
    await io.assert.verifyElementContainsText(selectors.flowBuilderPagePO.SCRIPT_DATA_CONTENT, '"startedAt"');
    await io.assert.verifyElementContainsText(selectors.flowBuilderPagePO.SCRIPT_DATA_CONTENT, '"type": "export"');

    await io.flowBuilder.clickByIndex(selectors.basePagePO.CLOSE, 1);
    await io.flowBuilder.clickByIndex(selectors.basePagePO.CLOSE, 0);
    await io.flowBuilder.click(selectors.basePagePO.DISCARD_CHANGES);

    //// FOR LOOKUP
    await io.homePage.clickByIndex(selectors.basePagePO.ADD_DATA_PROCESSOR, 1);
    await io.homePage.loadingTime();

    // Checking for job details, testMode and preview call in Lookup transformation function input in Javascript window    
    await io.homePage.click(selectors.exportsPagePO.TRANSFORMATIONS);
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.basePagePO.JAVASCRIPTWINDOW);
    await io.homePage.loadingTime();

    await io.assert.verifyElementContainsText(selectors.flowBuilderPagePO.SCRIPT_DATA_CONTENT, '"testMode": true');
    await io.assert.verifyElementContainsText(selectors.flowBuilderPagePO.SCRIPT_DATA_CONTENT, '"flowExecutionGroupId"');
    await io.assert.verifyElementContainsText(selectors.flowBuilderPagePO.SCRIPT_DATA_CONTENT, '"startedAt"');
    await io.assert.verifyElementContainsText(selectors.flowBuilderPagePO.SCRIPT_DATA_CONTENT, '"type": "export"');

    await io.flowBuilder.click(selectors.basePagePO.CLOSE);

    // Checking for job details, testMode and preview call in Lookup presave function input in Javascript window
    await io.homePage.clickByIndex(selectors.basePagePO.ADD_DATA_PROCESSOR, 1);
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.exportsPagePO.EXPORT_HOOKS);
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.flowBuilderPagePO.SCRIPT_ID);
    await io.homePage.clickByIndex(selectors.flowBuilderPagePO.DROP_DOWNLIST, 1);
    await io.homePage.clickByIndex(selectors.flowBuilderPagePO.ADD_SCRIPT, 1);

    await io.assert.verifyElementContainsText(selectors.flowBuilderPagePO.SCRIPT_DATA_CONTENT, '"testMode": true');
    await io.assert.verifyElementContainsText(selectors.flowBuilderPagePO.SCRIPT_DATA_CONTENT, '"flowExecutionGroupId"');
    await io.assert.verifyElementContainsText(selectors.flowBuilderPagePO.SCRIPT_DATA_CONTENT, '"startedAt"');
    await io.assert.verifyElementContainsText(selectors.flowBuilderPagePO.SCRIPT_DATA_CONTENT, '"type": "export"');
    await io.flowBuilder.clickByIndex(selectors.basePagePO.CLOSE, 1);
    await io.flowBuilder.clickByIndex(selectors.basePagePO.CLOSE, 0);
    await io.flowBuilder.click(selectors.basePagePO.DISCARD_CHANGES);

    // Checking for job details, testMode and preview call in Lookup post response map hook function input in Javascript window
    await io.homePage.clickByIndex(selectors.basePagePO.ADD_DATA_PROCESSOR, 1);
    await io.homePage.loadingTime();
    await io.flowBuilder.click(selectors.flowBuilderPagePO.POST_RESPONSE_MAP_HOOK);
    await io.homePage.loadingTime();
    await io.assert.verifyElementContainsText(selectors.flowBuilderPagePO.SCRIPT_DATA_CONTENT, '"testMode": true');
    await io.assert.verifyElementContainsText(selectors.flowBuilderPagePO.SCRIPT_DATA_CONTENT, '"flowExecutionGroupId"');
    await io.assert.verifyElementContainsText(selectors.flowBuilderPagePO.SCRIPT_DATA_CONTENT, '"startedAt"');
    await io.assert.verifyElementContainsText(selectors.flowBuilderPagePO.SCRIPT_DATA_CONTENT, '"type": "export"');
    await io.flowBuilder.clickByIndex(selectors.basePagePO.CLOSE, 0);

    //// FOR IMPORT
    await io.homePage.clickByIndex(selectors.basePagePO.ADD_DATA_PROCESSOR, 2);
    await io.homePage.loadingTime();

    // Checking for job details, testMode and preview call in Imports transformation function input in Javascript window
    await io.homePage.click(selectors.basePagePO.RESPONSETRANSFORMATION);
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.basePagePO.JAVASCRIPTWINDOW);
    await io.homePage.loadingTime();

    await io.assert.verifyElementContainsText(selectors.flowBuilderPagePO.SCRIPT_DATA_CONTENT, '"testMode": true');
    await io.assert.verifyElementContainsText(selectors.flowBuilderPagePO.SCRIPT_DATA_CONTENT, '"flowExecutionGroupId"');
    await io.assert.verifyElementContainsText(selectors.flowBuilderPagePO.SCRIPT_DATA_CONTENT, '"startedAt"');
    await io.assert.verifyElementContainsText(selectors.flowBuilderPagePO.SCRIPT_DATA_CONTENT, '"type": "import"');

    await io.flowBuilder.click(selectors.basePagePO.CLOSE);
    await io.homePage.clickByIndex(selectors.basePagePO.ADD_DATA_PROCESSOR, 2);
    await io.homePage.loadingTime();
    await io.homePage.clickByIndex(selectors.flowBuilderPagePO.PAGE_PROCESSOR_HOOKS, 1);
    await io.homePage.loadingTime();

    // Checking for job details, testMode and preview call in Imports hooks (Premap, postMap, Postsubmit, Post aggregate) create script function input in Javascript window
    for (let i = 0; i < 4; i++) {
      await io.homePage.clickByIndex(selectors.flowBuilderPagePO.SCRIPT_ID, i);
      await io.homePage.clickByIndex(selectors.flowBuilderPagePO.DROP_DOWNLIST, 1);
      await io.homePage.clickByIndex(selectors.flowBuilderPagePO.EDIT_SCRIPT_LABEL_SELECTOR, i);
      await io.flowBuilder.loadingTime();

      let data = await io.homePage.copyResourceData(selectors.flowBuilderPagePO.SCRIPT_DATA_CONTENT);
      await io.assert.expectToContainValue('"testMode": true', data, "");
      await io.assert.expectToContainValue('"flowExecutionGroupId"', data, "");
      await io.assert.expectToContainValue('"startedAt"', data, "");
      await io.assert.expectToContainValue('"type": "import"', data, "");
      
      await io.flowBuilder.clearTextValue(selectors.flowBuilderPagePO.SCRIPT_STUB);
      await io.flowBuilder.enterHugeData(selectors.flowBuilderPagePO.SCRIPT_STUB, functionName.toString());
      await io.flowBuilder.clearTextValue(selectors.flowBuilderPagePO.FUNCTION_NAME_INPUT);
      await io.flowBuilder.enterHugeData(selectors.flowBuilderPagePO.FUNCTION_NAME_INPUT, 'functionName');
      await io.flowBuilder.click(selectors.flowBuilderPagePO.PREVIEW);
      await io.flowBuilder.loadingTime();
      await io.assert.verifyElementContainsText(selectors.basePagePO.RESULT_PREVIEW_CONTENT, '"flowExecutionGroupId"');
      await io.assert.verifyElementContainsText(selectors.basePagePO.RESULT_PREVIEW_CONTENT, '"startedAt"');
      await io.assert.verifyElementContainsText(selectors.basePagePO.RESULT_PREVIEW_CONTENT, '"type": "import"');
      await io.flowBuilder.clickByIndex(selectors.basePagePO.CLOSE, 1);
      await io.flowBuilder.click(selectors.basePagePO.DISCARD_CHANGES);
    }
    await io.flowBuilder.clickByIndex(selectors.flowGroupingPagePO.PREMAPCREATESCRIPT, 0);
    await io.homePage.loadingTime();

    // CHECKING for function stubs changes for below function stubs
    const scriptValues = ['postAggregate', 'postMap', 'postResponseMap', 'postSubmit', 'preMap', 'transform', 'preSavePage'];

    for (let i = 0; i < 7; i++) {
      await io.homePage.clickByIndex(selectors.basePagePO.FUNCTION_STUB, 0);
      await io.flowBuilder.selectTextfromDropDown(page, scriptValues[i]);
      await io.flowBuilder.loadingTime();
      let data = await io.homePage.copyResourceData(selectors.flowBuilderPagePO.SCRIPT_CONTENT);
      await io.assert.expectToContainValue("'job' - the job currently running.", data, "");
    }

    await io.flowBuilder.clickByIndex(selectors.basePagePO.CLOSE, 1);
    await io.flowBuilder.click(selectors.basePagePO.DISCARD_CHANGES);
    await io.flowBuilder.clickByIndex(selectors.basePagePO.CLOSE, 0);
    await io.flowBuilder.click(selectors.basePagePO.DISCARD_CHANGES);

    await io.homePage.clickByIndex(selectors.basePagePO.ADD_DATA_PROCESSOR, 2);
    await io.homePage.loadingTime();
    await io.flowBuilder.clickByIndex(selectors.flowBuilderPagePO.POST_RESPONSE_MAP_HOOK, 1);
    await io.homePage.loadingTime();
    await io.assert.verifyElementContainsText(selectors.flowBuilderPagePO.SCRIPT_DATA_CONTENT, '"testMode": true');
    await io.assert.verifyElementContainsText(selectors.flowBuilderPagePO.SCRIPT_DATA_CONTENT, '"flowExecutionGroupId"');
    await io.assert.verifyElementContainsText(selectors.flowBuilderPagePO.SCRIPT_DATA_CONTENT, '"startedAt"');
    await io.assert.verifyElementContainsText(selectors.flowBuilderPagePO.SCRIPT_DATA_CONTENT, '"type": "import"');
    await io.flowBuilder.clickByIndex(selectors.basePagePO.CLOSE, 0);
  });
});