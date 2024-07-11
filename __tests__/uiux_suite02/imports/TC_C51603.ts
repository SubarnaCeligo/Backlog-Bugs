import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import TC from '/../testData/inputData/FlowBuilder/C119812.json';

test.describe(`C51603`, () => {
  test(`@Priority-P2 @Zephyr-IO-T18922 @Env-All C51603`, async ({
    io,
    page
  }) => {
    await io.exportsPage.navigateTo(process.env["IO_UI_CONNECTOR_URL"] + "home");
    await io.homePage.goToMenu("Tools", "Flow builder");
    await io.flowBuilder.click(
      selectors.flowBuilderPagePO.ADD_DESTINATION_OR_LOOKUP
    );
    await io.flowBuilder.fill(selectors.settingsPagePO.APP_NAME_INPUT, "Loop Returns");
    await io.flowBuilder.clickByText("Loop Returns");
    await io.myAccountPage.clickByText("Import records into destination application"); 
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
