import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("C66307 Verify Sign up with Google is enabled on EU Sign up page", () => {
  test("@Env-All @Zephyr-IO-T20888 C66307 Verify Sign up with Google is enabled on EU Sign up page", async ({
    io,
    page
  }) => {
    await io.homePage.navigateTo("https://eu.integrator.io/signup");
    await io.homePage.loadingTime()
    await io.assert.verifyElementDisplayedByText(
      "Sign up with Google",
      "Sign up with Google is not displayed"
    );
  });
});
