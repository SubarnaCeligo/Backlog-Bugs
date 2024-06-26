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

    //T30805
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
    //T30819
    await io.assert.verifyElementIsDisplayed(
      selectors.syncPagePO.SOURCE_PLACEHOLDER,
      "placeholder is not displayed"
    );
    //T30800 T30802 T30816
    await io.flowBuilder.click(selectors.syncPagePO.SOURCE_APP_NAME_INPUT);
    await io.flowBuilder.fill(
      selectors.syncPagePO.SOURCE_APP_NAME_INPUT,
      "salesforce"
    );
    await io.assert.verifyElementDisplayedByText("Salesforce", "Salesforce is not displayed");

    //T30803
    await io.flowBuilder.clearTextValue(selectors.syncPagePO.SOURCE_APP_NAME_INPUT);
    await io.flowBuilder.fill(
      selectors.syncPagePO.SOURCE_APP_NAME_INPUT,
      "S"
    );
    await io.assert.verifyElementDisplayedByText("Salesforce", "Salesforce is not displayed");

    //T30818 T30815
    await io.assert.verifyElementDisplayedByText("Sales & Marketing", "Header is not displayed");

    //T30807
    await io.flowBuilder.clearTextValue(selectors.syncPagePO.SOURCE_APP_NAME_INPUT);
    await io.flowBuilder.fill(
      selectors.syncPagePO.SOURCE_APP_NAME_INPUT,
      "test"
    );
    await io.assert.verifyElementDisplayedByText("Your search term doesn't match any of our currently available connectors.", "error message is not displayed");

    //T30847
    await io.flowBuilder.clearTextValue(selectors.syncPagePO.SOURCE_APP_NAME_INPUT);
    await io.assert.verifyElementDisplayedByText("Salesforce", "application list is not displayed");

    //T30801 T30822
    await io.flowBuilder.clickByText("Salesforce");
    await io.assert.verifyElementIsDisplayed(
      selectors.syncPagePO.SOURCE_CONNECTION_INPUT,
      "app selection is not done"
    );

    //T30811
    const nextButton = await page.$(selectors.syncPagePO.WIZARD_NEXT);
    await io.assert.verifyElementIsDisplayed(
      selectors.syncPagePO.NEXT,
      "Next button is not disabled"
    );
    expect(await nextButton.getAttribute("class")).toContain("Mui-disabled");

  });
});
