import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import testData from "@testData/FlowBuilder/T22530.json";

test.describe('T22530 - Verify whether user is able to modify current source of array type field [object] [number] [string] [ boolean]', () => {
    test('@Zephyr-IO-T22530 @Env-All @Priority-P2 T22530 Verify whether user is able to modify current source of array type field [object] [number] [string] [boolean]', async ({ io, page }) => {
        await io.createResourceFromAPI(testData, "FLOWS");

        await io.flowBuilder.addStep("*** Navigate to import mappings ***");
        await io.flowBuilder.click(selectors.flowBuilderPagePO.IMPORT_MAPPINGS);

        await io.flowBuilder.addStep("*** Changing source 2 ***");
        await io.flowBuilder.click(selectors.mappings.MAPPER2DOT0PO.MAPPERSOURCEFIELDTEXT);
        await io.flowBuilder.loadingTime();
        await io.flowBuilder.clickByTextByIndex("$.tickets[*].external_id", 0, {exact: false});
        await io.flowBuilder.loadingTime();
        await io.flowBuilder.clickByText("subject");

        await io.flowBuilder.addStep("*** Verifying the source mapping value ***");
        expect(await page.locator(selectors.mappings.MAPPER2DOT0PO.MAPPERSOURCEFIELDTEXT)).toHaveAttribute("value","$.tickets[*].url,$.subject");

        await io.flowBuilder.addStep("*** Changing source 1 ***");
    });
});