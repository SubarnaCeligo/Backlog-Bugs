import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("@Author-ladimanish TC_T30859_T30867_T30885", () => {
  test("@Env-All  @Epic-IO-63085 @Priority-P1 @Zephyr-IO-T30859 @Zephyr-IO-T30867 @Zephyr-IO-T30885 TC_T30859_T30867_T30885", async ({
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

    //T30859 T30867
    await io.assert.verifyElementIsDisplayed(
      selectors.syncPagePO.WIZARD_BACK,
      "Back button is not enabled"
    );
    await io.assert.verifyElementToBeClickable(selectors.syncPagePO.WIZARD_BACK);

    //T30885
    //Choose destination help text
    await io.flowBuilder.clickByIndex(
      selectors.flowBuilderPagePO.HELP_TEXT_ICON,0
    );
    await io.assert.verifyElementContainsText(
      selectors.flowBuilderPagePO.OPENAI.CELIGO_AI_HELPTEXT_WINDOW,
      "Select the destination application that will provide data for the sync. Start typing to filter the list by application name"
    );
    await io.flowBuilder.click(
      selectors.connectionsPagePO.HELPTEXT_CLOSE
    );

    //Connect to destination help text
    await io.flowBuilder.clickByIndex(
      selectors.flowBuilderPagePO.HELP_TEXT_ICON,1
    );
    await io.assert.verifyElementContainsText(
      selectors.flowBuilderPagePO.OPENAI.CELIGO_AI_HELPTEXT_WINDOW,
      "Choose an existing connection, or click the + icon to create a new connection. You can change your connection later."
    );
    await io.flowBuilder.click(
      selectors.connectionsPagePO.HELPTEXT_CLOSE
    );

    //Database help text
    await io.flowBuilder.clickByIndex(
      selectors.flowBuilderPagePO.HELP_TEXT_ICON,2
    );
    await io.assert.verifyElementContainsText(
      selectors.flowBuilderPagePO.OPENAI.CELIGO_AI_HELPTEXT_WINDOW,
      "Select the destination database to store your sync data."
    );
    await io.flowBuilder.click(
      selectors.connectionsPagePO.HELPTEXT_CLOSE
    );

    //Name your destination schema help text
    await io.flowBuilder.clickByIndex(
      selectors.flowBuilderPagePO.HELP_TEXT_ICON,3
    );
    await io.assert.verifyElementContainsText(
      selectors.flowBuilderPagePO.OPENAI.CELIGO_AI_HELPTEXT_WINDOW,
      "Give the schema an easily identifiable name. You can't use this schema for anything other than this sync, and you can't change the schema name after it is created."
    );
    await io.flowBuilder.click(
      selectors.connectionsPagePO.HELPTEXT_CLOSE
    );
  });
});
