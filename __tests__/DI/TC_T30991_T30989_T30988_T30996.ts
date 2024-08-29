import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("@Author-ladimanish TC_T30991_T30989_T30988_T30996", () => {
  test("@Env-PLATFORMTHREE @Env-QA  @Epic-IO-68754 @Priority-P1 @Zephyr-IO-T30991 @Zephyr-IO-T30989 @Zephyr-IO-T30988 Zephyr-IO-T30996 TC_T30991_T30989_T30988_T30996", async ({
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
    await io.sync.selectFrequency("Once weekly");

    //T30991
    // await io.flowBuilder.click(
    //   selectors.flowBuilderPagePO.OPENAI.CELIGO_AI_HELPTEXT
    // );
    // await io.assert.verifyElementContainsText(
    //   selectors.flowBuilderPagePO.OPENAI.CELIGO_AI_HELPTEXT_WINDOW,
    //   "text to be added"
    // );
    // await io.flowBuilder.clickByIndex(
    //   selectors.connectionsPagePO.HELPTEXT_CLOSE,
    //   5
    // );

    //T30989
    await io.assert.verifyElementIsDisplayed(
      selectors.basePagePO.FLAG,
      "Sync immediately not enabled"
    );
    //T30988
    await io.flowBuilder.click(selectors.syncPagePO.SYNC_IMMEDIATELY);
    await io.assert.verifyElementNotBeFound(selectors.basePagePO.FLAG);

    //T30996
    await io.flowBuilder.click(selectors.syncPagePO.ADDITIONAL_SETTINGS);
    await io.flowBuilder.loadingTime();
    await io.assert.verifyElementIsDisplayed(
      selectors.syncPagePO.NORMALISATION_DEPTH_DROPDOWN,
      "NORMALISATION_DEPTH_DROPDOWN not displayed"
    );
    await io.assert.verifyElementIsDisplayed(
      selectors.syncPagePO.FLATTENING_DEPTH_DROPDOWN,
      "FLATTENING_DEPTH_DROPDOWN not displayed"
    );

  });
});
