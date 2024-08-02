import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("@Author_MaheshNivruttiSutar Verify label changed for What would you like to do? field", () => {
    test.beforeEach(async ({ io }) => {
        await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
        await io.myAccountPage.loadingTime();
    });
    test("@BUG-IO-81737 @Priority-P2 @Env-All @Zephyr-IO-T32630", async ({ io, page }) => {
        await io.homePage.navigateTo(process.env["IO_Integration_URL"]);
        await io.homePage.loadingTime()
        await io.homePage.click(selectors.flowBuilderPagePO.CREATEFLOW);
        await io.homePage.loadingTime();
        await io.flowBuilder.click(selectors.flowBuilderPagePO.ADD_SOURCE);
        await io.flowBuilder.fill(selectors.settingsPagePO.APP_NAME_INPUT, 'AS2');
        await io.flowBuilder.click(selectors.connectionsPagePO.AS2_CONNECTOR);
        await io.homePage.loadingTime();
        const labl = await io.flowBuilder.isVisible("text='Listen for real-time data from source application'")
        await io.assert.expectToBeTrue(labl, "Label is not Updated");
        await io.homePage.addStep("*** Verified label for AS2 application ***");
        await io.flowBuilder.fill(selectors.settingsPagePO.APP_NAME_INPUT, 'VAN');
        await io.flowBuilder.click(selectors.connectionsPagePO.VAN_CONNECTION);
        await io.homePage.loadingTime();
        const labl1 = await io.flowBuilder.isVisible("text='Listen for real-time data from source application'")
        await io.assert.expectToBeTrue(labl1, "Label is not Updated");
        await io.homePage.addStep("*** Verified label for VAN application ***");
    });
});