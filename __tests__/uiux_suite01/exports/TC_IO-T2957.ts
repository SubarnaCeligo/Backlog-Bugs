import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("IO-T2957 verify validations are present in the configure search parameters in Amazon MWS export", () => {
    test.beforeEach(async ({ io }) => {
        await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
    });
    test.afterEach(async ({ io }) => {
        await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
    });
    test("IO-T2957 verify validations are present in the configure search parameters in Amazon MWS export", async ({ io, page }) => {
        await io.homePage.navigateTo(io.data.links.EXPORTS_PAGE_URL);
        await io.exportsPage.click(selectors.basePagePO.ADD_NEW_RESOURCE);
        await io.exportsPage.fill(selectors.settingsPagePO.APP_NAME_INPUT, 'Amazon Seller Central');

        await io.exportsPage.click(selectors.flowBuilderPagePO.AMAZONSELLER);
        await io.exportsPage.click(selectors.connectionsPagePO.CONNECTIONS_DROPDOWN);
        await io.exportsPage.fill(selectors.connectionsPagePO.CONNECTIONS_DROPDOWN, 'AMAZON SP API CONNECTION');
        await io.exportsPage.clickByTextByIndex('AMAZON SP API CONNECTION', 0);
        await io.exportsPage.fill(selectors.connectionsPagePO.NAME_INPUT, 'AMAZON_SELLER_CENTRAL');
        await io.exportsPage.click(selectors.basePagePO.SAVE);


        await io.exportsPage.click(selectors.exportsPagePO.ASSISTANT_META_DATA_RESOURCE);
        await io.exportsPage.clickByText('Orders');
        await io.exportsPage.click(selectors.exportsPagePO.ASSISTANT_META_DATA_OPERATION);
        await io.exportsPage.clickByText('Get Orders');
        await io.exportsPage.waitForElementAttached("[data-test='assistantMetadata.queryParams']")
        await io.exportsPage.click("[data-test='assistantMetadata.queryParams']");
        await io.assert.verifyElementDisplayedByText(
            "LastUpdatedAfter *",
            "LastUpdatedAfter should be have mandatory symbol *"
        );

        await io.exportsPage.fill('[name="LastUpdatedAfter"]', 'test');
        await io.exportsPage.clearTextValue('[name="LastUpdatedAfter"]');

        await io.exportsPage.click(selectors.basePagePO.MFA_SAVE);
                
        await io.exportsPage.waitForElementAttached(selectors.basePagePO.VALUE_MUST_BE_PROVIDED_ERROR);
        const errorMsg = (await io.exportsPage.getText(selectors.basePagePO.VALUE_MUST_BE_PROVIDED_ERROR)).toString();
        await io.assert.expectToContainValue('A value must be provided', errorMsg, "Error is not showing properly");
    });
}); 
