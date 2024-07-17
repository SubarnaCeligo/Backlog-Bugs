import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe('C55918 Verify by clicking on the "Get in touch" option in the Pendo-Zendesk chat bot when the agent is online', () => {
  test('@Env-All @Zephyr-IO-T15084 C55918 Verify by clicking on the "Get in touch" option in the Pendo-Zendesk chat bot when the agent is online', async ({
    page,
    io
  }) => {
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.waitForElementAttached(selectors.basePagePO.CHAT_BOT);
    if (!(await io.homePage.isVisible(selectors.basePagePO.CHAT_BOT_OPTIONS)))
      await io.homePage.click(selectors.basePagePO.CHAT_BOT);
    await io.homePage.waitForElementAttached(
      selectors.basePagePO.CHAT_BOT_OPTIONS
    );
    await io.homePage.clickByIndex(selectors.basePagePO.CHAT_BOT_OPTIONS, 0);

    const iframe = page.frameLocator(
      selectors.homePagePO.PENDO_ZENDESK.PENDO_ZENDESK_IFRAME
    );
    await iframe.locator(selectors.homePagePO.PENDO_ZENDESK.GET_IN_TOUCH).click();
    await io.homePage.addStep("Checking Leave a message button text");
    expect(
      await iframe
        .locator(selectors.homePagePO.PENDO_ZENDESK.LEAVE_A_MESSAGE)
        .innerText()
    ).toBe("Leave a message");
  });
  test.afterEach("Closing open iframe", async ({ page, io }) => {
    const iframe = page.frameLocator(
      selectors.homePagePO.PENDO_ZENDESK.PENDO_ZENDESK_IFRAME
    );
    await iframe.locator(selectors.homePagePO.PENDO_ZENDESK.MINUS_ICON).click();
  });
});
