import {  test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("TC_IOT32866 Verify users can see the previous conversations in the Celigo AI assistant box", () => {
  test.beforeEach(async ({ io }) => {
    await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test("@Zephyr-IO-T32866 @Env-All Verify users can see the previous conversations in the Celigo AI assistant box", async ({
    io,
    page
  }) => {
    await io.homePage.waitForElementAttached(selectors.basePagePO.RESOURCES);
    await io.homePage.goToMenu("Resources", "Exports");
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.basePagePO.ADD_NEW_RESOURCE);
    await io.homePage.fill(
      selectors.connectionsPagePO.CONNECTION_SEARCH,
      "Microsoft Azure Synapse Analytics"
    );
    await io.homePage.click(selectors.connectionsPagePO.AZURE_SYNAPSE);
    await io.flowBuilder.fill(
      selectors.connectionsPagePO.CONNECTION_INPUT,
      "AZURE SYNAPSE CONNECTOR"
    );
    await io.homePage.click(selectors.connectionsPagePO.CONNECTIONDROP0);
    await io.homePage.click(selectors.basePagePO.ADD_NAME);
    await page.keyboard.press("/");
    await io.flowBuilder.click(selectors.basePagePO.SAVE);
    await io.flowBuilder.click(
      selectors.flowBuilderPagePO.OPENAI.OPEN_HANDLEBARS_EDITOR
    );
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.click(selectors.flowBuilderPagePO.CELIGO_AI_BAR);
    await io.assert.verifyElementIsDisplayed(
      selectors.flowBuilderPagePO.OPENAI.CELIGO_AI_FIELD,
      "Celigo AI Placeholder is not displayed"
    );
    await io.flowBuilder.fill(
      selectors.flowBuilderPagePO.OPENAI.CELIGO_AI_FIELD,
      "Get the customer details"
    );
    await page.keyboard.press("Enter");
    await io.assert.verifyElementIsDisplayed(
      selectors.flowBuilderPagePO.OPENAI.PROGRESS_BAR,
      "Celigo AI Prompt Thinking is not displayed"
    );
    await io.flowBuilder.click(selectors.flowBuilderPagePO.CELIGO_AI_BAR);
    await io.assert.verifyElementDisplayedByText(
      "Get the customer details",
      "Prompt is not displayed"
    );
  });
});
