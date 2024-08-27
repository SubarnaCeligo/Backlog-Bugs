import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("Verify that a Salesforce SOAP type import has adaptor specific stub in the mock output.", () => {
    test.beforeEach(async ({ io }) => {
        await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
    });
    test("@Env-All @Zephyr-IO-T24097 Verify that a Salesforce SOAP type import has adaptor specific stub in the mock output.", async ({ io, page }) => {

        //Click on Create Import
        await io.homePage.navigateTo(io.data.links.IMPORTS_PAGE_URL);
        await io.homePage.clickByText('Create import');
        await io.importsPage.click(selectors.importPagePO.SALESFORCE_IMPORT);

        //Select an available connection, provide a name for the import
        await io.flowBuilder.fill(selectors.connectionsPagePO.CONNECTION_INPUT, "SALESFORCE CONNECTION");
        await io.flowBuilder.waitForElementAttached(selectors.connectionsPagePO.CONNECTIONDROP0);
        await io.flowBuilder.click(selectors.connectionsPagePO.CONNECTIONDROP0);
        await io.importsPage.fill(selectors.basePagePO.INPUT_NAME_SELECTOR, "Test TC_C108153");

        //Click Next
        await io.importsPage.clickByText("Next")

        //Select Salesforce Composite
        await io.importsPage.click(selectors.importPagePO.SALESFORCE_SOAP);

        //Expand the Mock Output section and click on Populate canonical stub
        await io.importsPage.click(selectors.importPagePO.EXPAND_MOCK_RESPONSE);
        await io.importsPage.click(selectors.importPagePO.POPULATE_CANONICAL_STUB);

        //Get Stub contents
        const actualStubContents = (await io.importsPage.getText(selectors.importPagePO.STUB_CONTENTS_CSS)).toString();
        
        // //Match with expected stub.
        const expectedStubContents = '[,  {,    "statusCode": 200,,    "id": "0010o000037gWmtAAE",,    "_json": {,      "id": "0010o000037gWmtAAE",,      "success": true,    },,    "errors": [],  },]';
        await io.assert.expectToContainValue(expectedStubContents, actualStubContents, 'Invalid stub contents' )    

    });

});
