import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import T2722 from '../../testData/inputData/FlowBuilder/TC_T2722.json';

test.describe(`T2722 Metadata for ""Subscription Line"" record type is not available during Netsuite import flow @author_Kaushik UI_Backlog`, () => {
  test.skip(`T2722 Metadata for ""Subscription Line"" record type is not available during Netsuite import flow @author_Kaushik UI_Backlog @Zephyr-IO-T2722 @Env-All @Priority-P2`, async ({ io, page }) => {
    const id = await io.createResourceFromAPI(T2722, "FLOWS");
    const response = await io.api.getCall("v1/flows/" + id);
    const importId = response.pageProcessors[0]._importId
    const imp = await io.api.getCall("v1/imports/" + importId);
    const connectionId = imp._connectionId;
    await io.flowBuilder.addStep("Check for metadata call in mappings")
    await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.ADD_DATA_PROCESSOR);
    await io.flowBuilder.clickByIndex(selectors.flowBuilderPagePO.ADD_DATA_PROCESSOR, 1);
    await io.flowBuilder.click(selectors.flowBuilderPagePO.IMPORT_MAPPINGS)
    await io.flowBuilder.loadingTime();
    const metadataResponse = await io.api.getCall("v1/netsuite/metadata/suitescript/connections/" + connectionId + "/recordTypes/subscriptionline");
    JSON.stringify(metadataResponse);
    const hasError = metadataResponse.some(obj => obj.code === "invalid_response");
    expect(hasError).toBe(false);
  });
});