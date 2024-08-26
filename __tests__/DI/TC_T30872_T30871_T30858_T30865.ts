import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("@Author-ladimanish TC_T30872_T30871_T30858_T30865", () => {
  test("@Env-PLATFORMTHREE @Env-QA  @Epic-IO-63086 @Priority-P1 @Zephyr-IO-T30872 @Zephyr-IO-T30871 @Zephyr-IO-T30858 @Zephyr-IO-T30865 TC_T30872_T30871_T30858_T30865", async ({
    io,
    page
  }) => {
    await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
    const integrationName = await io.sync.generateRandomName("Integration");
    await io.sync.createNewIntegration(integrationName);
    await io.sync.chooseSourceApplication("Salesforce");
    await io.sync.selectExistingConnection("SALESFORCE CONNECTION");
    await io.sync.clickOnNext();

    //T30872
    // await io.flowBuilder.click(
    //   selectors.flowBuilderPagePO.OPENAI.CELIGO_AI_HELPTEXT
    // );
    // await io.assert.verifyElementContainsText(
    //   selectors.flowBuilderPagePO.OPENAI.CELIGO_AI_HELPTEXT_WINDOW,
    //   "text to be added"
    // );
    // await io.flowBuilder.clickByIndex(
    //   selectors.connectionsPagePO.HELPTEXT_CLOSE,
    //   0
    // );

    //T30871
    await io.assert.verifyElementIsDisplayed(
      selectors.syncPagePO.DESTINATION_PLACEHOLDER,
      "Destination placeholder is not displayed"
    );

    //T30858
    await io.sync.chooseDestinationApplication("Snowflake");

    //T30865
    await io.assert.verifyElementIsDisplayed(
      selectors.syncPagePO.SOURCE_CONNECTION_INPUT,
      "Connect to destination is not displayed"
    );
  });
});
