import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("Test to validate if the edi license is enabled, EDI text is shown on My Account > subscriptions page", () => {
  test("@Zephyr-IO-T12559 @Env-All @Epic-IO-86262 @Priority-P2 - Test to validate if the edi license is enabled", async ({
    io,
    page
  }) => {
    await io.homePage.navigateTo(
      process.env.IO_UI_CONNECTOR_URL + "myAccount/subscription"
    );
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.waitForElementAttached(selectors.basePagePO.TOOLTIP);

    expect(await page.locator(selectors.basePagePO.EDI_LABEL_ENABLED_SVG)).toBeVisible();

    const color = await page
      .locator(selectors.basePagePO.EDI_LABEL_ENABLED_SVG)
      .first()
      .evaluate(el => {
        return getComputedStyle(el).color;
      });

    await io.assert.expectToBeValue(
      "rgb(51, 61, 71)",
      color,
      "EDI text is not enabled on My Account > subscriptions page"
    );
    
  });
});
