import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("C1583 Verify Transfer Ownership notification shows the integration name", () => {
  test("@Env-All C1583 Verify Transfer Ownership notification shows the integration name", async ({
    io,
    page
  }) => {
    await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.myAccountPage.loadingTime();
    await io.flowBuilder.clickByText("Create");
    await io.flowBuilder.click(selectors.syncPagePO.CREATE_SYNC_INTEGRATION);
    await io.flowBuilder.click(selectors.syncPagePO.NEW_SYNC_INTEGRATION);
    await io.myAccountPage.loadingTime();
    //T30794 name help text
    await io.flowBuilder.click(
      selectors.flowBuilderPagePO.OPENAI.CELIGO_AI_HELPTEXT
    );
    await io.assert.verifyElementContainsText(
      selectors.flowBuilderPagePO.OPENAI.CELIGO_AI_HELPTEXT_WINDOW,
      "text to be added"
    );
    await io.flowBuilder.clickByIndex(
      selectors.connectionsPagePO.HELPTEXT_CLOSE,
      0
    );
    //T30789 T30795 description help text
    await io.flowBuilder.click(
      selectors.flowBuilderPagePO.OPENAI.CELIGO_AI_HELPTEXT
    );
    await io.assert.verifyElementContainsText(
      selectors.flowBuilderPagePO.OPENAI.CELIGO_AI_HELPTEXT_WINDOW,
      "text to be added"
    );
    await io.flowBuilder.clickByIndex(
      selectors.connectionsPagePO.HELPTEXT_CLOSE,
      0
    );
    //T30779 T30784 T30787
    const integrationName = await io.sync.generateRandomIntegrationName();
    await io.flowBuilder.fill(
      selectors.syncPagePO.SYNC_INTEGRATION_NAME,
      integrationName
    );
    await io.flowBuilder.fill(
      selectors.syncPagePO.DESCRIPTION,
      "Description!@#$%^&*()_+123 \n Description!@#$%^&*()_+123 \n Description!@#$%^&*()_+123"
    );
    await io.flowBuilder.click(selectors.flowBuilderPagePO.CLOSE);
    await io.assert.verifyElementIsDisplayed(
      selectors.syncPagePO.SAVE_CHANGES_AND_CREATESYNC,
      "Dilog is not displayed"
    );

    //T30783 T30782 T30777 T30778
    await io.flowBuilder.fill(
      selectors.syncPagePO.SYNC_INTEGRATION_NAME,
      "Integration!@#$%^&*()_+123"
    );
    await io.flowBuilder.clearTextValue(
      selectors.syncPagePO.SYNC_INTEGRATION_NAME
    );
    await expect(page.getByText("A value must be provided")).toBeVisible();
    await io.flowBuilder.fill(
      selectors.syncPagePO.SYNC_INTEGRATION_NAME,
      "Integration!@#$%^&*()_+123"
    );
    await io.flowBuilder.click(selectors.syncPagePO.SAVE_AND_CREATE_SYNC);
    await io.assert.verifyElementIsDisplayed(
      selectors.syncPagePO.WIZARD_TITLE,
      "Title is not displayed"
    );
  });
});
