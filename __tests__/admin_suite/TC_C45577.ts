import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("TC_C45577 Verify if the default value for Require MFA is disabled", () => {
  test("@Zephyr-IO-T17217 @Env-All C45577 Verify if the default value for Require MFA is disabled", async ({
    io,
    page
  }) => {
    await io.flowBuilder.navigateTo(
      process.env["IO_UI_CONNECTOR_URL"] + "myAccount/users"
    );
    await io.flowBuilder.loadingTime();

    let isMFAUnChecked = await page.locator('input[data-test="mfaRequired"]').nth(3).evaluate((el)=> el.outerHTML);
    await io.assert.expectToBeFalse(
        await isMFAUnChecked.includes("checked"),
      "Require MFA is enabled"
    );
  });
});
