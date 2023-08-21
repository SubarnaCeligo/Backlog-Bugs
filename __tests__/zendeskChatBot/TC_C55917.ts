import {expect, test} from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("C55917 Verify the Default Structure/options of Pendo-Zendesk chat bot which is displayed in the integrator.io", () => {
    test("C55917 Verify the Default Structure/options of Pendo-Zendesk chat bot which is displayed in the integrator.io", async ({page,io}) => {
        await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
        await io.homePage.waitForElementAttached(selectors.basePagePO.CHAT_BOT);
        console.log(await io.homePage.isVisible(selectors.basePagePO.CHAT_BOT_OPTIONS));
        if(!await io.homePage.isVisible(selectors.basePagePO.CHAT_BOT_OPTIONS))
          await io.homePage.click(selectors.basePagePO.CHAT_BOT);
        await io.homePage.waitForElementAttached(selectors.basePagePO.CHAT_BOT_OPTIONS);
        const helpList = await page.$$(selectors.basePagePO.CHAT_BOT_OPTIONS);
        expect(await helpList[0].innerText()).toContain('Search our docs');
        expect(await helpList[1].innerText()).toContain('Chat with us');
        expect(await helpList[2].innerText()).toContain('Announcements');

    });
});