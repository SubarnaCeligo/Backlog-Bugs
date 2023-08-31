import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe(`C55936 Verify the auto -populated "Name" & "Email" fields in Pendo-zendesk chat bot when we login to a shared account which has only Manage access`, () => {
  test(`C55936 Verify the auto -populated "Name" & "Email" fields in Pendo-zendesk chat bot when we login to a shared account which has only Manage access`, async ({
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
    const searchOurDocs = (
      await page.$$(selectors.basePagePO.CHAT_BOT_OPTIONS)
    )[0];
    await searchOurDocs.click();
    const iframe = page.frameLocator("#webWidget");
    const getInTouchBtn = iframe.locator('[data-testid="pill-button"]');
    await getInTouchBtn.click();
    await iframe.getByText("Leave a message").click();
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
    expect(emailInputValue).not.toBe("");
    expect(subjectLabel).not.toContain("optional");
    expect(descriptionLabel).not.toContain("optional");
    expect(environmentLabel).not.toContain("optional");

    await iframe.locator('[data-testid="Icon--dash"]').click();
  });
});
