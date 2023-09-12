import {expect, test} from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe('C66906 Verify the auto -populated ""Name"" & ""Email"" fields in Pendo-zendesk chat bot when we login to a shared account which has only Monitor access', () => {

    test('C66906 Verify the auto -populated ""Name"" & ""Email"" fields in Pendo-zendesk chat bot when we login to a shared account which has only Monitor access', async ({page,io}) => {
      await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
      await io.homePage.addStep('Checking if pendo zendesk iframe is already open, hence closing if open');
      await io.homePage.waitForElementAttached(selectors.homePagePO.INTEGRATION_TILES);
      await io.homePage.delay(3000);
      const chatbot = await page.$$(selectors.basePagePO.CHAT_BOT);
      if(chatbot.length === 0){
        const iframe = page.frameLocator(selectors.homePagePO.PENDO_ZENDESK.PENDO_ZENDESK_IFRAME);
        await iframe.locator(selectors.homePagePO.PENDO_ZENDESK.MINUS_ICON).click();
      }
      await io.homePage.addStep('Opening pendo zendesk and clicking on first option');
      await io.homePage.waitForElementAttached(selectors.basePagePO.CHAT_BOT);
      if (!(await io.homePage.isVisible(selectors.basePagePO.CHAT_BOT_OPTIONS)))
        await io.homePage.click(selectors.basePagePO.CHAT_BOT);
      await io.homePage.waitForElementAttached(selectors.basePagePO.CHAT_BOT_OPTIONS);
      await page.locator(selectors.basePagePO.CHAT_BOT_OPTIONS).nth(0).click();
  
      const iframe = page.frameLocator(selectors.homePagePO.PENDO_ZENDESK.PENDO_ZENDESK_IFRAME);
      await io.homePage.addStep('clicking on get in touch');
      await iframe.locator(selectors.homePagePO.PENDO_ZENDESK.GET_IN_TOUCH).click();
      await io.homePage.addStep('click on leave a message');
      await iframe.locator(selectors.homePagePO.PENDO_ZENDESK.LEAVE_A_MESSAGE).click();
      await iframe.getByText("Other").click();
      const getInputValue = async (label: string) =>
      await iframe
        .getByText(label)
        .evaluate(e =>
          e.parentElement.parentElement.nextElementSibling.getAttribute("value")
        );
      const getFullLabelText = async (label: string) =>
        await iframe.getByText(label).evaluate(e => e.parentElement.innerText);
        await io.homePage.addStep('Getting Input values for your name, email, subject, description, environment');
      const yourNameInputValue = await getInputValue("Your name");
      const emailInputValue = await getInputValue("Email address");
      const subjectLabel = await getFullLabelText("Subject");
      const descriptionLabel = await getFullLabelText("Description");
      const environmentLabel = await getFullLabelText("Environment");
      await io.homePage.addStep('Checking Input values for your name, email to be auto populated and subject, description, environment to be optional');
      expect(yourNameInputValue).not.toBe("");
      expect(emailInputValue).not.toBe("");
      expect(subjectLabel).not.toContain("optional");
      expect(descriptionLabel).not.toContain("optional");
      expect(environmentLabel).not.toContain("optional");
  
      await iframe.locator(selectors.homePagePO.PENDO_ZENDESK.MINUS_ICON).click();
    });
  });