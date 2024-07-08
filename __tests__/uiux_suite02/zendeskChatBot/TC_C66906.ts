import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe('C66906 Verify the auto -populated ""Name"" & ""Email"" fields in Pendo-zendesk chat bot when we login to a shared account which has only Monitor access', () => {
  test('@Env-All C66906 Verify the auto -populated ""Name"" & ""Email"" fields in Pendo-zendesk chat bot when we login to a shared account which has only Monitor access', async ({
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
    await io.homePage.addStep("clicking on get in touch");
    await iframe.locator(selectors.homePagePO.PENDO_ZENDESK.GET_IN_TOUCH).click();
    await io.homePage.addStep("click on leave a message");
    await iframe
      .locator(selectors.homePagePO.PENDO_ZENDESK.LEAVE_A_MESSAGE)
      .click();
    await iframe.getByText("Other").click();
    const getInputValue = async (label: string) =>
      await iframe
        .getByText(label)
        .evaluate(e =>
          e.parentElement.parentElement.nextElementSibling.getAttribute("value")
        );
    const getFullLabelText = async (label: string) =>
      await iframe.getByText(label).evaluate(e => e.parentElement.innerText);
    await io.homePage.addStep(
      "Getting Input values for your name, email, subject, description, environment"
    );
    const yourNameInputValue = await getInputValue("Your name");
    const emailInputValue = await getInputValue("Email address");
    const subjectLabel = await getFullLabelText("Subject");
    const descriptionLabel = await getFullLabelText("Description");
    const environmentLabel = await getFullLabelText("Environment");
    await io.homePage.addStep(
      "Checking Input values for your name, email to be auto populated and subject, description, environment to be optional"
    );
    await io.assert.expectNotToBeValue(
      "",
      yourNameInputValue,
      "Your name is not auto  filled"
    );
    await io.assert.expectNotToBeValue(
      "",
      emailInputValue,
      "Email is not auto  filled"
    );
    expect(subjectLabel).not.toContain("optional");
    expect(descriptionLabel).not.toContain("optional");
    expect(environmentLabel).not.toContain("optional");
  });

  test.afterEach("Closing open iframe", async ({ page, io }) => {
    const iframe = page.frameLocator(
      selectors.homePagePO.PENDO_ZENDESK.PENDO_ZENDESK_IFRAME
    );
    await iframe.locator(selectors.homePagePO.PENDO_ZENDESK.MINUS_ICON).click();
  });
});
