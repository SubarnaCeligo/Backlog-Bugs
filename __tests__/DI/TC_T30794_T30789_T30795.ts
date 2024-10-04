import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("@Author-ladimanish TC_T30794_T30789_T30795", () => {
  test("@Env-All  @Epic-IO-63085 @Priority-P1 @Zephyr-IO-T30794 @Zephyr-IO-T30789 @Zephyr-IO-T30795 TC_T30794_T30789_T30795", async ({
    io,
    page
  }) => {
    await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.sync.clickOnCreateSync();
    await io.flowBuilder.click(selectors.syncPagePO.NEW_SYNC_INTEGRATION);
    await io.myAccountPage.loadingTime();
    //T30794 name help text
    await io.flowBuilder.click(
      selectors.syncPagePO.INTEGRATION_NAME_HELP_ICON
    );
    await io.assert.verifyElementContainsText(
      selectors.flowBuilderPagePO.OPENAI.CELIGO_AI_HELPTEXT_WINDOW,
      "Name your integration so that you can easily reference it from other parts of the application."
    );
    await io.flowBuilder.click(
      selectors.connectionsPagePO.HELPTEXT_CLOSE
    );

    //T30789 T30795 description help text
    await io.flowBuilder.click(
      selectors.syncPagePO.INTEGRATION_DESCRIPTION_HELP_ICON
    );
    await io.assert.verifyElementContainsText(
      selectors.flowBuilderPagePO.OPENAI.CELIGO_AI_HELPTEXT_WINDOW,
      "Describe your integration here so that other users can quickly understand the high level business problems being solved. Be sure to highlight any nuances that other users might need to know in order to work in this integration."
    );
    await io.flowBuilder.clickByIndex(
      selectors.connectionsPagePO.HELPTEXT_CLOSE,
      0
    );
  });
});
