import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe(`C51602 Verify help text for [Simple | HTTP] toggle button for edit export`, () => {
  test(`@Priority-P2 @Zephyr-IO-T18921 @Env-All C51602`, async ({
    io,
    page
  }) => {
    await io.homePage.navigateTo(process.env["IO_Integration_URL"]);
    await io.flowBuilder.loadingTime();
    await io.homePage.waitForElementAttached(selectors.flowBuilderPagePO.CREATEFLOW);
    await io.homePage.click(selectors.flowBuilderPagePO.CREATEFLOW);
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.click(
      selectors.flowBuilderPagePO.ADD_SOURCE
    );
    await io.flowBuilder.fill(selectors.settingsPagePO.APP_NAME_INPUT, "Loop Returns");
    await io.flowBuilder.clickByText("Loop Returns");
    await io.flowBuilder.click(selectors.basePagePO.CREATE_FROM_SCRATCH);
    await io.flowBuilder.waitForElementAttached(selectors.exportsPagePO.NAME);
    await io.flowBuilder.fill(selectors.exportsPagePO.NAME, "TC Export");
    await io.flowBuilder.click(selectors.exportsPagePO.CONNECTIONS_DROPDOWN);
    await io.flowBuilder.fill(selectors.connectionsPagePO.CONNECTIONS_DROPDOWN, 'LOOP RETURN CONNECTION');
    await io.flowBuilder.click(selectors.connectionsPagePO.CONNECTION_OPTION_TEXT);
   await io.flowBuilder.loadingTime();
    await io.homePage.click(selectors.exportsPagePO.ASSISTANT_META_DATA_RESOURCE);
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.clickByText('Cart API');
    await io.flowBuilder.loadingTime();
    await io.homePage.click(selectors.exportsPagePO.ASSISTANT_META_DATA_OPERATION);
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.clickByText('Get cart');
    await io.flowBuilder.loadingTime();
    await io.homePage.click(selectors.exportsPagePO.ASSISTANT_META_DATA_PATH_PARAMS_TOKEN);
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.fill(selectors.exportsPagePO.ASSISTANT_META_DATA_PATH_PARAMS_TOKEN,'12');

    await io.flowBuilder.click(selectors.basePagePO.SAVE_AND_CLOSE);
    await io.flowBuilder.loadingTime();
    await io.homePage.navigateTo(io.data.links.EXPORTS_PAGE_URL);
    await io.flowBuilder.loadingTime();
    await io.integrationPage.waitForElementAttached(selectors.integrationPagePO.INTEGRATION_PAGE_SEARCH_BAR);
    await io.integrationPage.fill(selectors.integrationPagePO.INTEGRATION_PAGE_SEARCH_BAR, 'TC Export');
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.clickByIndex(selectors.flowBuilderPagePO.CONNECTION_TABLE, 0) 
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.clickByIndex(
        selectors.flowBuilderPagePO.HELP_TEXT_ICON,
        0
      );
      const helpTextPopup = await page.$(selectors.myAccountPagePO.HELP_BUBBLE);
      const helpText = await helpTextPopup.textContent();
      expect(helpText).toContain('• Simple form helps you to quickly configure the resources by displaying only the required minimum fields.• HTTP form allows you to view and/or modify application specific resources at the universal HTTP connector level.');
      

  });
  
});
