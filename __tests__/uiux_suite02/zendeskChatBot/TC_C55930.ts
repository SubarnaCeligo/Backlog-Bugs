import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe('C55930 Verify the "Message Sent" form of the Pendo-zendesk chat bot', () => {
  test('@Env-All @Zephyr-IO-T15090 C55930 Verify the "Message Sent" form of the Pendo-zendesk chat bot', async ({
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
    await iframe.getByText("Other").click();

    await iframe.locator(selectors.homePagePO.PENDO_ZENDESK.SUBJECT).fill("Test");
    await iframe
      .locator(selectors.homePagePO.PENDO_ZENDESK.DISCRIPTION)
      .fill("Test");
    await iframe
      .locator(selectors.homePagePO.PENDO_ZENDESK.DROPDOWN_FIELDS)
      .nth(1)
      .click();
    await iframe
      .locator(selectors.homePagePO.PENDO_ZENDESK.DROPDOWN_MENU_ITEMS)
      .nth(0)
      .click();
    await iframe.locator(selectors.homePagePO.PENDO_ZENDESK.BUTTON).click();

    await io.homePage.addStep("Checking texts after submitting query");
    expect(
      await iframe
        .locator(
          `${selectors.homePagePO.PENDO_ZENDESK.SCROLL_CONTAINER_CONTENT} h2`
        )
        .innerText()
    ).toBe("Thanks for reaching out");
    expect(
      await iframe
        .locator(
          `${selectors.homePagePO.PENDO_ZENDESK.SCROLL_CONTAINER_CONTENT} p`
        )
        .innerText()
    ).toBe("Someone will get back to you soon");
    expect(
      await iframe.locator(selectors.homePagePO.PENDO_ZENDESK.BUTTON).innerText()
    ).toBe("Go Back");
  });
  test.afterEach("Closing open iframe", async ({ page, io }) => {
    const iframe = page.frameLocator(
      selectors.homePagePO.PENDO_ZENDESK.PENDO_ZENDESK_IFRAME
    );
    await iframe.locator(selectors.homePagePO.PENDO_ZENDESK.MINUS_ICON).click();
  });
});
