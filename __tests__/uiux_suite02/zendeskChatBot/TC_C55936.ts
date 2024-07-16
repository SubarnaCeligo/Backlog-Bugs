import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe(`C55936 Verify the auto -populated "Name" & "Email" fields in Pendo-zendesk chat bot when we login to a shared account which has only Manage access`, () => {
  test(`@Env-All @Zephyr-IO-T15095 C55936 Verify the auto -populated "Name" & "Email" fields in Pendo-zendesk chat bot when we login to a shared account which has only Manage access`, async ({
    page,
    io
  }) => {
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.waitForElementAttached(selectors.basePagePO.CHAT_BOT);
    if (!(await io.homePage.isVisible(selectors.basePagePO.CHAT_BOT_OPTIONS))) {
      await io.homePage.click(selectors.basePagePO.CHAT_BOT);
    }
    await io.homePage.waitForElementAttached(
      selectors.basePagePO.CHAT_BOT_OPTIONS
    );
    await io.homePage.clickByIndex(selectors.basePagePO.CHAT_BOT_OPTIONS, 0);
    const iframe = page.frameLocator(
      selectors.homePagePO.PENDO_ZENDESK.PENDO_ZENDESK_IFRAME
    );
    const getInTouchBtn = iframe.locator(
      selectors.homePagePO.PENDO_ZENDESK.GET_IN_TOUCH
    );
    await getInTouchBtn.click();
    await io.homePage.addStep("Clicked on 'Get in touch' button");
    await iframe.getByText("Leave a message").click();
    await io.homePage.addStep("Clicked on 'Leave a message' button");
    await iframe.getByText("Other").click();

    const getInputValue = async (label: string) =>
      await iframe
        .getByText(label)
        .evaluate(e =>
          e.parentElement.parentElement.nextElementSibling.getAttribute("value")
        );

    const getFullLabelText = async (label: string) =>
      await iframe.getByText(label).evaluate(e => e.parentElement.innerText);

    const yourNameInputValue = await getInputValue("Your name");
    const emailInputValue = await getInputValue("Email address");

    const subjectLabel = await getFullLabelText("Subject");
    const descriptionLabel = await getFullLabelText("Description");
    const environmentLabel = await getFullLabelText("Environment");

    await io.assert.expectNotToBeValue(
      yourNameInputValue,
      "",
      "'Your name' field is empty"
    );

    await io.assert.expectNotToBeValue(
      emailInputValue,
      "",
      "'Email address' field is empty"
    );

    expect(subjectLabel).not.toContain("optional");
    await io.homePage.addStep("Checked if 'Subject' field is not optional");

    expect(descriptionLabel).not.toContain("optional");
    await io.homePage.addStep("Checked if 'Description' field is not optional");

    expect(environmentLabel).not.toContain("optional");
    await io.homePage.addStep("Checked if 'Environment' field is not optional");

    test.afterEach("Closing open iframe", async ({ page, io }) => {
      const iframe = page.frameLocator(
        selectors.homePagePO.PENDO_ZENDESK.PENDO_ZENDESK_IFRAME
      );
      await iframe.locator(selectors.homePagePO.PENDO_ZENDESK.MINUS_ICON).click();
    });
  });
});
