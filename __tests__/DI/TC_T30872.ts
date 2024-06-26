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
    await io.sync.clickOnNext();

    await io.myAccountPage.loadingTime();

    //T30872
    await io.flowBuilder.click(
      selectors.flowBuilderPagePO.OPENAI.CELIGO_AI_HELPTEXT
    );
    await io.assert.verifyElementContainsText(
      selectors.flowBuilderPagePO.OPENAI.CELIGO_AI_HELPTEXT_WINDOW,
      "text to be added"
    );
    await io.flowBuilder.clickByIndex(
      selectors.connectionsPagePO.HELPTEXT_CLOSE,
      0
    );
    //T30871
    await io.assert.verifyElementIsDisplayed(
      selectors.syncPagePO.DESTINATION_PLACEHOLDER,
      "Placeholder not displayed"
    );
    //T30858
    await io.sync.chooseDestinationApplication("Snowflake");

    //T30865
    await io.assert.verifyElementIsDisplayed(
      selectors.syncPagePO.SOURCE_CONNECTION_INPUT,
      "Connect to destination not displayed"
    );
    //T30878
    await io.sync.selectExistingConnection("SNOWFLAKE CONNECTION");
    await io.myAccountPage.loadingTime();
    await io.assert.verifyElementIsDisplayed(
      selectors.syncPagePO.DATABASE_INPUT,
      "database not displayed"
    );
    await io.sync.selectDatabase("CELIGO_DI");

    //T30884 T30887
    await io.assert.verifyElementAttributeContainsText(
      selectors.syncPagePO.WIZARD_NEXT,
      "class",
      "Mui-disabled"
    );
    //T30877
    await io.assert.verifyElementIsDisplayed(
      selectors.syncPagePO.SPECIFY_SCHEMA_INPUT,
      "Schema not displayed"
    );
    //T30882
    await io.sync.specifySchema("Existing schema");
    await io.sync.clickOnNext();
    await io.assert.verifyElementDisplayedByText(
      "Schema already in use. Please enter a new schema name",
      "Error is not displayed"
    );
    //T30879
    await io.sync.specifySchema("Automation schema");

    //T30883 T30884
    await io.assert.verifyElementIsDisplayed(
      selectors.syncPagePO.WIZARD_NEXT,
      "Next button is not enabled"
    );
    //T30859 T30867
    await io.assert.verifyElementIsDisplayed(
      selectors.syncPagePO.WIZARD_BACK,
      "Back button is not enabled"
    );
    await io.assert.verifyElementToBeClickable(selectors.syncPagePO.WIZARD_BACK);

    //T30885
    await io.flowBuilder.click(
      selectors.flowBuilderPagePO.OPENAI.CELIGO_AI_HELPTEXT
    );
    await io.assert.verifyElementContainsText(
      selectors.flowBuilderPagePO.OPENAI.CELIGO_AI_HELPTEXT_WINDOW,
      "text to be added"
    );
    await io.flowBuilder.clickByIndex(
      selectors.connectionsPagePO.HELPTEXT_CLOSE,
      1
    );
    await io.flowBuilder.click(
      selectors.flowBuilderPagePO.OPENAI.CELIGO_AI_HELPTEXT
    );
    await io.assert.verifyElementContainsText(
      selectors.flowBuilderPagePO.OPENAI.CELIGO_AI_HELPTEXT_WINDOW,
      "text to be added"
    );
    await io.flowBuilder.clickByIndex(
      selectors.connectionsPagePO.HELPTEXT_CLOSE,
      2
    );
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

    //T30866 T30874 T30888 T30889
    await io.assert.verifyElementDisplayedByText(
      "Step 2",
      "Step 2 is not displayed"
    );
    await io.assert.verifyElementDisplayedByText(
      "Snowflake",
      "Snowflake is not displayed"
    );
    await io.assert.verifyElementDisplayedByText(
      "Choose destination",
      "Choose destination is not displayed"
    );
    await io.assert.verifyElementDisplayedByText(
      "Connect to destination",
      "Connect to destination is not displayed"
    );
    await io.assert.verifyElementDisplayedByText(
      "Name your destination schema",
      "Name your destination schema is not displayed"
    );
    await io.assert.verifyElementIsDisplayed(
      selectors.syncPagePO.DESTINATION_STEP,
      "Destination step is not displayed"
    );
    await io.assert.verifyElementIsDisplayed(
      selectors.syncPagePO.DESTINATION_TYPE_COMPLETE,
      "Destination step is not displayed"
    );
    await io.assert.verifyElementIsDisplayed(
      selectors.syncPagePO.DESTINATION_CONNECTION_COMPLETE,
      "Destination connection is not displayed"
    );
    await io.assert.verifyElementIsDisplayed(
      selectors.syncPagePO.DESTINATION_SCHEMA_COMPLETE,
      "Destination schema is not displayed"
    );
    await io.assert.verifyElementToBeClickable(selectors.syncPagePO.DESTINATION_STEP);
    //T30891
    const settingsColor= page.getByText("Settings");
    await expect(settingsColor).toHaveCSS("color", "rgb(103, 122, 137)");

    //T30870
    await io.sync.clickOnNext();




  });
});
