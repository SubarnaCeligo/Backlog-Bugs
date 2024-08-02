
import { test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("T21523 Verify API Type name in the titlebar of iClient in Meta connection", () => {
    test("@Zephyr-IO-T21523 @Env-All @Priority-P2 C95494 Verify API Type name in the titlebar of iClient in Meta connection", async ({ io, page }) => {
        await io.homePage.navigateTo(io.data.links.CONNECTIONS_PAGE_URL);
        await io.homePage.waitForElementAttached(selectors.basePagePO.RESOURCES);
        await io.homePage.goToMenu("Resources", "Connections");
        await io.flowBuilder.click(selectors.connectionsPagePO.CREATE_CONNECTION);
        await io.flowBuilder.fill(selectors.settingsPagePO.APP_NAME_INPUT, 'Meta');
        await page.keyboard.press('Enter');
        await io.flowBuilder.click(selectors.connectionsPagePO.INSTAGRAM_ADS);
        await io.flowBuilder.click(selectors.connectionsPagePO.CREATECONNECTION_FROMEXPORTIMPORT);
        await io.assert.verifyElementContainsText(
            selectors.myAccountPagePO.PARAGRAPH_BOX + ' ' + selectors.flowBuilderPagePO.SPAAN,
            "Instagram Ads"
        );
        await io.flowBuilder.clickByIndex(selectors.flowBuilderPagePO.CLOSINGDRAWER, 1);
        await io.flowBuilder.click(selectors.connectionsPagePO.FACEBOOK_ADS);
        await io.flowBuilder.click(selectors.connectionsPagePO.CREATECONNECTION_FROMEXPORTIMPORT);
        await io.assert.verifyElementContainsText(
            selectors.myAccountPagePO.PARAGRAPH_BOX + ' ' + selectors.flowBuilderPagePO.SPAAN,
            "Facebook Ads"
        );
    });
});

