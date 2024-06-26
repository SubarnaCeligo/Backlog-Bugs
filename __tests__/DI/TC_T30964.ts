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
    await io.flowBuilder.click(
      selectors.syncPagePO.WIZARD_NEXT
    );
    await io.myAccountPage.loadingTime();
    await io.sync.chooseDestinationApplication("Snowflake");
    await io.sync.selectExistingConnection("SNOWFLAKE CONNECTION");
    await io.myAccountPage.loadingTime();
    await io.sync.selectDatabase("CELIGO_DI");
    await io.sync.specifySchema("Automation schema");
    await io.flowBuilder.click(
      selectors.syncPagePO.WIZARD_NEXT
    );

    //T30961
    await io.assert.verifyElementIsDisplayed(
      selectors.syncPagePO.DESCRIBE_SYNC,
      "Header not displayed"
    );

    //T30963
    await io.assert.verifyElementAttributeContainsText(
      selectors.syncPagePO.SAVE_AND_CLOSE,
      "class",
      "Mui-disabled"
    );
    //T30964
    await io.assert.verifyElementIsDisplayed(
      selectors.syncPagePO.SYNC_NAME_PLACEHOLDER,
      "Placeholder not displayed"
    );

    //T30966
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

    //T30972
    await io.sync.enterSyncName("length name");
    await io.assert.verifyElementDisplayedByText(
      "error",
      "Error is not displayed"
    );
    //T30973
    await io.sync.enterSyncName("Automation@123_sync");

    //T30969 T30978 T30962
    await io.assert.verifyElementIsDisplayed(
      selectors.syncPagePO.SAVE_AND_CLOSE,
      "SaveAndClose button not displayed"
    );

    //T30965
    await io.assert.verifyElementIsDisplayed(
      selectors.syncPagePO.SYNC_DESCRIPTION_PLACEHOLDER,
      "Placeholder not displayed"
    );

    //T30977 T30976
    await io.flowBuilder.fill(
      selectors.syncPagePO.SYNC_DESCRIPTION,
      "Automation@sync description \n line2 \n line3"
    );
    //T30974
    await io.flowBuilder.fill(
      selectors.syncPagePO.SYNC_DESCRIPTION,
      "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"
    );
    await io.assert.verifyElementDisplayedByText(
      "error",
      "Error is not displayed"
    );

    //T30967
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

    //T30985
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

    //T30981 T31001
    await io.assert.verifyElementDisplayedByText(
      "(GMT+05:30) Chennai, Kolkata, Mumbai, New Delhi",
      "Default timezone is not displayed"
    );








  });
});
