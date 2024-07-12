import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe(`C51601`, () => {
  test(`@Priority-P2 @Zephyr-IO-T18920 @Env-All C51601`, async ({
    io,
    page
  }) => {
    await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.goToMenu("Tools", "Flow builder");
    await io.flowBuilder.click(
      selectors.flowBuilderPagePO.ADD_SOURCE
    );
    await io.flowBuilder.fill(selectors.settingsPagePO.APP_NAME_INPUT, "Loop Returns");
    await io.flowBuilder.clickByText("Loop Returns");
    await io.flowBuilder.click(selectors.basePagePO.CREATE_FROM_SCRATCH);
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.clickByIndex(
        selectors.flowBuilderPagePO.HELP_TEXT_ICON,
        1
      );
      const helpTextPopup = await page.$(selectors.myAccountPagePO.HELP_BUBBLE);
      const helpText = await helpTextPopup.textContent();
      expect(helpText).toContain('• Simple form helps you to quickly configure the resources by displaying only the required minimum fields.• HTTP form allows you to view and/or modify application specific resources at the universal HTTP connector level.');
         
  });
  
});
