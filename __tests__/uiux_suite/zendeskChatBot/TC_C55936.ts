import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe(`C55936 Verify the auto -populated "Name" & "Email" fields in Pendo-zendesk chat bot when we login to a shared account which has only Manage access`, () => {
  test(`C55936 Verify the auto -populated "Name" & "Email" fields in Pendo-zendesk chat bot when we login to a shared account which has only Manage access`, async ({
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
    const searchOurDocs = (
      await page.$$(selectors.basePagePO.CHAT_BOT_OPTIONS)
    )[0];
    await searchOurDocs.click();
    await io.homePage.addStep("Clicked on 'Search our docs' option");
    const iframe = page.frameLocator("#webWidget");
    const getInTouchBtn = iframe.locator('[data-testid="pill-button"]');
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

    expect(yourNameInputValue).not.toBe("");
    await io.homePage.addStep("Checked if 'Your name' field is not empty");
    expect(emailInputValue).not.toBe("");
    await io.homePage.addStep("Checked if 'Email address' field is not empty");
    expect(subjectLabel).not.toContain("optional");
    await io.homePage.addStep("Checked if 'Subject' field is not optional");
    expect(descriptionLabel).not.toContain("optional");
    await io.homePage.addStep("Checked if 'Description' field is not optional");
    expect(environmentLabel).not.toContain("optional");
    await io.homePage.addStep("Checked if 'Environment' field is not optional");
    await iframe.locator('[data-testid="Icon--dash"]').click();
    await io.homePage.addStep("Clicked on 'Dash/Minus' button to close chatbot");
  });
});
