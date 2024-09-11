import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("@Author_MaheshNivruttiSutar Verify Selected form values is persist on selecting connection for Walmart (multi api and multi version)", () => {
    test("@Bug-IO-84057 @Env-QA @Priority-P2 @Zephyr-IO-T35026", async ({ io, page }) => {
        await io.homePage.navigateTo(process.env["IO_Integration_URL"]);
        await io.homePage.loadingTime()
        await io.homePage.click(selectors.flowBuilderPagePO.CREATEFLOW);
        await io.homePage.loadingTime();
        await io.flowBuilder.click(selectors.flowBuilderPagePO.ADD_SOURCE);
        await io.flowBuilder.fill(selectors.settingsPagePO.APP_NAME_INPUT, 'Walmart');
        await io.flowBuilder.click(selectors.flowBuilderPagePO.WALMART);
        await io.homePage.loadingTime();
        await io.flowBuilder.clickByText('Create flow step');
        await io.homePage.loadingTime();
        await io.flowBuilder.fill(selectors.connectionsPagePO.NAME_INPUT, 'WALMART EXPORT');
        await io.flowBuilder.loadingTime();
        await io.flowBuilder.click(selectors.exportsPagePO.ASSISTANT_META_DATA_RESOURCE);
        await io.homePage.clickByText('Feeds');
        await io.homePage.click(selectors.exportsPagePO.ASSISTANT_META_DATA_OPERATION);
        await io.homePage.clickByText('All feed statuses');
        await io.flowBuilder.loadingTime();
        await io.flowBuilder.click(selectors.connectionsPagePO.CONNECTIONS_DROPDOWN);
        await io.flowBuilder.fill(selectors.connectionsPagePO.CONNECTIONS_DROPDOWN, 'WALMART');
        await io.flowBuilder.clickByText('Walmart Mexico');
        await io.flowBuilder.loadingTime();
        const isRevisionsDisplayed = await io.flowBuilder.isVisible('text="A value must be provided"');
        await io.assert.expectToBeFalse(isRevisionsDisplayed, "Error is displayed");
    });
});