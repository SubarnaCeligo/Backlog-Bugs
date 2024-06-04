import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("C107033 Verify CSV file launcher", () => {
  test("@Env-QA @Zephyr-IO-T21560 C107033 Verify CSV file launcher", async ({
    io,
    page
  }) => {
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.click(selectors.basePagePO.RESOURCES);
    await io.homePage.clickByText('Exports');
    await io.flowBuilder.click(selectors.integrationPagePO.ADDNEWRESOURCE);
    await io.connectionPage.fill(selectors.settingsPagePO.APP_NAME_INPUT, 'FTP');
    await io.connectionPage.click(selectors.connectionsPagePO.FTP_CONNECTION);

    await io.flowBuilder.click(selectors.exportsPagePO.CREATE_SELECT_CONNECTION);
    await page.keyboard.type('FTP CONNECTION')
    await io.flowBuilder.clickByText('FTP CONNECTION');

    await io.flowBuilder.fill(
      selectors.basePagePO.INPUT_NAME_SELECTOR,
      "C107033"
    );

    // await io.flowBuilder.clickByText('Next');
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.click(selectors.basePagePO.SAVE);

    await io.flowBuilder.clickByText('Add condition');
    await io.flowBuilder.fill(selectors.exportsPagePO.FILE_NAME_FILTER,"@$%^&*#-+");
    await io.flowBuilder.fill(selectors.exportsPagePO.FILE_NAME_FILTER, '~!@#$%^&*');

    const Symbol = page.locator(selectors.exportsPagePO.FILE_FILTER_CONDITIONS);
    expect(await Symbol.screenshot()).toMatchSnapshot("C107033-PLAYWRIGHT-darwin.png");
  });
});
