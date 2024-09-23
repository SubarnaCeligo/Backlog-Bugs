
import { test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import TC_C9697 from "@testData/FlowBuilder/TC_C9697.json";

test.describe("TC_C9697", () => {
  let flowId;

  test("@Env-All @Zephyr-IO-T2751|To verify header values are displayed in Response mapping", async ({io}) => {
    await io.api.createImpOrExpAndFlowsThruAPI(TC_C9697);
    flowId = await io.api.getFlowId(TC_C9697.name);

    test.step(" Navigating to flow in flow builder. ", async ()=>{});
    await io.flowBuilderDashboard.navigateToFlowBuilderInFB(flowId);
    await io.homePage.loadingTime();
    await io.homePage.click(
      selectors.mappings.DEFAULT_MAPPING_TYPE.RESPONSE_MAPPING
    );
    await io.homePage.loadingTime();
    await io.homePage.click(
      selectors.importPagePO.INPUT_FILTER_PREVIEW_RESULT
    );
    await io.homePage.loadingTime();
    const str = JSON.stringify({"header": {
      "content-type": "application/json; charset=utf-8"
    }});
    console.log("str:", str);
    await io.flowBuilder.waitForElementAttached('[id="result"] .ace_content')
    let previewData =  (await io.flowBuilder.getText('[id="result"] .ace_content')).toString();
    let expectedString = '{  "record": {    "blobKey": "blobKey",    "header": {      "content-type": "application/json;         charset=utf-8"    }  }}';
    const cleanString = (str: string) => str.replace(/[\u2000-\u206F\uFEFF]/g, '').trim();
    // Clean both expected and received strings
    const expected = cleanString(expectedString);
    const received = cleanString(previewData);
    await io.assert.expectToContainValue("header", received, 'Header is not displayed');
    await io.assert.expectToContainValue("content-type", received, 'content-type is not displayed');
    await io.assert.expectToContainValue("charset", received, 'charset is not displayed');
    await io.assert.expectToContainValue("utf-8", received, 'Encoding is not displayed');

    test.step("**** Verified header values are displayed in response mapping. ***", async ()=>{});
    await io.api.deleteFlowsWithId([flowId]);
  });
});
