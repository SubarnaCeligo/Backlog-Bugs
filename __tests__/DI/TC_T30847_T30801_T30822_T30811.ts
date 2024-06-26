import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("@Author-ladimanish Source page validations 3", () => {
  test("@Env-All @Epic-IO-63085 @Priority-P1 @Zephyr-IO-T30847 @Zephyr-IO-T30801 @Zephyr-IO-T30822 @Zephyr-IO-T30811 Source page validations 3", async ({
    io,
    page
  }) => {
    await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.myAccountPage.loadingTime();
    const integrationName = await io.sync.generateRandomIntegrationName();
    await io.sync.createNewIntegration(integrationName);
    await io.sync.chooseSourceApplication("Salesforce");

    //T30847
    await io.flowBuilder.clearTextValue(
      selectors.syncPagePO.SOURCE_APP_NAME_INPUT
    );
    await io.assert.verifyElementDisplayedByText(
      "Salesforce",
      "application list is not displayed"
    );

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
