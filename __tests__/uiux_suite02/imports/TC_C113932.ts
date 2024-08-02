import { test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import C113932 from '../../../testData/inputData/FlowDebugger/C113932.json';

test.describe("Bug# IO-55940 - Lookup in NS import is being reset after configuring conditional mapping(advanced lookup)", () => {
    test("@Env-All Bug# IO-55940 - Lookup in NS import is being reset after configuring conditional mapping(advanced lookup)", async ({ io, page }) => {
        //Create a flow
        await io.createResourceFromAPI(C113932, "FLOWS");

        //Click on import mappings
        await io.flowBuilder.click(selectors.flowBuilderPagePO.IMPORT_MAPPINGS);

        //Click on gear icon to open settings
        await io.importsPage.click(selectors.mappings.DEFAULT_MAPPING_TYPE.FIELD_MAPPING_SETTING);

        //Verify if lookup filter is visible.
        await io.importsPage.waitForElementAttached(selectors.mappings.MAPPER2DOT0PO.NS_LOOKUP_FILTER);
        await io.assert.verifyElementIsDisplayed(selectors.mappings.MAPPER2DOT0PO.NS_LOOKUP_FILTER, 'Lookup filter is not displayed');

    });
});