
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe(`TC_T11409`, () => {
  test.beforeEach(async ({ io }) => {
    await io.myAccountPage.navigateTo(io.data.links.CONNECTIONS_PAGE_URL);
  });
  test("@Env-All @Zephyr-IO-T11409 Verified Edifact file definitions are shown under EDIFACT file type.", async ({ io,page }) => {
    await io.homePage.navigateTo(io.data.links.EXPORTS_PAGE_URL)
    await io.homePage.loadingTime()
    await io.homePage.click(selectors.basePagePO.ADD_NEW_RESOURCE);
    await io.flowBuilder.fill(selectors.settingsPagePO.APP_NAME_INPUT, 'FTP');
    await io.flowBuilder.click(selectors.flowBuilderPagePO.FTP);
    await io.flowBuilder.click(selectors.basePagePO.CONNECTION);
    await io. flowBuilder.fill(selectors.connectionsPagePO.CONNECTIONS_DROPDOWN,"FTP CONNECTION")
    await io.flowBuilder.click(selectors.connectionsPagePO.CONNECTION_OPTION_TEXT);
    await io.homePage.fill(selectors.connectionsPagePO.NAME_INPUT, 'FTP_Export');
    await io.flowBuilder.click(selectors.basePagePO.SAVE);
    await io.flowBuilder.click(selectors.exportsPagePO.FILE_TYPE);

    await io.flowBuilder.clickByText('EDIFACT');
    await io.flowBuilder.click(selectors.exportsPagePO.EDIFACTFORMAT);
    expect(await page.getByRole('menuitem').count()).toBeGreaterThan(1);
    expect(await page.getByText('Amazon Vendor Central')).toBeVisible();
  });
});
