
import { test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("TC_C103070 Verify Based on the selection from the simple view, the details  will be automatically updated in the HTTP view", () => {
    test.beforeEach(async ({ io }) => {
        await io.myAccountPage.navigateTo('integrations/none/flowBuilder');
        await io.homePage.loadingTime();
    });

    test("@Zephyr-IO-T24471 @Env-All @Priority-P2 TC_C103070 Verify Based on the selection from the simple view, the details  will be automatically updated in the HTTP view.", async ({ io, page }) => {
        await io.flowBuilder.clickByTextByIndex('Create flow', 0);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.ADD_DESTINATION_OR_LOOKUP);

        await io.flowBuilder.fill(selectors.settingsPagePO.APP_NAME_INPUT, 'Yotpo');
        await io.flowBuilder.clickByTextByIndex('Yotpo', 0);

        await io.flowBuilder.clickByTextByIndex('Look up additional records (per record)', 0);
        await io.flowBuilder.click(selectors.basePagePO.CREATE_FROM_SCRATCH);

        await io.flowBuilder.click(selectors.connectionsPagePO.CONNECTIONS_DROPDOWN);
        await io.flowBuilder.fill(selectors.connectionsPagePO.CONNECTIONS_DROPDOWN, 'YOTPO CONNECTION');
        await io.flowBuilder.clickByText('YOTPO CONNECTION', { exact: false });
        await io.homePage.fill(selectors.connectionsPagePO.NAME_INPUT, 'Yotpo Lookup');

        await io.flowBuilder.addStep("Filling the simple view form");
        await io.flowBuilder.clickByTextByIndex('Please select', 0);
        await io.flowBuilder.clickByTextByIndex('Reviews - merchant', 0);

        await io.flowBuilder.clickByTextByIndex('Please select', 0);
        await io.flowBuilder.clickByTextByIndex("Retrieve all reviews", 0);

        await io.flowBuilder.fill(selectors.connectionsPagePO.APPLICATION_NAME0, 'since_id');
        await io.flowBuilder.fill(selectors.connectionsPagePO.APPLICATION_VALUE0, '123')

        await io.flowBuilder.addStep("Switching to HTTP view");
        await io.flowBuilder.click(selectors.basePagePO.HTTP_2DOT0)

        await io.flowBuilder.addStep("Verifying fields are populated in HTTP view");
        await io.assert.verifyElementAttributeContainsText(
            selectors.exportsPagePO.HTTP_RELATIVE_URI_INPUT,
            'value',
            '/v1/apps/{{connection.http.unencrypted.clientId}}/reviews?page={{export.http.paging.page}}&since_id=123',
        );
    });
});
