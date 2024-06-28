import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("TC_C45825 Verify if the message is shown correcly on the screen when MFA is disabled for a user.", () => {
  test("@Zephyr-IO-T17233 @Env-All C45825 Verify if the message is shown correcly on the screen when MFA is disabled for a user.", async ({
    io,
    page
  }) => {
    await io.flowBuilder.navigateTo(
      process.env["IO_UI_CONNECTOR_URL"] + "myAccount/users"
    );
    await io.flowBuilder.loadingTime();
    //Enable
    await io.flowBuilder.clickByIndex(selectors.basePagePO.ENABLESSO, 3);

    //Disable
    await io.flowBuilder.clickByIndex(selectors.basePagePO.ENABLESSO, 3);
    await io.assert.verifyElementIsDisplayed(
      selectors.flowGroupingPagePO.ALERT_MESSAGE,
      "Disabled error message is not displayed"
    );
    await io.flowBuilder.clickByIndex(selectors.basePagePO.ENABLESSO, 3);
  });
});
