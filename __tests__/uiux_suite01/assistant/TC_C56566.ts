import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
test.describe("C56566 Verify when (select, multiselect) fieldType is selected in exports query parameters, user is presented with a dropdown to select a value", () => {
  test("@Env-All @Zephyr-IO-T17079 @Priority-P2 C56566 Verify when (select, multiselect) fieldType is selected in exports query parameters, user is presented with a dropdown to select a value", async ({io, page}) => {
    await io.homePage.navigateTo(process.env["IO_Integration_URL"]);
    await io.homePage.loadingTime()
    await io.homePage.loadingTime()
    await io.homePage.click(selectors.flowBuilderPagePO.CREATEFLOW);
    await io.flowBuilder.click(selectors.flowBuilderPagePO.ADD_SOURCE);
    await io.flowBuilder.fill(selectors.settingsPagePO.APP_NAME_INPUT, 'Confluence cloud');
    await io.flowBuilder.click(selectors.connectionsPagePO.CONFLUENCE_CLOUD_CONNECTION);
    await io.flowBuilder.click(selectors.basePagePO.CREATE_FROM_SCRATCH)
    await io.flowBuilder.loadingTime()
    await io.flowBuilder.click(selectors.basePagePO.CONNECTION_DROPDOWN);
    await io.flowBuilder.click(selectors.connectionsPagePO.CONNECTION_OPTION_TEXT);
    await io.flowBuilder.click(selectors.basePagePO.SAVE);
    await io.flowBuilder.reloadPage();
    await io.homePage.loadingTime()
    await io.homePage.loadingTime()
    await io.homePage.loadingTime()
    await io.flowBuilder.click(selectors.flowBuilderPagePO.ADD_SOURCE);
    await io.homePage.loadingTime()
    await io.flowBuilder.fill(selectors.settingsPagePO.APP_NAME_INPUT, 'Confluence cloud');
    await io.flowBuilder.click(selectors.connectionsPagePO.CONFLUENCE_CLOUD_CONNECTION);
    await io.flowBuilder.click(selectors.basePagePO.CREATE_FROM_SCRATCH)
    await io.flowBuilder.loadingTime()
    await io.flowBuilder.click(selectors.basePagePO.CONNECTION_DROPDOWN);
    await io.flowBuilder.click(selectors.connectionsPagePO.CONNECTION_OPTION_TEXT);
    await io.flowBuilder.click(selectors.basePagePO.SAVE);
    await io.flowBuilder.fill(selectors.basePagePO.INPUT_NAME_SELECTOR, 'test confluence export');
    await io.flowBuilder.click(selectors.importPagePO.ASSISTANT_METADATA_RESOURCE);
    await io.homePage.loadingTime()
    await io.homePage.loadingTime()
    await io.flowBuilder.getByRoleClick('menuitem','Content labels');
    await io.flowBuilder.click(selectors.importPagePO.ASSISTANT_METADATA_OPERTAION);
    await io.flowBuilder.getByRoleClick('menuitem','Get labels for content');
    await io.flowBuilder.waitForElementAttached(selectors.importPagePO.QUERY_PARAMETER_NAME_0);
    await io.flowBuilder.click(selectors.importPagePO.QUERY_PARAMETER_NAME_0);
    await io.flowBuilder.clickByIndex(selectors.basePagePO.MENU_ITEM,0);
    await io.flowBuilder.click(selectors.importPagePO.QUERY_PARAMETER_VALUE_0);
    const dropdownOptions = await page.getByRole('menuitem').all();
    expect(dropdownOptions.length).toBeGreaterThanOrEqual(1);
  });
});