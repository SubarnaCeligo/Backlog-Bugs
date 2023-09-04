import {expect, test} from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe('C55930 Verify the "Message Sent" form of the Pendo-zendesk chat bot', () => {
    test('C55930 Verify the "Message Sent" form of the Pendo-zendesk chat bot', async ({page,io}) => {
      await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
      await io.homePage.waitForElementAttached(selectors.homePagePO.INTEGRATION_TILES);
      await io.homePage.delay(3000);
      const chatbot = await page.$$(selectors.basePagePO.CHAT_BOT);
      if(chatbot.length === 0){
        const iframe = page.frameLocator(selectors.homePagePO.PENDO_ZENDESK.PENDO_ZENDESK_IFRAME);
        await iframe.locator(selectors.homePagePO.PENDO_ZENDESK.MINUS_ICON).click();
      }
  
      await io.homePage.waitForElementAttached(selectors.basePagePO.CHAT_BOT);
      if (!(await io.homePage.isVisible(selectors.basePagePO.CHAT_BOT_OPTIONS)))
        await io.homePage.click(selectors.basePagePO.CHAT_BOT);
      await io.homePage.waitForElementAttached(selectors.basePagePO.CHAT_BOT_OPTIONS);
      await page.locator(selectors.basePagePO.CHAT_BOT_OPTIONS).nth(0).click();
  
      const iframe = page.frameLocator(selectors.homePagePO.PENDO_ZENDESK.PENDO_ZENDESK_IFRAME);
      await iframe.locator(selectors.homePagePO.PENDO_ZENDESK.GET_IN_TOUCH).click();
      await iframe.locator(selectors.homePagePO.PENDO_ZENDESK.LEAVE_A_MESSAGE).click();
      await iframe.getByText("Other").click();
  
      await iframe.locator(selectors.homePagePO.PENDO_ZENDESK.SUBJECT).fill('Test');
      await iframe.locator(selectors.homePagePO.PENDO_ZENDESK.DISCRIPTION).fill('Test');
      await iframe.locator(selectors.homePagePO.PENDO_ZENDESK.DROPDOWN_FIELDS).nth(1).click();
      await iframe.locator(selectors.homePagePO.PENDO_ZENDESK.DROPDOWN_MENU_ITEMS).nth(0).click();
      await iframe.locator(selectors.homePagePO.PENDO_ZENDESK.BUTTON).click();
  
      expect(await iframe.locator(`${selectors.homePagePO.PENDO_ZENDESK.SCROLL_CONTAINER_CONTENT} h2`).innerText()).toBe("Thanks for reaching out");
      expect(await iframe.locator(`${selectors.homePagePO.PENDO_ZENDESK.SCROLL_CONTAINER_CONTENT} p`).innerText()).toBe("Someone will get back to you soon");
      expect(await iframe.locator(selectors.homePagePO.PENDO_ZENDESK.BUTTON).innerText()).toBe("Go Back");
      await iframe.locator(selectors.homePagePO.PENDO_ZENDESK.MINUS_ICON).click();
    });
  });