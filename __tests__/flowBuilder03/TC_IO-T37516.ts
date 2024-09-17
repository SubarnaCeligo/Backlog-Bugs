import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("@Author_MaheshNivruttiSutar @Zephyr-IO-T37515 @Zephyr-IO-T37516'", () => {
    test.beforeEach(async ({ io }) => {
        await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
        await io.flowBuilder.loadingTime();
    });
    test("@Bug-IO-93804 @Priority-P2 @Env-All @Zephyr-IO-T37516'", async ({ io, page }) => {
        await io.homePage.goToMenu("Tools", "Flow builder");
        await io.flowBuilder.loadingTime();
        //Add Source
        await io.flowBuilder.click(selectors.basePagePO.ADD_SOURCE_BUTTON);
        await io.flowBuilder.fill(selectors.settingsPagePO.APP_NAME_INPUT, 'HTTP');
        await io.flowBuilder.click(selectors.connectionsPagePO.HTTP_CNNECTOR);
        await io.homePage.loadingTime();
        await io.flowBuilder.click(selectors.connectionsPagePO.CONNECTIONS_DROPDOWN);
        await page.keyboard.type("HTTP ZENDESK CONNECTION");
        await io.flowBuilder.clickByTextByIndex("HTTP ZENDESK CONNECTION", 0);
        // await io.flowBuilder.click(selectors.flowBuilderPagePO.CLOSE_ICON);
        await io.flowBuilder.loadingTime();
        await io.flowBuilder.clickButtonByIndex(selectors.flowBuilderPagePO.OPENAI.NLS_RESOURCE, 0);
        await io.flowBuilder.click(selectors.basePagePO.SAVE);
        await io.flowBuilder.loadingTime();
        //IO-T37516 Verify Save Button is Enabled After Selecting Connection and Flow Step in Connection Filter
        await io.assert.expectToBeTrue(await (await page.$(selectors.basePagePO.SAVE_AND_CLOSE)).isEnabled(), "Save&Close button is not enabled");
        await io.assert.expectToBeTrue(await (await page.$(selectors.basePagePO.SAVE)).isEnabled(), "Save button is not enabled");
    });
    test("@Bug-IO-93804 @Priority-P2 @Env-All @Zephyr-IO-T37515'", async ({ io, page }) => {
        await io.homePage.goToMenu("Tools", "Flow builder");
        await io.flowBuilder.loadingTime();
        //Add Source
        await io.flowBuilder.click(selectors.basePagePO.ADD_SOURCE_BUTTON);
        await io.flowBuilder.fill(selectors.settingsPagePO.APP_NAME_INPUT, 'HTTP');
        await io.flowBuilder.click(selectors.connectionsPagePO.HTTP_CNNECTOR);
        await io.homePage.loadingTime();
        await io.flowBuilder.clickButtonByIndex(selectors.flowBuilderPagePO.OPENAI.NLS_RESOURCE, 0);
        await io.flowBuilder.click(selectors.basePagePO.SAVE);
        await io.flowBuilder.loadingTime();
        //IO-T37515 Verify “Save and close” buttons always enable when user chooses existing resource and lands on the editing page regardless of whether the connection is selected or not on the filter page?
        const errorMsg = await io.flowBuilder.isVisible('text="A value must be provided"');
        await io.assert.expectToBeTrue(errorMsg, "Error is not displayed");
        await io.assert.expectToBeTrue(await (await page.$(selectors.basePagePO.SAVE_AND_CLOSE)).isEnabled(), "Save&Close button is not enabled");
        await io.assert.expectToBeTrue(await (await page.$(selectors.basePagePO.SAVE)).isEnabled(), "Save button is not enabled");
    });
});