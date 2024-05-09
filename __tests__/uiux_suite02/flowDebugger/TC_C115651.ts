import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import SCRIPT from "@testData/FlowDebugger/C115651.json"

test.describe("TC_C117019_C115651", () => {
    test("TC_C115651 Verify proper error message should show while creating more than 200 agent", async ({ io, page }) => {
        await io.api.postCall(`v1/agents`, SCRIPT.agent);
        await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
        await io.homePage.waitForElementAttached(selectors.homePagePO.TILE_VIEW);
        await io.flowBuilder.click(selectors.basePagePO.RESOURCES);
        await io.homePage.hover(selectors.basePagePO.AGENTS);
        await io.flowBuilder.click(selectors.basePagePO.AGENTS);
        await io.flowBuilder.click(selectors.basePagePO.ADD_NEW_RESOURCE);
        await io.flowBuilder.enterHugeData(selectors.basePagePO.ADD_NAME, 'TC_C115651');
        await io.flowBuilder.click(selectors.basePagePO.SAVE_AND_CLOSE);
        await io.assert.verifyElementIsDisplayed(selectors.basePagePO.NOTIFICATION, 'Error message is not displayed');
        await io.assert.verifyElementText(selectors.basePagePO.NOTIFICATION, 'You exceeded maxium number of Agents allowed per account.');
    });
    test("TC_C117019 Verify user should be able to delete agent if we have 200 agent created", async ({ io, page }) => {
        await io.api.postCall(`v1/agents`, SCRIPT.agent);
        await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
        await io.homePage.waitForElementAttached(selectors.homePagePO.TILE_VIEW);
        await io.flowBuilder.click(selectors.basePagePO.RESOURCES);
        await io.homePage.hover(selectors.basePagePO.AGENTS);
        await io.flowBuilder.click(selectors.basePagePO.AGENTS);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.OPEN_ACTIONS_MENU);
        await io.flowBuilder.click(selectors.integrationPagePO.DELETE_FLOW);
        await io.flowBuilder.click(selectors.basePagePO.DELETE);
        await io.api.postCall(`v1/agents`, SCRIPT.agent);
    });
});