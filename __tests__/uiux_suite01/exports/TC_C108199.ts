import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("TC_C108199 Verify user is able to create connection through export", () => {
    test.beforeEach(async ({ io }) => {
        await io.myAccountPage.navigateTo('integrations/none/flowBuilder');
        await io.homePage.loadingTime();
    });

    test("@Zephyr-T24176 @Env-All @Priority-P2 TC_C108199 Verify user is able to create connection through export", async ({ io, page }) => {
        await io.flowBuilder.clickByTextByIndex('Create flow', 0);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.ADD_SOURCE);
        await io.flowBuilder.fill(selectors.settingsPagePO.APP_NAME_INPUT, 'http');
        await io.flowBuilder.clickByTextByIndex('HTTP', 0);
        await io.flowBuilder.click(selectors.basePagePO.CREATE_FROM_SCRATCH);
        await io.flowBuilder.addStep("Clicking on create connection");
        await io.flowBuilder.clickByTextByIndex('create connection', 0);
        await io.flowBuilder.addStep("Filling the connection form");
        await io.flowBuilder.fillByIndex(selectors.connectionsPagePO.NAME_INPUT, 'HTTP CONNECTION', 1);
        await io.flowBuilder.fill(selectors.connectionsPagePO.BASE_URI_INPUT, 'https://d3v-celigolabs.zendesk.com/');
        await io.flowBuilder.click(selectors.connectionsPagePO.SLACK_AUTH_TYPE);
        await io.flowBuilder.clickByTextByIndex('Basic', 0);
        await io.flowBuilder.fill(selectors.connectionsPagePO.USERNAME, 'celigo-labs@celigo.com');
        await io.flowBuilder.fill(selectors.connectionsPagePO.PASSWORD, 'test');

        await io.flowBuilder.addStep("Saving the connection");
        await io.flowBuilder.click(selectors.basePagePO.SAVE_AND_CLOSE);

        await io.flowBuilder.addStep("Validating that the connection is created");
        expect(await page.locator(':text("Create export")').isVisible()).toBeTruthy();
        expect(await page.locator(':text("HTTP CONNECTION")').isVisible()).toBeTruthy();

    });
});