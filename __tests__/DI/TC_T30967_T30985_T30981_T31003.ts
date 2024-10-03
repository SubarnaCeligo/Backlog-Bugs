import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("@Author-ladimanish TC_T30967_T30985_T30981_T31003", () => {
  test("@Env-All  @Epic-IO-68754 @Priority-P1 @Zephyr-IO-T30967 @Zephyr-IO-T30985 @Zephyr-IO-T30981 Zephyr-IO-T31001 TC_T30967_T30985_T30981_T31003", async ({
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

    //T30967
    await io.flowBuilder.clickByIndex(
      selectors.flowBuilderPagePO.HELP_TEXT_ICON,1
    );
    await io.assert.verifyElementContainsText(
      selectors.flowBuilderPagePO.OPENAI.CELIGO_AI_HELPTEXT_WINDOW,
      "Describe your sync so that other users can quickly understand its function and purpose"
    );
    await io.flowBuilder.click(
      selectors.connectionsPagePO.HELPTEXT_CLOSE
    );

    //T30985
    await io.flowBuilder.clickByIndex(
      selectors.flowBuilderPagePO.HELP_TEXT_ICON,2
    );
    await io.assert.verifyElementContainsText(
      selectors.flowBuilderPagePO.OPENAI.CELIGO_AI_HELPTEXT_WINDOW,
      "Set the time zone that the integrator.io scheduler should use to run your integration sync."
    );
    await io.flowBuilder.click(
      selectors.connectionsPagePO.HELPTEXT_CLOSE
    );

    //T30981 T31001
    await io.assert.verifyElementDisplayedByText(
      "(GMT+05:30) Chennai, Kolkata, Mumbai, New Delhi",
      "Default timezone is not displayed"
    );
  });
});
