import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe(`C68978 Verify the Iclinet if more than 1 client is defined from BE`, () => {
    test.beforeEach(async ({ io }) => {
        await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
      });
    test(`@Env-All @Zephyr-IO-T24827 C68978 Verify the Iclinet if more than 1 client is defined from BE`, async({io,page}) => {
  
        await io.homePage.navigateTo(io.data.links.CONNECTIONS_PAGE_URL)
        await io.connectionPage.clickByText("Create connection")
        await io.connectionPage.loadingTime();
        await io.connectionPage.fill(selectors.settingsPagePO.APP_NAME_INPUT, 'Netsuite');
        await io.connectionPage.click(selectors.connectionsPagePO.NETSUITE_CONNECTION)
        await io.connectionPage.click(selectors.connectionsPagePO.NETSUITE_AUTH);
        await io.connectionPage.selectTextfromDropDown(page, "token-auto");
        await io.connectionPage.loadingTime();
        await io.connectionPage.click(selectors.connectionsPagePO.NETSUITE_ICLIENT);
        const dropdownOptions = await page.getByRole('menuitem').all();
        expect(dropdownOptions.length).toBeGreaterThan(1);
    });
});