import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("@Author-ladimanish TC_T30835_T30836_T30838", () => {
  test("@Env-PLATFORMTHREE @Env-QA  @Epic-IO-63085 @Priority-P1 @Zephyr-IO-T30835 @Zephyr-IO-T30836 @Zephyr-IO-T30838 TC_T30835_T30836_T30838", async ({
    io,
    page
  }) => {
    await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
    const integrationName = await io.sync.generateRandomName("Integration");
    await io.sync.createNewIntegration(integrationName);

    //T30836
    await io.sync.chooseSourceApplication("Salesforce");
    await page.keyboard.press("Tab");
    await io.flowBuilder.loadingTime();
    await io.assert.verifyElementIsDisplayed(
      selectors.syncPagePO.SOURCE_CONNECTION_PLACEHOLDER,
      "placeholder is not displayed"
    );
    await io.assert.verifyElementIsDisplayed(
      selectors.syncPagePO.CREATE_CONNECTION_PLACEHOLDER,
      "placeholder is not displayed"
    );

    //T30838
    await io.flowBuilder.click(selectors.syncPagePO.SOURCE_CONNECTION_INPUT);
    await io.flowBuilder.loadingTime();
    await io.assert.verifyElementDisplayedByText(
      "SALESFORCE CONNECTION",
      "Existing connections are not displayed"
    );

    //T30835
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
    // T30918 objects help text
    await io.flowBuilder.clickByIndex(
      selectors.flowBuilderPagePO.HELP_TEXT_ICON,2
    );
    await io.assert.verifyElementContainsText(
      selectors.flowBuilderPagePO.OPENAI.CELIGO_AI_HELPTEXT_WINDOW,
      "Check the box next to each object that contains source data to send to the sync destination."
    );
    await io.flowBuilder.click(
      selectors.connectionsPagePO.HELPTEXT_CLOSE
    );
  });
});
