import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt, randomNumber, randomString } from "@celigo/aut-utilities";

test.describe("TC_C102863 Verify Role field is not displayed on Sign up page (EU region)", () => {
  test("@Zephyr-IO-T24402 @Env-All C102863 Verify Role field is not displayed on Sign up page (EU region)", async ({
    io,
    page
  }) => {
    await io.flowBuilder.navigateTo('https://eu.integrator.io/signup');
    await io.flowBuilder.loadingTime();
    const roleField = await io.flowBuilder.isVisible('text = "Role"');
    await io.assert.expectToBeFalse(roleField, "The Role Field is displayed");
    await io.flowBuilder.fill(
      selectors.connectionsPagePO.NAME_INPUT,
      `TestAutomation${randomNumber(3)}`
    );
    await io.flowBuilder.fill(
      selectors.loginPagePO.EMAIL_ID,
      `qaautomation!${randomNumber(2) + randomString(2)}@celigo.com`
    );
    await io.flowBuilder.fill(
      selectors.loginPagePO.COMPANY,
      `Celigo${randomNumber(2) + randomString(2)}`
    );
    await io.flowBuilder.click(selectors.basePagePO.AGREETOSANDPP);
    await io.flowBuilder.click(selectors.loginPagePO.SIGN_UP_BUTTON);
  });
});
