import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("C1583 Verify Transfer Ownership notification shows the integration name", () => {
  test("@Env-All C1583 Verify Transfer Ownership notification shows the integration name", async ({
    io,
    page
  }) => {
    await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.myAccountPage.loadingTime();
    const integrationName = await io.sync.generateRandomIntegrationName();
    await io.sync.createNewIntegration(integrationName);
    await io.myAccountPage.loadingTime();
    await io.sync.chooseSourceApplication("Salesforce");
    await io.sync.selectExistingConnection("SALESFORCE CONNECTION");
    await io.flowBuilder.click(selectors.syncPagePO.WIZARD_NEXT);
    await io.myAccountPage.loadingTime();
    await io.sync.chooseDestinationApplication("Snowflake");
    await io.sync.selectExistingConnection("SNOWFLAKE CONNECTION");
    await io.myAccountPage.loadingTime();
    await io.sync.selectDatabase("CELIGO_DI");
    await io.sync.specifySchema("Automation schema");
    await io.flowBuilder.click(selectors.syncPagePO.WIZARD_NEXT);
    const syncName = await io.sync.generateRandomSyncName();
    await io.sync.enterSyncName(syncName);

    //T30986
    await io.flowBuilder.click(
      selectors.flowBuilderPagePO.OPENAI.CELIGO_AI_HELPTEXT
    );
    await io.assert.verifyElementContainsText(
      selectors.flowBuilderPagePO.OPENAI.CELIGO_AI_HELPTEXT_WINDOW,
      "text to be added"
    );
    await io.flowBuilder.clickByIndex(
      selectors.connectionsPagePO.HELPTEXT_CLOSE,
      3
    );

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

    //T30987
    await io.flowBuilder.click(
      selectors.flowBuilderPagePO.OPENAI.CELIGO_AI_HELPTEXT
    );
    await io.assert.verifyElementContainsText(
      selectors.flowBuilderPagePO.OPENAI.CELIGO_AI_HELPTEXT_WINDOW,
      "text to be added"
    );
    await io.flowBuilder.clickByIndex(
      selectors.connectionsPagePO.HELPTEXT_CLOSE,
      4
    );

    //T30983
    await io.assert.verifyElementDisplayedByText(
      "Please select",
      "Default option is not displayed"
    );

    //T30999
    await io.sync.selectFrequency("Once weekly");

    //T30984
    await io.assert.verifyElementIsDisplayed(
      selectors.syncPagePO.START_TIME,
      "Start time not displayed"
    );
    await io.assert.verifyElementIsDisplayed(
      selectors.syncPagePO.SYNC_DAY,
      "Sync day not displayed"
    );

    //T30991
    await io.flowBuilder.click(
      selectors.flowBuilderPagePO.OPENAI.CELIGO_AI_HELPTEXT
    );
    await io.assert.verifyElementContainsText(
      selectors.flowBuilderPagePO.OPENAI.CELIGO_AI_HELPTEXT_WINDOW,
      "text to be added"
    );
    await io.flowBuilder.clickByIndex(
      selectors.connectionsPagePO.HELPTEXT_CLOSE,
      5
    );

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
    await io.assert.verifyElementIsDisplayed(
      selectors.syncPagePO.NORMALISATION_DEPTH_DROPDOWN,
      "NORMALISATION_DEPTH_DROPDOWN not displayed"
    );
    await io.assert.verifyElementIsDisplayed(
      selectors.syncPagePO.FLATTENING_DEPTH_DROPDOWN,
      "FLATTENING_DEPTH_DROPDOWN not displayed"
    );

    //T30970
    await io.flowBuilder.click(selectors.syncPagePO.WIZARD_BACK);
    await io.assert.verifyElementIsDisplayed(
      selectors.syncPagePO.SYNC_NAME_PLACEHOLDER,
      "Placeholder not displayed"
    );
    await io.flowBuilder.click(selectors.syncPagePO.WIZARD_NEXT);

    //T30971
    await io.assert.verifyElementToBeClickable(selectors.syncPagePO.WIZARD_CLOSE);

    //T30960 T30968 T30993 T30994 T30997
    await io.assert.verifyElementDisplayedByText(
      "Step 3",
      "Step 3 is not displayed"
    );
    await io.assert.verifyElementDisplayedByText(
      "Settings",
      "Settings is not displayed"
    );
    await io.assert.verifyElementDisplayedByText(
      "Describe sync",
      "Describe sync is not displayed"
    );
    await io.assert.verifyElementDisplayedByText(
      "Schedule sync",
      "Schedule sync is not displayed"
    );
    await io.assert.verifyElementDisplayedByText(
      "Data re-structuring",
      "Data re-structuring is not displayed"
    );
    await io.assert.verifyElementIsDisplayed(
      selectors.syncPagePO.SETTINGS_INFO_COMPLETE,
      "Settings info is not displayed"
    );
    await io.assert.verifyElementIsDisplayed(
      selectors.syncPagePO.SETTINGS_SCHEDULE_COMPLETE,
      "Settings schedule is not displayed"
    );
    await io.assert.verifyElementIsDisplayed(
      selectors.syncPagePO.SETTINGS_ADVANCED_COMPLETE,
      "Settings advanced is not displayed"
    );
    await io.assert.verifyElementToBeClickable(selectors.syncPagePO.SETTINGS_STEP);

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
    await io.assert.verifyElementDisplayedByText(
      "Create sync",
      "Create sync is not displayed"
    );


  });
});
