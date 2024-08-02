import { test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import testData from "@testData/Connections/Narvar.json";

test.describe(`C46938 Verify 'select action' option in auditlog tab(at integration level)`, () => {
    test(`@Env-All @Zephyr-IO-T17790 C46938 Verify 'select action' option in auditlog tab(at integration level)`, async ({ io, page }) => {
        await io.createResourceFromAPI(testData, "FLOWS");
        await io.integrationPage.clickByText('Automation Flows');
        await io.integrationPage.clickByText('Audit log');
        await io.flowBuilder.clickByText('Select action');
        const create = await io.flowBuilder.isVisible(`[data-value="create"]`);
        await io.assert.expectToBeTrue(create, 'Create');
    });
});
