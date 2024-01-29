import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("C33018_C32997", () => {
    test("C33018_C32997", async ({ io, page }) => {
        await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
        await io.homePage.click(selectors.homePagePO.LIST_VIEW);
        await io.homePage.fill(selectors.integrationPagePO.INTEGRATION_PAGE_SEARCH_BAR, "IO-20667_DND");
        await io.homePage.addStep("*** Searched for the integration ***");
        let actual = await io.connectionPage.getText(
            selectors.basePagePO.NOTIFICATION_ID
        );
        var text = actual.toString().split(' ').slice(0, -2).join(' ');
        await io.assert.expectToContainValue("Expiring in", text, 'Expiry text is not same');
        await io.homePage.clickButtonByIndex(selectors.integrationPagePO.OPENACTIONSMENU, 1);
        await io.flowBuilder.click(selectors.integrationPagePO.RE_NEW);
        await io.assert.verifyElementText(selectors.basePagePO.NOTIFICATION, 'Thanks for your request! We will be in touch soon.\n\n  Check out our Marketplace to jumpstart your integrations with integration apps & templates.');
        await io.homePage.click(selectors.homePagePO.TILE_VIEW);
    });
    test("C33018_1", async ({ io,  page }) => {
        await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
        await io.homePage.click(selectors.homePagePO.LIST_VIEW);
        await io.homePage.fill(selectors.integrationPagePO.INTEGRATION_PAGE_SEARCH_BAR, "IO-56360_DND");
        await io.homePage.addStep("*** Searched for the integration ***");
        let actual1 = await io.connectionPage.getText(
            selectors.basePagePO.NOTIFICATION_ID
        );
        var text1 = actual1.toString().split(' ').slice(0, -2).join(' ');
        await io.assert.expectToContainValue("Expired", text1, 'Expiry text is not same');
        await io.homePage.click(selectors.homePagePO.TILE_VIEW);
    });
});