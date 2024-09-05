import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("@Author-ladimanish TC_T30966_T30972_T30973_T30969_T30978_T30962", () => {
  test("@Env-PLATFORMTHREE @Env-QA  @Epic-IO-68754 @Priority-P1 @Zephyr-IO-T30966 @Zephyr-IO-T30972 @Zephyr-IO-T30973 @Zephyr-IO-T30969 @Zephyr-IO-T30978 @Zephyr-IO-T30962S TC_T30966_T30972_T30973_T30969_T30978_T30962", async ({
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

    //T30966
    await io.flowBuilder.clickByIndex(
      selectors.flowBuilderPagePO.HELP_TEXT_ICON,0
    );
    await io.assert.verifyElementContainsText(
      selectors.flowBuilderPagePO.OPENAI.CELIGO_AI_HELPTEXT_WINDOW,
      "Please name your sync so that you can easily reference it from other parts of the application."
    );
    await io.flowBuilder.click(
      selectors.connectionsPagePO.HELPTEXT_CLOSE
    );

    //T30972
    await io.sync.enterSyncName(
      "qwertyuiopqwertyuioofdfghjkl qwertyuiopqwertyuioofdfghjkl qwertyuiopqwertyuioofdfghjklsdvs qwertyuiopqwertysuioofdfghjkl qwertyuiopqwertyuioofdfghjsdss"
    );
    await io.assert.verifyElementDisplayedByText(
      "You have reached the maximum of 150 characters",
      "Error is not displayed"
    );

    //T30973
    const syncName = await io.sync.generateRandomName("Sync");
    await io.sync.enterSyncName(syncName);

    //T30969 T30978 T30962
    await io.assert.verifyElementIsDisplayed(
      selectors.syncPagePO.SAVE_AND_CLOSE,
      "SaveAndClose button not displayed"
    );
  });
});
