import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import testData from "@testData/Flows/C120059.json";

test.describe(`C120059_C120061_C120063_C120082_C120069_120070_C120072_C120074_C120060_C120062_C120064_C120071_C120073_C120075`, () => {
  //Skipped this test case as we don;t have creds for the connection and the tracker is : https://celigo.atlassian.net/browse/IOAUT-15782
  test(`@Env-All @Zephyr-IO-T18660 @Zephyr-IO-T18662  @Zephyr-IO-T18664 @Zephyr-IO-T18683 @Zephyr-IO-T18670 @Zephyr-IO-T18671 @Zephyr-IO-T18673 @Zephyr-IO-T18675 @Zephyr-IO-T18661 @Zephyr-IO-T18663 @Zephyr-IO-T18665 @Zephyr-IO-T18672 @Zephyr-IO-T18674 @Zephyr-IO-T18676 C120059_C120061_C120063_C120082_C120069_120070_C120072_C120074_C120060_C120062_C120064_C120071_C120073_C120075`, async ({ io, page }) => {
    await io.createResourceFromAPI(testData, "FLOWS");

    await io.flowBuilder.click(selectors.flowBuilderPagePO.EXPORT);

    // TC_C120059 - Verify if Users provided with an additional dropdown value "Plain text" in the existing "Override media type for success responses" field in http exports
    await io.connectionPage.addStep("HTTP method as GET, Connection media type as JSON");

    await io.flowBuilder.click(selectors.exportsPagePO.NON_STANDARD_API_TAB);
    await io.flowBuilder.click(selectors.flowBuilderPagePO.OVERRIDE_MEDIA_SUCCESS_RESPONSE);
    await io.assert.verifyElementContainsText(selectors.connectionsPagePO.PLAINTEXT, 'Plain text');
    await io.flowBuilder.click(selectors.flowBuilderPagePO.DO_NOT_OVERRIDE_MEDIA_TYPE);

    await io.flowBuilder.click(selectors.flowBuilderPagePO.OVERRIDE_MEDIA_ERROR_RESPONSE);
    await io.assert.verifyElementContainsText(selectors.connectionsPagePO.PLAINTEXT, 'Plain text');
    await io.flowBuilder.click(selectors.flowBuilderPagePO.DO_NOT_OVERRIDE_MEDIA_TYPE);
    await io.connectionPage.addStep("Verified Plain text in the existing 'Override media type for success responses' && 'Override media type for error responses' field in http exports");

    // TC_C120061 - Verify the Fields to remove when the "Override media type for success responses" field value is Plain text.
    // TC_C120063 - Verify the Fields to remove when the "Override media type for error responses" field value is Plain text.

    // Check for visibility when Override media type for success responses is Do not override and Override media type for error responses is Do not override
    await io.flowBuilder.click(selectors.flowBuilderPagePO.OVERRIDE_MEDIA_ERROR_RESPONSE);
    await io.flowBuilder.click(selectors.flowBuilderPagePO.DO_NOT_OVERRIDE_MEDIA_TYPE);
    await io.flowBuilder.click(selectors.flowBuilderPagePO.OVERRIDE_MEDIA_SUCCESS_RESPONSE);
    await io.flowBuilder.click(selectors.flowBuilderPagePO.DO_NOT_OVERRIDE_MEDIA_TYPE);
    await io.assert.verifyElementIsDisplayed(
      selectors.flowBuilderPagePO.PATH_TO_RESOURCE_PATH,
      "Field should be visible"
    )
    await io.assert.verifyElementIsDisplayed(
      selectors.flowBuilderPagePO.PATH_TO_SUCCESS_PATH,
      "Field should be visible"
    )
    await io.assert.verifyElementIsDisplayed(
      selectors.flowBuilderPagePO.PATH_TO_FILE_URL_PATHS,
      "Field should be visible"
    )
    await io.assert.verifyElementIsDisplayed(
      selectors.flowBuilderPagePO.PATH_TO_FAIL_PATH,
      "Field should be visible"
    )
    await io.assert.verifyElementIsDisplayed(
      selectors.flowBuilderPagePO.PATH_TO_ERROR_PATH,
      "Field should be visible"
    )
    await io.connectionPage.addStep("Verified visibility when Override media type for success responses is Do not override and Override media type for error responses is Do not override");

    // Check for visibility when Override media type for success responses is XML and Override media type for error responses is Do not override
    await io.flowBuilder.click(selectors.flowBuilderPagePO.OVERRIDE_MEDIA_ERROR_RESPONSE);
    await io.flowBuilder.click(selectors.flowBuilderPagePO.XMLVALUE);
    await io.flowBuilder.click(selectors.flowBuilderPagePO.OVERRIDE_MEDIA_SUCCESS_RESPONSE);
    await io.flowBuilder.click(selectors.flowBuilderPagePO.DO_NOT_OVERRIDE_MEDIA_TYPE);

    await io.assert.verifyElementIsDisplayed(
      selectors.flowBuilderPagePO.PATH_TO_RESOURCE_PATH,
      "Field should be visible"
    )
    await io.assert.verifyElementIsDisplayed(
      selectors.flowBuilderPagePO.PATH_TO_SUCCESS_PATH,
      "Field should be visible"
    )
    await io.assert.verifyElementIsDisplayed(
      selectors.flowBuilderPagePO.PATH_TO_FILE_URL_PATHS,
      "Field should be visible"
    )
    await io.assert.verifyElementIsDisplayed(
      selectors.flowBuilderPagePO.PATH_TO_FAIL_PATH,
      "Field should be visible"
    )
    await io.assert.verifyElementIsDisplayed(
      selectors.flowBuilderPagePO.PATH_TO_ERROR_PATH,
      "Field should be visible"
    )
    await io.connectionPage.addStep("Verified visibility when Override media type for success responses is XML and Override media type for error responses is Do not override");

    // Check for visibility when Override media type for success responses is Do not overrid and Override media type for error responses is XML
    await io.flowBuilder.click(selectors.flowBuilderPagePO.OVERRIDE_MEDIA_SUCCESS_RESPONSE);
    await io.flowBuilder.click(selectors.flowBuilderPagePO.DO_NOT_OVERRIDE_MEDIA_TYPE);
    await io.flowBuilder.click(selectors.flowBuilderPagePO.OVERRIDE_MEDIA_ERROR_RESPONSE);
    await io.flowBuilder.click(selectors.flowBuilderPagePO.XMLVALUE);

    await io.assert.verifyElementIsDisplayed(
      selectors.flowBuilderPagePO.PATH_TO_RESOURCE_PATH,
      "Field should be visible"
    )
    await io.assert.verifyElementIsDisplayed(
      selectors.flowBuilderPagePO.PATH_TO_SUCCESS_PATH,
      "Field should be visible"
    )
    await io.assert.verifyElementIsDisplayed(
      selectors.flowBuilderPagePO.PATH_TO_FILE_URL_PATHS,
      "Field should be visible"
    )
    await io.assert.verifyElementIsDisplayed(
      selectors.flowBuilderPagePO.PATH_TO_FAIL_PATH,
      "Field should be visible"
    )
    await io.assert.verifyElementIsDisplayed(
      selectors.flowBuilderPagePO.PATH_TO_ERROR_PATH,
      "Field should be visible"
    )
    await io.connectionPage.addStep("Verified visibility when Override media type for success responses is Do not overrid and Override media type for error responses is XML");

    // Check for visibility when Override media type for success responses is XML and Override media type for error responses is XML
    await io.flowBuilder.click(selectors.flowBuilderPagePO.OVERRIDE_MEDIA_ERROR_RESPONSE);
    await io.flowBuilder.click(selectors.flowBuilderPagePO.XMLVALUE);
    await io.flowBuilder.click(selectors.flowBuilderPagePO.OVERRIDE_MEDIA_SUCCESS_RESPONSE);
    await io.flowBuilder.click(selectors.flowBuilderPagePO.XMLVALUE);

    await io.assert.verifyElementIsDisplayed(
      selectors.flowBuilderPagePO.PATH_TO_RESOURCE_PATH,
      "Field should be visible"
    )
    await io.assert.verifyElementIsDisplayed(
      selectors.flowBuilderPagePO.PATH_TO_SUCCESS_PATH,
      "Field should be visible"
    )
    await io.assert.verifyElementIsDisplayed(
      selectors.flowBuilderPagePO.PATH_TO_FILE_URL_PATHS,
      "Field should be visible"
    )
    await io.assert.verifyElementIsDisplayed(
      selectors.flowBuilderPagePO.PATH_TO_FAIL_PATH,
      "Field should be visible"
    )
    await io.assert.verifyElementIsDisplayed(
      selectors.flowBuilderPagePO.PATH_TO_ERROR_PATH,
      "Field should be visible"
    )
    await io.connectionPage.addStep("Verified visibility when Override media type for success responses is XML and Override media type for error responses is XML");

    // Check for visibility when Override media type for success responses is Plain text and Override media type for error responses is Do not override
    await io.flowBuilder.click(selectors.flowBuilderPagePO.OVERRIDE_MEDIA_SUCCESS_RESPONSE);
    await io.flowBuilder.click(selectors.connectionsPagePO.PLAINTEXT);
    await io.flowBuilder.click(selectors.flowBuilderPagePO.OVERRIDE_MEDIA_ERROR_RESPONSE);
    await io.flowBuilder.click(selectors.flowBuilderPagePO.DO_NOT_OVERRIDE_MEDIA_TYPE);

    await io.assert.checkElementState(selectors.flowBuilderPagePO.PATH_TO_RESOURCE_PATH, 'isHidden');
    await io.assert.checkElementState(selectors.flowBuilderPagePO.PATH_TO_SUCCESS_PATH, 'isHidden');
    await io.assert.checkElementState(selectors.flowBuilderPagePO.PATH_TO_FILE_URL_PATHS, 'isHidden');
    await io.assert.verifyElementIsDisplayed(
      selectors.flowBuilderPagePO.PATH_TO_FAIL_PATH,
      "Field should be visible"
    )
    await io.assert.verifyElementIsDisplayed(
      selectors.flowBuilderPagePO.PATH_TO_ERROR_PATH,
      "Field should be visible"
    )
    
    // TC_C120082 - Verify For Exports/Lookups, remove the “Does this API use paging?” section if The override media type for success response is plain text OR if the connection media type is plain text (Provided all other override media type is “Do not override”)
    // Does this API use paging? section will not be visible
    await io.assert.checkElementState(selectors.flowBuilderPagePO.PAGE, 'isHidden');

    await io.connectionPage.addStep("Verified visibility when Override media type for success responses is Plain text and Override media type for error responses is Do not override");

    // Check for visibility when Override media type for success responses is Do not override and Override media type for error responses is Plain text
    await io.flowBuilder.click(selectors.flowBuilderPagePO.OVERRIDE_MEDIA_SUCCESS_RESPONSE);
    await io.flowBuilder.click(selectors.flowBuilderPagePO.DO_NOT_OVERRIDE_MEDIA_TYPE);
    await io.flowBuilder.click(selectors.flowBuilderPagePO.OVERRIDE_MEDIA_ERROR_RESPONSE);
    await io.flowBuilder.click(selectors.connectionsPagePO.PLAINTEXT);

    await io.assert.verifyElementIsDisplayed(
      selectors.flowBuilderPagePO.PATH_TO_RESOURCE_PATH,
      "Field should be visible"
    )
    await io.assert.verifyElementIsDisplayed(
      selectors.flowBuilderPagePO.PATH_TO_SUCCESS_PATH,
      "Field should be visible"
    )
    await io.assert.verifyElementIsDisplayed(
      selectors.flowBuilderPagePO.PATH_TO_FILE_URL_PATHS,
      "Field should be visible"
    )
    await io.assert.checkElementState(selectors.flowBuilderPagePO.PATH_TO_FAIL_PATH, 'isHidden');
    await io.assert.checkElementState(selectors.flowBuilderPagePO.PATH_TO_ERROR_PATH, 'isHidden');

    // TC_C120082 - Verify For Exports/Lookups, remove the “Does this API use paging?” section if The override media type for success response is plain text OR if the connection media type is plain text (Provided all other override media type is “Do not override”)
    // Does this API use paging? section will be visible
    await io.assert.verifyElementIsDisplayed(
      selectors.flowBuilderPagePO.PAGE,
      "Field should be visible"
    )
    await io.connectionPage.addStep("Verified visibility when Override media type for success responses is Do not override and Override media type for error responses is Plain text");

    // Check for visibility when Override media type for success responses is Plain text and Override media type for error responses is Plain text
    await io.flowBuilder.click(selectors.flowBuilderPagePO.OVERRIDE_MEDIA_SUCCESS_RESPONSE);
    await io.flowBuilder.click(selectors.connectionsPagePO.PLAINTEXT);
    await io.flowBuilder.click(selectors.flowBuilderPagePO.OVERRIDE_MEDIA_ERROR_RESPONSE);
    await io.flowBuilder.click(selectors.connectionsPagePO.PLAINTEXT);

    await io.assert.checkElementState(selectors.flowBuilderPagePO.PATH_TO_RESOURCE_PATH, 'isHidden');
    await io.assert.checkElementState(selectors.flowBuilderPagePO.PATH_TO_SUCCESS_PATH, 'isHidden');
    await io.assert.checkElementState(selectors.flowBuilderPagePO.PATH_TO_FILE_URL_PATHS, 'isHidden');
    await io.assert.checkElementState(selectors.flowBuilderPagePO.PATH_TO_FAIL_PATH, 'isHidden');
    await io.assert.checkElementState(selectors.flowBuilderPagePO.PATH_TO_ERROR_PATH, 'isHidden');

    // TC_C120082 - Verify For Exports/Lookups, remove the “Does this API use paging?” section if The override media type for success response is plain text OR if the connection media type is plain text (Provided all other override media type is “Do not override”)
    // Does this API use paging? section will not be visible
    await io.assert.checkElementState(selectors.flowBuilderPagePO.PAGE, 'isHidden');
    await io.connectionPage.addStep("Verified visibility when Override media type for success responses is Plain text and Override media type for error responses is Plain text");

    // TC_C120069 - Additional dropdown value "Plain text" in the existing "Override request media type"
    // TC_C120070 - Additional dropdown value "Plain text" in the existing "Override media type for success response" and "Override media type for error response"
    await io.flowBuilder.click(selectors.exportsPagePO.HTTP_METHOD);
    await io.flowBuilder.click(selectors.importPagePO.HTTPPOSTMETHOD);
    await io.connectionPage.addStep("HTTP method as POST");

    await io.flowBuilder.click(selectors.flowBuilderPagePO.REQUESTMEDIATYPE);
    await io.assert.verifyElementContainsText(selectors.connectionsPagePO.PLAINTEXT, 'Plain text');
    await io.flowBuilder.click(selectors.connectionsPagePO.PLAINTEXT);

    await io.flowBuilder.click(selectors.flowBuilderPagePO.OVERRIDE_MEDIA_SUCCESS_RESPONSE);
    await io.assert.verifyElementContainsText(selectors.connectionsPagePO.PLAINTEXT, 'Plain text');
    await io.flowBuilder.click(selectors.flowBuilderPagePO.DO_NOT_OVERRIDE_MEDIA_TYPE);

    await io.flowBuilder.click(selectors.flowBuilderPagePO.OVERRIDE_MEDIA_ERROR_RESPONSE);
    await io.assert.verifyElementContainsText(selectors.connectionsPagePO.PLAINTEXT, 'Plain text');
    await io.flowBuilder.click(selectors.flowBuilderPagePO.DO_NOT_OVERRIDE_MEDIA_TYPE);
    await io.connectionPage.addStep("Verified Plain text in the existing 'Override request media type' && 'Override media type for success response' && 'Override media type for error response' field in http exports");

    // TC_C120072 - Verify the Fields to remove when the "Override media type for success responses" field value is Plain text
    // TC_C120074 - Verify the Fields to remove when the "Override media type for error responses" field value is Plain text

    // Check for visibility when Override media type for success responses is Do not override and Override media type for error responses is Do not override
    await io.flowBuilder.click(selectors.flowBuilderPagePO.OVERRIDE_MEDIA_ERROR_RESPONSE);
    await io.flowBuilder.click(selectors.flowBuilderPagePO.DO_NOT_OVERRIDE_MEDIA_TYPE);
    await io.flowBuilder.click(selectors.flowBuilderPagePO.OVERRIDE_MEDIA_SUCCESS_RESPONSE);
    await io.flowBuilder.click(selectors.flowBuilderPagePO.DO_NOT_OVERRIDE_MEDIA_TYPE);
    await io.assert.verifyElementIsDisplayed(
      selectors.flowBuilderPagePO.PATH_TO_RESOURCE_PATH,
      "Field should be visible"
    )
    await io.assert.verifyElementIsDisplayed(
      selectors.flowBuilderPagePO.PATH_TO_SUCCESS_PATH,
      "Field should be visible"
    )
    await io.assert.verifyElementIsDisplayed(
      selectors.flowBuilderPagePO.PATH_TO_FILE_URL_PATHS,
      "Field should be visible"
    )
    await io.assert.verifyElementIsDisplayed(
      selectors.flowBuilderPagePO.PATH_TO_FAIL_PATH,
      "Field should be visible"
    )
    await io.assert.verifyElementIsDisplayed(
      selectors.flowBuilderPagePO.PATH_TO_ERROR_PATH,
      "Field should be visible"
    )
    await io.connectionPage.addStep("Verified visibility when Override media type for success responses is Do not override and Override media type for error responses is Do not override");

    // Check for visibility when Override media type for success responses is XML and Override media type for error responses is Do not override
    await io.flowBuilder.click(selectors.flowBuilderPagePO.OVERRIDE_MEDIA_ERROR_RESPONSE);
    await io.flowBuilder.click(selectors.flowBuilderPagePO.XMLVALUE);
    await io.flowBuilder.click(selectors.flowBuilderPagePO.OVERRIDE_MEDIA_SUCCESS_RESPONSE);
    await io.flowBuilder.click(selectors.flowBuilderPagePO.DO_NOT_OVERRIDE_MEDIA_TYPE);

    await io.assert.verifyElementIsDisplayed(
      selectors.flowBuilderPagePO.PATH_TO_RESOURCE_PATH,
      "Field should be visible"
    )
    await io.assert.verifyElementIsDisplayed(
      selectors.flowBuilderPagePO.PATH_TO_SUCCESS_PATH,
      "Field should be visible"
    )
    await io.assert.verifyElementIsDisplayed(
      selectors.flowBuilderPagePO.PATH_TO_FILE_URL_PATHS,
      "Field should be visible"
    )
    await io.assert.verifyElementIsDisplayed(
      selectors.flowBuilderPagePO.PATH_TO_FAIL_PATH,
      "Field should be visible"
    )
    await io.assert.verifyElementIsDisplayed(
      selectors.flowBuilderPagePO.PATH_TO_ERROR_PATH,
      "Field should be visible"
    )
    await io.connectionPage.addStep("Verified visibility when Override media type for success responses is XML and Override media type for error responses is Do not override");

    // Check for visibility when Override media type for success responses is Do not overrid and Override media type for error responses is XML
    await io.flowBuilder.click(selectors.flowBuilderPagePO.OVERRIDE_MEDIA_SUCCESS_RESPONSE);
    await io.flowBuilder.click(selectors.flowBuilderPagePO.DO_NOT_OVERRIDE_MEDIA_TYPE);
    await io.flowBuilder.click(selectors.flowBuilderPagePO.OVERRIDE_MEDIA_ERROR_RESPONSE);
    await io.flowBuilder.click(selectors.flowBuilderPagePO.XMLVALUE);

    await io.assert.verifyElementIsDisplayed(
      selectors.flowBuilderPagePO.PATH_TO_RESOURCE_PATH,
      "Field should be visible"
    )
    await io.assert.verifyElementIsDisplayed(
      selectors.flowBuilderPagePO.PATH_TO_SUCCESS_PATH,
      "Field should be visible"
    )
    await io.assert.verifyElementIsDisplayed(
      selectors.flowBuilderPagePO.PATH_TO_FILE_URL_PATHS,
      "Field should be visible"
    )
    await io.assert.verifyElementIsDisplayed(
      selectors.flowBuilderPagePO.PATH_TO_FAIL_PATH,
      "Field should be visible"
    )
    await io.assert.verifyElementIsDisplayed(
      selectors.flowBuilderPagePO.PATH_TO_ERROR_PATH,
      "Field should be visible"
    )
    await io.connectionPage.addStep("Verified visibility when Override media type for success responses is Do not overrid and Override media type for error responses is XML");

    // Check for visibility when Override media type for success responses is XML and Override media type for error responses is XML
    await io.flowBuilder.click(selectors.flowBuilderPagePO.OVERRIDE_MEDIA_ERROR_RESPONSE);
    await io.flowBuilder.click(selectors.flowBuilderPagePO.XMLVALUE);
    await io.flowBuilder.click(selectors.flowBuilderPagePO.OVERRIDE_MEDIA_SUCCESS_RESPONSE);
    await io.flowBuilder.click(selectors.flowBuilderPagePO.XMLVALUE);

    await io.assert.verifyElementIsDisplayed(
      selectors.flowBuilderPagePO.PATH_TO_RESOURCE_PATH,
      "Field should be visible"
    )
    await io.assert.verifyElementIsDisplayed(
      selectors.flowBuilderPagePO.PATH_TO_SUCCESS_PATH,
      "Field should be visible"
    )
    await io.assert.verifyElementIsDisplayed(
      selectors.flowBuilderPagePO.PATH_TO_FILE_URL_PATHS,
      "Field should be visible"
    )
    await io.assert.verifyElementIsDisplayed(
      selectors.flowBuilderPagePO.PATH_TO_FAIL_PATH,
      "Field should be visible"
    )
    await io.assert.verifyElementIsDisplayed(
      selectors.flowBuilderPagePO.PATH_TO_ERROR_PATH,
      "Field should be visible"
    )
    await io.connectionPage.addStep("Verified visibility when Override media type for success responses is XML and Override media type for error responses is XML");

    // Check for visibility when Override media type for success responses is Plain text and Override media type for error responses is Do not override
    await io.flowBuilder.click(selectors.flowBuilderPagePO.OVERRIDE_MEDIA_SUCCESS_RESPONSE);
    await io.flowBuilder.click(selectors.connectionsPagePO.PLAINTEXT);
    await io.flowBuilder.click(selectors.flowBuilderPagePO.OVERRIDE_MEDIA_ERROR_RESPONSE);
    await io.flowBuilder.click(selectors.flowBuilderPagePO.DO_NOT_OVERRIDE_MEDIA_TYPE);

    await io.assert.checkElementState(selectors.flowBuilderPagePO.PATH_TO_RESOURCE_PATH, 'isHidden');
    await io.assert.checkElementState(selectors.flowBuilderPagePO.PATH_TO_SUCCESS_PATH, 'isHidden');
    await io.assert.checkElementState(selectors.flowBuilderPagePO.PATH_TO_FILE_URL_PATHS, 'isHidden');
    await io.assert.verifyElementIsDisplayed(
      selectors.flowBuilderPagePO.PATH_TO_FAIL_PATH,
      "Field should be visible"
    )
    await io.assert.verifyElementIsDisplayed(
      selectors.flowBuilderPagePO.PATH_TO_ERROR_PATH,
      "Field should be visible"
    )

    // TC_C120082 - Verify For Exports/Lookups, remove the “Does this API use paging?” section if The override media type for success response is plain text OR if the connection media type is plain text (Provided all other override media type is “Do not override”)
    // Does this API use paging? section will not be visible
    await io.assert.checkElementState(selectors.flowBuilderPagePO.PAGE, 'isHidden');
    await io.connectionPage.addStep("Verified visibility when Override media type for success responses is Plain text and Override media type for error responses is Do not override");

    // Check for visibility when Override media type for success responses is Do not override and Override media type for error responses is Plain text
    await io.flowBuilder.click(selectors.flowBuilderPagePO.OVERRIDE_MEDIA_SUCCESS_RESPONSE);
    await io.flowBuilder.click(selectors.flowBuilderPagePO.DO_NOT_OVERRIDE_MEDIA_TYPE);
    await io.flowBuilder.click(selectors.flowBuilderPagePO.OVERRIDE_MEDIA_ERROR_RESPONSE);
    await io.flowBuilder.click(selectors.connectionsPagePO.PLAINTEXT);

    await io.assert.verifyElementIsDisplayed(
      selectors.flowBuilderPagePO.PATH_TO_RESOURCE_PATH,
      "Field should be visible"
    )
    await io.assert.verifyElementIsDisplayed(
      selectors.flowBuilderPagePO.PATH_TO_SUCCESS_PATH,
      "Field should be visible"
    )
    await io.assert.verifyElementIsDisplayed(
      selectors.flowBuilderPagePO.PATH_TO_FILE_URL_PATHS,
      "Field should be visible"
    )
    await io.assert.checkElementState(selectors.flowBuilderPagePO.PATH_TO_FAIL_PATH, 'isHidden');
    await io.assert.checkElementState(selectors.flowBuilderPagePO.PATH_TO_ERROR_PATH, 'isHidden');

    // TC_C120082 - Verify For Exports/Lookups, remove the “Does this API use paging?” section if The override media type for success response is plain text OR if the connection media type is plain text (Provided all other override media type is “Do not override”)
    // Does this API use paging? section will be visible
    await io.assert.verifyElementIsDisplayed(
      selectors.flowBuilderPagePO.PAGE,
      "Field should be visible"
    )
    await io.connectionPage.addStep("Verified visibility when Override media type for success responses is Do not override and Override media type for error responses is Plain text");

    // Check for visibility when Override media type for success responses is Plain text and Override media type for error responses is Plain text
    await io.flowBuilder.click(selectors.flowBuilderPagePO.OVERRIDE_MEDIA_SUCCESS_RESPONSE);
    await io.flowBuilder.click(selectors.connectionsPagePO.PLAINTEXT);
    await io.flowBuilder.click(selectors.flowBuilderPagePO.OVERRIDE_MEDIA_ERROR_RESPONSE);
    await io.flowBuilder.click(selectors.connectionsPagePO.PLAINTEXT);

    await io.assert.checkElementState(selectors.flowBuilderPagePO.PATH_TO_RESOURCE_PATH, 'isHidden');
    await io.assert.checkElementState(selectors.flowBuilderPagePO.PATH_TO_SUCCESS_PATH, 'isHidden');
    await io.assert.checkElementState(selectors.flowBuilderPagePO.PATH_TO_FILE_URL_PATHS, 'isHidden');
    await io.assert.checkElementState(selectors.flowBuilderPagePO.PATH_TO_FAIL_PATH, 'isHidden');
    await io.assert.checkElementState(selectors.flowBuilderPagePO.PATH_TO_ERROR_PATH, 'isHidden');

    // TC_C120082 - Verify For Exports/Lookups, remove the “Does this API use paging?” section if The override media type for success response is plain text OR if the connection media type is plain text (Provided all other override media type is “Do not override”)
    // Does this API use paging? section will not be visible
    await io.assert.checkElementState(selectors.flowBuilderPagePO.PAGE, 'isHidden');

    await io.connectionPage.addStep("Verified visibility when Override media type for success responses is Plain text and Override media type for error responses is Plain text");

    // CONNECTION MEDIA TYPE IS PLAIN TEXT && http method is GET
    await io.flowBuilder.click(selectors.flowBuilderPagePO.REQUESTMEDIATYPE);
    await io.flowBuilder.click(selectors.flowBuilderPagePO.DO_NOT_OVERRIDE_MEDIA_TYPE);

    await io.flowBuilder.click(selectors.flowBuilderPagePO.OVERRIDE_MEDIA_SUCCESS_RESPONSE);
    await io.flowBuilder.click(selectors.flowBuilderPagePO.DO_NOT_OVERRIDE_MEDIA_TYPE);

    await io.flowBuilder.click(selectors.flowBuilderPagePO.OVERRIDE_MEDIA_ERROR_RESPONSE);
    await io.flowBuilder.click(selectors.flowBuilderPagePO.DO_NOT_OVERRIDE_MEDIA_TYPE);

    await io.flowBuilder.click(selectors.exportsPagePO.HTTP_METHOD);
    await io.flowBuilder.click(selectors.exportsPagePO.HTTP_METHOD_GET);

    await io.flowBuilder.fill(selectors.connectionsPagePO.CONNECTION_INPUT, "HTTP CONNECTION MEDIA TYPE AS PLAIN TEXT");
    await io.homePage.clickByText("HTTP CONNECTION MEDIA TYPE AS PLAIN TEXT");
    await io.connectionPage.addStep("HTTP method as GET, Connection media type as Plain text");

    // TC_C120060 - Verify the Fields to remove when the "Override media type for success responses" field value is Plain text.
    // TC_C120062 - Verify the Fields to remove when the "Override media type for error responses" field value is Plain text
    // TC_C120064 - Verify If the connection media type is set to 'Plain text' and 'Override media type for success/error responses' is set to JSON/XML, and any combination that has the http response (both success and error) other than Plain text

    await io.flowBuilder.click(selectors.exportsPagePO.NON_STANDARD_API_TAB);
    await io.flowBuilder.click(selectors.flowBuilderPagePO.OVERRIDE_MEDIA_SUCCESS_RESPONSE);
    await io.assert.checkElementState(selectors.connectionsPagePO.PLAINTEXT, 'isHidden');
    await io.flowBuilder.click(selectors.flowBuilderPagePO.DO_NOT_OVERRIDE_MEDIA_TYPE);

    await io.flowBuilder.click(selectors.flowBuilderPagePO.OVERRIDE_MEDIA_ERROR_RESPONSE);
    await io.assert.checkElementState(selectors.connectionsPagePO.PLAINTEXT, 'isHidden');
    await io.flowBuilder.click(selectors.flowBuilderPagePO.DO_NOT_OVERRIDE_MEDIA_TYPE);

    await io.connectionPage.addStep("Verified plain text option is not present in Override request media type, success media type and error media type if connection media type is plain text");

    // Check for visibility when Override media type for success responses is Do not override and Override media type for error responses is Do not override
    await io.flowBuilder.click(selectors.flowBuilderPagePO.OVERRIDE_MEDIA_SUCCESS_RESPONSE);
    await io.flowBuilder.click(selectors.flowBuilderPagePO.DO_NOT_OVERRIDE_MEDIA_TYPE);
    await io.flowBuilder.click(selectors.flowBuilderPagePO.OVERRIDE_MEDIA_ERROR_RESPONSE);
    await io.flowBuilder.click(selectors.flowBuilderPagePO.DO_NOT_OVERRIDE_MEDIA_TYPE);

    await io.assert.checkElementState(selectors.flowBuilderPagePO.PATH_TO_RESOURCE_PATH, 'isHidden');
    await io.assert.checkElementState(selectors.flowBuilderPagePO.PATH_TO_SUCCESS_PATH, 'isHidden');
    await io.assert.checkElementState(selectors.flowBuilderPagePO.PATH_TO_FILE_URL_PATHS, 'isHidden');
    await io.assert.checkElementState(selectors.flowBuilderPagePO.PATH_TO_FAIL_PATH, 'isHidden');
    await io.assert.checkElementState(selectors.flowBuilderPagePO.PATH_TO_ERROR_PATH, 'isHidden');

    // TC_C120082 - Verify For Exports/Lookups, remove the “Does this API use paging?” section if The override media type for success response is plain text OR if the connection media type is plain text (Provided all other override media type is “Do not override”)
    // Does this API use paging? section will not be visible
    await io.assert.checkElementState(selectors.flowBuilderPagePO.PAGE, 'isHidden');
    await io.connectionPage.addStep("Verified visibility when Override media type for success responses is Do not override and Override media type for error responses is Do not override");

    // Check for visibility when Override media type for success responses is json and Override media type for error responses is Do not override
    await io.flowBuilder.click(selectors.flowBuilderPagePO.OVERRIDE_MEDIA_SUCCESS_RESPONSE);
    await io.flowBuilder.click(selectors.flowBuilderPagePO.JSON);
    await io.flowBuilder.click(selectors.flowBuilderPagePO.OVERRIDE_MEDIA_ERROR_RESPONSE);
    await io.flowBuilder.click(selectors.flowBuilderPagePO.DO_NOT_OVERRIDE_MEDIA_TYPE);

    await io.assert.verifyElementIsDisplayed(
      selectors.flowBuilderPagePO.PATH_TO_RESOURCE_PATH,
      "Field should be visible"
    )
    await io.assert.verifyElementIsDisplayed(
      selectors.flowBuilderPagePO.PATH_TO_SUCCESS_PATH,
      "Field should be visible"
    )
    await io.assert.verifyElementIsDisplayed(
      selectors.flowBuilderPagePO.PATH_TO_FILE_URL_PATHS,
      "Field should be visible"
    )
    await io.assert.checkElementState(selectors.flowBuilderPagePO.PATH_TO_FAIL_PATH, 'isHidden');
    await io.assert.checkElementState(selectors.flowBuilderPagePO.PATH_TO_ERROR_PATH, 'isHidden');

    // TC_C120082 - Verify For Exports/Lookups, remove the “Does this API use paging?” section if The override media type for success response is plain text OR if the connection media type is plain text (Provided all other override media type is “Do not override”)
    // Does this API use paging? section will be visible
    await io.assert.verifyElementIsDisplayed(
      selectors.flowBuilderPagePO.PAGE,
      "Field should be visible"
    )
    await io.connectionPage.addStep("Verified visibility when Override media type for success responses is json and Override media type for error responses is Do not override");

    // Check for visibility when Override media type for success responses is Do not override and Override media type for error responses is json
    await io.flowBuilder.click(selectors.flowBuilderPagePO.OVERRIDE_MEDIA_SUCCESS_RESPONSE);
    await io.flowBuilder.click(selectors.flowBuilderPagePO.DO_NOT_OVERRIDE_MEDIA_TYPE);
    await io.flowBuilder.click(selectors.flowBuilderPagePO.OVERRIDE_MEDIA_ERROR_RESPONSE);
    await io.flowBuilder.click(selectors.flowBuilderPagePO.JSON);

    await io.assert.checkElementState(selectors.flowBuilderPagePO.PATH_TO_RESOURCE_PATH, 'isHidden');
    await io.assert.checkElementState(selectors.flowBuilderPagePO.PATH_TO_SUCCESS_PATH, 'isHidden');
    await io.assert.checkElementState(selectors.flowBuilderPagePO.PATH_TO_FILE_URL_PATHS, 'isHidden');
    await io.assert.verifyElementIsDisplayed(
      selectors.flowBuilderPagePO.PATH_TO_FAIL_PATH,
      "Field should be visible"
    )
    await io.assert.verifyElementIsDisplayed(
      selectors.flowBuilderPagePO.PATH_TO_ERROR_PATH,
      "Field should be visible"
    )

    // TC_C120082 - Verify For Exports/Lookups, remove the “Does this API use paging?” section if The override media type for success response is plain text OR if the connection media type is plain text (Provided all other override media type is “Do not override”)
    // Does this API use paging? section will not be visible
    await io.assert.checkElementState(selectors.flowBuilderPagePO.PAGE, 'isHidden');

    await io.connectionPage.addStep("Verified visibility when Override media type for success responses is Do not override and Override media type for error responses is json");

    // Check for visibility when Override media type for success responses is json and Override media type for error responses is json
    await io.flowBuilder.click(selectors.flowBuilderPagePO.OVERRIDE_MEDIA_ERROR_RESPONSE);
    await io.flowBuilder.click(selectors.flowBuilderPagePO.JSON);
    await io.flowBuilder.click(selectors.flowBuilderPagePO.OVERRIDE_MEDIA_SUCCESS_RESPONSE);
    await io.flowBuilder.click(selectors.flowBuilderPagePO.JSON);

    await io.assert.verifyElementIsDisplayed(
      selectors.flowBuilderPagePO.PATH_TO_RESOURCE_PATH,
      "Field should be visible"
    )
    await io.assert.verifyElementIsDisplayed(
      selectors.flowBuilderPagePO.PATH_TO_SUCCESS_PATH,
      "Field should be visible"
    )
    await io.assert.verifyElementIsDisplayed(
      selectors.flowBuilderPagePO.PATH_TO_FILE_URL_PATHS,
      "Field should be visible"
    )
    await io.assert.verifyElementIsDisplayed(
      selectors.flowBuilderPagePO.PATH_TO_FAIL_PATH,
      "Field should be visible"
    )
    await io.assert.verifyElementIsDisplayed(
      selectors.flowBuilderPagePO.PATH_TO_ERROR_PATH,
      "Field should be visible"
    )

    // TC_C120082 - Verify For Exports/Lookups, remove the “Does this API use paging?” section if The override media type for success response is plain text OR if the connection media type is plain text (Provided all other override media type is “Do not override”)
    // Does this API use paging? section will be visible
    await io.assert.verifyElementIsDisplayed(
      selectors.flowBuilderPagePO.PAGE,
      "Field should be visible"
    )

    await io.connectionPage.addStep("Verified visibility when Override media type for success responses is json and Override media type for error responses is json");

    // TC_C120071 - Verify the Fields to remove when the "Override media type for success responses" field value is Plain text
    // TC_C120073 - Verify the Fields to remove when the "Override media type for error responses" field value is Plain text
    // TC_C120075 - Verify If the connection media type is set to 'Plain text' and 'Override media type for success/error responses' is set to JSON/XML, and any combination that has the http response (both success and error) other than Plain text
    // CONNECTION MEDIA TYPE IS PLAIN TEXT && http method is POST
    await io.flowBuilder.click(selectors.exportsPagePO.HTTP_METHOD);
    await io.flowBuilder.click(selectors.importPagePO.HTTPPOSTMETHOD);
    await io.connectionPage.addStep("HTTP method as POST, Connection media type as Plain text");

    await io.flowBuilder.click(selectors.flowBuilderPagePO.REQUESTMEDIATYPE);
    await io.assert.checkElementState(selectors.connectionsPagePO.PLAINTEXT, 'isHidden');
    await io.flowBuilder.click(selectors.flowBuilderPagePO.DO_NOT_OVERRIDE_MEDIA_TYPE);

    await io.flowBuilder.click(selectors.flowBuilderPagePO.OVERRIDE_MEDIA_SUCCESS_RESPONSE);
    await io.assert.checkElementState(selectors.connectionsPagePO.PLAINTEXT, 'isHidden');
    await io.flowBuilder.click(selectors.flowBuilderPagePO.DO_NOT_OVERRIDE_MEDIA_TYPE);

    await io.flowBuilder.click(selectors.flowBuilderPagePO.OVERRIDE_MEDIA_ERROR_RESPONSE);
    await io.assert.checkElementState(selectors.connectionsPagePO.PLAINTEXT, 'isHidden');
    await io.flowBuilder.click(selectors.flowBuilderPagePO.DO_NOT_OVERRIDE_MEDIA_TYPE);

    await io.connectionPage.addStep("Verified plain text option is not present in Override request media type, success media type and error media type if connection media type is plain text");

    // Check for visibility when Override media type for success responses is Do not override and Override media type for error responses is Do not override
    await io.flowBuilder.click(selectors.flowBuilderPagePO.OVERRIDE_MEDIA_SUCCESS_RESPONSE);
    await io.flowBuilder.click(selectors.flowBuilderPagePO.DO_NOT_OVERRIDE_MEDIA_TYPE);
    await io.flowBuilder.click(selectors.flowBuilderPagePO.OVERRIDE_MEDIA_ERROR_RESPONSE);
    await io.flowBuilder.click(selectors.flowBuilderPagePO.DO_NOT_OVERRIDE_MEDIA_TYPE);

    await io.assert.checkElementState(selectors.flowBuilderPagePO.PATH_TO_RESOURCE_PATH, 'isHidden');
    await io.assert.checkElementState(selectors.flowBuilderPagePO.PATH_TO_SUCCESS_PATH, 'isHidden');
    await io.assert.checkElementState(selectors.flowBuilderPagePO.PATH_TO_FILE_URL_PATHS, 'isHidden');
    await io.assert.checkElementState(selectors.flowBuilderPagePO.PATH_TO_FAIL_PATH, 'isHidden');
    await io.assert.checkElementState(selectors.flowBuilderPagePO.PATH_TO_ERROR_PATH, 'isHidden');

    // TC_C120082 - Verify For Exports/Lookups, remove the “Does this API use paging?” section if The override media type for success response is plain text OR if the connection media type is plain text (Provided all other override media type is “Do not override”)
    // Does this API use paging? section will not be visible
    await io.assert.checkElementState(selectors.flowBuilderPagePO.PAGE, 'isHidden');

    await io.connectionPage.addStep("Verified visibility when Override media type for success responses is Do not override and Override media type for error responses is Do not override");

    // Check for visibility when Override media type for success responses is json and Override media type for error responses is Do not override
    await io.flowBuilder.click(selectors.flowBuilderPagePO.OVERRIDE_MEDIA_SUCCESS_RESPONSE);
    await io.flowBuilder.click(selectors.flowBuilderPagePO.JSON);
    await io.flowBuilder.click(selectors.flowBuilderPagePO.OVERRIDE_MEDIA_ERROR_RESPONSE);
    await io.flowBuilder.click(selectors.flowBuilderPagePO.DO_NOT_OVERRIDE_MEDIA_TYPE);

    await io.assert.verifyElementIsDisplayed(
      selectors.flowBuilderPagePO.PATH_TO_RESOURCE_PATH,
      "Field should be visible"
    )
    await io.assert.verifyElementIsDisplayed(
      selectors.flowBuilderPagePO.PATH_TO_SUCCESS_PATH,
      "Field should be visible"
    )
    await io.assert.verifyElementIsDisplayed(
      selectors.flowBuilderPagePO.PATH_TO_FILE_URL_PATHS,
      "Field should be visible"
    )
    await io.assert.checkElementState(selectors.flowBuilderPagePO.PATH_TO_FAIL_PATH, 'isHidden');
    await io.assert.checkElementState(selectors.flowBuilderPagePO.PATH_TO_ERROR_PATH, 'isHidden');

    // TC_C120082 - Verify For Exports/Lookups, remove the “Does this API use paging?” section if The override media type for success response is plain text OR if the connection media type is plain text (Provided all other override media type is “Do not override”)
    // Does this API use paging? section will be visible
    await io.assert.verifyElementIsDisplayed(
      selectors.flowBuilderPagePO.PAGE,
      "Field should be visible"
    )

    await io.connectionPage.addStep("Verified visibility when Override media type for success responses is json and Override media type for error responses is Do not override");

    // Check for visibility when Override media type for success responses is Do not override and Override media type for error responses is json
    await io.flowBuilder.click(selectors.flowBuilderPagePO.OVERRIDE_MEDIA_SUCCESS_RESPONSE);
    await io.flowBuilder.click(selectors.flowBuilderPagePO.DO_NOT_OVERRIDE_MEDIA_TYPE);
    await io.flowBuilder.click(selectors.flowBuilderPagePO.OVERRIDE_MEDIA_ERROR_RESPONSE);
    await io.flowBuilder.click(selectors.flowBuilderPagePO.JSON);

    await io.assert.checkElementState(selectors.flowBuilderPagePO.PATH_TO_RESOURCE_PATH, 'isHidden');
    await io.assert.checkElementState(selectors.flowBuilderPagePO.PATH_TO_SUCCESS_PATH, 'isHidden');
    await io.assert.checkElementState(selectors.flowBuilderPagePO.PATH_TO_FILE_URL_PATHS, 'isHidden');
    await io.assert.verifyElementIsDisplayed(
      selectors.flowBuilderPagePO.PATH_TO_FAIL_PATH,
      "Field should be visible"
    )
    await io.assert.verifyElementIsDisplayed(
      selectors.flowBuilderPagePO.PATH_TO_ERROR_PATH,
      "Field should be visible"
    )

    // TC_C120082 - Verify For Exports/Lookups, remove the “Does this API use paging?” section if The override media type for success response is plain text OR if the connection media type is plain text (Provided all other override media type is “Do not override”)
    // Does this API use paging? section will not be visible
    await io.assert.checkElementState(selectors.flowBuilderPagePO.PAGE, 'isHidden');

    await io.connectionPage.addStep("Verified visibility when Override media type for success responses is Do not override and Override media type for error responses is json");

    // Check for visibility when Override media type for success responses is json and Override media type for error responses is json
    await io.flowBuilder.click(selectors.flowBuilderPagePO.OVERRIDE_MEDIA_ERROR_RESPONSE);
    await io.flowBuilder.click(selectors.flowBuilderPagePO.JSON);
    await io.flowBuilder.click(selectors.flowBuilderPagePO.OVERRIDE_MEDIA_SUCCESS_RESPONSE);
    await io.flowBuilder.click(selectors.flowBuilderPagePO.JSON);

    await io.assert.verifyElementIsDisplayed(
      selectors.flowBuilderPagePO.PATH_TO_RESOURCE_PATH,
      "Field should be visible"
    )
    await io.assert.verifyElementIsDisplayed(
      selectors.flowBuilderPagePO.PATH_TO_SUCCESS_PATH,
      "Field should be visible"
    )
    await io.assert.verifyElementIsDisplayed(
      selectors.flowBuilderPagePO.PATH_TO_FILE_URL_PATHS,
      "Field should be visible"
    )
    await io.assert.verifyElementIsDisplayed(
      selectors.flowBuilderPagePO.PATH_TO_FAIL_PATH,
      "Field should be visible"
    )
    await io.assert.verifyElementIsDisplayed(
      selectors.flowBuilderPagePO.PATH_TO_ERROR_PATH,
      "Field should be visible"
    )

    // TC_C120082 - Verify For Exports/Lookups, remove the “Does this API use paging?” section if The override media type for success response is plain text OR if the connection media type is plain text (Provided all other override media type is “Do not override”)
    // Does this API use paging? section will be visible
    await io.assert.verifyElementIsDisplayed(
      selectors.flowBuilderPagePO.PAGE,
      "Field should be visible"
    )

    await io.connectionPage.addStep("Verified visibility when Override media type for success responses is json and Override media type for error responses is json");


  });
});
