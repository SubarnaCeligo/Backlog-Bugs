import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("C19744_All the AFE panels should open on the right side of the page", () => {
    test.beforeEach(async ({ io }) => {
        await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
    });
    test.afterEach(async ({ io }) => {
        await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
    });
    test("@Env-All @Zephyr-IO-T5583 C19744_All the AFE panels should open on the right side of the page UI_Backlog", async ({ io, page }) => {
        await io.homePage.navigateTo(io.data.links.EXPORTS_PAGE_URL);
        await io.flowBuilder.click(selectors.basePagePO.ADD_NEW_RESOURCE);
        await io.flowBuilder.fill(selectors.settingsPagePO.APP_NAME_INPUT, 'netsuite');
        await io.flowBuilder.click(selectors.connectionsPagePO.NETSUITE_CONNECTION);
        await io.flowBuilder.click(selectors.connectionsPagePO.CONNECTIONS_DROPDOWN);
        await io.flowBuilder.fill(selectors.connectionsPagePO.CONNECTIONS_DROPDOWN, 'NETSUITE CONNECTION');
        await io.exportsPage.clickByTextByIndex('NETSUITE CONNECTION', 0);
        await io.homePage.fill(selectors.connectionsPagePO.NAME_INPUT, 'Netsuite_Export');
        await io.flowBuilder.click(selectors.basePagePO.SAVE);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.ADVANCE);
        await io.flowBuilder.clickByIndex(selectors.flowBuilderPagePO.DATAURITEMPLATE, 1);
        // Validating AFE panels
        await io.assert.verifyElementDisplayedByText("AFE 1.0", "AFE 1.0 is not present");
        await io.assert.verifyElementDisplayedByText("AFE 2.0", "AFE 1.0 is not present");
        await io.assert.verifyElementIsDisplayed(selectors.playgroundPO.LAYOUT_TOGGLE, 'Layout is not visible at right')
    });
}); 
