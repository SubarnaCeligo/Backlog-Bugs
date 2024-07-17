import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import testData from "@testData/Flows/C120083.json";

test.describe(`TC_C120083_C120084_C120086_C120088_C120085_C120087_C120089_C120095`, () => {
  test(`@Env-All @Zephyr-IO-T18684 @Zephyr-IO-T18685 @Zephyr-IO-T18686 @Zephyr-IO-T18687 @Zephyr-IO-T18688 @Zephyr-IO-T18689 TC_C120083_C120084_C120086_C120088_C120085_C120087_C120089_C120095`, async ({ io, page }) => {
    await io.createResourceFromAPI(testData, "FLOWS");
    await io.homePage.loadingTime()
    await io.flowBuilder.click(selectors.flowBuilderPagePO.IMPORT);
    await io.homePage.loadingTime()
    
    // TC_C120083 - verify if Users are provided with an additional dropdown value "Plain text" in the "Override request media type" field under What would you like to import? for http imports
    // TC_C120084 - verify if Users are provided with an additional dropdown value "Plain text" in the http imports in below fields Override media type for success responses? Override media type for error responses?
    await io.connectionPage.addStep("HTTP method as POST, Connection media type as JSON");

    await io.flowBuilder.click(selectors.flowBuilderPagePO.REQUESTMEDIATYPE);
    await io.assert.verifyElementContainsText(selectors.connectionsPagePO.PLAINTEXT, 'Plain text');
    await io.flowBuilder.click(selectors.flowBuilderPagePO.DO_NOT_OVERRIDE_MEDIA_TYPE);

    await io.flowBuilder.click(selectors.flowBuilderPagePO.OVERRIDE_MEDIA_SUCCESS_RESPONSE);
    await io.assert.verifyElementContainsText(selectors.connectionsPagePO.PLAINTEXT, 'Plain text');
    await io.flowBuilder.click(selectors.flowBuilderPagePO.DO_NOT_OVERRIDE_MEDIA_TYPE);

    await io.flowBuilder.click(selectors.flowBuilderPagePO.OVERRIDE_MEDIA_ERROR_RESPONSE);
    await io.assert.verifyElementContainsText(selectors.connectionsPagePO.PLAINTEXT, 'Plain text');
    await io.flowBuilder.click(selectors.flowBuilderPagePO.DO_NOT_OVERRIDE_MEDIA_TYPE);

    await io.connectionPage.addStep("Verified Plain text in the existing 'Override media type for success responses' && 'Override media type for error responses' && 'Override request media type' field in http imports");

    // TC_C120086 - Verify the Fields to remove when the "Override media type for success responses" field value is Plain text in imports
    // TC_C120088 - Verify the Fields to remove when the "Override media type for error responses" field value is Plain text in imports
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
      selectors.flowBuilderPagePO.ID_PATH, 
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

    await io.connectionPage.addStep("Verified all the fields are visible when Override media type for success responses is Do not override and Override media type for error responses is Do not override");

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
      selectors.flowBuilderPagePO.ID_PATH,
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

    await io.connectionPage.addStep("Verified all the fields are visible when Override media type for success responses is XML and Override media type for error responses is Do not override");

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
      selectors.flowBuilderPagePO.ID_PATH,
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

    await io.connectionPage.addStep("Verified all the fields are visible when Override media type for success responses is Do not override and Override media type for error responses is XML");

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
      selectors.flowBuilderPagePO.ID_PATH,
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

    await io.connectionPage.addStep("Verified all the fields are visible when Override media type for success responses is XML and Override media type for error responses is XML");

    // Check for visibility when Override media type for success responses is Plain text and Override media type for error responses is Do not override
    await io.flowBuilder.click(selectors.flowBuilderPagePO.OVERRIDE_MEDIA_SUCCESS_RESPONSE);
    await io.flowBuilder.click(selectors.connectionsPagePO.PLAINTEXT);
    await io.flowBuilder.click(selectors.flowBuilderPagePO.OVERRIDE_MEDIA_ERROR_RESPONSE);
    await io.flowBuilder.click(selectors.flowBuilderPagePO.DO_NOT_OVERRIDE_MEDIA_TYPE);

    await io.assert.checkElementState(selectors.flowBuilderPagePO.PATH_TO_RESOURCE_PATH, 'isHidden');
    await io.assert.checkElementState(selectors.flowBuilderPagePO.PATH_TO_SUCCESS_PATH, 'isHidden');
    await io.assert.checkElementState(selectors.flowBuilderPagePO.ID_PATH, 'isHidden');
    await io.assert.verifyElementIsDisplayed(
      selectors.flowBuilderPagePO.PATH_TO_FAIL_PATH,
      "Field should be visible"
    )
    await io.assert.verifyElementIsDisplayed(
      selectors.flowBuilderPagePO.PATH_TO_ERROR_PATH,
      "Field should be visible"
    )

    await io.connectionPage.addStep("Verified all the fields are visible when Override media type for success responses is Plain text and Override media type for error responses is Do not override");

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
      selectors.flowBuilderPagePO.ID_PATH,
      "Field should be visible"
    )
    await io.assert.checkElementState(selectors.flowBuilderPagePO.PATH_TO_FAIL_PATH, 'isHidden');
    await io.assert.checkElementState(selectors.flowBuilderPagePO.PATH_TO_ERROR_PATH, 'isHidden');

    await io.connectionPage.addStep("Verified all the fields are visible when Override media type for success responses is Do not override and Override media type for error responses is Plain text");

    // Check for visibility when Override media type for success responses is Plain text and Override media type for error responses is Plain text
    await io.flowBuilder.click(selectors.flowBuilderPagePO.OVERRIDE_MEDIA_SUCCESS_RESPONSE);
    await io.flowBuilder.click(selectors.connectionsPagePO.PLAINTEXT);
    await io.flowBuilder.click(selectors.flowBuilderPagePO.OVERRIDE_MEDIA_ERROR_RESPONSE);
    await io.flowBuilder.click(selectors.connectionsPagePO.PLAINTEXT);

    await io.assert.checkElementState(selectors.flowBuilderPagePO.PATH_TO_RESOURCE_PATH, 'isHidden');
    await io.assert.checkElementState(selectors.flowBuilderPagePO.PATH_TO_SUCCESS_PATH, 'isHidden');
    await io.assert.checkElementState(selectors.flowBuilderPagePO.ID_PATH, 'isHidden');
    await io.assert.checkElementState(selectors.flowBuilderPagePO.PATH_TO_FAIL_PATH, 'isHidden');
    await io.assert.checkElementState(selectors.flowBuilderPagePO.PATH_TO_ERROR_PATH, 'isHidden');

    await io.connectionPage.addStep("Verified all the fields are visible when Override media type for success responses is Plain text and Override media type for error responses is Plain text");

    // CONNECTION MEDIA TYPE IS PLAIN TEXT && http method is POST
    await io.flowBuilder.click(selectors.flowBuilderPagePO.REQUESTMEDIATYPE);
    await io.flowBuilder.click(selectors.flowBuilderPagePO.DO_NOT_OVERRIDE_MEDIA_TYPE);

    await io.flowBuilder.click(selectors.flowBuilderPagePO.OVERRIDE_MEDIA_SUCCESS_RESPONSE);
    await io.flowBuilder.click(selectors.flowBuilderPagePO.DO_NOT_OVERRIDE_MEDIA_TYPE);

    await io.flowBuilder.click(selectors.flowBuilderPagePO.OVERRIDE_MEDIA_ERROR_RESPONSE);
    await io.flowBuilder.click(selectors.flowBuilderPagePO.DO_NOT_OVERRIDE_MEDIA_TYPE);

    await io.flowBuilder.fill(selectors.connectionsPagePO.CONNECTION_INPUT, "HTTP CONNECTION MEDIA TYPE AS PLAIN TEXT");
    await io.homePage.clickByText("HTTP CONNECTION MEDIA TYPE AS PLAIN TEXT");
    await io.connectionPage.addStep("Connection media type as Plain text");

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

    // TC_C120085 - Verify the Fields to remove when the "Override media type for success responses" field value is Plain text in imports
    // TC_C120087 - Verify the Fields to remove when the "Override media type for error responses" field value is Plain text in imports
    // TC_C120089 - Verify If the connection media type is set to 'Plain text' and 'Override media type for success/error responses' is set to JSON/XML, and any combination that has the http response (both success and error) other than Plain text

    // Check for visibility when Override media type for success responses is Do not override and Override media type for error responses is Do not override
    await io.flowBuilder.click(selectors.flowBuilderPagePO.OVERRIDE_MEDIA_SUCCESS_RESPONSE);
    await io.flowBuilder.click(selectors.flowBuilderPagePO.DO_NOT_OVERRIDE_MEDIA_TYPE);
    await io.flowBuilder.click(selectors.flowBuilderPagePO.OVERRIDE_MEDIA_ERROR_RESPONSE);
    await io.flowBuilder.click(selectors.flowBuilderPagePO.DO_NOT_OVERRIDE_MEDIA_TYPE);

    await io.assert.checkElementState(selectors.flowBuilderPagePO.PATH_TO_RESOURCE_PATH, 'isHidden');
    await io.assert.checkElementState(selectors.flowBuilderPagePO.PATH_TO_SUCCESS_PATH, 'isHidden');
    await io.assert.checkElementState(selectors.flowBuilderPagePO.ID_PATH, 'isHidden');
    await io.assert.checkElementState(selectors.flowBuilderPagePO.PATH_TO_FAIL_PATH, 'isHidden');
    await io.assert.checkElementState(selectors.flowBuilderPagePO.PATH_TO_ERROR_PATH, 'isHidden');

    await io.connectionPage.addStep("Verified all the fields are not visible when Override media type for success responses is Do not override and Override media type for error responses is Do not override");

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
      selectors.flowBuilderPagePO.ID_PATH,
      "Field should be visible"
    )
    await io.assert.checkElementState(selectors.flowBuilderPagePO.PATH_TO_FAIL_PATH, 'isHidden');
    await io.assert.checkElementState(selectors.flowBuilderPagePO.PATH_TO_ERROR_PATH, 'isHidden');

    await io.connectionPage.addStep("Verified all the fields are not visible when Override media type for success responses is json and Override media type for error responses is Do not override");

    // Check for visibility when Override media type for success responses is Do not override and Override media type for error responses is json
    await io.flowBuilder.click(selectors.flowBuilderPagePO.OVERRIDE_MEDIA_SUCCESS_RESPONSE);
    await io.flowBuilder.click(selectors.flowBuilderPagePO.DO_NOT_OVERRIDE_MEDIA_TYPE);
    await io.flowBuilder.click(selectors.flowBuilderPagePO.OVERRIDE_MEDIA_ERROR_RESPONSE);
    await io.flowBuilder.click(selectors.flowBuilderPagePO.JSON);

    await io.assert.checkElementState(selectors.flowBuilderPagePO.PATH_TO_RESOURCE_PATH, 'isHidden');
    await io.assert.checkElementState(selectors.flowBuilderPagePO.PATH_TO_SUCCESS_PATH, 'isHidden');
    await io.assert.checkElementState(selectors.flowBuilderPagePO.ID_PATH, 'isHidden');
    await io.assert.verifyElementIsDisplayed(
      selectors.flowBuilderPagePO.PATH_TO_FAIL_PATH,
      "Field should be visible"
    )
    await io.assert.verifyElementIsDisplayed(
      selectors.flowBuilderPagePO.PATH_TO_ERROR_PATH,
      "Field should be visible"
    )

    await io.connectionPage.addStep("Verified all the fields are not visible when Override media type for success responses is Do not override and Override media type for error responses is json");

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
      selectors.flowBuilderPagePO.ID_PATH,
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

    await io.connectionPage.addStep("Verified all the fields are visible when Override media type for success responses is json and Override media type for error responses is json");

    // TC_C120095 - Verify if The "Number of records per HTTP request" field should be hidden if the request media type for import is plain text or connection media type is plain text

    await io.flowBuilder.click(selectors.flowBuilderPagePO.REQUESTMEDIATYPE);
    await io.flowBuilder.click(selectors.flowBuilderPagePO.JSON);

    await io.connectionPage.addStep("Connection media type is Plain text and Override request media type is JSON");

    await io.assert.checkElementState(selectors.importPagePO.NUMBER_OF_RECORDS_PER_HTTP_REQUEST, 'isVisible');

    await io.connectionPage.addStep("Verified Number of records per HTTP request field is visible when connection media type is Plain text and Override request media type is JSON");

    await io.flowBuilder.click(selectors.flowBuilderPagePO.REQUESTMEDIATYPE);
    await io.flowBuilder.click(selectors.flowBuilderPagePO.DO_NOT_OVERRIDE_MEDIA_TYPE);

    await io.connectionPage.addStep("Connection media type is Plain text and Override request media type is Do not override");

    await io.assert.checkElementState(selectors.importPagePO.NUMBER_OF_RECORDS_PER_HTTP_REQUEST, 'isHidden');

    await io.connectionPage.addStep("Verified Number of records per HTTP request field is not visible when connection media type is Plain text and Override request media type is Do not override");

    await io.flowBuilder.fill(selectors.connectionsPagePO.CONNECTION_INPUT, "FULFILLMENT CONNECTION");
    await io.homePage.clickByText("FULFILLMENT CONNECTION");
    await io.connectionPage.addStep("Connection media type as JSON");

    await io.flowBuilder.click(selectors.flowBuilderPagePO.REQUESTMEDIATYPE);
    await io.flowBuilder.click(selectors.connectionsPagePO.PLAINTEXT);

    await io.connectionPage.addStep("Connection media type is JSON and Override request media type is Plain text");

    await io.assert.checkElementState(selectors.importPagePO.NUMBER_OF_RECORDS_PER_HTTP_REQUEST, 'isHidden');

    await io.connectionPage.addStep("Verified Number of records per HTTP request field is not visible when connection media type is JSON and Override request media type is Plain text");

  });
});
