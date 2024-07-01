import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("@Author-ladimanish TC_T30847_T30801_T30822_T30811", () => {
  test("@Env-PLATFORMTHREE @Epic-IO-63085 @Priority-P1 @Zephyr-IO-T30847 @Zephyr-IO-T30801 @Zephyr-IO-T30822 @Zephyr-IO-T30811 TC_T30847_T30801_T30822_T30811", async ({
    io,
    page
  }) => {
    await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
    const integrationName = await io.sync.generateRandomName("Integration");
    await io.sync.createNewIntegration(integrationName);
    await io.sync.chooseSourceApplication("Salesforce");

    //T30847
    await io.flowBuilder.clearTextValue(
      selectors.syncPagePO.SOURCE_APP_NAME_INPUT
    );
    await io.myAccountPage.loadingTime();
    await io.assert.verifyElementDisplayedByText(
      "Salesforce",
      "application list is not displayed"
    );

    //T30801 T30822
    await io.flowBuilder.clickByText("Salesforce");
    await io.myAccountPage.loadingTime();
    await io.assert.verifyElementIsDisplayed(
      selectors.syncPagePO.SOURCE_CONNECTION_INPUT,
      "app selection is not done"
    );

    //T30811
    const nextButton = await page.$(selectors.syncPagePO.WIZARD_NEXT);
    expect(await nextButton.getAttribute("class")).toContain("Mui-disabled");
  });
});
