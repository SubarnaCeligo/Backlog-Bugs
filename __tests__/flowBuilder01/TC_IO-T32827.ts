import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("@Author_MaheshNivruttiSutar Update 'Create Transfer' Title for VAN Adaptor As it is Listener", () => {
    test.beforeEach(async ({ io }) => {
        await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
        await io.flowBuilder.loadingTime();
    });
    test("@Epic-IO-83201 @Priority-P3 @Env-All @Zephyr-IO-T32827", async ({ io, page }) => {
        await io.homePage.navigateTo(process.env["IO_Integration_URL"]);
        await io.homePage.loadingTime();
        await io.homePage.click(selectors.flowBuilderPagePO.CREATEFLOW);
        await io.homePage.loadingTime();
        await io.flowBuilder.click(selectors.flowBuilderPagePO.ADD_SOURCE);
        await io.flowBuilder.fill(selectors.settingsPagePO.APP_NAME_INPUT, 'VAN (Value-added network)');
        await io.flowBuilder.click(selectors.connectionsPagePO.VAN_CONNECTION);
        await io.homePage.loadingTime();
        await io.flowBuilder.clickByText('Create flow step');
        await io.homePage.loadingTime();
        const title = await io.flowBuilder.isVisible("text='Create listener'")
        await io.assert.expectToBeTrue(title, "Label is not Updated");
    });
});