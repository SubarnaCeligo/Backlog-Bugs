
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("C103903 Verify the Grant type field under Configure OAuth 2.0", () => {
    test("@Env-All @Zephyr-IO-T24748 C103903 Verify the Grant type field under Configure OAuth 2.0", async ({ io, page }, testInfo) => {
        await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
        await io.homePage.waitForElementAttached(selectors.basePagePO.RESOURCES);
        await io.homePage.goToMenu("Resources", "iClients");
        await io.flowBuilder.click(selectors.basePagePO.ADD_NEW_RESOURCE);
        await io.assert.verifyElementIsDisplayed(selectors.basePagePO.CONFIGUREOAUTH, "Configure OAuth 2.0 is not visible");
        const nextSiblingText = await page.locator(selectors.basePagePO.CONFIGUREOAUTH).evaluate((el) => el.nextElementSibling.textContent);
        const startsWithCorrectText = nextSiblingText.startsWith("Grant type");
        expect(startsWithCorrectText).toEqual(true);
    });
});

