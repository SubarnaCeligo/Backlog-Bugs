import { test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import testData from "@testData/Connections/Narvar.json";

test.describe(`C46932 Verify the values present in 'select action' dropdown`, () => {
    test(`@Env-All @Zephyr-IO-T17787 C46932 Verify the values present in 'select action' dropdown`, async ({ io, page }) => {
        await io.myAccountPage.navigateTo(io.data.links.MY_ACCOUNT_PAGE_URL);
        await io.integrationPage.clickByText('Audit log');
        await io.flowBuilder.clickByText('Select action');
        const create = await io.flowBuilder.isVisible(`[data-value="create"]`);
        const update = await io.flowBuilder.isVisible(`[data-value="update"]`);
        const deleteText = await io.flowBuilder.isVisible(`[data-value="delete"]`);
        const view = await io.flowBuilder.isVisible(`[data-value="view"]`);
        await io.assert.expectToBeTrue(create, 'Create');
        await io.assert.expectToBeTrue(update, 'Update');
        await io.assert.expectToBeTrue(deleteText, 'Delete');
        await io.assert.expectToBeTrue(view, 'View');
    });
});
