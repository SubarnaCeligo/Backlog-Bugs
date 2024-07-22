import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("C27108_Run Report drawer - ‘Child integrations’ cannot be a required field", () => {
    test("@Env-All @Zephyr-IO-T4373 C27108_Run Report drawer - ‘Child integrations’ cannot be a required field UI_Backlog #STAGING Only", async ({ io, page }) => {
        await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
        await io.flowBuilder.loadingTime();
        await io.homePage.waitForElementAttached(selectors.basePagePO.RESOURCES);
        await io.homePage.goToMenu("Tools", "Reports");
        await io.flowBuilder.loadingTime();
        await io.homePage.click(selectors.basePagePO.ADD_NEW_RESOURCE);
        await io.homePage.click(selectors.basePagePO.CHOOSEINTEGRATIONFORREPORT);
        await io.flowBuilder.loadingTime();
        const intID = await io.api.loadIntegrations();
        await io.flowBuilder.selectTextfromDropDown(page, intID.get('flowEventReportsIntegration_DND'))
        await io.homePage.click(selectors.basePagePO.CHOOSECHILDINTEGRATIONFORREPORT)
        // Validating child integration flows available until select child
        await io.assert.verifyElementIsDisplayed(selectors.myAccountPagePO.FIRSTINTEGRATION, "Flows not available")
    });
});
