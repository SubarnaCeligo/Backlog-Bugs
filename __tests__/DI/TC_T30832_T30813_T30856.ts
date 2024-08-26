import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("@Author-ladimanish TC_T30832_T30813_T30856", () => {
  test("@Env-PLATFORMTHREE @Env-QA  @Epic-IO-63085 @Priority-P1 @Zephyr-IO-T30832 @Zephyr-IO-T30813 @Zephyr-IO-T30856 TC_T30832_T30813_T30856", async ({
    io,
    page
  }) => {
    await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
    const integrationName = await io.sync.generateRandomName("Integration");
    await io.sync.createNewIntegration(integrationName);
    await io.sync.chooseSourceApplication("Salesforce");
    await io.sync.selectExistingConnection("SALESFORCE CONNECTION");

    //T30832
    await io.flowBuilder.click(selectors.syncPagePO.CLOSE_CONNECTION);
    await io.myAccountPage.loadingTime();
    await expect(
      page.locator(selectors.syncPagePO.SOURCE_CONNECTION_INPUT)
    ).toHaveValue("");

    //T30813
    await io.assert.verifyElementToBeClickable(selectors.syncPagePO.CLOSE_WIZARD);
    await io.assert.verifyElementToBeClickable(selectors.syncPagePO.WIZARD_CLOSE);

    //T30856
    await io.assert.verifyElementText(
      `:nth-match(${selectors.basePagePO.BREADCRUMB_LIST},1)`,
      "Home"
    );
    await io.assert.verifyElementText(
      `:nth-match(${selectors.basePagePO.BREADCRUMB_LIST},3)`,
      integrationName
    );
  });
});
