import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("@Author_MaheshNivruttiSutar Verify label updated properly", () => {
    test.beforeEach(async ({ io }) => {
        await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
    });
    test("@Epic-IO-75764 @Priority-P2 @Env-All @Zephyr-IO-T31360 @Zephyr-IO-T31361", async ({ io, page }) => {
        await io.homePage.navigateTo(process.env["IO_Integration_URL"]);
        await io.homePage.loadingTime()
        await io.homePage.click(selectors.flowBuilderPagePO.CREATEFLOW);
        await io.homePage.loadingTime();
        await io.flowBuilder.click(selectors.flowBuilderPagePO.ADD_SOURCE);
        await io.flowBuilder.fill(selectors.settingsPagePO.APP_NAME_INPUT, 'HTTP');
        await io.flowBuilder.click(selectors.connectionsPagePO.HTTP_CNNECTOR);
        await io.homePage.loadingTime();
        const createNew = await io.flowBuilder.isVisible("text='Create flow step'")
        await io.assert.expectToBeTrue(createNew, "Label is not Updated");
        const cloneEXi = await io.flowBuilder.isVisible("text='Clone or reuse an existing flow step from your account'")
        await io.assert.expectToBeTrue(cloneEXi, "Label is not Updated")
        await io.flowBuilder.click(selectors.basePagePO.CLOSE);
    });
});