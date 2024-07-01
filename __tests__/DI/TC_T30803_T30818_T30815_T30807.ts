import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("@Author-ladimanish TC_T30803_T30818_T30815_T30807", () => {
  test("@Env-PLATFORMTHREE @Epic-IO-63085 @Priority-P1 @Zephyr-IO-T30803 @Zephyr-IO-T30818 @Zephyr-IO-T30815 @Zephyr-IO-T30807 TC_T30803_T30818_T30815_T30807", async ({
    io,
    page
  }) => {
    await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.myAccountPage.loadingTime();
    const integrationName = await io.sync.generateRandomName("Integration");
    await io.sync.createNewIntegration(integrationName);
    await io.sync.chooseSourceApplication("Salesforce");

    //T30803
    await io.flowBuilder.clearTextValue(selectors.syncPagePO.SOURCE_APP_NAME_INPUT);
    await io.myAccountPage.loadingTime();
    await io.flowBuilder.fill(
      selectors.syncPagePO.SOURCE_APP_NAME_INPUT,
      "S"
    );
    await io.myAccountPage.loadingTime();
    await io.assert.verifyElementDisplayedByText("Salesforce", "Salesforce is not displayed");

    //T30818 T30815
    await io.assert.verifyElementDisplayedByText("Sales & Marketing", "Header is not displayed");

    //T30807
    await io.flowBuilder.clearTextValue(selectors.syncPagePO.SOURCE_APP_NAME_INPUT);
    await io.flowBuilder.fill(
      selectors.syncPagePO.SOURCE_APP_NAME_INPUT,
      "test"
    );
    await io.myAccountPage.loadingTime();
    await io.assert.verifyElementDisplayedByText("Your search term doesn't match any of our currently available connectors.", "error message is not displayed");

  });
});
