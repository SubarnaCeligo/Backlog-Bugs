import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("@Author-ladimanish TC_T30846_T30837_T30830_T30842", () => {
  test("@Env-PLATFORMTHREE @Epic-IO-63085 @Priority-P1 @Zephyr-IO-T30846 @Zephyr-IO-T30837 @Zephyr-IO-T30830 @Zephyr-IO-T30842 TC_T30846_T30837_T30830_T30842", async ({
    io,
    page
  }) => {
    await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
    const integrationName = await io.sync.generateRandomName("Integration");
    await io.sync.createNewIntegration(integrationName);

    //T30846
    await io.sync.chooseSourceApplication("Salesforce");
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
    await io.flowBuilder.loadingTime();
    await io.assert.verifyElementDisplayedByText(
      "No available connections match your search",
      "error message is not displayed"
    );

    //T30830
    await io.assert.verifyElementIsDisplayed(
      selectors.syncPagePO.CREATE_CONNECTION_ICON,
      "Create connection icon is not displayed"
    );
    const editConnectionBtn = page.locator(
      selectors.syncPagePO.EDIT_CONNECTION_ICON
    );
    await expect(editConnectionBtn).toHaveAttribute("disabled");

    //T30842
    const nextButton = page.locator(selectors.syncPagePO.WIZARD_NEXT);
    await expect(nextButton).toHaveAttribute("disabled");
  });
});
