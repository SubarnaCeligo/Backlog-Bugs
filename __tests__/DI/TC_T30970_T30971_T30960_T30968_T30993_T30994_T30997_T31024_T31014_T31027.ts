import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("@Author-ladimanish TC_T30970_T30971_T30960_T30968_T30993_T30994_T30997_T31024_T31014_T31027", () => {
  test("@Env-PLATFORMTHREE @Env-QA  @Epic-IO-68754 @Priority-P1 @Zephyr-IO-T30970 @Zephyr-IO-T30971 @Zephyr-IO-T30960 @Zephyr-IO-T30968 @Zephyr-IO-T30993 @Zephyr-IO-T30994 @Zephyr-IO-T30997 @Zephyr-IO-T31024 @Zephyr-IO-T31014 @Zephyr-IO-T31027 TC_T30970_T30971_T30960_T30968_T30993_T30994_T30997_T31024_T31014_T31027", async ({
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

    //T30970
    await io.flowBuilder.click(selectors.syncPagePO.WIZARD_BACK);
    await io.myAccountPage.loadingTime();
    await io.assert.verifyElementIsDisplayed(
      selectors.syncPagePO.DESTINATION_APP_NAME_INPUT,
      "DESTINATION_APP_NAME_INPUT not displayed"
    );
    await io.flowBuilder.click(selectors.syncPagePO.WIZARD_NEXT);
    await io.myAccountPage.loadingTime();
    await io.flowBuilder.click(selectors.syncPagePO.ADDITIONAL_SETTINGS);

    //T30971
    await io.assert.verifyElementToBeClickable(selectors.syncPagePO.WIZARD_CLOSE);

    //T30960 T30968 T30993 T30994 T30997
    await io.assert.verifyElementDisplayedByText(
      "Step 3",
      "Step 3 is not displayed"
    );
    await io.assert.verifyElementIsDisplayed(
      selectors.syncPagePO.SETTINGS_INFO_COMPLETE,
      "Settings info is not displayed"
    );
    await io.assert.verifyElementIsDisplayed(
      selectors.syncPagePO.SETTINGS_SCHEDULE_COMPLETE,
      "Settings schedule is not displayed"
    );
    await io.assert.verifyElementToBeClickable(
      selectors.syncPagePO.SETTINGS_STEP
    );

    await io.flowBuilder.click(selectors.syncPagePO.SAVE_AND_CLOSE);
    await io.myAccountPage.loadingTime();

    //T31024 T31014
    await io.assert.verifyElementDisplayedByText(
      syncName,
      "Created sync is not displayed"
    );

    //T31027
    await io.assert.verifyElementIsDisplayed(
      selectors.syncPagePO.CREATE_SYNC_BUTTON,
      "CREATE_SYNC_BUTTON is not displayed"
    );
    await io.flowBuilder.click(selectors.syncPagePO.CREATE_SYNC_BUTTON);
    await io.myAccountPage.loadingTime();
    await io.assert.verifyElementDisplayedByText(
      "Step 1",
      "Step 1 is not displayed"
    );
  });
});
