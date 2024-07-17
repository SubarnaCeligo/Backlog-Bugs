import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("C55915 Verify the Visibility of 'Pendo-Zendesk chat bot' in the integrator.io", () => {
  test("@Env-All @Zephyr-IO-T15081 C55915 Verify the Visibility of 'Pendo-Zendesk chat bot' in the integrator.io", async ({
    io
  }) => {
    await io.homePage.navigateTo(process.env["IO_UI_CONNECTOR_URL"]+"home");
    await io.homePage.waitForElementAttached(selectors.basePagePO.CHAT_BOT);
    const isChatBotVisible = await io.homePage.isVisible(
      selectors.basePagePO.CHAT_BOT
    );
    await io.assert.expectToBeTrue(isChatBotVisible, "chatbot not visible");
  });
});
