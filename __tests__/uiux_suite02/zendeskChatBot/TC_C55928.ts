import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe('C55928 Verify the functionality by clicking on the "Leave a message" link in the Pendo-zendesk chat bot', () => {
  test('@Env-All @Zephyr-IO-T15088 C55928 Verify the functionality by clicking on the "Leave a message" link in the Pendo-zendesk chat bot', async ({
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
    await iframe
      .locator(selectors.homePagePO.PENDO_ZENDESK.LEAVE_A_MESSAGE)
      .click();
    await io.homePage.addStep(
      "checking if back icon, minus icon, 'please select your issue' to br visible"
    );
    expect(
      iframe.locator(selectors.homePagePO.PENDO_ZENDESK.BACK_ICON)
    ).toBeVisible();
    expect(
      iframe.locator(selectors.homePagePO.PENDO_ZENDESK.MINUS_ICON)
    ).toBeVisible();
    expect(
      await iframe
        .locator(
          `${selectors.homePagePO.PENDO_ZENDESK.SCROLL_CONTAINER_CONTENT} h2`
        )
        .innerText()
    ).toBe("Please select your issue");
  });
  test.afterEach("Closing open iframe", async ({ page, io }) => {
    const iframe = page.frameLocator(
      selectors.homePagePO.PENDO_ZENDESK.PENDO_ZENDESK_IFRAME
    );
    await iframe.locator(selectors.homePagePO.PENDO_ZENDESK.MINUS_ICON).click();
  });
});
