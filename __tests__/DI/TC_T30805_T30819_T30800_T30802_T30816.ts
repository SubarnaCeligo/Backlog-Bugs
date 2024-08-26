import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("@Author-ladimanish TC_T30805_T30819_T30800_T30802_T30816", () => {
  test("@Env-PLATFORMTHREE @Env-QA  @Epic-IO-63085 @Priority-P1 @Zephyr-IO-T30805 @Zephyr-IO-T30819 @Zephyr-IO-T30800 @Zephyr-IO-T30802 @Zephyr-IO-T30816 TC_T30805_T30819_T30800_T30802_T30816", async ({
    io,
    page
  }) => {
    await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
    const integrationName = await io.sync.generateRandomName("Integration");
    await io.sync.createNewIntegration(integrationName);

    //T30805
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

    //T30819
    await io.assert.verifyElementIsDisplayed(
      selectors.syncPagePO.SOURCE_PLACEHOLDER,
      "placeholder is not displayed"
    );

    //T30800 T30802 T30816
    await io.flowBuilder.click(selectors.syncPagePO.SOURCE_APP_NAME_INPUT);
    await io.flowBuilder.fill(
      selectors.syncPagePO.SOURCE_APP_NAME_INPUT,
      "Salesforce"
    );
    await io.myAccountPage.loadingTime();
    await io.assert.verifyElementDisplayedByText(
      "Salesforce",
      "Salesforce is not displayed"
    );
  });
});
