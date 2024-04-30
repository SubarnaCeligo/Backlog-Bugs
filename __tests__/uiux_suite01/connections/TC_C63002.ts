import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import testData from "@testData/Connections/Narvar.json";

test.describe(`C63002 Verify connection dropdown at Aliases tab`, () => {
  test(`@Env-All @Zephyr-IO-T21793 C63002 Verify connection dropdown at Aliases tab`, async ({
    io,
    page
  }) => {
    await io.homePage.navigateTo(process.env.IO_Integration_URL + "aliases/add");
    await io.flowBuilder.clickByText("Please select");
    await io.flowBuilder.clickByText("Connection");
    await io.flowBuilder.getByRoleClick("button", "Please select");
    await page.keyboard.press("n");
    await page.getByText("API type").first().waitFor({ state: "visible" });
    await io.assert.verifyElementDisplayedByText(
      "NARVAR CONNECTION",
      "Connection name is not displayed"
    );
    await expect(page.getByText("API type").first()).toBeVisible();
    await io.flowBuilder.addStep("Verified API type is displayed");
    await expect(page.getByText("API version").first()).toBeVisible();
    await io.flowBuilder.addStep("Verified API version is displayed");
  });
});
