import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("Verify that a Netsuite import has netsuite specific stub in the mock output.", () => {
    test.beforeEach(async ({ io }) => {
        await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
    });
    test("@Env-All @Zephyr-IO-T24095 Verify that a Netsuite import has netsuite specific stub in the mock output.", async ({ io, page }) => {
        
        //Click on Create Import
        await io.homePage.navigateTo(io.data.links.IMPORTS_PAGE_URL);
        await io.homePage.clickByText('Create import');
        await io.importsPage.click(selectors.importPagePO.NETSUITE_IMPORT);

        //Select an available connection, provide a name for the import
        await io.importsPage.click(selectors.basePagePO.CONNECTION_DROPDOWN);
        await io.importsPage.clickByText('NETSUITE CONNECTION');
        await io.importsPage.fill(selectors.basePagePO.INPUT_NAME_SELECTOR, "Test TC_C108104");

        //Click on Next
        await io.importsPage.clickByText("Next")

        //Expand the Mock Output section and click on Populate canonical stub
        await io.importsPage.click(selectors.importPagePO.EXPAND_MOCK_RESPONSE);
        await io.importsPage.click(selectors.importPagePO.POPULATE_CANONICAL_STUB);
    
        //Get the stub contents
        const actualStubContents = (await io.importsPage.getText(selectors.importPagePO.STUB_CONTENTS_CSS)).toString();
        
        // Match with expected stub.
        const expectedStubContents = '[,  {,    "id": 478945,,    "statusCode": 200,,    "_json": {,      "id": 478945,    },,    "ignored": false,,    "errors": [],,    "dataURI": "",  },]';
        await io.assert.expectToContainValue(expectedStubContents, actualStubContents, 'Invalid stub contents' );
        
    
    });

});
