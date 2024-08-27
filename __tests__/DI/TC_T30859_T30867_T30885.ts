import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("@Author-ladimanish TC_T30859_T30867_T30885", () => {
  test("@Env-PLATFORMTHREE @Env-QA  @Epic-IO-63085 @Priority-P1 @Zephyr-IO-T30859 @Zephyr-IO-T30867 @Zephyr-IO-T30885 TC_T30859_T30867_T30885", async ({
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
    // await io.flowBuilder.click(
    //   selectors.flowBuilderPagePO.OPENAI.CELIGO_AI_HELPTEXT
    // );
    // await io.assert.verifyElementContainsText(
    //   selectors.flowBuilderPagePO.OPENAI.CELIGO_AI_HELPTEXT_WINDOW,
    //   "text to be added"
    // );
    // await io.flowBuilder.clickByIndex(
    //   selectors.connectionsPagePO.HELPTEXT_CLOSE,
    //   1
    // );

    // await io.flowBuilder.click(
    //   selectors.flowBuilderPagePO.OPENAI.CELIGO_AI_HELPTEXT
    // );
    // await io.assert.verifyElementContainsText(
    //   selectors.flowBuilderPagePO.OPENAI.CELIGO_AI_HELPTEXT_WINDOW,
    //   "text to be added"
    // );
    // await io.flowBuilder.clickByIndex(
    //   selectors.connectionsPagePO.HELPTEXT_CLOSE,
    //   2
    // );

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
  });
});
