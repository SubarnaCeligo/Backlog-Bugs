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

    //T30835
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
    //T30836
    await io.assert.verifyElementIsDisplayed(
      selectors.syncPagePO.SOURCE_CONNECTION_PLACEHOLDER,
      "placeholder is not displayed"
    );
    await io.assert.verifyElementIsDisplayed(
      selectors.syncPagePO.CREATE_CONNECTION_PLACEHOLDER,
      "placeholder is not displayed"
    );
    //T30838
    await io.assert.verifyElementDisplayedByText(
      "SALESFORCE CONNECTION",
      "Existing connections are not displayed"
    );
    //T30846
    await io.flowBuilder.fill(
      selectors.syncPagePO.SOURCE_CONNECTION_INPUT,
      "SALESFORCE CONNECTION"
    );
    await io.assert.verifyElementDisplayedByText(
      "SALESFORCE CONNECTION",
      "Salesforce Connection is not displayed"
    );
    //T30837
    await io.flowBuilder.clearTextValue(
      selectors.syncPagePO.SOURCE_CONNECTION_INPUT
    );
    await io.flowBuilder.fill(
      selectors.syncPagePO.SOURCE_CONNECTION_INPUT,
      "qwerty"
    );
    await io.assert.verifyElementDisplayedByText(
      "No available connections match your search",
      "error message is not displayed"
    );
    //T30830
    await io.assert.verifyElementIsDisplayed(
      selectors.syncPagePO.CREATE_CONNECTION_ICON,
      "Create connection icon is not displayed"
    );
    const editConnectionBtn = await page.$(
      selectors.syncPagePO.EDIT_CONNECTION_ICON
    );
    expect(await editConnectionBtn.getAttribute("class")).toContain(
      "Mui-disabled"
    );
    //T30842
    const nextButton = await page.$(selectors.syncPagePO.NEXT);
    expect(await nextButton.getAttribute("class")).toContain("Mui-disabled");
    //T30843 T30829 T30825
    await io.flowBuilder.clickByText("SALESFORCE CONNECTION");
    await io.myAccountPage.loadingTime();
    await io.assert.verifyElementIsDisplayed(
      selectors.syncPagePO.NEXT,
      "Next button is not displayed"
    );
    //T30831
    await io.assert.verifyElementToBeClickable(selectors.syncPagePO.EDIT_CONNECTION_ICON);

    //T30832
    await io.flowBuilder.click(selectors.syncPagePO.CLOSE_CONNECTION);
    await expect(
      page.locator(selectors.syncPagePO.SOURCE_CONNECTION_INPUT)
    ).toHaveValue("");

    //T30813
    await io.assert.verifyElementToBeClickable(selectors.syncPagePO.CLOSE_WIZARD);
    await io.assert.verifyElementToBeClickable(selectors.syncPagePO.WIZARD_CLOSE);
    //T30856
    const breadcrumbList = await page.locator(selectors.basePagePO.BREADCRUMB_LIST).all();
    await io.assert.verifyElementText(`:nth-match(${selectors.basePagePO.BREADCRUMB_LIST},1)`, 'Home');
    await io.assert.verifyElementText(`:nth-match(${selectors.basePagePO.BREADCRUMB_LIST},3)`, 'Integration!@#$%^&*()_+123');

    //T30823 T30851 T30854 T30890
    await io.assert.verifyElementIsDisplayed(
      selectors.syncPagePO.SOURCE_STEPPER,
      "Source stepper is not displayed"
    );
    await io.assert.verifyElementDisplayedByText(
      "Step 1",
      "stepper is not displayed"
    );
    await io.assert.verifyElementAttributeContainsText(
      selectors.syncPagePO.SOURCE_TYPE_CHECKBOX,
      "issubstepcompleted",
      "salesforce"
    );
    await io.assert.verifyElementDisplayedByText(
      "Choose source",
      "Choose source is not displayed"
    );
    await io.assert.verifyElementIsDisplayed(
      selectors.syncPagePO.SOURCE_CONNECTION_CHECKBOX,
      "SOURCE_CONNECTION stepper is not displayed"
    );
    await io.assert.verifyElementDisplayedByText(
      "Connect to source",
      "Connect to source is not displayed"
    );
    await io.assert.verifyElementIsDisplayed(
      selectors.syncPagePO.SOURCE_OBJECTS_CHECKBOX,
      "SOURCE_OBJECTS stepper is not displayed"
    );
    await io.assert.verifyElementDisplayedByText(
      "Choose objects",
      "Choose objects is not displayed"
    );
    await io.assert.verifyElementToBeClickable(selectors.syncPagePO.SOURCE_STEPPER);
    await io.assert.verifyElementNotToBeClickable(selectors.syncPagePO.SOURCE_CONNECTION_CHECKBOX);
    //T30852
    const destinationColor= page.getByText("Destination");
    await expect(destinationColor).toHaveCSS("color", "rgb(103, 122, 137)");
    const settingsColor= page.getByText("Settings");
    await expect(settingsColor).toHaveCSS("color", "rgb(103, 122, 137)");


  });
});
