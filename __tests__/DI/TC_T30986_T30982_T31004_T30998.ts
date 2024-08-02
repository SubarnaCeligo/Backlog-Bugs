import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("@Author-ladimanish TC_T30986_T30982_T31004_T30998", () => {
  test("@Env-PLATFORMTHREE @Epic-IO-68754 @Priority-P1 @Zephyr-IO-T30986 @Zephyr-IO-T30982 @Zephyr-IO-T31004 @Zephyr-IO-T30998 TC_T30986_T30982_T31004_T30998", async ({
    io,
    page
  }) => {
    await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
    const integrationName = await io.sync.generateRandomName("Integration");
    await io.sync.createNewIntegration(integrationName);
    await io.sync.chooseSourceApplication("Salesforce");
    await io.sync.selectExistingConnection("SALESFORCE CONNECTION");
    await io.sync.clickOnNext();
    await io.sync.chooseDestinationApplication("Snowflake");
    await io.sync.selectExistingConnection("SNOWFLAKE CONNECTION");
    await io.sync.selectDatabase("CELIGO_DI");
    const schemaName = await io.sync.generateRandomName("Schema");
    await io.sync.specifySchema(schemaName);
    await io.sync.clickOnNext();
    const syncName = await io.sync.generateRandomName("Sync");
    await io.sync.enterSyncName(syncName);

    //T30986
    // await io.flowBuilder.click(
    //   selectors.flowBuilderPagePO.OPENAI.CELIGO_AI_HELPTEXT
    // );
    // await io.assert.verifyElementContainsText(
    //   selectors.flowBuilderPagePO.OPENAI.CELIGO_AI_HELPTEXT_WINDOW,
    //   "text to be added"
    // );
    // await io.flowBuilder.clickByIndex(
    //   selectors.connectionsPagePO.HELPTEXT_CLOSE,
    //   3
    // );

    //T30982 T31004
    await io.assert.expectToBeTrue(
      await (
        await page.$(selectors.syncPagePO.USE_PRESET_RADIO_BUTTON)
      ).isChecked(),
      "Preset option is not checked"
    );

    //T30998
    await io.flowBuilder.click(selectors.syncPagePO.USE_CRON_RADIO_BUTTON);
    await io.assert.verifyElementIsDisplayed(
      selectors.syncPagePO.CRON_EXP_INPUT,
      "Cron not displayed"
    );

  });
});
