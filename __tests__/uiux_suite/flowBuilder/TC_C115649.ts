import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("TC_C115649_C115651", () => {
    test("TC_C115649 Verify Scroller is visible on the IA install base screen", async ({ io, page }) => {
        await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
        await io.homePage.waitForElementAttached(selectors.homePagePO.TILE_VIEW);
        await io.flowBuilder.click(selectors.basePagePO.RESOURCES);
        await io.homePage.hover(selectors.integrationPagePO.INTEGRATIONAPPS);
        await io.flowBuilder.click(selectors.integrationPagePO.INTEGRATIONAPPS);
        await io.homePage.waitForElementAttached(selectors.integrationPagePO.OPENACTIONSMENU);
        await io.flowBuilder.clickButtonInTable(selectors.flowBuilderPagePO.FLOW_NAME_ACCOUNT_DASHBOARD, selectors.integrationPagePO.OPENACTIONSMENU, "IO-56360_DND");
        await io.flowBuilder.click('[data-test="installBase"]');
        await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.INSTALL_BASE_SCROLLER);
        const importPostHook = page.getByText('function postMap');
        let scroll = false
        var count = 0;
        try {
            while (!(await importPostHook.isVisible())) {
                await page.mouse.wheel(0, 20);
                count = count + 1
                if(count == 2) {
                    scroll = true
                    break;
                }
            }
        } catch (err) {
            console.log("Returnig error message", err)
        }
        expect(scroll).toBeTruthy();
    });
    test("TC_C115651 Verify proper error message should show while creating more than 200 agent", async ({ io, page }) => {
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
});