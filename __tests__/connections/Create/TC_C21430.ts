import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";


test.describe("TC_C21430_Online is shown blue instead of green", () => {
    test("@Env-All @Zephyr-IO-T4429 TC_C21430_Online is shown blue instead of green UI_Backlog", async ({ io, page },) => {
        await io.homePage.navigateTo(io.data.links.EXPORTS_PAGE_URL);
        await io.flowBuilder.click(selectors.basePagePO.ADD_NEW_RESOURCE);
        await io.flowBuilder.fill(selectors.settingsPagePO.APP_NAME_INPUT, 'netsuite');
        await io.flowBuilder.click(selectors.connectionsPagePO.NETSUITE_CONNECTION);
        await io.flowBuilder.click(selectors.connectionsPagePO.CONNECTIONS_DROPDOWN);
        await io.flowBuilder.fill(selectors.connectionsPagePO.CONNECTIONS_DROPDOWN, 'NETSUITE CONNECTION');
        await io.flowBuilder.clickByText('NETSUITE CONNECTION');
        // Validating connection is online
        const statusDot = page.getByRole("status");
        // await expect(statusDot).toHaveCSS("background-color", "rgb(76, 187, 2)");
        //Changing assertion as per new design
        await io.assert.expectToBeTrue(await io.homePage.isVisible('.bg-successBgMuted'), 'Green background is not visible for Success status');
    });
});


