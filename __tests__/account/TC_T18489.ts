import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("TC_T18489", () => {
    test("@Env-All @Zephyr-IO-T18489 TC_T18489", async ({ io, page }) => {
        await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
        await io.homePage.waitForElementAttached(selectors.basePagePO.MARKETPLACE);
        await io.homePage.goToMenu("Resources", "Agents");
        await io.homePage.waitForElementAttached(selectors.basePagePO.ADD_NEW_RESOURCE);
        await io.homePage.clickByIndex(selectors.basePagePO.ADD_NEW_RESOURCE, 0);
        await io.homePage.fill(selectors.importPagePO.NAME, "agent");
        await io.homePage.click(selectors.basePagePO.SAVE_AND_CLOSE);
        await io.homePage.waitForElementAttached(selectors.flowBuilderPagePO.COLUMNS);
        const agentList = await page.locator(selectors.flowBuilderPagePO.COLUMNS).all();
        await agentList[0].locator(selectors.homePagePO.DOWNLOAD_AGENT_INSTALLER).click();
        await io.homePage.waitForElementAttached("text='Windows'");
        await io.homePage.clickByText("Last heartbeat")
    });
});