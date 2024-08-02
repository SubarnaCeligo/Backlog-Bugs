import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import C112781 from '../../../testData/inputData/FlowDebugger/C112781.json';


test.describe("C112781_C112782_C112783 - Verify the NS import filter feature after test run", () => {
    test("@Env-All @Zephyr-IO-T14710 C112781_C112782_C112783 - Verify the NS import filter feature after test run", async ({ io, page }) => {
        //Create a flow
        await io.createResourceFromAPI(C112781, "FLOWS");

        //Disable the flow
        await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.FLOW_TOGGLE);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.FLOW_TOGGLE);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.FLOW_DISABLE);

        //Wait for the flow to be disabled completely
        await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.FLOW_ON_OFF);

        //Initiate test run
        await io.flowBuilder.clickButtonByIndex(selectors.flowBuilderPagePO.RUNTEST_BUTTON, 0);

        //Wait for test run to complete
        await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.RUNTEST_BUTTON_TOP_XPATH);

        //Click on import
        await io.flowBuilder.click(selectors.flowBuilderPagePO.IMPORT);

        //Wait for import filter icon to appear on Import page
        await io.importsPage.waitForElementAttached(selectors.basePagePO.NETSUITE_INTERNAL_LOOKUP);
        
        //Verify if the filter button has T icon
        await io.importsPage.addStep('C112781 - Verify that the lookup filter icon on NS import shows T icon after test run is complete and check the hovertext for filter button.')
        await io.assert.verifyElementIsDisplayed(selectors.importPagePO.IMPORT_LOOKUP_T_ICON, "T Icon is not displayed");
        
        //Hover on the filter button
        await io.importsPage.hover(selectors.basePagePO.NETSUITE_INTERNAL_LOOKUP);

        //Get the hover text
        await io.importsPage.waitForElementAttached(selectors.flowBuilderPagePO.RUNTEST_TOOLTIP);
        const hoverText = (await io.flowBuilder.getText(selectors.flowBuilderPagePO.RUNTEST_TOOLTIP)).toString();

        //Validate the hover text
        await io.assert.expectToContainValue('View test run results  Define lookup criteria', hoverText, 'Hovertext did not appera on NS import filter button');

        //Click on the filter button
        await io.importsPage.addStep('C112782 - Verify that lookup filter with T icon opens the test run results tab in the lookup drawer')
        await io.importsPage.click(selectors.basePagePO.NETSUITE_INTERNAL_LOOKUP);

        //Verify if Test results tab is displayed
        await io.importsPage.waitForElementAttached(selectors.importPagePO.IMPORT_TEST_RESULTS);
        await io.assert.verifyElementIsDisplayed(selectors.importPagePO.IMPORT_TEST_RESULTS, 'Test Results are not displayed');

        //Verify T icon on Test reults tab
        await io.assert.verifyElementIsDisplayed(selectors.flowBuilderPagePO.INTERNAL_ID_T_ICON, 'T icon not displayed in test results tab');

        await io.importsPage.addStep('C112783 - Verify that the lookup drawer shows test result in the form of rows of records.');
        
        //Validate the contents of test results tab
        const headers = (await io.importsPage.getText(selectors.importPagePO.TEST_RESULTS_HEADERS)).toString();
        await io.assert.expectToContainValue('RecordTrace keyStatus', headers, 'Test results are not displayed');

        const contents = (await io.importsPage.getText(selectors.importPagePO.TEST_RESULTS_CONTENTS)).toString();
        await io.assert.expectToContainValue('Record 1,Record 2,Record 3', contents, 'Test results are not displayed');

    });
});