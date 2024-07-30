import { test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import Flow from "@testData/HTTP2DOT0/TC_C66039_flow.json";

test.describe("TC_C66039 To verify that the Path is available in help text for api version, endpoint and Resource", () => {
  let flowId;
  test.afterEach(async ({ io }) => {
    await io.api.deleteFlowViaAPI(flowId);
  });

  test("@Env-All @Zephyr-IO-T25954 To verify that the Path is available in help text for api version, endpoint and Resource", async ({
    io,
    page
  }) => {
    flowId = await io.createResourceFromAPI(Flow, "FLOWS");
    await io.homePage.navigateTo(
      process.env["IO_Integration_URL"] + "flowBuilder/" + flowId
    );
    await io.flowBuilder.loadingTime();
    //Export
    await io.flowBuilder.click(selectors.flowBuilderPagePO.EXPORT);
    await io.flowBuilder.click(selectors.importPagePO.CONNECTION_QUESTION_MARK);
    const exportConnectionFieldPathLabel = await io.homePage.isVisible(
      "text='Field path: export._connectionId'"
    );
    await io.assert.expectToBeTrue(
      exportConnectionFieldPathLabel,
      "Connection Field is not available in Export"
    );
    await io.flowBuilder.click(selectors.importPagePO.CONNECTION_QUESTION_MARK);
    await io.flowBuilder.click(selectors.importPagePO.API_ENDPOINT_QUESTION_MARK);
    const exportApiEndPointFieldPathLabel = await io.homePage.isVisible(
      "text='Field path: export.http._httpConnectorEndpointId'"
    );
    await io.assert.expectToBeTrue(
      exportApiEndPointFieldPathLabel,
      "API Export Field is not available"
    );
    await io.flowBuilder.click(selectors.importPagePO.API_ENDPOINT_QUESTION_MARK);
    await io.flowBuilder.click(selectors.importPagePO.RESOURCE_QUESTION_MARK);
    const exportResourceFieldPathLabel = await io.homePage.isVisible(
      "text='Field path: export.http._httpConnectorResourceId'"
    );
    await io.assert.expectToBeTrue(
      exportResourceFieldPathLabel,
      "Resource Field is not available"
    );
    await io.flowBuilder.click(selectors.importPagePO.RESOURCE_QUESTION_MARK);
    await io.flowBuilder.click(selectors.importPagePO.API_VERSION_QUESTION_MARK);
    const exportApiVersionFieldPath = await io.homePage.isVisible(
      "text='Field path: export.http._httpConnectorVersionId'"
    );
    await io.assert.expectToBeTrue(
      exportApiVersionFieldPath,
      "API Version Field is not available"
    );
    await io.flowBuilder.click(selectors.importPagePO.API_VERSION_QUESTION_MARK);
    await io.flowBuilder.click(selectors.flowBuilderPagePO.CLOSE);

    //Import
    await io.flowBuilder.click(selectors.flowBuilderPagePO.IMPORT);
    await io.flowBuilder.click(selectors.importPagePO.CONNECTION_QUESTION_MARK);
    const importConnectionFieldPathLabel = await io.homePage.isVisible(
      "text='Field path: import._connectionId'"
    );
    await io.assert.expectToBeTrue(
      importConnectionFieldPathLabel,
      "Connection Field is not available"
    );
    await io.flowBuilder.click(selectors.importPagePO.CONNECTION_QUESTION_MARK);
    await io.flowBuilder.click(selectors.importPagePO.API_ENDPOINT_QUESTION_MARK);
    const importApiEndPointFieldPathLabel = await io.homePage.isVisible(
      "text='Field path: import.http._httpConnectorEndpointId'"
    );
    await io.assert.expectToBeTrue(
      importApiEndPointFieldPathLabel,
      "API Export Field is not available"
    );
    await io.flowBuilder.click(selectors.importPagePO.API_ENDPOINT_QUESTION_MARK);
    await io.flowBuilder.click(selectors.importPagePO.RESOURCE_QUESTION_MARK);
    const importResourceFieldPathLabel = await io.homePage.isVisible(
      "text='Field path: import.http._httpConnectorResourceId'"
    );
    await io.assert.expectToBeTrue(
      importResourceFieldPathLabel,
      "Resource Field is not available"
    );
    await io.flowBuilder.click(selectors.importPagePO.RESOURCE_QUESTION_MARK);
    await io.flowBuilder.click(selectors.importPagePO.API_VERSION_QUESTION_MARK);
    const importApiVersionFieldPath = await io.homePage.isVisible(
      "text='Field path: import.http._httpConnectorVersionId'"
    );
    await io.assert.expectToBeTrue(
      importApiVersionFieldPath,
      "API Version Field is not available"
    );
    await io.flowBuilder.click(selectors.importPagePO.API_VERSION_QUESTION_MARK);
    await io.flowBuilder.click(selectors.flowBuilderPagePO.CLOSE);
  });
});
