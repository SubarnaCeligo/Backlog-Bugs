import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import testData from "@testData/Flows/C120065.json";

test.describe(`TC_C120065_C120066_C120067_C120076_C120078_C120079_C120080_C120068_C120081_C120090_C120092_C120091_C120093_C120094`, () => {
  test.beforeEach(async ({ io }) => {
    await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
  });

  test(`@Env-All  @Zephyr-IO-T18666 TC_C120065_C120066_C120067_C120076_C120078_C120079_C120080_C120068_C120081_C120090_C120092_C120091_C120093_C120094`, async ({ io, page }) => {
    await io.createResourceFromAPI(testData, "FLOWS");
    await io.homePage.loadingTime()
    // TC_C120068 - Verify if The parsed response should be available for the next steps within the flow builder
    await io.flowBuilder.click(selectors.exportsPagePO.EXPORT_ADDPROCESSOR_BUTTON);
    await io.flowBuilder.click(selectors.flowBuilderPagePO.EXPORT_TRANSFORMATION);
    await io.connectionPage.addStep("Clicking on transformation of exports");

    const transformationTextGET = await io.connectionPage.getText(
      selectors.mappings.INPUTTEXT
    );

    expect(transformationTextGET).toContain("{  \"_raw\": \"Using Plain Text\"}");
    await io.connectionPage.addStep("Verified the parsed response is available for the next steps within the flow builder");

    await io.flowBuilder.click(selectors.flowBuilderPagePO.CLOSE);

    await io.flowBuilder.click(selectors.flowBuilderPagePO.EXPORT);
    await io.connectionPage.addStep("Opening the export");

    await io.flowBuilder.click(selectors.importPagePO.CLICKPREVIEW);
    await io.connectionPage.addStep("Clicking on preview");

    const previewTextGET = await io.connectionPage.getText(
      selectors.flowBuilderPagePO.CONTENT
    );

    // TC_C120065 - Verify if Users should be able to preview the HTTP request/response in the Preview panel
    // TC_C120067 - Verify if after Parsing the plain text output, stored the value in the "_raw" key, and the same should be visible under "Parsed output"
    expect(previewTextGET).toContain("{  \"page_of_records\": [    {      \"record\": {        \"_raw\": \"Using Plain Text\"      }    }  ]}");
    await io.connectionPage.addStep("Verified the preview the HTTP request/response in the Preview panel");

    // TC_C120066 - Verify if Users have the ability to view all request and response headers in Preview → HTTP request/response → Headers. Please make sure to mask them in both the UI and the BE
    
    await io.flowBuilder.click(selectors.importPagePO.HTTP_REQUEST);
    await io.flowBuilder.click(selectors.flowBuilderPagePO.PREVIEW_RESPONSE_HEADERS_TAB);

    const headersTextGET = await io.connectionPage.getText(
      selectors.flowBuilderPagePO.CONTENT
    );

    expect(headersTextGET).toContain('"authorization": "Basic **********"');
    await io.connectionPage.addStep("Verified the ability to view all request and response headers in Preview → HTTP request/response → Headers and masked them");

    // TC_C120076 - verify if HTTP request body field should support raw/string data, irrespective of what media type is selected.
    // TC_C120078 - Verify if Users should be able to preview the HTTP request/response in the Preview panel
    // TC_C120080 - Verify if after Parsing the plain text output, stored the value in the "_raw" key, and the same should be visible under "Parsed output"
    await io.flowBuilder.click(selectors.exportsPagePO.HTTP_METHOD);
    await io.flowBuilder.click(selectors.importPagePO.HTTPPOSTMETHOD);
    await io.connectionPage.addStep("HTTP method as POST");

    await io.flowBuilder.fill(selectors.exportsPagePO.HTTP_RELATIVE_URI, '/uploadplainTxt');
    await io.connectionPage.addStep("Relative URL as /uploadplainTxt");
    await io.flowBuilder.fill(selectors.flowBuilderPagePO.HTTP_BODY_INPUT, "'stringData'");
    await io.connectionPage.addStep("Body as 'stringData'");

    await io.flowBuilder.click(selectors.importPagePO.CLICKPREVIEW);
    await io.connectionPage.addStep("Clicking on preview");
    await io.flowBuilder.loadingTime()
    const previewTextPOST = await io.connectionPage.getText(
      selectors.flowBuilderPagePO.CONTENT
    );

    expect(previewTextPOST.toString().replaceAll(" ","")).toContain(("{  \"page_of_records\": [    {      \"record\": {        \"_raw\": \"File written successfully\"      }    }  ]}").replaceAll(" ",""));
    await io.connectionPage.addStep("Verified the preview the HTTP request/response in the Preview panel");

    // TC_C120079 - Verify if Users have the ability to view all request and response headers in Preview → HTTP request/response → Headers. Please make sure to mask them in both the UI and the BE
    await io.flowBuilder.click(selectors.importPagePO.HTTP_REQUEST);
    await io.flowBuilder.click(selectors.flowBuilderPagePO.PREVIEW_RESPONSE_HEADERS_TAB);
    await io.flowBuilder.loadingTime()
    const headersTextPOST = await io.connectionPage.getText(
      selectors.flowBuilderPagePO.CONTENT
    );

    expect(headersTextPOST).toContain('"authorization": "Basic **********"');
    await io.connectionPage.addStep("Verified the ability to view all request and response headers in Preview → HTTP request/response → Headers and masked them");

    // TC_C120081 - Verify if The parsed response should be available for the next steps within the flow builder
    await io.flowBuilder.click(selectors.basePagePO.SAVE_AND_CLOSE);
    await io.flowBuilder.click(selectors.exportsPagePO.EXPORT_ADDPROCESSOR_BUTTON);
    await io.flowBuilder.click(selectors.flowBuilderPagePO.EXPORT_TRANSFORMATION);
    await io.connectionPage.addStep("Clicking on transformation of exports");
    await io.flowBuilder.loadingTime()
    const transformationTextPOST = await io.connectionPage.getText(
      selectors.mappings.INPUTTEXT
    );

    expect(transformationTextPOST.toString().replaceAll(" ","")).toContain(("{  \"_raw\": \"File written successfully\"}").replaceAll(" ",""));
    await io.connectionPage.addStep("Verified the parsed response is available for the next steps within the flow builder");

    await io.flowBuilder.click(selectors.flowBuilderPagePO.CLOSE);

    await io.flowBuilder.clickByIndex(selectors.flowBuilderPagePO.IMPORT, 0);
    await io.connectionPage.addStep("Opening the import");

    await io.flowBuilder.click(selectors.importPagePO.CLICKSENDTOGGLE);
    await io.connectionPage.addStep("Clicking on send toggle");

    await io.flowBuilder.click(selectors.importPagePO.CLICKPREVIEW);
    await io.connectionPage.addStep("Clicking on Send button");
    await io.flowBuilder.loadingTime()
    await io.flowBuilder.click(selectors.importPagePO.PARSED_OUTPUT);
    await io.flowBuilder.loadingTime()
    // TC_C120090 - Verify if Users should be able to preview the HTTP request/response in the Preview panel
    // TC_C120092 - Verify if after Parsing the plain text output, stored the value in the "_raw" key, and the same should be visible under "Parsed output"
    const previewTextSend = await io.connectionPage.getText(
      selectors.flowBuilderPagePO.CONTENT
    );

    expect(previewTextSend.toString().replaceAll(" ","")).toContain(("[  {    \"_raw\": \"File written successfully\"  }]").replaceAll(" ",""));
    await io.connectionPage.addStep("Verified the preview the HTTP request/response in the Preview panel");
    
    await io.flowBuilder.click(selectors.importPagePO.HTTP_REQUEST);
    await io.flowBuilder.click(selectors.flowBuilderPagePO.PREVIEW_RESPONSE_HEADERS_TAB);
    await io.flowBuilder.loadingTime()
    const headersTextSend = await io.connectionPage.getText(
      selectors.flowBuilderPagePO.CONTENT
    );

    // TC_C120091 - Verify if Users have the ability to view all request and response headers in Preview → HTTP request/response → Headers. Please make sure to mask them in both the UI and the BE
    expect(headersTextSend).toContain('"authorization": "Basic **********"');
    await io.connectionPage.addStep("Verified the ability to view all request and response headers in Preview → HTTP request/response → Headers and masked them");

    // TC_C120093 - Verify if The parsed response should be available for the next steps within the flow builder
    // TC_C120094 - Verify In "Response mapping", Include "_raw" key within the "_json" object, where the _raw key contains the response from the import bubble in plain text format. Note: Result mapping should behave the same as source exports
    await io.flowBuilder.click(selectors.flowBuilderPagePO.CLOSE);
    await io.connectionPage.addStep("Saving and closing the flow");

    await io.flowBuilder.clickByIndex(selectors.basePagePO.ADD_DATA_PROCESSOR, 1);
    await io.homePage.click(selectors.mappings.DEFAULT_MAPPING_TYPE.RESPONSE_MAPPING);
    await io.connectionPage.addStep("Opening the response mappings of imports");
    await io.flowBuilder.loadingTime()
    const responseMappingText = await io.connectionPage.getText(
      selectors.mappings.INPUTTEXT
    );

    expect(responseMappingText.toString().replaceAll(" ","")).toContain(("{  \"_json\": {    \"_raw\": \"File written successfully\"  },  \"statusCode\": 200}").replaceAll(" ",""));

    await io.connectionPage.addStep("Verified the parsed response is available for the next steps within the flow builder and _raw key within the _json object");

  });
});