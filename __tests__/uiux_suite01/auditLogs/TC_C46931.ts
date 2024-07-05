import { test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import testData from "@testData/Connections/Narvar.json";

test.describe(`C46931 Verify 'Select action' option in audit logs`, () => {
    test(`@Env-All @Zephyr-IO-T17786 C46931 Verify 'Select action' option in audit logs`, async ({ io, page }) => {
        await io.myAccountPage.navigateTo(io.data.links.MY_ACCOUNT_PAGE_URL);
        await io.integrationPage.clickByText('Audit log');
        await io.flowBuilder.clickByText('Select action');
        const create = await io.flowBuilder.isVisible(`[data-value="create"]`);
        await io.assert.expectToBeTrue(create, 'Create');
    });
});
