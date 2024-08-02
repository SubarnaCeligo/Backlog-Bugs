import {expect, test} from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("C55917 Verify the Default Structure/options of Pendo-Zendesk chat bot which is displayed in the integrator.io", () => {
    test("@Env-All @Zephyr-IO-T15083 C55917 Verify the Default Structure/options of Pendo-Zendesk chat bot which is displayed in the integrator.io", async ({page,io}) => {
        await io.homePage.navigateTo(process.env["IO_UI_CONNECTOR_URL"]+"home");
        await io.homePage.waitForElementAttached(selectors.basePagePO.CHAT_BOT);
        if(!await io.homePage.isVisible(selectors.basePagePO.CHAT_BOT_OPTIONS))
          await io.homePage.click(selectors.basePagePO.CHAT_BOT);
        await io.homePage.waitForElementAttached(selectors.basePagePO.CHAT_BOT_OPTIONS);
        const helpList = await page.$$(selectors.basePagePO.CHAT_BOT_OPTIONS);
        expect(await helpList[0].innerText()).toContain('Explore Knowledge Base');
        expect(await helpList[1].innerText()).toContain('Live Chat (Beta)');
        expect(await helpList[2].innerText()).toContain('Product Updates');

    });
});