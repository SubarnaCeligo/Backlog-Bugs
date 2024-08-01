import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("@Zephyr-IO-T26747 C51812 Verify help text for MarkExported Batch Size field", () => {
    test.beforeEach(async ({ io }) => {
        await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
    });

    test("@Zephyr-IO-T26747 @Env-All C51812 Verify help text for MarkExported Batch Size field", async ({ io, page }) => {
        await io.homePage.navigateTo(io.data.links.EXPORTS_PAGE_URL);
        await io.flowBuilder.click(selectors.integrationPagePO.ADDNEWRESOURCE);
        await io.flowBuilder.fill(selectors.settingsPagePO.APP_NAME_INPUT, 'netsuite');
        await io.flowBuilder.click(selectors.connectionsPagePO.NETSUITE_CONNECTION);
        await io.flowBuilder.click(selectors.connectionsPagePO.CONNECTIONS_DROPDOWN);
        await io.flowBuilder.fill(selectors.connectionsPagePO.CONNECTIONS_DROPDOWN, 'NETSUITE CONNECTION');
        await io.exportsPage.clickByTextByIndex('NETSUITE CONNECTION', 0);
        await io.flowBuilder.fill(selectors.connectionsPagePO.NAME_INPUT, 'TC_C51812');
        await io.flowBuilder.click(selectors.basePagePO.SAVE);
        await io.flowBuilder.fill(selectors.connectionsPagePO.NAME_INPUT, 'TC_C51812');
        await io.flowBuilder.fill(selectors.flowBuilderPagePO.EXPORT_RECORDTYPE_ADD, 'Account')
        await io.flowBuilder.clickByText('Account');
        await io.flowBuilder.fill(`${selectors.flowBuilderPagePO.EXPORT_SAVED_SEARCH} input`, '59266')
        await io.homePage.click(selectors.flowBuilderPagePO.EXPORTTYPE);
        await io.flowBuilder.clickByText('Once - export records only once');
        await io.homePage.click(selectors.mappings.MAPPER2DOT0PO.ADVANCED);
        await io.flowBuilder.loadingTime();
        await io.flowBuilder.clickByIndex(
            selectors.flowBuilderPagePO.HELP_TEXT_ICON,
            17
          );
          const helpTextPopup = await page.$(selectors.myAccountPagePO.HELP_BUBBLE);
          const helpText = await helpTextPopup.textContent();
          expect(helpText).toContain('This is only applicable for Export type Once. The recommended range is 1 to 100 (100 is the default). Set the value to a lower number in case Export type once is failing due to slow NetSuite account/connection');

    });
}); 
