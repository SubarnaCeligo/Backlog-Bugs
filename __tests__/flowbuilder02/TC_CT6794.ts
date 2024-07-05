import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("IO-T6794", () => {
    test.beforeEach(async ({ io }) => {
        await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
    });
    test.afterEach(async ({ io }) => {
        await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
    });
    test("@Bug-IO-25819 @Env-All @Priority-P3 @Zephyr-IO-T6794 Verify the double quotes under handel bar expression for search and query parameter", async ({ io, page }) => {
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
        await io.exportsPage.waitForElementAttached(selectors.exportsPagePO.ASSISTANT_METADATA_QUERY_PARAMS)
        await io.exportsPage.click(selectors.exportsPagePO.ASSISTANT_METADATA_QUERY_PARAMS);
    

        await io.exportsPage.fill(selectors.exportsPagePO.LASTUPDATEDAFTER, '{{dateAdd (dateFormat "YYYY-MM-DD") -25920000000}}');
        await io.flowBuilder.loadingTime();
        const resetButton = await page.$(selectors.flowBuilderPagePO.TEXT_LASTUPDATEAFTER);
        expect(await resetButton.getAttribute('value')).toContain("{{dateAdd (dateFormat 'YYYY-MM-DD') -25920000000}}");
        await io.exportsPage.click(selectors.basePagePO.MFA_SAVE);

        await io.flowBuilder.click(selectors.importPagePO.FETCH_PREVIEW);
        const successMessage = await io.flowBuilder.isVisible("text='Status: undefined'")
        await io.assert.expectToBeTrue(successMessage,"Success is found in the flow")
                
       
    });
}); 

