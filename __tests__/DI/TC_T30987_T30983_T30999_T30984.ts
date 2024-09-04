import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("@Author-ladimanish TC_T30987_T30983_T30999_T30984", () => {
  test("@Env-PLATFORMTHREE @Env-QA  @Epic-IO-68754 @Priority-P1 @Zephyr-IO-T30987 @Zephyr-IO-T30983 @Zephyr-IO-T30999 Zephyr-IO-T30984 TC_T30987_T30983_T30999_T30984", async ({
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

    //T30987
    await io.flowBuilder.clickByIndex(
      selectors.flowBuilderPagePO.HELP_TEXT_ICON,4
    );
    await io.assert.verifyElementContainsText(
      selectors.flowBuilderPagePO.OPENAI.CELIGO_AI_HELPTEXT_WINDOW,
      "This determines how often your sync runs."
    );
    await io.flowBuilder.click(
      selectors.connectionsPagePO.HELPTEXT_CLOSE
    );

    //T30983
    await io.assert.verifyElementDisplayedByText(
      "Please select",
      "Default option is not displayed"
    );

    //T30999
    await io.sync.selectFrequency("Once weekly");
    await io.flowBuilder.loadingTime();

    //T30984
    await io.assert.verifyElementIsDisplayed(
      selectors.syncPagePO.START_TIME,
      "Start time not displayed"
    );
    await io.assert.verifyElementIsDisplayed(
      selectors.syncPagePO.SYNC_DAY,
      "Sync day not displayed"
    );
  });
});
