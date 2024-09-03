import { test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import TC_C34146 from "@testData/FlowBuilder/TC_C34146.json";

test.describe("@Env-All @Zephyr-IO-T3064 Verify run history for status filters under flow builder", () => {
  test("@Env-All @Zephyr-IO-T3064", async ({io}) => {
    //Create Flows
    var flows = await io.api.createImpOrExpAndFlowsThruAPI(TC_C34146);
    await io.flowBuilder.navigateToTheFlow(
      flows.get(TC_C34146.name)["flowId"]
    );
    await io.homePage.loadingTime();
    await io.homePage.click(
      selectors.flowBuilderPagePO.RUN_HISTORY
    );
await test.step(
      "Clicked on Run History tab inside flowbuilder."
, async ()=>{});
    await io.homePage.click(
      selectors.myAccountPagePO.FLOWSTATUSFILTER
    );
    test.step("Clicked on Select status field.", async ()=>{});
    let resultAll = await io.homePage.getTextFromElement(
      selectors.flowBuilderPagePO.REDSHIFT_SELECTED_EXPORT_RECORDS,
      "Select status"
    );
    await io.assert.expectToBeTrue(resultAll, "");
    let resultError = await io.homePage.getTextFromElement(
      selectors.myAccountPagePO.STATUS_ERROR,
      "Contains error"
    );
    await io.assert.expectToBeTrue(resultError, "");
    let resultCancelled = await io.homePage.getTextFromElement(
      selectors.myAccountPagePO.STATUS_CANCELED,
      "Canceled"
    );
    await io.assert.expectToBeTrue(resultCancelled, "");
    let resultCompleted = await io.homePage.getTextFromElement(
      selectors.myAccountPagePO.STATUS_COMPLETED,
      "Completed"
    );
    await io.assert.expectToBeTrue(resultCompleted, "");
    let resultFailed = await io.homePage.getTextFromElement(
      selectors.myAccountPagePO.STATUS_FAILED,
      "Failed"
    );
    await io.assert.expectToBeTrue(resultFailed, "");
await test.step(
      "*** All the options present inside status filter.***"
, async ()=>{});
  });
});
