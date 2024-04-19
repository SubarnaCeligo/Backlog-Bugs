import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe(`C120191`, () => {
    test(`@Env-All @Zephyr-IO-T18205 C120191`, async ({ io, page }) => {
        await io.connectionPage.navigateTo(io.data.links.CONNECTIONS_PAGE_URL);
        await io.connectionPage.click(selectors.connectionsPagePO.CREATE_CONNECTION);
        await io.connectionPage.click(selectors.connectionsPagePO.HTTP_CNNECTOR);
        await io.flowBuilder.fill(selectors.connectionsPagePO.BASE_URI_INPUT, "https://google.com");
        await io.flowBuilder.doubleClick(selectors.basePagePO.NAME);
        const text = await io.homePage.isVisible('text="Pick a pre-built connector to simplify working with this application."')
        await io.assert.expectToBeFalse(text, "Notification is found");
    });
});